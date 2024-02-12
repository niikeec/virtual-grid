# @virtual-grid/react

## 2.0.2

### Patch Changes

- 3473540: Make totalCount public
- Updated dependencies [3473540]
  - @virtual-grid/core@2.0.1
  - @virtual-grid/shared@2.0.1

## 2.0.1

### Patch Changes

- 62cfcf9: Fix passing width and height props as undefined, which would previously override internal sizes.

## 2.0.0

### Major Changes

- 6002f32: ## Breaking changes

  - `grid.virtualizer` has been replaces by `grid.rowVirtualizer` and `grid.columnVirtualizer`
  - `onLoadMore` and `loadMoreSize` are not exported by `useGrid` anymore
  - `rowVirtualizer` and `columnVirtualizer` can't be passed to `useGrid` anymore
  - Properties of `grid.padding` and `grid.gap` are now partial

  ## Simplified headless integration

  `useGrid` now exports two new functions `getVirtualItem` and `getLoadMoreTrigger` which immensely reduce boilerplate code when integrating a headless solution.

  Example using `getVirtualItem`:

  ```
  {rowVirtualizer.getVirtualItems().map((row) => {
      const item = grid.getVirtualItem({ row });
      if (!item) return null;

      return (
          <div key={row.key} style={item.style}>
              ...
          </div>
      );
  })}
  ```

  Example using `getLoadMoreTrigger` in combination with the new `<LoadMoreTrigger />` component.
  [See Example](https://github.com/niikeec/virtual-grid/examples/react/infinite-scroll)

  ```
   <LoadMoreTrigger {...grid.getLoadMoreTrigger()} />
  ```

  Scroll margin has also been simplified with the new `useScrollMargin` hook.
  [See Example](https://github.com/niikeec/virtual-grid/examples/react/scroll-margin)

  ```
   const { scrollMargin } = useScrollMargin({ scrollRef, gridRef });

   // ...

   const item = grid.getVirtualItem({ row, scrollMargin });
  ```

  ## Other changes

  - `rows` and `columns` are now independent of `horizontal`
  - Rows are now also resizable based on the height of the grid and number of rows using `horizontal`. Previously this was only possible with columns.
  - Improved performance by only measuring on demand
  - Bump @tanstack/react-virtual to 3.0.1

  ## What's up next?

  - Improve docs
  - Add more examples
  - SolidJS integration. We got an active PR [here](https://github.com/niikeec/virtual-grid/pull/7).

  [PR](https://github.com/niikeec/virtual-grid/pull/6) - [Documentation](https://docs.virtual-grid.com/getting-started/react)

### Patch Changes

- Updated dependencies [6002f32]
  - @virtual-grid/shared@2.0.0
  - @virtual-grid/core@2.0.0

## 1.1.0

### Minor Changes

- Grid horizontal support

### Patch Changes

- Updated dependencies
  - @virtual-grid/core@1.1.0

## 1.0.2

### Patch Changes

- Fix grid offset & load more trigger height
- Updated dependencies
  - @virtual-grid/core@1.0.1

## 1.0.1

### Patch Changes

- Render improvement of grid items and load more trigger

## 1.0.0

### Major Changes

- 9ab06ae: release

### Patch Changes

- Updated dependencies [9ab06ae]
  - @virtual-grid/core@1.0.0
