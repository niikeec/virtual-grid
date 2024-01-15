import { HeadlessHorizontal } from './components/headless-horizontal';
import { HeadlessVertical } from './components/headless-vertical';
import { Section } from './components/section';

function App() {
  return (
    <>
      <Section name="Vertical">
        <HeadlessVertical />
      </Section>

      <Section name="Horizontal">
        <HeadlessHorizontal />
      </Section>
    </>
  );
}

export default App;
