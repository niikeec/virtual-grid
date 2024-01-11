import { createEffect, createMemo, For, on, Show } from 'solid-js';

import { createGrid, createVirtualizer } from '@virtual-grid/solid';

export const HeadlessGridAutoColumns = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 100,
    columns: 'auto',
    size: 100
  });

  const rowVirtualizer = createVirtualizer({
    ...grid.rowVirtualizer,
    get count() {
      return grid.rowVirtualizer.count;
    }
  });

  const columnVirtualizer = createVirtualizer({
    ...grid.columnVirtualizer,
    get count() {
      return grid.columnVirtualizer.count;
    }
  });

  createEffect(
    on(
      () => grid.virtualItemWidth,
      () => columnVirtualizer.measure()
    )
  );

  return (
    <div
      ref={parentRef}
      style={{ height: '400px', overflow: 'auto' }}
      class="list"
    >
      <div
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
                  grid.getVirtualItem({
                    row: virtualRow,
                    column: virtualColumn
                  })
                );

                return (
                  <Show when={item()}>
                    {(item) => (
                      <div style={item().style}>
                        <div
                          class={!(item().index % 2) ? 'item-even' : 'item-odd'}
                        >
                          {item().index}
                        </div>
                      </div>
                    )}
                  </Show>
                );
              }}
            </For>
          )}
        </For>
      </div>
    </div>
  );
};
