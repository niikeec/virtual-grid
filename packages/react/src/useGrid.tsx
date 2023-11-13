import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { type useVirtualizer } from '@tanstack/react-virtual';
import useResizeObserver from 'use-resize-observer';

import * as Core from '@virtual-grid/core';

type VirtualizerOptions = Parameters<typeof useVirtualizer>[0];

export type UseGridProps<IdT extends Core.GridItemId, DataT extends Core.GridItemData> = (
  | Core.BaseGridProps<IdT, DataT>
  | Core.AutoColumnsGridProps<IdT, DataT>
  | Core.HorizontalGridProps<IdT, DataT>
) & {
  /**
   * Reference to scrollable element.
   */
  scrollRef: RefObject<Element>;
  /**
   * Row virtualizer options.
   */
  rowVirtualizer?: Partial<VirtualizerOptions>;
  /**
   * Column virtualizer options.
   */
  columnVirtualizer?: Partial<VirtualizerOptions>;
  /**
   * Renders an area which triggers `onLoadMore` when scrolled into view.
   */
  onLoadMore?: () => void;
  /**
   * Set the size of the load more area.
   */
  loadMoreSize?: number;
  /**
   * The number of items to render beyond the visible area.
   */
  overscan?: number;
};

export const useGrid = <IdT extends Core.GridItemId, DataT extends Core.GridItemData>({
  scrollRef,
  overscan,
  ...props
}: UseGridProps<IdT, DataT>) => {
  const [width, setWidth] = useState(0);

  const staticWidth = useRef<number | null>(null);

  const grid = Core.grid({ width, ...props });

  const rowVirtualizer: VirtualizerOptions = {
    ...props.rowVirtualizer,
    count: grid.totalRowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: grid.getItemHeight,
    paddingStart: grid.padding.top,
    paddingEnd: grid.padding.bottom,
    overscan: overscan ?? props.rowVirtualizer?.overscan
  };

  const columnVirtualizer: VirtualizerOptions = {
    ...props.columnVirtualizer,
    horizontal: true,
    count: grid.totalColumnCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: grid.getItemWidth,
    paddingStart: grid.padding.left,
    paddingEnd: grid.padding.right,
    overscan: overscan ?? props.columnVirtualizer?.overscan
  };

  const isStatic = useCallback(() => {
    return (
      props.width !== undefined ||
      props.horizontal ||
      props.columns === 0 ||
      (props.columns === 'auto'
        ? !props.size || (typeof props.size === 'object' && !props.size.width)
        : (props.columns === undefined || props.columns) &&
          ((typeof props.size === 'object' && props.size.width) || typeof props.size === 'number'))
    );
  }, [props.columns, props.horizontal, props.size, props.width]);

  useResizeObserver({
    ref: scrollRef,
    onResize: ({ width }) => {
      if (width === undefined || isStatic()) {
        if (width !== undefined) staticWidth.current = width;
        return;
      }
      setWidth(width);
    }
  });

  useEffect(() => {
    if (staticWidth.current === null || width === staticWidth.current || isStatic()) return;
    setWidth(staticWidth.current);
    staticWidth.current = null;
  }, [isStatic, width]);

  return {
    ...grid,
    scrollRef: scrollRef,
    onLoadMore: props.onLoadMore,
    loadMoreSize: props.loadMoreSize,
    virtualizer: {
      rowVirtualizer: rowVirtualizer,
      columnVirtualizer: columnVirtualizer
    }
  };
};
