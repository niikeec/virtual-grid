export const headless = `import * as React from 'react';
import { useGrid, useVirtualizer } from '@virtual-grid/react';

const App = () => {
	const ref = React.useRef<HTMLDivElement>(null);

	const grid = useGrid({
		scrollRef: ref,
		count: 1000,
		size: 120
		// ...
	});

	const rowVirtualizer = useVirtualizer(grid.virtualizer.rowVirtualizer);
	const columnVirtualizer = useVirtualizer(grid.virtualizer.columnVirtualizer);

	const virtualRows = rowVirtualizer.getVirtualItems();
	const virtualColumns = columnVirtualizer.getVirtualItems();

	// Uncomment if grid is not static
	// React.useEffect(() => {
	// 	rowVirtualizer.measure();
	// }, [rowVirtualizer, grid.virtualItemSize.height]);

	// React.useEffect(() => {
	// 	columnVirtualizer.measure();
	// }, [columnVirtualizer, grid.virtualItemSize.width]);

	return (
		<div ref={ref} style={{ height: '400px', overflow: 'auto' }}>
			<div
				style={{
					position: 'relative',
					height: ${'`${rowVirtualizer.getTotalSize()}px`'},
					width: ${'`${columnVirtualizer.getTotalSize()}px`'}
				}}
			>
				{virtualRows.map((virtualRow) => (
					<React.Fragment key={virtualRow.index}>
						{virtualColumns.map((virtualColumn) => {
							// let index = virtualRow.index * grid.columnCount + virtualColumn.index;
							// if (index >= grid.count) return null;

							return (
								<div
									key={virtualColumn.index}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: ${'`${virtualColumn.size}px`'},
										height: ${'`${virtualRow.size}px`'},
										transform: ${'`translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`'},
										paddingLeft: virtualColumn.index !== 0 ? grid.gap.x : 0,
										paddingTop: virtualRow.index !== 0 ? grid.gap.y : 0
									}}
								>
									<div
										style={{
											margin: 'auto',
											width: grid.itemSize.width ?? '100%',
											height: grid.itemSize.height ?? '100%'
										}}
									>
										...
									</div>
								</div>
							);
						})}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};`;
