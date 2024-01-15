import React from 'react';

import { Grid, useGrid } from '@virtual-grid/react';

export const ColumnsWithComponent = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: parentRef,
    count: 1000,
    size: { width: 100 },
    horizontal: true
  });

  return (
    <div
      ref={parentRef}
      style={{ height: '400px', overflow: 'auto' }}
      className="list"
    >
      <Grid grid={grid}>
        {(index) => (
          <div className={index % 2 === 0 ? 'item-even' : 'item-odd'}>
            {index}
          </div>
        )}
      </Grid>
    </div>
  );
};
