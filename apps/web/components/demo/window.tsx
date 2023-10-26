import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { DotsThree } from '@phosphor-icons/react';

const MIN_WIDTH = 300;
const MIN_HEIGHT = 300;

export const Window = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  const resizing = useRef(false);
  const resizingDirection = useRef<'x' | 'y'>();

  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const setInitialSize = () => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();

    setWidth(width);
    setHeight(height);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!resizing.current || !resizingDirection.current) return;

      if (resizingDirection.current === 'x') {
        setWidth((width) => (width ?? 0) + event.movementX * 2);
      } else if (resizingDirection.current === 'y') {
        setHeight((height) => (height ?? 0) + event.movementY);
      }
    };

    const handleMouseUp = () => {
      resizing.current = false;
      resizingDirection.current = undefined;
      document.body.style.cursor = 'auto';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="border-border/50 relative aspect-video h-[500px] w-full max-w-full overflow-hidden rounded-lg border p-2 shadow-lg sm:h-auto sm:p-4"
      style={{
        width,
        height,
        minHeight: MIN_HEIGHT,
        minWidth: MIN_WIDTH
      }}
    >
      <div className="bg-secondary/20 border-border/50 group h-full w-full select-none overflow-hidden rounded-md border">
        {children}
      </div>

      <div
        className="text-muted-foreground/50 absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-ns-resize max-sm:hidden"
        onMouseDown={() => {
          resizing.current = true;
          resizingDirection.current = 'y';
          document.body.style.cursor = 'ns-resize';
          setInitialSize();
        }}
      >
        <DotsThree weight="bold" size={32} />
      </div>

      <div
        className="text-muted-foreground/50 absolute -right-2 top-1/2 -translate-y-1/2 rotate-90 cursor-ew-resize max-sm:hidden"
        onMouseDown={() => {
          resizing.current = true;
          resizingDirection.current = 'x';
          document.body.style.cursor = 'ew-resize';
          setInitialSize();
        }}
      >
        <DotsThree weight="bold" size={32} />
      </div>
    </div>
  );
};
