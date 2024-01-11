import {
  createInfiniteQuery,
  QueryClient,
  QueryClientProvider
} from '@tanstack/solid-query';
import { createMemo } from 'solid-js';

import { createGrid, Grid } from '@virtual-grid/solid';

const queryClient = new QueryClient();

async function fetchServerPage(
  limit: number,
  offset: number = 0
): Promise<{ rows: string[]; nextOffset: number }> {
  const rows = new Array(limit)
    .fill(0)
    .map((_, i) => `Async loaded row #${i + offset * limit}`);

  await new Promise((r) => setTimeout(r, 500));

  return { rows, nextOffset: offset + 1 };
}

function Vertical() {
  const query = createInfiniteQuery(() => ({
    queryKey: ['vertical'],
    queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
    getNextPageParam: (_lastGroup, groups) => groups.length,
    initialPageParam: 0
  }));

  const allRows = createMemo(() =>
    query.data ? query.data.pages.flatMap((d) => d.rows) : []
  );

  let ref!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => ref,
    get count() {
      return allRows().length;
    },
    size: { height: 100 },
    onLoadMore: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        query.fetchNextPage();
      }
    }
  });

  return (
    <div ref={ref} style={{ height: '400px', overflow: 'auto' }} class="list">
      <Grid grid={grid}>
        {(index) => (
          <div class={index % 2 === 0 ? 'item-even' : 'item-odd'}>{index}</div>
        )}
      </Grid>
    </div>
  );
}

function Horizontal() {
  const query = createInfiniteQuery(() => ({
    queryKey: ['horizontal'],
    queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
    getNextPageParam: (_lastGroup, groups) => groups.length,
    initialPageParam: 0
  }));

  const allRows = createMemo(() =>
    query.data ? query.data.pages.flatMap((d) => d.rows) : []
  );

  let ref!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => ref,
    get count() {
      return allRows().length;
    },
    size: { width: 100 },
    horizontal: true,
    onLoadMore: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        query.fetchNextPage();
      }
    }
  });

  return (
    <div ref={ref} style={{ height: '400px', overflow: 'auto' }} class="list">
      <Grid grid={grid}>
        {(index) => (
          <div class={index % 2 === 0 ? 'item-even' : 'item-odd'}>{index}</div>
        )}
      </Grid>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Vertical />
      <Horizontal />
    </QueryClientProvider>
  );
}

export default App;
