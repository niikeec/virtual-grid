import { Code } from '../ui/code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { headless } from './headless';
import { withComponent } from './with-component';

type UsageTypes = 'component' | 'headless';

const codeBlocks: Record<UsageTypes, string> = {
  component: withComponent,
  headless: headless
};

export const Usage = () => {
  return (
    <div className="mt-10 w-full max-w-screen-sm sm:mt-20">
      <Tabs defaultValue="component" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="component" className="w-full">
            Component
          </TabsTrigger>
          <TabsTrigger value="headless" className="w-full">
            Headless
          </TabsTrigger>
        </TabsList>
        <TabsContent value="component">
          <Code code={codeBlocks.component} />
        </TabsContent>
        <TabsContent value="headless">
          <Code code={codeBlocks.headless} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
