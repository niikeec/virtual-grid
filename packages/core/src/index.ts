import type { GridItem, GridItemData, GridItemId, GridPadding } from './types';
import type { RequireAtLeastOne } from './utils/types';

export interface DefaultGridProps<IdT extends GridItemId, DataT extends GridItemData> {
  count: number;
  totalCount?: number;
  size?: number | { width: number; height: number };
  columns?: number;
  width?: number;
  padding?: number | GridPadding;
  gap?: number | { x?: number; y?: number };
  invert?: boolean;
  getItemId?: (index: number) => IdT | undefined;
  getItemData?: (index: number) => DataT;
}

export interface SizeGridProps<IdT extends GridItemId, DataT extends GridItemData>
  extends DefaultGridProps<IdT, DataT> {
  size: number | { width: number; height: number };
}

export interface ColumnsGridProps<IdT extends GridItemId, DataT extends GridItemData>
  extends DefaultGridProps<IdT, DataT> {
  columns: number;
}

export type GridProps<IdT extends GridItemId, DataT extends GridItemData> =
  | RequireAtLeastOne<SizeGridProps<IdT, DataT>, 'columns' | 'width'>
  | RequireAtLeastOne<ColumnsGridProps<IdT, DataT>, 'size' | 'width'>;

export const grid = <IdT extends GridItemId, DataT extends GridItemData>(
  props: GridProps<IdT, DataT>
) => {
  const count = !props.totalCount ? props.count : Math.max(props.count, props.totalCount);

  const getPadding = (key: keyof GridPadding) => {
    return typeof props.padding === 'object' ? props.padding[key] : props.padding;
  };

  const padding = {
    top: getPadding('top') ?? getPadding('y') ?? 0,
    bottom: getPadding('bottom') ?? getPadding('y') ?? 0,
    left: getPadding('left') ?? getPadding('x') ?? 0,
    right: getPadding('right') ?? getPadding('x') ?? 0
  };

  const gap = {
    x: (typeof props.gap === 'object' ? props.gap.x : props.gap) ?? 0,
    y: (typeof props.gap === 'object' ? props.gap.y : props.gap) ?? 0
  };

  const size = {
    width: typeof props.size === 'object' ? props.size.width : props.size,
    height: typeof props.size === 'object' ? props.size.height : props.size
  };

  const gridWidth = props.width ? props.width - (padding.left + padding.right) : 0;

  let columnCount = props.columns ?? 0;

  if (!columnCount && size.width && gridWidth) {
    let columns = Math.floor(gridWidth / size.width);
    if (gap.x) columns = Math.floor((gridWidth - (columns - 1) * gap.x) / size.width);
    columnCount = columns;
  }

  const rowCount = columnCount > 0 ? Math.ceil(props.count / columnCount) : 0;
  const totalRowCount = columnCount > 0 ? Math.ceil(count / columnCount) : 0;

  const virtualItemWidth =
    columnCount > 0
      ? (props.columns && size.width) ||
        (gridWidth ? (gridWidth - (columnCount - 1) * gap.x) / columnCount : 0)
      : 0;

  const virtualItemHeight = size.height ?? virtualItemWidth;

  const getItem = (index: number) => {
    if (index < 0 || index >= props.count) return;

    const id = props.getItemId?.(index) ?? index;
    const data = props.getItemData?.(index);

    const { row, column } = getItemPosition(index);
    const rect = getItemRect(index);

    const item: GridItem<typeof id, DataT | undefined> = {
      index,
      id,
      data,
      row,
      column,
      rect
    };

    return item;
  };

  const getItemHeight = (index: number) => {
    return virtualItemHeight ? virtualItemHeight + (index !== 0 ? gap.y : 0) : 0;
  };

  const getItemWidth = (index: number) => {
    return virtualItemWidth ? virtualItemWidth + (index !== 0 ? gap.x : 0) : 0;
  };

  const getItemPosition = (index: number) => ({
    row: Math.floor(index / columnCount),
    column: index % columnCount
  });

  const getItemRect = (index: number) => {
    const { row, column } = getItemPosition(index);

    const _row = props.invert ? props.count - 1 - row : row;

    const x = virtualItemWidth
      ? padding.left + (column !== 0 ? gap.x : 0) * column + virtualItemWidth * column
      : 0;

    const y = virtualItemHeight
      ? padding.top + (_row !== 0 ? gap.y : 0) * _row + virtualItemHeight * _row
      : 0;

    return {
      height: virtualItemHeight,
      width: virtualItemWidth,
      top: y,
      bottom: y + virtualItemHeight,
      left: x,
      right: x + virtualItemWidth,
      x,
      y
    } satisfies GridItem['rect'];
  };

  return {
    gap,
    padding,
    rowCount,
    totalRowCount,
    columnCount,
    count: props.count,
    invert: props.invert,
    itemSize: {
      width: size.width,
      height: size.height
    },
    virtualItemSize: {
      width: virtualItemWidth,
      height: virtualItemHeight
    },
    getItem,
    getItemHeight,
    getItemWidth,
    getItemPosition,
    getItemRect
  };
};

export type { GridItem, GridItemData, GridItemId } from './types';
