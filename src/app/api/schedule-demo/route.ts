import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/email/transport';
import { demoEmail } from '@/lib/email/messages';
import { field, hasAll, isValidEmail } from '@/lib/validation';

export const runtime = 'nodejs';

/** The JSON shape the demo modal's fetch expects, unchanged from the PHP endpoint. */
export interface DemoResponse {
  readonly status: boolean;
  readonly message: string;
}

function json(body: DemoResponse, status = 200): NextResponse {
  return NextResponse.json(body, { status });
}

/** Port of schedule_demo_submit.php */
export async function POST(request: Request): Promise<NextResponse> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ status: false, message: 'Invalid request.' }, 400);
  }

  const submission = {
    fname: field(formData, 'fname'),
    lname: field(formData, 'lname'),
    email: field(formData, 'email'),
    phone: field(formData, 'phone'),
    company: field(formData, 'company'),
    job: field(formData, 'job'),
    product: field(formData, 'product'),
    datetime: field(formData, 'datetime'),
    message: field(formData, 'message'),
  };

  const required = [
    submission.fname,
    submission.lname,
    submission.email,
    submission.phone,
    submission.company,
    submission.job,
    submission.product,
    submission.datetime,
  ];

  if (!hasAll(required)) {
    return json({ status: false, message: 'Please fill all required fields.' }, 422);
  }

  if (!isValidEmail(submission.email)) {
    return json({ status: false, message: 'Please enter a valid email address.' }, 422);
  }

  try {
    const { html, text } = demoEmail(submission);
    await sendMail({
      fromName: 'ARNOBOT Website',
      subject: 'New Demo Schedule Request - ARNOBOT',
      html,
      text,
      replyTo: { name: `${submission.fname} ${submission.lname}`, address: submission.email },
    });
    return json({ status: true, message: 'Demo request submitted successfully.' });
  } catch (error) {
    console.error('[schedule-demo] mail error:', error);
    return json({ status: false, message: 'Unable to send your request. Please try again later.' }, 502);
  }
}

export function GET(): NextResponse {
  return json({ status: false, message: 'Invalid request.' }, 405);
}
