import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { LoadMoreTrigger, useGrid, useVirtualizer } from '@virtual-grid/react';

import { fetchServerPage } from '../../util/fetch';

export const GridHeadless = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['grid-headless'],
      queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
      getNextPageParam: (_lastGroup, groups) => groups.length,
      initialPageParam: 0
    });

  const items = data ? data.pages.flatMap(({ data }) => data) : [];

  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: items.length,
    columns: 3,
    onLoadMore: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  });
  const rowVirtualizer = useVirtualizer(grid.rowVirtualizer);
  const columnVirtualizer = useVirtualizer(grid.columnVirtualizer);

  React.useEffect(() => {
    rowVirtualizer.measure();
  }, [rowVirtualizer, grid.virtualItemHeight]);

  React.useEffect(() => {
    columnVirtualizer.measure();
  }, [columnVirtualizer, grid.virtualItemWidth]);

  return (
    <div
      ref={ref}
      style={{ height: '400px', overflow: 'auto' }}
      className="list"
    >
      <div
        style={{
          position: 'relative',
          width: `${columnVirtualizer.getTotalSize()}px`,
          height: `${rowVirtualizer.getTotalSize()}px`
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <React.Fragment key={virtualRow.key}>
            {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
              const item = grid.getVirtualItem({
                row: virtualRow,
                column: virtualColumn
              });

              if (!item) return null;

              return (
                <div key={virtualColumn.key} style={item.style}>
                  <div
                    className={item.index % 2 === 0 ? 'item-even' : 'item-odd'}
                  >
                    {item.index}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}

        <LoadMoreTrigger {...grid.getLoadMoreTrigger()} />
      </div>
    </div>
  );
};
