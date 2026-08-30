import { cn } from '@/lib/dom';
import { CheckIcon } from './Icons';

/** The confirmation toast used after a copy-to-clipboard action. */
export default function Toast({
  id,
  message,
  show,
}: {
  readonly id: string;
  readonly message: string;
  readonly show: boolean;
}) {
  return (
    <div className={cn('blog-toast', show && 'show')} id={id} role="status" aria-live="polite">
      <CheckIcon size={18} stroke="#38bdf8" />
      <span>{message}</span>
    </div>
  );
}
