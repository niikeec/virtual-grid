import useMutationObserver from '@rooks/use-mutation-observer';
import { useVirtualizer } from '@tanstack/react-virtual';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import type { useGrid } from '.';

export interface GridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
	grid: ReturnType<typeof useGrid>;
	children: (index: number) => React.ReactNode;
}

export const Grid = ({ grid, children, ...props }: GridProps) => {
	const ref = React.useRef<HTMLDivElement>(null);

	const [listOffset, setListOffset] = React.useState(0);
	const [inView, setInView] = React.useState(false);

	const { ref: loadMoreRef } = useInView({ onChange: (e) => grid.onLoadMore && setInView(e) });

	const rowVirtualizer = useVirtualizer({
		...grid.virtualizer.rowVirtualizer,
		scrollMargin: listOffset
	});

	const columnVirtualizer = useVirtualizer(grid.virtualizer.columnVirtualizer);

	const virtualRows = rowVirtualizer.getVirtualItems();
	const virtualColumns = columnVirtualizer.getVirtualItems();

	const width = columnVirtualizer.getTotalSize();
	const height = rowVirtualizer.getTotalSize();

	const loadMoreTriggerHeight = React.useMemo(() => {
		if (!virtualRows.length || !grid.onLoadMore) return;

		if (grid.totalRowCount === grid.rowCount) return grid.loadMoreHeight;

		const [offset] = rowVirtualizer.getOffsetForIndex(grid.rowCount - 1, 'center');
		if (!offset) return;

		return height - offset;
	}, [grid, height, rowVirtualizer, virtualRows.length]);

	React.useEffect(() => {
		rowVirtualizer.measure();
	}, [rowVirtualizer, grid.virtualItemSize.height]);

	React.useEffect(() => {
		columnVirtualizer.measure();
	}, [columnVirtualizer, grid.virtualItemSize.width]);

	React.useEffect(() => {
		inView && grid.onLoadMore?.();
	}, [inView, grid]);

	useMutationObserver(ref, () => setListOffset(ref.current?.offsetTop ?? 0));

	React.useLayoutEffect(() => setListOffset(ref.current?.offsetTop ?? 0), []);

	return (
		<div
			{...props}
			ref={ref}
			style={{
				position: 'relative',
				width,
				height,
				visibility: !width || !height ? 'hidden' : 'visible',
				...props.style
			}}
		>
			<div
				ref={loadMoreRef}
				style={{
					background: 'blue',
					position: 'absolute',
					height: loadMoreTriggerHeight,
					width: '100%',
					top: grid.invert ? 0 : undefined,
					bottom: !grid.invert ? 0 : undefined
				}}
			/>

			{virtualRows.map((virtualRow) => (
				<React.Fragment key={virtualRow.index}>
					{virtualColumns.map((virtualColumn) => {
						let index = virtualRow.index * grid.columnCount + virtualColumn.index;

						if (grid.invert) index = grid.count - 1 - index;

						if (index >= grid.count || index < 0) return null;

						return (
							<div
								key={virtualColumn.index}
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: `${virtualColumn.size}px`,
									height: `${virtualRow.size}px`,
									transform: `translateX(${virtualColumn.start}px) translateY(${
										virtualRow.start - rowVirtualizer.options.scrollMargin
									}px)`,
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
									{children(index)}
								</div>
							</div>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
};
