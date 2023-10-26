## @virtual-grid/react

Virtualized grid powered by [@tanstack/virtual](https://tanstack.com/virtual/v3)

[Demo]() - [Docs]()

## Installation

```
npm install @virtual-grid/react

```

## Usage

Example with the provided `<Grid />` component:

```typescript
import * as React from 'react';
import { Grid, useGrid } from '@virtual-grid/react';

const App = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: 1000,
    size: 120
    // ...
  });

  return (
    <div ref={ref} style={{ height: '400px', overflow: 'auto' }}>
      <Grid grid={grid}>{(i) => <div key={i}>...</div>}</Grid>
    </div>
  );
};
```

For a headless solution check out the example in the [docs]().

## License

MIT
