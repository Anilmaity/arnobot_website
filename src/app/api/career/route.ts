import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/email/transport';
import { careerEmail } from '@/lib/email/messages';
import { field, fileField, hasAll, isValidEmail } from '@/lib/validation';
import { MAX_RESUME_BYTES, RESUME_EXTENSIONS } from '@/lib/resume';

export const runtime = 'nodejs';

/** Back to the form on /career/open-positions, with the outcome in the query. */
function back(request: Request, query: string): NextResponse {
  return NextResponse.redirect(new URL(`/career/open-positions${query}`, request.url), 303);
}

function extensionOf(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

/** Port of career_submit.php */
export async function POST(request: Request): Promise<NextResponse> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return back(request, '?error=required');
  }

  const name = field(formData, 'name');
  const email = field(formData, 'email');
  const phone = field(formData, 'phone');
  const role = field(formData, 'role');
  const experience = field(formData, 'experience');
  const portfolio = field(formData, 'portfolio');
  const cover = field(formData, 'cover');

  if (!hasAll([name, email, role, experience, cover])) {
    return back(request, '?error=required');
  }

  if (!isValidEmail(email)) {
    return back(request, '?error=email');
  }

  const resume = fileField(formData, 'resume');
  if (!resume) return back(request, '?error=resume');
  if (resume.size > MAX_RESUME_BYTES) return back(request, '?error=resume_size');
  if (!RESUME_EXTENSIONS.includes(extensionOf(resume.name) as (typeof RESUME_EXTENSIONS)[number])) {
    return back(request, '?error=resume_type');
  }

  try {
    const { html, text } = careerEmail({
      name,
      email,
      phone,
      role,
      experience,
      portfolio,
      cover,
      resumeName: resume.name,
    });

    await sendMail({
      fromName: 'ARNOBOT Careers',
      subject: `New Career Application - ${role}`,
      html,
      text,
      replyTo: { name, address: email },
      attachments: [{ filename: resume.name, content: Buffer.from(await resume.arrayBuffer()) }],
    });

    return back(request, '?success=1');
  } catch (error) {
    console.error('[career] mail error:', error);
    return back(request, '?error=mail');
  }
}

export function GET(request: Request): NextResponse {
  return NextResponse.redirect(new URL('/career/open-positions?error=invalid_request', request.url));
}
