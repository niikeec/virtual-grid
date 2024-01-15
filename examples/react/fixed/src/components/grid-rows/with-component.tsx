import React from 'react';

import { Grid, useGrid } from '@virtual-grid/react';

export const GridRowsWithComponent = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: 1000,
    rows: 3,
    horizontal: true
  });

  return (
    <div
      ref={ref}
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
