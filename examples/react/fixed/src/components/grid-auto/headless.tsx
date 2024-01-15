import React from 'react';

import { useGrid, useVirtualizer } from '@virtual-grid/react';

export const HeadlessGridAutoColumns = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: 1000,
    columns: 'auto',
    size: 100
  });

  const rowVirtualizer = useVirtualizer(grid.rowVirtualizer);
  const columnVirtualizer = useVirtualizer(grid.columnVirtualizer);

  React.useEffect(() => {
    columnVirtualizer.measure();
  }, [columnVirtualizer, grid.virtualItemWidth]);

  return (
    <div
      ref={ref}
      style={{ height: '400px', overflow: 'auto' }}
      className="list"
    >
      <div
        style={{
          position: 'relative',
          width: `${columnVirtualizer.getTotalSize()}px`,
          height: `${rowVirtualizer.getTotalSize()}px`
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <React.Fragment key={virtualRow.key}>
            {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
              const item = grid.getVirtualItem({
                row: virtualRow,
                column: virtualColumn
              });

              if (!item) return null;

              return (
                <div key={virtualColumn.key} style={item.style}>
                  <div
                    className={item.index % 2 === 0 ? 'item-even' : 'item-odd'}
                  >
                    {item.index}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
