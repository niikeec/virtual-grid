import React from 'react';

import { useGrid, useScrollMargin, useVirtualizer } from '@virtual-grid/react';

export const HeadlessVertical = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: scrollRef,
    count: 1000,
    size: { height: 100 }
  });

  const { scrollMargin } = useScrollMargin({ scrollRef, gridRef });

  const virtualizer = useVirtualizer({
    ...grid.rowVirtualizer,
    scrollMargin: scrollMargin.top
  });

  return (
    <div
      ref={scrollRef}
      style={{ height: '400px', overflow: 'auto' }}
      className="list"
    >
      <div style={{ width: '100%', height: '200px' }} />
      <div
        ref={gridRef}
        style={{
          position: 'relative',
          width: `100%`,
          height: `${virtualizer.getTotalSize()}px`
        }}
      >
        {virtualizer.getVirtualItems().map((row) => {
          const item = grid.getVirtualItem({ row, scrollMargin });
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
