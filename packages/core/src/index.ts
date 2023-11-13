import type { GridItem, GridItemData, GridItemId, GridPadding } from './types';
import type { RequireAtLeastOne } from './utils/types';

export interface DefaultGridProps<IdT extends GridItemId, DataT extends GridItemData> {
  /**
   * Number of grid items.
   */
  count: number;
  /**
   * Total number of grid items.
   */
  totalCount?: number;
  /**
   * Number of columns. Only applies when `horizontal` is `false`.
   * @defaultValue 1
   */
  columns?: number | 'auto';
  /**
   * Number of rows. Only applies when `horizontal` is `true`.
   * @defaultValue 1
   */
  rows?: number;
  /**
   * Grid item size.
   */
  size?: number | { width?: number; height?: number };
  /**
   * Grid width.
   */
  width?: number;
  /**
   * Grid padding.
   */
  padding?: number | GridPadding;
  /**
   * Grid gap.
   */
  gap?: number | { x?: number; y?: number };
  /**
   * Invert items in grid.
   */
  invert?: boolean;
  /**
   * Horizontal mode places items in rows from top to bottom. `onLoadMore` area is placed on the x-axis.
   */
  horizontal?: boolean;
  /**
   * Callback function for grid item `id` in `getItem` function.
   */
  getItemId?: (index: number) => IdT | undefined;
  /**
   * Callback function for grid item `data` in `getItem` function.
   */
  getItemData?: (index: number) => DataT;
}

export interface BaseGridProps<IdT extends GridItemId, DataT extends GridItemData>
  extends DefaultGridProps<IdT, DataT> {
  horizontal?: false;
  columns?: number;
}

export interface AutoColumnsGridProps<IdT extends GridItemId, DataT extends GridItemData>
  extends DefaultGridProps<IdT, DataT> {
  columns: 'auto';
  size: number | { width: number; height: number };
}

export interface HorizontalGridProps<IdT extends GridItemId, DataT extends GridItemData>
  extends DefaultGridProps<IdT, DataT> {
  horizontal: true;
  size: number | { width: number; height: number };
}

export type GridProps<IdT extends GridItemId, DataT extends GridItemData> =
  | RequireAtLeastOne<BaseGridProps<IdT, DataT>, 'size' | 'width'>
  | RequireAtLeastOne<AutoColumnsGridProps<IdT, DataT>, 'width'>
  | HorizontalGridProps<IdT, DataT>;

export const grid = <IdT extends GridItemId, DataT extends GridItemData>(
  props: GridProps<IdT, DataT>
) => {
  const count = Math.trunc(props.count);
  const totalCount = props.totalCount ? Math.trunc(props.totalCount) : undefined;
  const maxCount = !totalCount ? count : Math.max(count, totalCount);

  const rows = props.rows !== undefined ? Math.trunc(props.rows) : 1;

  const columns =
    props.columns !== undefined
      ? props.columns !== 'auto'
        ? Math.trunc(props.columns)
        : props.columns
      : 1;

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

  const gridWidth = props.width ? props.width - (padding.left + padding.right) : undefined;

  let columnCount = 0;

  if (!props.horizontal) {
    if (columns !== 'auto') columnCount = columns;
    else if (gridWidth && size.width) {
      let columns = Math.floor(gridWidth / size.width);
      if (gap.x) columns = Math.floor((gridWidth - (columns - 1) * gap.x) / size.width);
      columnCount = columns;
    }
  } else {
    columnCount = rows > 0 ? Math.round(count / rows) : 0;
  }

  const totalColumnCount = props.horizontal && rows > 0 ? Math.round(maxCount / rows) : columnCount;

  const getRowCount = (count: number) => {
    return columnCount > 0 ? Math.ceil(count / columnCount) : 0;
  };

  const rowCount = props.horizontal ? rows : getRowCount(count);
  const totalRowCount = props.horizontal ? rowCount : getRowCount(maxCount);

  const virtualItemWidth = props.horizontal
    ? size.width ?? 0
    : columnCount > 0
    ? (columns !== 'auto' && size.width) ||
      (gridWidth ? (gridWidth - (columnCount - 1) * gap.x) / columnCount : 0)
    : 0;

  const virtualItemHeight = size.height ?? virtualItemWidth;

  const getItem = (index: number) => {
    if (index < 0 || index >= count) return;

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
    const _index = Math.trunc(index);
    return virtualItemHeight ? virtualItemHeight + (_index !== 0 ? gap.y : 0) : 0;
  };

  const getItemWidth = (index: number) => {
    const _index = Math.trunc(index);
    return virtualItemWidth ? virtualItemWidth + (_index !== 0 ? gap.x : 0) : 0;
  };

  const getItemPosition = (index: number) => {
    const _index = Math.trunc(index);
    return {
      row: props.horizontal ? _index % rowCount : Math.floor(_index / columnCount),
      column: props.horizontal ? Math.floor(_index / rowCount) : _index % columnCount
    };
  };

  const getItemRect = (index: number) => {
    const position = getItemPosition(index);

    const row = props.invert && !props.horizontal ? count - 1 - position.row : position.row;
    const column = props.invert && props.horizontal ? count - 1 - position.column : position.column;

    const x = virtualItemWidth
      ? padding.left + (column !== 0 ? gap.x : 0) * column + virtualItemWidth * column
      : 0;

    const y = virtualItemHeight
      ? padding.top + (row !== 0 ? gap.y : 0) * row + virtualItemHeight * row
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
    totalColumnCount,
    count: count,
    invert: props.invert,
    horizontal: props.horizontal,
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
