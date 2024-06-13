import { Accessor, createEffect, onCleanup, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

export const createScrollMargin = (props: {
  scrollRef: Accessor<HTMLElement | null>;
  gridRef: Accessor<HTMLElement | null>;
}) => {
  const [scrollMargin, setScrollMargin] = createStore({ top: 0, left: 0 });

  createEffect(() => {
    const scrollNode = props.scrollRef();
    if (!scrollNode) return;

    const gridNode = props.gridRef();
    if (!gridNode) return;

    const observer = new MutationObserver(() => {
      setScrollMargin({
        top: gridNode.offsetTop - scrollNode.offsetTop,
        left: gridNode.offsetLeft - scrollNode.offsetLeft
      });
    });

    observer.observe(scrollNode, { childList: true });

    onCleanup(() => observer.disconnect());
  });

  onMount(() => {
    const scrollNode = props.scrollRef();
    if (!scrollNode) return;

    const gridNode = props.gridRef();
    if (!gridNode) return;

    setScrollMargin({
      top: gridNode.offsetTop - scrollNode.offsetTop,
      left: gridNode.offsetLeft - scrollNode.offsetLeft
    });
  });

  return { scrollMargin };
};
