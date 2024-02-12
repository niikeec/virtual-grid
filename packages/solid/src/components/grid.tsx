import {
  Accessor,
  createEffect,
  createMemo,
  For,
  JSX,
  on,
  Show
} from 'solid-js';

import { createVirtualizer, type createGrid } from '..';
import { createScrollMargin } from '../createScrollMargin';
import { LoadMoreTrigger } from './load-more-trigger';

export interface GridProps {
  grid: ReturnType<typeof createGrid>;
  children: (index: Accessor<number>) => JSX.Element;
}

export const Grid = (props: GridProps) => {
  let ref!: HTMLDivElement;

  const { scrollMargin } = createScrollMargin({
    scrollRef: props.grid.scrollRef,
    gridRef: () => ref
  });

  const rowVirtualizer = createVirtualizer({
    ...props.grid.rowVirtualizer,
    get count() {
      return props.grid.rowVirtualizer.count;
    },
    get paddingStart() {
      return props.grid.rowVirtualizer.paddingStart;
    },
    get paddingEnd() {
      return props.grid.rowVirtualizer.paddingEnd;
    },
    get overscan() {
      return props.grid.overscan;
    },
    get scrollMargin() {
      return scrollMargin.top;
    }
  });

  const columnVirtualizer = createVirtualizer({
    ...props.grid.columnVirtualizer,
    get count() {
      return props.grid.columnVirtualizer.count;
    },
    get paddingStart() {
      return props.grid.columnVirtualizer.paddingStart;
    },
    get paddingEnd() {
      return props.grid.columnVirtualizer.paddingEnd;
    },
    get overscan() {
      return props.grid.overscan;
    },
    get scrollMargin() {
      return scrollMargin.left;
    }
  });

  // Measure rows when virtualItemHeight changes
  createEffect(
    on(
      () => props.grid.virtualItemHeight,
      () => rowVirtualizer.measure()
    )
  );

  // Measure columns when virtualItemWidth changes
  createEffect(
    on(
      () => props.grid.virtualItemWidth,
      () => columnVirtualizer.measure()
    )
  );

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: `${columnVirtualizer.getTotalSize()}px`,
        height: `${rowVirtualizer.getTotalSize()}px`
      }}
    >
      <For each={rowVirtualizer.getVirtualItems()}>
        {(virtualRow) => (
          <For each={columnVirtualizer.getVirtualItems()}>
            {(virtualColumn) => {
              const item = createMemo(() =>
                props.grid.getVirtualItem({
                  row: virtualRow,
                  column: virtualColumn,
                  scrollMargin: scrollMargin
                })
              );

              return (
                <Show when={item()}>
                  {(item) => (
                    <div style={item().style}>
                      {props.children(() => item().index)}
                    </div>
                  )}
                </Show>
              );
            }}
          </For>
        )}
      </For>

      <LoadMoreTrigger
        {...props.grid.getLoadMoreTrigger({
          virtualizer: props.grid.options.horizontal
            ? columnVirtualizer
            : rowVirtualizer
        })}
      />
    </div>
  );
};
