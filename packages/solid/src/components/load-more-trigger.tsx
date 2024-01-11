import { createVisibilityObserver } from '@solid-primitives/intersection-observer';
import { createEffect, JSX } from 'solid-js';

export interface LoadMoreTriggerProps {
  style?: JSX.CSSProperties;
  onLoadMore?: () => void;
}

export const LoadMoreTrigger = (props: LoadMoreTriggerProps) => {
  let ref!: HTMLDivElement;

  const inView = createVisibilityObserver()(() => ref);

  createEffect(() => inView() && props.onLoadMore?.());

  return <div ref={ref} style={props.style} />;
};
