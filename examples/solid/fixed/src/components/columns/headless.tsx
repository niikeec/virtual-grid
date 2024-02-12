import { createMemo, For, Show } from 'solid-js';

import { createGrid, createVirtualizer } from '@virtual-grid/solid';

export const HeadlessColumns = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 1000,
    size: { width: 100 },
    horizontal: true
  });

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
          height: `100%`
        }}
      >
        <For each={columnVirtualizer.getVirtualItems()}>
          {(column) => {
            const item = createMemo(() => grid.getVirtualItem({ column }));

            return (
              <Show when={item()}>
                {(item) => (
                  <div style={item().style}>
                    <div class={!(item().index % 2) ? 'item-even' : 'item-odd'}>
                      {item().index}
                    </div>
                  </div>
                )}
              </Show>
            );
          }}
        </For>
      </div>
    </div>
  );
};
