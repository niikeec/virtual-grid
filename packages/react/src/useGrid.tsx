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
  const { getItemId, getItemData, invert, debug, ...measureOptions } = options;

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  // Initialize grid instance
  const [{ setOptions, measure, ...grid }] = React.useState(
    () => new Core.Grid({ width, height, ...options })
  );

  // Update grid options
  setOptions({ width, height, ...options });

  // Measure grid when options that require a measure change
  useDeepCompareMemo(measure, [measure, measureOptions, width, height]);

  // Check if grid size should be observed
  const observeGrid = observeGridSize(props);

  // Observe grid
  useResizeObserver({
    ref: observeGrid ? scrollRef : undefined,
    round: React.useCallback((val: number) => val, []),
    onResize: ({ width, height }) => {
      width !== undefined && setWidth(width);
      height !== undefined && setHeight(height);
    }
  });

  // Measure grid before resize observer
  React.useLayoutEffect(() => {
    const node = scrollRef.current;
    if (!node || !observeGrid) return;

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
    setWidth(width - borderX);
    setHeight(height - borderY);
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
      left: '0px',
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
    virtualizer: Virtualizer<HTMLElement, Element>;
  }) => {
    const getSize = grid.options.horizontal
      ? getLoadMoreTriggerWidth
      : getLoadMoreTriggerHeight;

    const size = onLoadMore
      ? getSize({ ...grid, virtualizer, size: loadMoreSize })
      : undefined;

    const style = {
      background: options.debug ? 'red' : undefined,
      opacity: options.debug ? 0.5 : undefined,
      position: 'absolute',
      height: !grid.options.horizontal ? `${size}px` : '100%',
      width: grid.options.horizontal ? `${size}px` : '100%',
      bottom: !grid.options.horizontal ? 0 : undefined,
      right: grid.options.horizontal ? 0 : undefined,
      display: !onLoadMore ? 'none' : undefined,
      pointerEvents: 'none'
    } satisfies React.CSSProperties;

    return { style, onLoadMore };
  };

  return {
    ...grid,
    scrollRef,
    onLoadMore,
    loadMoreSize,
    getVirtualItem,
    rowVirtualizer,
    columnVirtualizer,
    getLoadMoreTrigger
  };
};
