import { cn } from '@/lib/utils';

export const LogoArt = () => {
  return (
    <div className="relative flex h-60 w-full items-center justify-center overflow-hidden sm:w-80">
      <div className="from-background absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r to-transparent" />
      <div className="from-background absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l to-transparent" />
      <div className="from-background absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t to-transparent" />
      <div className="from-background absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b to-transparent" />

      <div className="absolute w-[400px]">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'shadow-primary/5 border-border/75 h-32 w-32 rounded-lg border bg-gradient-to-tr shadow-md',
                i === 4
                  ? '!border-orange-400/40 from-orange-400/60 to-orange-400/30'
                  : 'from-secondary/75 to-background'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
