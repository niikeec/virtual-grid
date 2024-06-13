import { createResizeObserver } from '@solid-primitives/resize-observer';
import { Virtualizer } from '@tanstack/solid-virtual';
import {
  Accessor,
  createComputed,
  createEffect,
  createSignal,
  JSX,
  on,
  onMount,
  splitProps
} from 'solid-js';
import { createStore } from 'solid-js/store';

import * as Core from '@virtual-grid/core';
import {
  getColumnVirtualizerOptions,
  getLoadMoreTriggerHeight,
  getLoadMoreTriggerWidth,
  getRowVirtualizerOptions,
  getVirtualItemIndex,
  GetVirtualItemProps,
  getVirtualItemStyle,
  GridProps,
  observeGridSize,
  PartialVirtualizerOptions
} from '@virtual-grid/shared';

type CreateGridProps<
  IdT extends Core.GridItemId = Core.GridItemId,
  DataT extends Core.GridItemData = Core.GridItemData
> = GridProps<IdT, DataT> & { scrollRef: Accessor<HTMLElement | null> };

const PROPS = [
  'debug',
  'overscan',
  'scrollRef',
  'onLoadMore',
  'loadMoreSize'
] satisfies (keyof CreateGridProps)[];

const NON_MEASURE_OPTIONS = [
  'invert',
  'getItemId',
  'getItemData'
] satisfies (keyof CreateGridProps)[];

export const createGrid = <
  IdT extends Core.GridItemId,
  DataT extends Core.GridItemData
>(
  props: CreateGridProps<IdT, DataT>
) => {
  const [rest, nonMeasureOptions, measureOptions] = splitProps(
    props,
    PROPS,
    NON_MEASURE_OPTIONS
  );

  const [width, setWidth] = createSignal(measureOptions.width ?? 0);
  const [height, setHeight] = createSignal(measureOptions.height ?? 0);

  const grid = new Core.Grid({
    width: width(),
    height: height(),
    ...measureOptions,
    ...nonMeasureOptions
  });

  const [rowVirtualizer, setRowVirtualizer] = createStore({
    ...getRowVirtualizerOptions(grid),
    get getScrollElement() {
      return props.scrollRef;
    },
    get overscan() {
      return props.overscan;
    }
  } satisfies PartialVirtualizerOptions);

  const [columnVirtualizer, setColumnVirtualizer] = createStore({
    ...getColumnVirtualizerOptions(grid),
    get getScrollElement() {
      return props.scrollRef;
    },
    get overscan() {
      return props.overscan;
    }
  } satisfies PartialVirtualizerOptions);

  const getVirtualItem = () => (props: GetVirtualItemProps) => {
    const index = getVirtualItemIndex(grid, props);
    if (!grid.isIndexValid(index)) return;

    const { size, padding, translate } = getVirtualItemStyle(grid, props);

    const style = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: size.width !== undefined ? `${size.width}px` : '100%',
      height: size.height !== undefined ? `${size.height}px` : '100%',
      transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
      'padding-left': `${padding.left}px`,
      'padding-right': `${padding.right}px`,
      'padding-top': `${padding.top}px`,
      'padding-bottom': `${padding.bottom}px`,
      'box-sizing': 'border-box'
    } satisfies JSX.CSSProperties;

    return { index, style };
  };

  const getLoadMoreTrigger =
    () =>
    ({ virtualizer }: { virtualizer: Virtualizer<HTMLElement, Element> }) => {
      const getSize = grid.options.horizontal
        ? getLoadMoreTriggerWidth
        : getLoadMoreTriggerHeight;

      const size = props.onLoadMore
        ? getSize({ ...grid, virtualizer, size: props.loadMoreSize })
        : undefined;

      const style = {
        background: props.debug ? 'red' : undefined,
        opacity: props.debug ? 0.5 : undefined,
        position: 'absolute',
        height: !grid.options.horizontal ? `${size}px` : '100%',
        width: grid.options.horizontal ? `${size}px` : '100%',
        bottom: !grid.options.horizontal ? 0 : undefined,
        right: grid.options.horizontal ? 0 : undefined,
        display: !props.onLoadMore ? 'none' : undefined,
        'pointer-events': 'none'
      } satisfies JSX.CSSProperties;

      return { style, onLoadMore: props.onLoadMore };
    };

  const getExportableGridState = () => {
    const { measure, setOptions, ...rest } = grid;
    return rest;
  };

  const [state, setState] = createStore({
    ...getExportableGridState(),
    ...rest,
    get width() {
      return width();
    },
    get rowVirtualizer() {
      return rowVirtualizer;
    },
    get columnVirtualizer() {
      return columnVirtualizer;
    },
    getVirtualItem: getVirtualItem(),
    getLoadMoreTrigger: getLoadMoreTrigger()
  });

  // Update grid options
  createComputed(() => {
    grid.setOptions({
      width: width(),
      height: height(),
      ...measureOptions,
      ...nonMeasureOptions
    });
  });

  // Measure grid when options that require a measure change
  createEffect(
    on([() => ({ ...measureOptions }), width, height], () => {
      grid.measure();

      setRowVirtualizer(getRowVirtualizerOptions(grid));
      setColumnVirtualizer(getColumnVirtualizerOptions(grid));

      setState({
        ...getExportableGridState(),
        ...rest,
        getVirtualItem: getVirtualItem(),
        getLoadMoreTrigger: getLoadMoreTrigger()
      });
    })
  );

  // Handle scrollRef resize
  onMount(() => {
    createResizeObserver(props.scrollRef, ({ width, height }, el) => {
      if (el === props.scrollRef() || !observeGridSize(props)) {
        setWidth(width);
        setHeight(height);
      }
    });
  });

  return state;
};
