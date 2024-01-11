import React from 'react';
import { useInView } from 'react-intersection-observer';

export interface LoadMoreTriggerProps {
  style?: React.CSSProperties;
  onLoadMore?: () => void;
}

export const LoadMoreTrigger = ({
  style,
  onLoadMore
}: LoadMoreTriggerProps) => {
  const { ref: loadMoreRef, inView } = useInView();

  React.useEffect(() => {
    inView && onLoadMore?.();
  }, [inView, onLoadMore]);

  return <div ref={loadMoreRef} style={style} />;
};
