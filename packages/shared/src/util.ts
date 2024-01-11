import { Virtualizer } from '@tanstack/virtual-core';

import * as Core from '@virtual-grid/core';

import {
  GetVirtualItemProps,
  GridProps,
  PartialVirtualizerOptions
} from './types';

export const getRowVirtualizerOptions = (
  grid: Pick<Core.Grid, 'totalRowCount' | 'getItemHeight' | 'padding'>
) => {
  return {
    count: grid.totalRowCount,
    estimateSize: grid.getItemHeight,
    paddingStart: grid.padding.top,
    paddingEnd: grid.padding.bottom
  } satisfies PartialVirtualizerOptions;
};

export const getColumnVirtualizerOptions = (
  grid: Pick<Core.Grid, 'totalColumnCount' | 'getItemWidth' | 'padding'>
) => {
  return {
    horizontal: true,
    count: grid.totalColumnCount,
    estimateSize: grid.getItemWidth,
    paddingStart: grid.padding.left,
    paddingEnd: grid.padding.right
  } satisfies PartialVirtualizerOptions;
};

export const observeGridSize = (props: GridProps) => {
  if (props.horizontal) {
    // Don't observe if grid height is set
    if (props.height !== undefined) return false;

    // Don't observe if rows is set to 0 or less
    if (props.rows !== undefined && props.rows <= 0) return false;

    // Don't observe if item height is set
    if (typeof props.size === 'object' && props.size.height !== undefined) {
      return false;
    }

    // Don't observe if item size is defined
    if (typeof props.size === 'number') return false;

    return true;
  }

  // Don't observe if grid width is set
  if (props.width !== undefined) return false;

  if (props.columns === 'auto') {
    // Don't observe if item size is set to 0 or less
    if (typeof props.size === 'number' && props.size <= 0) {
      return false;
    }

    // Don't observe if item width is set to 0 or less
    if (typeof props.size === 'object' && props.size.width <= 0) {
      return false;
    }
    // Don't observe if columns is set to 0 or less
  } else if (props.columns !== undefined && props.columns <= 0) {
    return false;
    // Don't observe if item width is set
  } else if (typeof props.size === 'object' && props.size.width !== undefined) {
    return false;
    // Don't observe if item size is set
  } else if (typeof props.size === 'number') {
    return false;
  }

  return true;
};

export const getVirtualItemIndex = (
  grid: Pick<Core.Grid, 'options' | 'getItemIndex' | 'invertIndex'>,
  { row, column }: GetVirtualItemProps
) => {
  let index: number;

  if (row && column) {
    index = grid.getItemIndex(row.index, column.index);
  } else {
    index = row ? row.index : column.index;
    if (grid.options.invert) index = grid.invertIndex(index);
  }

  return index;
};

export const getVirtualItemStyle = (
  grid: Pick<Core.Grid, 'padding' | 'gap' | 'itemWidth' | 'itemHeight'>,
  { row, column, scrollMargin }: GetVirtualItemProps
) => {
  const gap = {
    x: (column && column.index !== 0 && grid.gap.x) || 0,
    y: (row && row.index !== 0 && grid.gap.y) || 0
  };

  const gridPadding = {
    bottom: (!row && grid.padding.bottom) || 0,
    top: (!row && grid.padding.top) || 0,
    right: (!column && grid.padding.right) || 0,
    left: (!column && grid.padding.left) || 0
  };

  const offsetPadding =
    column && grid.itemWidth ? (column.size - gap.x - grid.itemWidth) / 2 : 0;

  const size = {
    width: column?.size ?? grid.itemWidth,
    height: row?.size ?? grid.itemHeight
  };

  const padding = {
    left: gridPadding.left + offsetPadding + gap.x,
    right: gridPadding.right + offsetPadding,
    top: gridPadding.top + gap.y,
    bottom: gridPadding.bottom
  };

  const translate = {
    x: (column?.start ?? 0) - (scrollMargin?.left ?? 0),
    y: (row?.start ?? 0) - (scrollMargin?.top ?? 0)
  };

  return { size, padding, translate };
};

type GetLoadMoreTriggerHeightProps = Pick<
  Core.Grid,
  'rowCount' | 'totalRowCount' | 'columnCount' | 'getItemRect'
> & {
  virtualizer: Virtualizer<HTMLElement, Element>;
  size?: number;
};

export const getLoadMoreTriggerHeight = (
  props: GetLoadMoreTriggerHeightProps
) => {
  if (props.totalRowCount === props.rowCount) return props.size;

  const rect = props.getItemRect(props.rowCount * props.columnCount);
  if (!rect) return;

  const loadMoreHeight =
    props.size ?? props.virtualizer.scrollElement?.clientHeight ?? 0;

  const virtualizerHeight = props.virtualizer.getTotalSize();

  const triggerHeight = virtualizerHeight - rect.top + loadMoreHeight;

  return Math.min(virtualizerHeight, triggerHeight);
};

type GetLoadMoreTriggerWidthProps = Pick<
  Core.Grid,
  'columnCount' | 'totalColumnCount' | 'rowCount' | 'getItemRect'
> & {
  virtualizer: Virtualizer<HTMLElement, Element>;
  size?: number;
};

export const getLoadMoreTriggerWidth = (
  props: GetLoadMoreTriggerWidthProps
) => {
  if (props.totalColumnCount === props.columnCount) return props.size;

  const rect = props.getItemRect(props.rowCount * props.columnCount);
  if (!rect) return;

  const loadMoreWidth =
    props.size ?? props.virtualizer.scrollElement?.clientWidth ?? 0;

  const virtualizerWidth = props.virtualizer.getTotalSize();

  const triggerWidth = virtualizerWidth - rect.left + loadMoreWidth;

  return Math.min(virtualizerWidth, triggerWidth);
};
