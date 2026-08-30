import { escapeHtml, nl2br } from '@/lib/validation';
import { renderEmailLayout, renderEmailText, type EmailRow } from './layout';

const NOT_PROVIDED = 'Not Provided';

export interface ContactSubmission {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly job: string;
  readonly country: string;
  readonly purpose: string;
  readonly message: string;
}

export function contactEmail(data: ContactSubmission): { html: string; text: string } {
  const rows: EmailRow[] = [
    { label: 'First Name', value: escapeHtml(data.firstName) },
    { label: 'Last Name', value: escapeHtml(data.lastName) },
    { label: 'Email', value: escapeHtml(data.email) },
    { label: 'Phone', value: escapeHtml(data.phone) || NOT_PROVIDED },
    { label: 'Designation', value: escapeHtml(data.job) },
    { label: 'Country', value: escapeHtml(data.country) || NOT_PROVIDED },
    { label: 'Inquiry', value: escapeHtml(data.purpose) },
    { label: 'Message', value: nl2br(escapeHtml(data.message)), multiline: true },
  ];

  return {
    html: renderEmailLayout({
      title: 'New Contact Inquiry - ARNOBOT',
      heading: 'New Contact Inquiry',
      rows,
      footnote: 'This inquiry was submitted from the ARNOBOT website.',
    }),
    text: renderEmailText('New Contact Inquiry', [
      { label: 'Name', value: `${data.firstName} ${data.lastName}` },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Designation', value: data.job },
      { label: 'Country', value: data.country },
      { label: 'Inquiry', value: data.purpose },
      { label: 'Message', value: `\n${data.message}` },
    ]),
  };
}

export interface CareerSubmission {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly role: string;
  readonly experience: string;
  readonly portfolio: string;
  readonly cover: string;
  readonly resumeName: string;
}

export function careerEmail(data: CareerSubmission): { html: string; text: string } {
  const rows: EmailRow[] = [
    { label: 'Full Name', value: escapeHtml(data.name) },
    { label: 'Email', value: escapeHtml(data.email) },
    { label: 'Phone', value: escapeHtml(data.phone) || NOT_PROVIDED },
    { label: 'Role Applying For', value: escapeHtml(data.role) },
    { label: 'Experience', value: escapeHtml(data.experience) },
    { label: 'Portfolio / LinkedIn', value: escapeHtml(data.portfolio) || NOT_PROVIDED },
    { label: 'Resume', value: escapeHtml(data.resumeName) },
    { label: 'Why ARNOBOT?', value: nl2br(escapeHtml(data.cover)), multiline: true },
  ];

  return {
    html: renderEmailLayout({
      title: 'New Career Application - ARNOBOT',
      heading: 'New Career Application',
      rows,
      footnote: 'This application was submitted from the ARNOBOT website.',
    }),
    text: renderEmailText('New Career Application', [
      { label: 'Name', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Role', value: data.role },
      { label: 'Experience', value: data.experience },
      { label: 'Portfolio', value: data.portfolio },
      { label: 'Why ARNOBOT', value: `\n${data.cover}` },
    ]),
  };
}

export interface DemoSubmission {
  readonly fname: string;
  readonly lname: string;
  readonly email: string;
  readonly phone: string;
  readonly company: string;
  readonly job: string;
  readonly product: string;
  readonly datetime: string;
  readonly message: string;
}

/** schedule_demo_submit.php used its own lighter template, kept as-is. */
export function demoEmail(data: DemoSubmission): { html: string; text: string } {
  const row = (label: string, value: string, last = false): string => `
            <tr>
                <td style="${last ? '' : 'border-bottom:1px solid #eee;'}${last ? 'vertical-align:top;' : ''}"><strong>${label}</strong></td>
                <td style="${last ? '' : 'border-bottom:1px solid #eee;'}">${value}</td>
            </tr>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;border:1px solid #ddd;padding:25px;">

        <h2 style="color:#375e9d;margin-top:0;">
            New Demo Schedule Request
        </h2>

        <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;">
${row('First Name', escapeHtml(data.fname))}
${row('Last Name', escapeHtml(data.lname))}
${row('Email', escapeHtml(data.email))}
${row('Phone', escapeHtml(data.phone))}
${row('Company / Organisation', escapeHtml(data.company))}
${row('Job Title', escapeHtml(data.job))}
${row('Product of Interest', escapeHtml(data.product))}
${row('Preferred Date &amp; Time', escapeHtml(data.datetime))}
${row('Requirements / Scope', nl2br(escapeHtml(data.message)), true)}
        </table>

        <p style="margin-top:25px;color:#777;font-size:13px;">
            This demo request was submitted from the ARNOBOT website.
        </p>

    </div>`;

  const text = renderEmailText('New Demo Schedule Request', [
    { label: 'Name', value: `${data.fname} ${data.lname}` },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
    { label: 'Company', value: data.company },
    { label: 'Job Title', value: data.job },
    { label: 'Product', value: data.product },
    { label: 'Preferred Date & Time', value: data.datetime },
    { label: 'Requirements', value: data.message },
  ]);

  return { html, text };
}
