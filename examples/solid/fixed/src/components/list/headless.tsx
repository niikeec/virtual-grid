import { createMemo, For, Show } from 'solid-js';

import { createGrid, createVirtualizer } from '@virtual-grid/solid';

export const HeadlessList = () => {
  let parentRef!: HTMLDivElement;

  const grid = createGrid({
    scrollRef: () => parentRef,
    count: 1000,
    size: { height: 100 }
  });

  const rowVirtualizer = createVirtualizer({ ...grid.rowVirtualizer });

  return (
    <div
      ref={parentRef}
      style={{ height: '400px', overflow: 'auto' }}
      class="list"
    >
      <div
        style={{
          position: 'relative',
          width: `100%`,
          height: `${rowVirtualizer.getTotalSize()}px`
        }}
      >
        <For each={rowVirtualizer.getVirtualItems()}>
          {(row) => {
            const item = createMemo(() => grid.getVirtualItem({ row }));

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
