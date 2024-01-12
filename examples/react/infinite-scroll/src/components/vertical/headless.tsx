import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { LoadMoreTrigger, useGrid, useVirtualizer } from '@virtual-grid/react';

import { fetchServerPage } from '../../util/fetch';

export const VerticalHeadless = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['vertical-headless'],
      queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
      getNextPageParam: (_lastGroup, groups) => groups.length,
      initialPageParam: 0
    });

  const rows = data ? data.pages.flatMap(({ data }) => data) : [];

  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: rows.length,
    size: { height: 100 },
    onLoadMore: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  });

  const virtualizer = useVirtualizer(grid.rowVirtualizer);

  return (
    <div
      ref={ref}
      style={{ height: '400px', overflow: 'auto' }}
      className="list"
    >
      <div
        style={{
          position: 'relative',
          width: `100%`,
          height: `${virtualizer.getTotalSize()}px`
        }}
      >
        {virtualizer.getVirtualItems().map((row) => {
          const item = grid.getVirtualItem({ row });
          if (!item) return null;

          return (
            <div key={row.key} style={item.style}>
              <div className={!(item.index % 2) ? 'item-even' : 'item-odd'}>
                {item.index}
              </div>
            </div>
          );
        })}

        <LoadMoreTrigger {...grid.getLoadMoreTrigger()} />
      </div>
    </div>
  );
};
