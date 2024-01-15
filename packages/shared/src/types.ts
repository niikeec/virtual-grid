import {
  VirtualItem,
  Virtualizer,
  VirtualizerOptions as VirtualizerOptionsCore
} from '@tanstack/virtual-core';

import * as Core from '@virtual-grid/core';

export type GridProps<
  IdT extends Core.GridItemId = Core.GridItemId,
  DataT extends Core.GridItemData = unknown
> = (
  | Core.BaseGridProps<IdT, DataT>
  | Core.AutoColumnsGridProps<IdT, DataT>
  | Core.HorizontalGridProps<IdT, DataT>
) & {
  /**
   * Renders an area which triggers `onLoadMore` when scrolled into view.
   */
  onLoadMore?: () => void;
  /**
   * Set the size of the load more area.
   */
  loadMoreSize?: number;
  /**
   * The number of items to render beyond the visible area.
   */
  overscan?: number;
};

export type VirtualizerOptions = VirtualizerOptionsCore<Element, Element>;
export type PartialVirtualizerOptions = Partial<VirtualizerOptions>;

export type ScrollMargin = { top: number; left: number };

export type GetVirtualItemProps = (
  | { row: VirtualItem; column: VirtualItem }
  | { row: VirtualItem; column?: undefined }
  | { row?: undefined; column: VirtualItem }
) & { scrollMargin?: Partial<ScrollMargin> };

export interface LoadMoreTriggerDefaults {
  /**
   * Position of the trigger.
   * @defaultValue bottom
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Size of the trigger.
   * @defaultValue 0
   */
  size?: number;
  /**
   * Callback when the trigger is visible.
   */
  onLoadMore?: () => void;
}

export type GetLoadMoreTriggerProps = Pick<
  Core.Grid,
  'rowCount' | 'columnCount' | 'getItemRect'
> & {
  virtualizer: Virtualizer<HTMLElement, Element>;
  size?: number;
};
