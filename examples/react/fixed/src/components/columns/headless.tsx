import * as React from 'react';

import { useGrid, useVirtualizer } from '@virtual-grid/react';

export const HeadlessColumns = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: 1000,
    size: { width: 100 },
    horizontal: true
  });

  const columnVirtualizer = useVirtualizer(grid.columnVirtualizer);

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
          height: `100%`
        }}
      >
        {columnVirtualizer.getVirtualItems().map((column) => {
          const item = grid.getVirtualItem({ column });
          if (!item) return null;

          return (
            <div key={column.key} style={item.style}>
              <div className={!(item.index % 2) ? 'item-even' : 'item-odd'}>
                {item.index}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
