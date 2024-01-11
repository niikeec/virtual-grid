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

export const App = () => {
  const isDev = import.meta.env.DEV;

  return (
    <>
      <Section name="List">
        <ListWithComponent />
        {isDev && <HeadlessList />}
      </Section>

      <Section name="Columns">
        <ColumnsWithComponent />
        {isDev && <HeadlessColumns />}
      </Section>

      <Section name="Grid">
        <GridWithComponent />
        {isDev && <HeadlessGrid />}
      </Section>

      <Section name="Grid Columns">
        <GridColumnsWithComponent />
        {isDev && <HeadlessGridColumns />}
      </Section>

      <Section name="Grid Rows">
        <GridRowsWithComponent />
        {isDev && <HeadlessGridRows />}
      </Section>

      <Section name="Grid Auto">
        <GridAutoColumnsWithComponent />
        {isDev && <HeadlessGridAutoColumns />}
      </Section>
    </>
  );
};
