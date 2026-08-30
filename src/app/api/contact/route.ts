import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/email/transport';
import { contactEmail } from '@/lib/email/messages';
import { field, hasAll, isValidEmail } from '@/lib/validation';

export const runtime = 'nodejs';

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const VERIFY_TIMEOUT_MS = 15_000;

function back(request: Request, query: string): NextResponse {
  return NextResponse.redirect(new URL(`/contact${query}`, request.url), 303);
}

async function verifyRecaptcha(token: string, remoteIp: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) return true; // Nothing to verify against; the token check above still applies.

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token, remoteip: remoteIp }),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    const data: unknown = await response.json();
    return typeof data === 'object' && data !== null && (data as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

/** Port of contact_submit.php */
export async function POST(request: Request): Promise<NextResponse> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return back(request, '?error=required');
  }

  const submission = {
    firstName: field(formData, 'fname'),
    lastName: field(formData, 'lname'),
    email: field(formData, 'email'),
    phone: field(formData, 'phone'),
    job: field(formData, 'job'),
    country: field(formData, 'country'),
    purpose: field(formData, 'purpose'),
    message: field(formData, 'message'),
  };

  if (
    !hasAll([submission.firstName, submission.lastName, submission.email, submission.job, submission.message])
  ) {
    return back(request, '?error=required');
  }

  if (!isValidEmail(submission.email)) {
    return back(request, '?error=email');
  }

  const token = field(formData, 'g-recaptcha-response');
  if (!token) return back(request, '?error=captcha');

  const remoteIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  if (!(await verifyRecaptcha(token, remoteIp))) {
    return back(request, '?error=captcha');
  }

  try {
    const { html, text } = contactEmail(submission);
    await sendMail({
      fromName: 'ARNOBOT Website',
      subject: 'New Contact Inquiry - ARNOBOT',
      html,
      text,
      replyTo: { name: `${submission.firstName} ${submission.lastName}`, address: submission.email },
    });
    return back(request, '?success=1');
  } catch (error) {
    console.error('[contact] mail error:', error);
    return back(request, '?error=mail');
  }
}

export function GET(request: Request): NextResponse {
  return NextResponse.redirect(new URL('/contact', request.url));
}
