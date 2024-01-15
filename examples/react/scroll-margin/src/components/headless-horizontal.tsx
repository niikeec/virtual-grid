import React from 'react';

import { useGrid, useScrollMargin, useVirtualizer } from '@virtual-grid/react';

export const HeadlessHorizontal = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: scrollRef,
    count: 1000,
    size: { width: 100 },
    horizontal: true
  });

  const { scrollMargin } = useScrollMargin({ scrollRef, gridRef });

  const virtualizer = useVirtualizer({
    ...grid.columnVirtualizer,
    scrollMargin: scrollMargin.left
  });

  return (
    <div
      ref={scrollRef}
      style={{ height: '400px', overflow: 'auto', display: 'flex' }}
      className="list"
    >
      <div style={{ height: '100%', width: '200px', flexShrink: 0 }} />
      <div
        ref={gridRef}
        style={{
          position: 'relative',
          width: `${virtualizer.getTotalSize()}px`,
          height: `100%`,
          flexShrink: 0
        }}
      >
        {virtualizer.getVirtualItems().map((column) => {
          const item = grid.getVirtualItem({ column, scrollMargin });
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
