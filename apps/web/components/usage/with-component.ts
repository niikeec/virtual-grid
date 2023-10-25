export const withComponentCode = `import * as React from 'react';
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
};`;
