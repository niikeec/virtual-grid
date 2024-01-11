import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery
} from '@tanstack/react-query';

import { Grid, useGrid } from '@virtual-grid/react';

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
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['vertical'],
      queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
      getNextPageParam: (_lastGroup, groups) => groups.length,
      initialPageParam: 0
    });

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: allRows.length,
    size: { height: 100 },
    onLoadMore: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
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
}

function Horizontal() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['horizontal'],
      queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
      getNextPageParam: (_lastGroup, groups) => groups.length,
      initialPageParam: 0
    });

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: allRows.length,
    size: { width: 100 },
    horizontal: true,
    onLoadMore: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
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
