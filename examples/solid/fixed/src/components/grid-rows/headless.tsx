import { createEffect, createMemo, For, on, Show } from 'solid-js';

import { createGrid, createVirtualizer } from '@virtual-grid/solid';

export const HeadlessGridRows = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 1000,
    rows: 3,
    horizontal: true
  });

  const rowVirtualizer = createVirtualizer({ ...grid.rowVirtualizer });
  const columnVirtualizer = createVirtualizer({ ...grid.columnVirtualizer });

  createEffect(
    on(
      () => grid.virtualItemHeight,
      () => rowVirtualizer.measure()
    )
  );

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
