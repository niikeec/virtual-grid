import React from 'react';
import { useInView } from 'react-intersection-observer';

import { LoadMoreTriggerDefaults } from '@virtual-grid/shared';

export interface LoadMoreTriggerProps extends LoadMoreTriggerDefaults {
  style?: React.CSSProperties;
  className?: string;
}

export const LoadMoreTrigger = ({
  position = 'bottom',
  size = 0,
  onLoadMore,
  ...props
}: LoadMoreTriggerProps) => {
  const vertical = position === 'top' || position === 'bottom';

  const { ref, inView } = useInView();

  React.useEffect(() => {
    inView && onLoadMore?.();
  }, [inView, onLoadMore]);

  return (
    <div
      ref={ref}
      className={props.className}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        display: !onLoadMore ? 'none' : undefined,
        width: vertical ? '100%' : `${size}px`,
        height: vertical ? `${size}px` : '100%',
        [position]: 0,
        ...props.style
      }}
    />
  );
};
