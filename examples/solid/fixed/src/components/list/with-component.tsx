import { createGrid, Grid } from '@virtual-grid/solid';

export const ListWithComponent = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 100,
    size: { height: 100 }
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
