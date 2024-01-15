## @virtual-grid/react

Simplified virtualization using [@tanstack/virtual](https://tanstack.com/virtual/v3)

[Demo](https://www.virtual-grid.com/) - [Docs](https://docs.virtual-grid.com/getting-started/react) - [Examples](https://github.com/niikeec/virtual-grid/examples/react)

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
    count: 1000
    // ...
  });

  return (
    <div ref={ref} style={{ height: '400px', overflow: 'auto' }}>
      <Grid grid={grid}>{(i) => <div key={i}>...</div>}</Grid>
    </div>
  );
};
```

## License

MIT
