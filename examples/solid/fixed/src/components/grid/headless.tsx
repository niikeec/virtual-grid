import { createMemo, For, Show } from 'solid-js';

import { createGrid, createVirtualizer } from '@virtual-grid/solid';

export const HeadlessGrid = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 1000,
    size: 100,
    columns: 100
  });

  const rowVirtualizer = createVirtualizer({ ...grid.rowVirtualizer });
  const columnVirtualizer = createVirtualizer({ ...grid.columnVirtualizer });

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
