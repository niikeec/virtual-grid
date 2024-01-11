import { createGrid, Grid } from '@virtual-grid/solid';

export const GridRowsWithComponent = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 1000,
    rows: 3,
    horizontal: true
  });

  return (
    <div
      ref={parentRef}
      style={{ height: '400px', overflow: 'auto' }}
      class="list"
    >
      <Grid grid={grid}>
        {(index) => (
          <div class={index % 2 === 0 ? 'item-even' : 'item-odd'}>{index}</div>
        )}
      </Grid>
    </div>
  );
};
