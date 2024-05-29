import React from 'react';

import { LoadMoreTrigger, useVirtualizer, type useGrid } from '..';
import { useScrollMargin } from '../useScrollMargin';

export interface GridProps {
  grid: ReturnType<typeof useGrid>;
  children: (index: number) => React.ReactNode;
}

export const Grid = ({ grid, children }: GridProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollMargin } = useScrollMargin({
    scrollRef: grid.scrollRef,
    gridRef: ref
  });

  const rowVirtualizer = useVirtualizer({
    ...grid.rowVirtualizer,
    scrollMargin: scrollMargin.top
  });

  const columnVirtualizer = useVirtualizer({
    ...grid.columnVirtualizer,
    scrollMargin: scrollMargin.left
  });

  React.useEffect(() => {
    rowVirtualizer.measure();
  }, [rowVirtualizer, grid.virtualItemHeight]);

  React.useEffect(() => {
    columnVirtualizer.measure();
  }, [columnVirtualizer, grid.virtualItemWidth]);

  return (
    <div
      ref={ref}
      dir={grid.options.rtl ? 'rtl' : 'ltr'}
      style={{
        position: 'relative',
        width: `${columnVirtualizer.getTotalSize()}px`,
        height: `${rowVirtualizer.getTotalSize()}px`
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
        <React.Fragment key={virtualRow.key}>
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
            const virtualItem = grid.getVirtualItem({
              row: virtualRow,
              column: virtualColumn,
              scrollMargin: scrollMargin
            });

            if (!virtualItem) return null;

            return (
              <div key={virtualColumn.key} style={virtualItem.style}>
                {children(virtualItem.index)}
              </div>
            );
          })}
        </React.Fragment>
      ))}

      <LoadMoreTrigger
        {...grid.getLoadMoreTrigger({
          virtualizer: grid.options.horizontal
            ? columnVirtualizer
            : rowVirtualizer
        })}
      />
    </div>
  );
};
