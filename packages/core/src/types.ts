export type GridItemId = number | string;
export type GridItemData = unknown;

export type GridPadding = {
	x?: number;
	y?: number;
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};

export type GridItem<IdT extends GridItemId = number, DataT extends GridItemData = undefined> = {
	index: number;
	id: IdT;
	row: number;
	column: number;
	rect: Omit<DOMRect, 'toJSON'>;
	data: DataT;
};
