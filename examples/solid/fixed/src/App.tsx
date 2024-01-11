import { Show } from 'solid-js';
import { isDev } from 'solid-js/web';

import { HeadlessColumns } from './components/columns/headless';
import { ColumnsWithComponent } from './components/columns/with-component';
import { HeadlessGridAutoColumns } from './components/grid-auto/headless';
import { GridAutoColumnsWithComponent } from './components/grid-auto/with-component';
import { HeadlessGridColumns } from './components/grid-columns/headless';
import { GridColumnsWithComponent } from './components/grid-columns/with-component';
import { HeadlessGridRows } from './components/grid-rows/headless';
import { GridRowsWithComponent } from './components/grid-rows/with-component';
import { HeadlessGrid } from './components/grid/headless';
import { GridWithComponent } from './components/grid/with-component';
import { HeadlessList } from './components/list/headless';
import { ListWithComponent } from './components/list/with-component';
import { Section } from './components/section';

function App() {
  return (
    <>
      <Section name="List">
        <ListWithComponent />
        <Show when={isDev}>
          <HeadlessList />
        </Show>
      </Section>

      <Section name="Columns">
        <ColumnsWithComponent />
        <Show when={isDev}>
          <HeadlessColumns />
        </Show>
      </Section>

      <Section name="Grid">
        <GridWithComponent />
        <Show when={isDev}>
          <HeadlessGrid />
        </Show>
      </Section>

      <Section name="Grid Columns">
        <GridColumnsWithComponent />
        <Show when={isDev}>
          <HeadlessGridColumns />
        </Show>
      </Section>

      <Section name="Grid Rows">
        <GridRowsWithComponent />
        <Show when={isDev}>
          <HeadlessGridRows />
        </Show>
      </Section>

      <Section name="Grid Auto">
        <GridAutoColumnsWithComponent />
        <Show when={isDev}>
          <HeadlessGridAutoColumns />
        </Show>
      </Section>
    </>
  );
}

export default App;
