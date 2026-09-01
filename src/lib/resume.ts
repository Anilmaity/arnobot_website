/**
 * Resume upload limits, shared by the careers form — which checks the file
 * before the upload starts — and /api/career, whose check is the one that
 * counts. One definition, so the two can never disagree about what is allowed.
 */
export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export const RESUME_EXTENSIONS = ['pdf', 'doc', 'docx'] as const;

export const RESUME_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

/** The file input's `accept` attribute, derived so it tracks the list above. */
export const RESUME_ACCEPT = RESUME_EXTENSIONS.map((ext) => `.${ext}`).join(',');
