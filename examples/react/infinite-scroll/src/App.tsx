import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ColumnsHeadless } from './components/columns/headless';
import { ColumnsWithComponent } from './components/columns/with-component';
import { GridHeadless } from './components/grid/headless';
import { GridWithComponent } from './components/grid/with-component';
import { RowsHeadless } from './components/rows/headless';
import { RowsWithComponent } from './components/rows/with-component';
import { Section } from './components/section';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Section name="Rows">
        <RowsWithComponent />
        <RowsHeadless />
      </Section>

      <Section name="Columns">
        <ColumnsWithComponent />
        <ColumnsHeadless />
      </Section>

      <Section name="Grid">
        <GridWithComponent />
        <GridHeadless />
      </Section>
    </QueryClientProvider>
  );
};
