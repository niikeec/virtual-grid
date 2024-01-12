import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { LoadMoreTrigger, useGrid, useVirtualizer } from '@virtual-grid/react';

import { fetchServerPage } from '../../util/fetch';

export const HorizontalHeadless = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['horizontal-headless'],
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

  const virtualizer = useVirtualizer(grid.columnVirtualizer);

  return (
    <div
      ref={ref}
      style={{ height: '400px', overflow: 'auto' }}
      className="list"
    >
      <div
        style={{
          position: 'relative',
          width: `${virtualizer.getTotalSize()}px`,
          height: `100%`
        }}
      >
        {virtualizer.getVirtualItems().map((column) => {
          const item = grid.getVirtualItem({ column });
          if (!item) return null;

          return (
            <div key={column.key} style={item.style}>
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
