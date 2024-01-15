import * as React from 'react';

import { useGrid, useVirtualizer } from '@virtual-grid/react';

export const HeadlessList = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: 1000,
    size: { height: 100 }
  });

  const rowVirtualizer = useVirtualizer(grid.rowVirtualizer);

  return (
    <div
      ref={ref}
      style={{ height: '400px', overflow: 'auto' }}
      className="list"
    >
      <div
        style={{
          position: 'relative',
          width: `100%`,
          height: `${rowVirtualizer.getTotalSize()}px`
        }}
      >
        {rowVirtualizer.getVirtualItems().map((row) => {
          const item = grid.getVirtualItem({ row });
          if (!item) return null;

          return (
            <div key={row.key} style={item.style}>
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
