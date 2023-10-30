import { useState, type RefObject } from 'react';
import { type useVirtualizer } from '@tanstack/react-virtual';
import useResizeObserver from 'use-resize-observer';

import * as Core from '@virtual-grid/core';

type VirtualizerOptions = Parameters<typeof useVirtualizer>[0];

export type UseGridProps<IdT extends Core.GridItemId, DataT extends Core.GridItemData> = (
  | Core.SizeGridProps<IdT, DataT>
  | Core.ColumnsGridProps<IdT, DataT>
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
   * Set the height of the load more area.
   */
  loadMoreHeight?: number;
};

export const useGrid = <IdT extends Core.GridItemId, DataT extends Core.GridItemData>({
  scrollRef,
  ...props
}: UseGridProps<IdT, DataT>) => {
  const [width, setWidth] = useState(0);

  const grid = Core.grid({ width, ...props });

  const rowVirtualizer: VirtualizerOptions = {
    ...props.rowVirtualizer,
    count: grid.totalRowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: grid.getItemHeight,
    paddingStart: grid.padding.top,
    paddingEnd: grid.padding.bottom
  };

  const columnVirtualizer: VirtualizerOptions = {
    ...props.columnVirtualizer,
    horizontal: true,
    count: grid.columnCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: grid.getItemWidth,
    paddingStart: grid.padding.left,
    paddingEnd: grid.padding.right
  };

  useResizeObserver({
    ref: scrollRef,
    onResize: ({ width }) => {
      if (width === undefined || props.width !== undefined || (props.size && props.columns)) return;
      setWidth(width);
    }
  });

  return {
    ...grid,
    scrollRef: scrollRef,
    onLoadMore: props.onLoadMore,
    loadMoreHeight: props.loadMoreHeight,
    virtualizer: {
      rowVirtualizer: rowVirtualizer,
      columnVirtualizer: columnVirtualizer
    }
  };
};
