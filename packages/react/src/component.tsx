import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInView } from 'react-intersection-observer';

import type { useGrid } from '.';

export interface GridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  grid: ReturnType<typeof useGrid>;
  children: (index: number) => React.ReactNode;
}

export const Grid = ({ grid, children, ...props }: GridProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [offset, setOffset] = React.useState(0);

  const { ref: loadMoreRef, inView } = useInView();

  const rowVirtualizer = useVirtualizer({
    ...grid.virtualizer.rowVirtualizer,
    scrollMargin: offset
  });

  const columnVirtualizer = useVirtualizer(grid.virtualizer.columnVirtualizer);

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  const width = columnVirtualizer.getTotalSize();
  const height = rowVirtualizer.getTotalSize();

  const internalWidth = width - (grid.padding.left + grid.padding.right);
  const internalHeight = height - (grid.padding.top + grid.padding.bottom);

  const loadMoreTriggerHeight = React.useMemo(() => {
    if (!grid.onLoadMore || !grid.rowCount || !grid.totalRowCount) return;

    if (grid.totalRowCount === grid.rowCount) return grid.loadMoreHeight;

    const lastRowTop = grid.getItemRect(grid.rowCount * grid.columnCount).top;
    if (!lastRowTop) return;

    let loadMoreHeight = grid.loadMoreHeight ?? 0;

    if (!loadMoreHeight && rowVirtualizer.scrollElement) {
      const offset = Math.max(0, rowVirtualizer.options.scrollMargin - rowVirtualizer.scrollOffset);
      loadMoreHeight = Math.max(0, rowVirtualizer.scrollElement.clientHeight - offset);
    }

    const triggerHeight = height - lastRowTop + loadMoreHeight;

    return Math.min(height, triggerHeight);
  }, [
    grid,
    rowVirtualizer.scrollElement,
    rowVirtualizer.options.scrollMargin,
    rowVirtualizer.scrollOffset,
    height
  ]);

  React.useEffect(() => {
    rowVirtualizer.measure();
  }, [rowVirtualizer, grid.virtualItemSize.height]);

  React.useEffect(() => {
    columnVirtualizer.measure();
  }, [columnVirtualizer, grid.virtualItemSize.width]);

  React.useEffect(() => {
    inView && grid.onLoadMore?.();
  }, [grid, inView]);

  React.useEffect(() => {
    const element = grid.scrollRef.current;
    if (!element) return;

    const observer = new MutationObserver(() => setOffset(ref.current?.offsetTop ?? 0));

    observer.observe(element, {
      childList: true
    });

    return () => observer.disconnect();
  }, [grid.scrollRef]);

  React.useLayoutEffect(() => setOffset(ref.current?.offsetTop ?? 0), []);

  return (
    <div
      {...props}
      ref={ref}
      style={{
        ...props.style,
        position: 'relative',
        width: width,
        height: height
      }}
    >
      {internalWidth <= 0 || internalHeight <= 0 ? null : (
        <>
          <div
            ref={loadMoreRef}
            style={{
              position: 'absolute',
              height: loadMoreTriggerHeight,
              width: '100%',
              top: grid.invert ? 0 : undefined,
              bottom: !grid.invert ? 0 : undefined,
              display: !grid.onLoadMore ? 'none' : undefined
            }}
          />

          {virtualRows.map((virtualRow) => (
            <React.Fragment key={virtualRow.index}>
              {virtualColumns.map((virtualColumn) => {
                let index = virtualRow.index * grid.columnCount + virtualColumn.index;

                if (grid.invert) index = grid.count - 1 - index;

                if (index >= grid.count || index < 0) return null;

                return (
                  <div
                    key={virtualColumn.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: `${virtualColumn.size}px`,
                      height: `${virtualRow.size}px`,
                      transform: `translateX(${virtualColumn.start}px) translateY(${
                        virtualRow.start - rowVirtualizer.options.scrollMargin
                      }px)`,
                      paddingLeft: virtualColumn.index !== 0 ? grid.gap.x : 0,
                      paddingTop: virtualRow.index !== 0 ? grid.gap.y : 0
                    }}
                  >
                    <div
                      style={{
                        margin: 'auto',
                        width: grid.itemSize.width ?? '100%',
                        height: grid.itemSize.height ?? '100%'
                      }}
                    >
                      {children(index)}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};
