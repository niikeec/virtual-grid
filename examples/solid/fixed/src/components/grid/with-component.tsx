import { createGrid, Grid } from '@virtual-grid/solid';

export const GridWithComponent = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 1000,
    size: 100,
    columns: 100
  });

  return (
    <div
      ref={parentRef}
      style={{ height: '400px', overflow: 'auto' }}
      class="list"
    >
      <Grid grid={grid}>
        {(index) => (
          <div class={index() % 2 === 0 ? 'item-even' : 'item-odd'}>
            {index()}
          </div>
        )}
      </Grid>
    </div>
  );
};
