/** PHP's `htmlspecialchars($v, ENT_QUOTES, 'UTF-8')`. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** PHP's `nl2br()`. */
export function nl2br(value: unknown): string {
  return String(value ?? '').replace(/(\r\n|\n\r|\r|\n)/g, '<br />$1');
}

/** Matches the practical strictness of PHP's FILTER_VALIDATE_EMAIL. */
export function isValidEmail(value: unknown): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value ?? '').trim());
}

/** Reads a trimmed text field out of a submitted FormData. */
export function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

/** Reads an uploaded file, or null when the field is empty. */
export function fileField(formData: FormData, name: string): File | null {
  const value = formData.get(name);
  return value instanceof File && value.size > 0 && value.name ? value : null;
}

export function hasAll(values: readonly string[]): boolean {
  return values.every((value) => value.length > 0);
}
