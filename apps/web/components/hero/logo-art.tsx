import { cn } from '@/lib/utils';

export const LogoArt = () => {
  return (
    <div className="relative h-40 w-40 overflow-hidden">
      <div className="bg-gradient-radial to-background absolute inset-0 z-10 from-transparent from-30%" />
      <div className="absolute left-1/2 top-1/2 grid w-64 -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'shadow-primary/5 border-border/75 h-20 w-20 rounded-lg border bg-gradient-to-tr shadow-md',
              i === 4
                ? '!border-orange-400/40 from-orange-400/60 to-orange-400/30'
                : 'from-secondary/75 to-background'
            )}
          />
        ))}
      </div>
    </div>
  );
};
