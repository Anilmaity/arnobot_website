import type { Cleanup } from '@/types';

/** Collects teardown callbacks so a behaviour can be reversed in one call. */
export class Disposer {
  readonly #tasks: Cleanup[] = [];

  add(task: Cleanup): void {
    this.#tasks.push(task);
  }

  /** Adds a listener and registers its removal. */
  on<K extends keyof WindowEventMap>(
    target: Window,
    type: K,
    listener: (event: WindowEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ): void;
  on<K extends keyof DocumentEventMap>(
    target: Document,
    type: K,
    listener: (event: DocumentEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ): void;
  on<K extends keyof HTMLElementEventMap>(
    target: HTMLElement,
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ): void;
  on(
    target: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions,
  ): void {
    target.addEventListener(type, listener, options);
    this.#tasks.push(() => target.removeEventListener(type, listener, options));
  }

  interval(handler: () => void, ms: number): number {
    const id = window.setInterval(handler, ms);
    this.#tasks.push(() => window.clearInterval(id));
    return id;
  }

  timeout(handler: () => void, ms: number): number {
    const id = window.setTimeout(handler, ms);
    this.#tasks.push(() => window.clearTimeout(id));
    return id;
  }

  observe(observer: { disconnect: () => void }): void {
    this.#tasks.push(() => observer.disconnect());
  }

  dispose(): void {
    for (const task of this.#tasks.splice(0).reverse()) {
      try {
        task();
      } catch {
        // A failing teardown must not stop the rest from running.
      }
    }
  }

  /** Convenience: the disposer itself as a `Cleanup`. */
  get cleanup(): Cleanup {
    return () => this.dispose();
  }
}

export function queryAll<E extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): E[] {
  return Array.from(root.querySelectorAll<E>(selector));
}

/** Joins conditional class names — a tiny local alternative to a `clsx` dependency. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab focus inside `container` while it is open and restores focus to the
 * previously active element on teardown. The original modals did neither.
 */
export function trapFocus(container: HTMLElement): Cleanup {
  const previouslyFocused = document.activeElement as HTMLElement | null;

  const focusables = (): HTMLElement[] =>
    queryAll<HTMLElement>(FOCUSABLE, container).filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', onKeyDown);
  focusables()[0]?.focus();

  return () => {
    document.removeEventListener('keydown', onKeyDown);
    previouslyFocused?.focus?.();
  };
}

/**
 * Locks background scrolling while a modal is open. Reference-counted so two
 * overlapping modals cannot unlock the page early.
 */
let scrollLocks = 0;
export function lockScroll(): Cleanup {
  scrollLocks += 1;
  document.body.style.overflow = 'hidden';
  return () => {
    scrollLocks = Math.max(0, scrollLocks - 1);
    if (scrollLocks === 0) document.body.style.overflow = '';
  };
}
