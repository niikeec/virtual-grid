import { createGrid, Grid } from '@virtual-grid/solid';

export const ColumnsWithComponent = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 1000,
    size: { width: 100 },
    horizontal: true
  });

  return (
    <div
      ref={parentRef}
      style={{ height: '400px', overflow: 'auto', display: 'flex' }}
      class="list"
    >
      <Grid grid={grid}>
        {(index) => (
          <div class={index % 2 === 0 ? 'item-even' : 'item-odd'}>{index}</div>
        )}
      </Grid>
      <div style={{ width: '500px', height: '400px', 'flex-shrink': 0 }}></div>
    </div>
  );
};
