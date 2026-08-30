import { cn } from '@/lib/dom';

/**
 * Neutral shimmer block used by route-level loading states.
 * `motion-reduce` disables the pulse for visitors who ask for reduced motion.
 */
export default function Skeleton({ className }: { readonly className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-lg bg-slate-200/70 motion-reduce:animate-none', className)}
    />
  );
}
