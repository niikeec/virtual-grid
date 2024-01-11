import React from 'react';

export const useScrollMargin = ({
  scrollRef,
  gridRef
}: {
  scrollRef: React.RefObject<HTMLElement>;
  gridRef: React.RefObject<HTMLElement>;
}) => {
  const [top, setTop] = React.useState(0);
  const [left, setLeft] = React.useState(0);

  React.useEffect(() => {
    const scrollNode = scrollRef.current;
    if (!scrollNode) return;

    const gridNode = gridRef.current;
    if (!gridNode) return;

    const observer = new MutationObserver(() => {
      setTop(gridNode.offsetTop - scrollNode.offsetTop);
      setLeft(gridNode.offsetLeft - scrollNode.offsetLeft);
    });

    observer.observe(scrollNode, { childList: true });

    return () => observer.disconnect();
  }, [gridRef, scrollRef]);

  React.useLayoutEffect(() => {
    const scrollNode = scrollRef.current;
    if (!scrollNode) return;

    const gridNode = gridRef.current;
    if (!gridNode) return;

    setTop(gridNode.offsetTop - scrollNode.offsetTop);
    setLeft(gridNode.offsetLeft - scrollNode.offsetLeft);
  }, [gridRef, scrollRef]);

  return { scrollMargin: { top, left } };
};
