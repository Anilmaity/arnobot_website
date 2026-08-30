'use client';

import { useRef } from 'react';
import Toast from '@/components/ui/Toast';
import { LinkIcon } from '@/components/ui/Icons';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

/**
 * Approved press boilerplate with a copy button — port of the `.copy-text-btn`
 * card and its inline script in media-kit.php.
 */
export default function BoilerplateCard({ text }: { readonly text: string }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const { copy, copied, failed } = useCopyToClipboard();

  return (
    <>
      <div className="mk-boilerplate-card">
        <div className="bp-card-top">
          <h4 className="russo">Approved Standard Boilerplate (For Press Releases)</h4>
          <button
            type="button"
            className="btn-copy-bp copy-text-btn"
            data-target="bp-text-1"
            onClick={() => void copy(bodyRef.current?.innerText.replace(/^"|"$/g, '').trim() ?? text)}
          >
            <LinkIcon size={14} />
            Copy Boilerplate
          </button>
        </div>
        <div className="bp-content-box" id="bp-text-1" ref={bodyRef}>
          &quot;{text}&quot;
        </div>
      </div>

      <Toast
        id="mk-toast"
        show={copied}
        message={failed ? 'Copying is blocked — select and copy manually.' : 'Official boilerplate copied to clipboard!'}
      />
    </>
  );
}
