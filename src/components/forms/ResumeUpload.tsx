'use client';

import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { cn } from '@/lib/dom';

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

/**
 * Drag-and-drop resume field — port of the upload zone in career.php and its
 * handlers in main.js.
 *
 * Validation problems now render inline instead of firing `alert()`.
 */
export default function ResumeUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    if (inputRef.current) inputRef.current.value = '';
    setFileName(null);
  };

  const accept = (file: File | undefined): boolean => {
    if (!file) return false;

    if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
      setError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      reset();
      return false;
    }

    if (file.size > MAX_BYTES) {
      setError('File size must be under 5 MB.');
      reset();
      return false;
    }

    setError('');
    setFileName(file.name);
    return true;
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    accept(event.target.files?.[0]);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (!file || !inputRef.current) return;

    // Move the dropped file into the input so the form submits it.
    const transfer = new DataTransfer();
    transfer.items.add(file);
    inputRef.current.files = transfer.files;

    if (!accept(file)) inputRef.current.value = '';
  };

  return (
    <div className="career-field">
      <label htmlFor="car-resume">
        Upload Resume <span className="required">*</span>
      </label>

      <div
        className={cn('career-upload-zone', (dragging || fileName) && 'drag-over')}
        id="career-upload-zone"
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          id="car-resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          className="career-upload-input"
          ref={inputRef}
          onChange={onChange}
          aria-describedby="car-resume-hint"
        />

        <div className="career-upload-content" id="career-upload-content" style={fileName ? { display: 'none' } : undefined}>
          <div className="career-upload-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="career-upload-title">Drag &amp; Drop your resume here</p>
          <p className="career-upload-hint">
            or <span className="career-upload-browse">browse files</span>
          </p>
          <p className="career-upload-types" id="car-resume-hint">
            Accepts PDF, DOC, DOCX — Max 5MB
          </p>
        </div>

        <div
          className="career-upload-preview"
          id="career-upload-preview"
          style={{ display: fileName ? 'flex' : 'none' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span id="career-upload-filename">{fileName ?? 'filename.pdf'}</span>
          <button
            type="button"
            className="career-upload-remove"
            id="career-upload-remove"
            aria-label="Remove file"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              reset();
              setError('');
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {error ? (
        <p role="alert" style={{ color: '#e53e3e', marginTop: '8px', fontSize: '14px' }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
