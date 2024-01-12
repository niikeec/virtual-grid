import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HorizontalHeadless } from './components/horizontal/headless';
import { HorizontalWithComponent } from './components/horizontal/with-component';
import { Section } from './components/section';
import { VerticalHeadless } from './components/vertical/headless';
import { VerticalWithComponent } from './components/vertical/with-component';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Section name="Vertical">
        <VerticalWithComponent />
        <VerticalHeadless />
      </Section>

      <Section name="Horizontal">
        <HorizontalWithComponent />
        <HorizontalHeadless />
      </Section>
    </QueryClientProvider>
  );
};
