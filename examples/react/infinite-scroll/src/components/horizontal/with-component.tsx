import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Grid, useGrid } from '@virtual-grid/react';

import { fetchServerPage } from '../../util/fetch';

export const HorizontalWithComponent = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['horizontal-with-component'],
      queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
      getNextPageParam: (_lastGroup, groups) => groups.length,
      initialPageParam: 0
    });

  const columns = data ? data.pages.flatMap(({ data }) => data) : [];

  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: columns.length,
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
};
