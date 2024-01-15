import type {
  GridGap,
  GridItem,
  GridItemData,
  GridItemId,
  GridPadding
} from './types';
import { RequireAtLeastOne } from './utils/types';

export interface DefaultGridProps<
  IdT extends GridItemId,
  DataT extends GridItemData
> {
  /**
   * Number of grid items.
   */
  count: number;
  /**
   * Total number of grid items.
   */
  totalCount?: number;
  /**
   * Number of columns.
   * @defaultValue 1
   */
  columns?: number | 'auto';
  /**
   * Number of rows.
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
   * Grid height.
   */
  height?: number;
  /**
   * Grid padding.
   */
  padding?: number | GridPadding;
  /**
   * Grid gap.
   */
  gap?: number | GridGap;
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

export interface BaseGridProps<
  IdT extends GridItemId,
  DataT extends GridItemData
> extends DefaultGridProps<IdT, DataT> {
  columns?: number;
  horizontal?: false;
}

export interface AutoColumnsGridProps<
  IdT extends GridItemId,
  DataT extends GridItemData
> extends DefaultGridProps<IdT, DataT> {
  columns: 'auto';
  horizontal?: false;
  size: number | { width: number; height: number };
}

export interface HorizontalGridProps<
  IdT extends GridItemId,
  DataT extends GridItemData
> extends DefaultGridProps<IdT, DataT> {
  columns?: number;
  horizontal: true;
  size?: number | { width: number; height?: number };
}

export type GridProps<IdT extends GridItemId, DataT extends GridItemData> =
  | RequireAtLeastOne<BaseGridProps<IdT, DataT>, 'width'>
  | RequireAtLeastOne<AutoColumnsGridProps<IdT, DataT>, 'width'>
  | RequireAtLeastOne<HorizontalGridProps<IdT, DataT>, 'height'>;

export class Grid<
  IdT extends GridItemId = GridItemId,
  DataT extends GridItemData = GridItemData
> {
  private totalCount = 0;

  options: GridProps<IdT, DataT>;

  rowCount = 0;
  columnCount = 0;

  totalRowCount = 0;
  totalColumnCount = 0;

  itemWidth: number | undefined = undefined;
  itemHeight: number | undefined = undefined;

  virtualItemWidth = 0;
  virtualItemHeight = 0;

  padding: Omit<GridPadding, 'x' | 'y'> = {};
  gap: GridGap = {};

  constructor(props: GridProps<IdT, DataT>) {
    this.options = props;
    this.initOptions();
    this.measure();
  }

  private getPadding = (key: keyof GridPadding) => {
    return typeof this.options.padding === 'object'
      ? this.options.padding[key]
      : this.options.padding;
  };

  private getRowCount = (count: number, columns: number) => {
    return (columns && Math.ceil(count / columns)) || 0;
  };

  private getColumnCount = (count: number, rows: number) => {
    return (rows && Math.ceil(count / rows)) || 0;
  };

  private isPositiveInt = (value: number) => {
    return value >= 0 && Number.isInteger(value);
  };

  isIndexValid = (index: number, mode: 'default' | 'total' = 'default') => {
    return (
      this.isPositiveInt(index) &&
      index < (mode === 'default' ? this.options.count : this.totalCount)
    );
  };

  invertIndex = (index: number) => {
    const invertedIndex = this.totalCount - 1 - index;
    return invertedIndex < 0 ? index : invertedIndex;
  };

  setOptions = (props: GridProps<IdT, DataT>) => {
    this.options = props;
    this.initOptions();
  };

  private initOptions = () => {
    const { gap, size } = this.options;

    this.padding = {
      top: this.getPadding('top') ?? this.getPadding('y'),
      bottom: this.getPadding('bottom') ?? this.getPadding('y'),
      left: this.getPadding('left') ?? this.getPadding('x'),
      right: this.getPadding('right') ?? this.getPadding('x')
    };

    this.gap = {
      x: typeof gap === 'object' ? gap.x : gap,
      y: typeof gap === 'object' ? gap.y : gap
    };

    this.itemWidth = typeof size === 'object' ? size.width : size;
    this.itemHeight = typeof size === 'object' ? size.height : size;
  };

  measure = () => {
    const { options } = this;

    const count = options.count;
    if (!this.isPositiveInt(count)) {
      throw new Error(`Invalid option count -> ${count}`);
    }

    const totalCount = options.totalCount;
    if (typeof totalCount === 'number' && !this.isPositiveInt(totalCount)) {
      throw new Error(`Invalid option totalCount -> ${totalCount}`);
    }

    this.totalCount = !totalCount ? count : Math.max(count, totalCount);

    const rows = options.rows;
    if (typeof rows === 'number' && !this.isPositiveInt(rows)) {
      throw new Error(`Invalid option rows -> ${rows}`);
    }

    const columns = options.columns;
    if (typeof columns === 'number' && !this.isPositiveInt(columns)) {
      throw new Error(`Invalid option columns -> ${columns}`);
    }

    const gridWidth = options.width
      ? options.width - ((this.padding.left ?? 0) + (this.padding.right ?? 0))
      : undefined;

    const gridHeight = options.height
      ? options.height - ((this.padding.top ?? 0) + (this.padding.bottom ?? 0))
      : undefined;

    // Column count
    if (typeof columns === 'number' || (!columns && !this.options.horizontal)) {
      this.columnCount = columns ?? 1;
      this.totalColumnCount = columns ?? 1;
    } else if (this.options.horizontal) {
      this.columnCount = this.getColumnCount(count, rows ?? 1);
      this.totalColumnCount = this.getColumnCount(this.totalCount, rows ?? 1);
    } else if (columns === 'auto' && gridWidth) {
      if (!this.itemWidth || !this.isPositiveInt(this.itemWidth)) {
        throw new Error(`Invalid option itemWidth -> ${this.itemWidth}`);
      }

      this.columnCount = Math.floor(gridWidth / this.itemWidth);

      if (this.gap.x) {
        const space = gridWidth - (this.columnCount - 1) * this.gap.x;
        this.columnCount = Math.floor(space / this.itemWidth);
      }

      this.totalColumnCount = this.columnCount;
    }

    // Row count
    if (rows !== undefined || this.options.horizontal) {
      this.rowCount = rows ?? 1;
      this.totalRowCount = rows ?? 1;
    } else if (!this.options.horizontal) {
      this.rowCount = this.getRowCount(count, this.columnCount);
      this.totalRowCount = this.getRowCount(this.totalCount, this.columnCount);
    }

    // Virtual item width
    if (columns !== 'auto' && this.itemWidth !== undefined) {
      this.virtualItemWidth = this.itemWidth;
    } else if (this.options.horizontal && this.rowCount && gridHeight) {
      const space = gridHeight - (this.rowCount - 1) * (this.gap.y ?? 0);
      this.virtualItemWidth = space / this.rowCount;
    } else if (this.columnCount && gridWidth) {
      const space = gridWidth - (this.columnCount - 1) * (this.gap.x ?? 0);
      this.virtualItemWidth = space / this.columnCount;
    }

    // Virtual item height
    if (this.itemHeight !== undefined) {
      this.virtualItemHeight = this.itemHeight;
    } else if (!this.options.horizontal) {
      this.virtualItemHeight = this.virtualItemWidth;
    } else if (this.rowCount && gridHeight) {
      const space = gridHeight - (this.rowCount - 1) * (this.gap.y ?? 0);
      this.virtualItemHeight = space / this.rowCount;
    }
  };

  getItemPosition = (index: number) => {
    if (!this.isIndexValid(index, 'total')) return;

    if (this.options.invert) index = this.invertIndex(index);

    const row = this.options.horizontal
      ? index % this.rowCount
      : Math.trunc(index / this.columnCount);

    const column = this.options.horizontal
      ? Math.trunc(index / this.rowCount)
      : index % this.columnCount;

    return { row, column };
  };

  getItemRect = (index: number) => {
    const position = this.getItemPosition(index);
    if (!position) return;

    const row =
      this.options.invert && !this.options.horizontal
        ? this.options.count - 1 - position.row
        : position.row;

    const column =
      this.options.invert && this.options.horizontal
        ? this.options.count - 1 - position.column
        : position.column;

    const x = this.virtualItemWidth
      ? (this.padding?.left ?? 0) +
        (column !== 0 ? this.gap?.x ?? 0 : 0) * column +
        this.virtualItemWidth * column
      : 0;

    const y = this.virtualItemHeight
      ? (this.padding?.top ?? 0) +
        (row !== 0 ? this.gap?.y ?? 0 : 0) * row +
        this.virtualItemHeight * row
      : 0;

    return {
      height: this.virtualItemHeight,
      width: this.virtualItemWidth,
      top: y,
      bottom: y + this.virtualItemHeight,
      left: x,
      right: x + this.virtualItemWidth,
      x,
      y
    } satisfies GridItem['rect'];
  };

  getItemHeight = (index: number) => {
    return this.virtualItemHeight + ((index > 0 && this.gap.y) || 0);
  };

  getItemWidth = (index: number) => {
    return this.virtualItemWidth + ((index > 0 && this.gap.x) || 0);
  };

  getItem = (index: number) => {
    if (!this.isIndexValid(index)) return;

    const id = this.options.getItemId?.(index) ?? index;
    const data = this.options.getItemData?.(index);

    const { row, column } = this.getItemPosition(index)!;
    const rect = this.getItemRect(index)!;

    return { index, id, data, row, column, rect };
  };

  getItemIndex = (row: number, column: number) => {
    const index = this.options.horizontal
      ? column * this.rowCount + row
      : row * this.columnCount + column;

    return this.options.invert ? this.invertIndex(index) : index;
  };
}
