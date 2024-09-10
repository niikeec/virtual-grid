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
    ...(controls.columns.enabled
      ? {
          columns: controls.columns.count,
          ...(controls.size.enabled && {
            size: {
              width: controls.size.width || undefined,
              height: controls.size.height || undefined
            }
          })
        }
      : controls.size.enabled
        ? {
            columns: 'auto',
            size: {
              width: controls.size.width,
              height: controls.size.height
            }
          }
        : {}),
    padding: controls.padding,
    gap: controls.gap,
    rtl: controls.rtl,
  });

  return (
    <Window>
      <Controls controls={controls} onChange={setControls} />

      <div
        ref={ref}
        className="h-full overflow-auto"
        dir={controls.rtl ? 'rtl' : 'ltr'}
      >
        <Grid grid={grid}>
          {(index) => (
            <div
              key={index}
              className="border-border/80 bg-accent flex h-full w-full items-center justify-center rounded-lg border text-gray-500"
            >
              {index + 1}
            </div>
          )}
        </Grid>
      </div>
    </Window>
  );
};
