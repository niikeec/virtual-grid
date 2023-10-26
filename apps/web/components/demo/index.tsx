import { useRef, useState } from 'react';

import { Grid, useGrid } from '@virtual-grid/react';

import { Controls, defaults } from './controls';
import { Window } from './window';

export const Demo = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [controls, setControls] = useState(defaults);

  const grid = useGrid({
    scrollRef: ref,
    count: controls.count,
    ...(controls.size.enabled && {
      size: { width: controls.size.width, height: controls.size.height },
      columns: controls.columns.enabled ? controls.columns.count : undefined
    }),
    ...(controls.columns.enabled ? { columns: controls.columns.count } : { columns: 0 }),
    padding: controls.padding,
    gap: controls.gap
  });

  return (
    <Window>
      <Controls controls={controls} onChange={setControls} />

      <div ref={ref} className="h-full overflow-auto">
        <Grid grid={grid}>
          {(index) => (
            <div
              key={index}
              className="border-border/80 bg-accent h-full w-full rounded-lg border"
            />
          )}
        </Grid>
      </div>
    </Window>
  );
};
