import React from 'react';
import { Virtualizer } from '@tanstack/react-virtual';
import { useDeepCompareMemo } from 'use-deep-compare';
import useResizeObserver from 'use-resize-observer';

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

import { LoadMoreTriggerProps } from './components';

export type UseGridProps<
  IdT extends Core.GridItemId = Core.GridItemId,
  DataT extends Core.GridItemData = Core.GridItemData
> = GridProps<IdT, DataT> & { scrollRef: React.RefObject<HTMLElement> };

export const useGrid = <
  IdT extends Core.GridItemId,
  DataT extends Core.GridItemData
>(
  props: UseGridProps<IdT, DataT>
) => {
  const { scrollRef, overscan, onLoadMore, loadMoreSize, ...options } = props;
  const { getItemId, getItemData, invert, ...measureOptions } = options;

  const rerender = React.useReducer(() => ({}), {})[1];

  const [gridWidth, setGridWidth] = React.useState(0);
  const [gridHeight, setGridHeight] = React.useState(0);

  const width = options.width ?? gridWidth;
  const height = options.height ?? gridHeight;

  // Initialize grid instance
  const [{ setOptions, measure, ...grid }] = React.useState(
    () => new Core.Grid({ ...options, width, height })
  );

  // Update grid options
  setOptions({ ...options, width, height });

  // Measure grid when options that require a measure change
  useDeepCompareMemo(() => {
    measure();
    rerender();
  }, [measure, rerender, measureOptions, width, height]);

  // Check if grid size should be observed
  const observeGrid = observeGridSize(props);

  // Observe grid
  useResizeObserver({
    ref: observeGrid ? scrollRef : undefined,
    round: React.useCallback((val: number) => val, []),
    onResize: ({ width, height }) => {
      width !== undefined && setGridWidth(width);
      height !== undefined && setGridHeight(height);
    }
  });

  // Measure grid before resize observer
  React.useLayoutEffect(() => {
    const node = scrollRef.current;
    if (!node || !observeGrid) return;

    // NOTE: node.clientHeight & node.clientWidth hold the same value,
    // plus, this wouldn't work for rotated elements
    const { width, height } = node.getBoundingClientRect();

    const {
      borderLeftWidth,
      borderRightWidth,
      borderTopWidth,
      borderBottomWidth
    } = getComputedStyle(node);

    const borderX = parseFloat(borderLeftWidth) + parseFloat(borderRightWidth);
    const borderY = parseFloat(borderTopWidth) + parseFloat(borderBottomWidth);

    // Remove border from width/height so we have the un-rounded client width/height
    setGridWidth(width - borderX);
    setGridHeight(height - borderY);
  }, [scrollRef, observeGrid]);

  const rowVirtualizer = {
    ...getRowVirtualizerOptions(grid),
    getScrollElement: () => scrollRef.current,
    overscan: overscan
  } satisfies PartialVirtualizerOptions;

  const columnVirtualizer = {
    ...getColumnVirtualizerOptions(grid),
    getScrollElement: () => scrollRef.current,
    overscan: overscan
  } satisfies PartialVirtualizerOptions;

  const getVirtualItem = (props: GetVirtualItemProps) => {
    const index = getVirtualItemIndex(grid, props);
    if (!grid.isIndexValid(index)) return;

    const { size, padding, translate } = getVirtualItemStyle(grid, props);

    const style = {
      position: 'absolute',
      top: '0px',
      left: !grid.rtl ? '0px' : 'auto',
      right: grid.rtl ? '0px' : 'auto',
      width: size.width !== undefined ? `${size.width}px` : '100%',
      height: size.height !== undefined ? `${size.height}px` : '100%',
      transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
      paddingLeft: `${padding.left}px`,
      paddingRight: `${padding.right}px`,
      paddingTop: `${padding.top}px`,
      paddingBottom: `${padding.bottom}px`,
      boxSizing: 'border-box'
    } satisfies React.CSSProperties;

    return { index, style };
  };

  const getLoadMoreTrigger = ({
    virtualizer
  }: {
    virtualizer?: Virtualizer<HTMLElement, Element>;
  } = {}) => {
    const position = grid.options.horizontal
      ? grid.options.rtl
        ? 'left'
        : 'right'
      : 'bottom';

    const getSize = grid.options.horizontal
      ? getLoadMoreTriggerWidth
      : getLoadMoreTriggerHeight;

    const size = virtualizer
      ? getSize({ ...grid, virtualizer, size: loadMoreSize })
      : loadMoreSize;

    return { position, size, onLoadMore } satisfies LoadMoreTriggerProps;
  };

  return {
    ...grid,
    scrollRef,
    rowVirtualizer,
    columnVirtualizer,
    getVirtualItem,
    getLoadMoreTrigger
  };
};
