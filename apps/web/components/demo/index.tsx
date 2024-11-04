import { useRef } from 'react';

import { Grid, useGrid } from '@virtual-grid/react';

import { ControlsDesktop } from '../controls/controls-desktop';
import { ControlsMobile } from '../controls/controls-mobile';
import { useControls } from '../controls/controls.params';
import { Window } from './window';

export const Demo = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { controls } = useControls();

  const grid = useGrid({
    scrollRef: ref,
    count: controls.count,
    ...(controls.columns
      ? {
          columns: controls.columnsCount,
          ...(controls.size && {
            size: {
              width: controls.sizeWidth || undefined,
              height: controls.sizeHeight || undefined
            }
          })
        }
      : controls.size
        ? {
            columns: 'auto',
            size: {
              width: controls.sizeWidth,
              height: controls.sizeHeight
            }
          }
        : {}),
    padding: controls.padding,
    gap: controls.gap
  });

  return (
    <>
      <Window>
        <ControlsDesktop />
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

      <ControlsMobile />
    </>
  );
};
