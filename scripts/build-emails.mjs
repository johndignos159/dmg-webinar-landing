/**
 * Generates brand-styled, email-client-safe HTML for every webinar email.
 *
 *   node scripts/build-emails.mjs
 *
 * Copy lives in email-content.mjs — edit there, not here, and not in the
 * generated files. Output lands in emails/, one complete email per file,
 * ready to paste into a GoHighLevel template of type "html".
 *
 * Why tables and inline styles: Outlook renders with Word's engine, and Gmail
 * strips <style> blocks in several contexts. Table layout plus inline CSS is
 * the only combination that survives everywhere.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { emails } from './email-content.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'emails');
mkdirSync(OUT, { recursive: true });

const RED = '#DC143C';
const NAVY = '#1a1a1a';
const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif";

// Email clients cannot load local files or data: URIs — Gmail blocks both — so
// the logo has to come from a public URL. This one is served by the live site.
// If the domain changes, update this and re-run the script.
const SITE = 'https://dmg-webinar-landing.vercel.app';
const LOGO = `${SITE}/images/dmg-logo-email.png`;

// --- block renderers -------------------------------------------------------

const p = (t) =>
  `<p style="margin:0 0 16px;font-family:${FONT};font-size:16px;line-height:1.65;color:${NAVY};">${t}</p>`;

const h = (t) =>
  `<p style="margin:28px 0 12px;font-family:${FONT};font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${RED};">${t}</p>`;

const small = (t) =>
  `<p style="margin:0 0 16px;font-family:${FONT};font-size:14px;line-height:1.6;color:#666;">${t}</p>`;

const list = (items) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">${items
    .map(
      (i) =>
        `<tr><td valign="top" style="padding:0 10px 10px 0;font-family:${FONT};font-size:16px;color:${RED};line-height:1.65;">&bull;</td><td style="padding:0 0 10px;font-family:${FONT};font-size:16px;line-height:1.65;color:${NAVY};">${i}</td></tr>`,
    )
    .join('')}</table>`;

const btn = ({ text, url }) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="background:${RED};border-radius:999px;"><a href="${url}" style="display:inline-block;padding:15px 34px;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.4px;">${text}</a></td></tr></table>`;

const box = (rows) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;background:#f7f7f7;border-left:3px solid ${RED};border-radius:4px;"><tr><td style="padding:18px 20px;">${rows
    .map(
      ([k, v]) =>
        `<p style="margin:0 0 6px;font-family:${FONT};font-size:15px;line-height:1.5;color:${NAVY};"><strong>${k}</strong> ${v}</p>`,
    )
    .join('')}</td></tr></table>`;

const RENDER = { p, h, small, list, btn, box };

function shell(subject, blocks) {
  const body = blocks
    .map((b) => {
      const [kind, value] = Object.entries(b)[0];
      if (!RENDER[kind]) throw new Error(`Unknown block type "${kind}" in "${subject}"`);
      return RENDER[kind](value);
    })
    .join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">

      <tr><td align="center" style="background:${NAVY};padding:22px;">
        <a href="${SITE}" style="text-decoration:none;">
          <img src="${LOGO}" width="58" height="58" alt="DMG Agency Core"
               style="display:block;margin:0 auto 10px;border:0;outline:none;text-decoration:none;">
          <span style="font-family:${FONT};font-size:15px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff;">DMG Agency Core</span>
        </a>
      </td></tr>

      <tr><td style="padding:32px 28px 12px;">
        ${body}
      </td></tr>

      <!--
        No unsubscribe link here on purpose.

        GHL appends its own on send — a per-recipient, per-message URL at
        services.msgsndr.com carrying a JWT that encodes that contact's id and
        email. It cannot be written into a template: hardcoding one recipient's
        link would unsubscribe that person every time anyone else clicked it.

        An unsubscribe merge field was tried here and rendered as dead text.
        Do not add one back. The physical address below is the part CAN-SPAM
        needs from us; GHL supplies the opt-out.
      -->
      <tr><td style="padding:20px 28px 28px;border-top:1px solid #eee;">
        <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:#999;">
          DMG Agency Core LLC &nbsp;&middot;&nbsp; 321-204-9035<br>
          7901 4th St N #22791, St. Petersburg, FL 33702<br>
          <a href="${SITE}" style="color:#999;">dmgagencycore.com</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// --- write -----------------------------------------------------------------

const index = [];
const mapping = [];

for (const e of emails) {
  // Entries prefixed with an underscore are retired — kept in the content file
  // for reference but not written out or listed.
  if (e.file.startsWith('_')) continue;

  const html = shell(e.subject, e.blocks);
  writeFileSync(join(OUT, `${e.file}.html`), html, 'utf8');
  index.push(`| \`${e.file}.html\` | ${e.subject} |`);

  // Anything still holding a [PLACEHOLDER] cannot be pasted yet. Derived from
  // the generated HTML rather than trusted from the data, so the table cannot
  // drift away from what the files actually contain.
  const left = [...html.matchAll(/\[[A-Z ]+\]/g)].map((m) => m[0]);
  const status = e.ready && left.length === 0
    ? '**yes**'
    : `wait — ${[...new Set(left)].map((l) => `\`${l}\``).join(' ')}`;
  mapping.push(`| \`${e.file}.html\` | ${e.ghl} | ${status} |`);
}

const readyCount = mapping.filter((r) => r.includes('**yes**')).length;
const liveCount = mapping.length;

writeFileSync(
  join(OUT, 'README.md'),
  `# Webinar emails

Generated by \`scripts/build-emails.mjs\` from copy in
\`scripts/email-content.mjs\`. Do not edit the \`.html\` files directly — change
the content file and re-run \`node scripts/build-emails.mjs\`.

Copy is written against **Transportation_Entrepreneur_Blueprint.pptx**, so the
emails promise exactly what the session delivers. If the deck changes, update
\`email-content.mjs\`.

## Which file goes into which GHL template

**${readyCount} of ${liveCount} are ready to paste.** The "wait" rows still
contain placeholders — pasting them now means pasting them twice.

| File here | GHL template | Ready? |
| --- | --- | --- |
${mapping.join('\n')}

## How to load one into GHL

1. Marketing → Emails → Templates → open the matching template
2. Open the \`.html\` file, select all, copy
3. Paste over the existing code, save
4. Subject lines have not changed — leave them alone

## Placeholders

Anything shown as "wait" above needs a **per-appointment merge field**, which
cannot be hardcoded. Insert those from the merge-field dropdown inside the
workflow's email editor.

Everything else — the Zoom room, calendar link, booking calendar and intake
form — is already baked in.

Merge fields (\`{{contact.first_name}}\`, \`{{appointment.start_time}}\`) are
already GHL syntax and need no change.

## Unsubscribe

There is deliberately **no unsubscribe link in these templates.** GHL appends
its own at send time — a per-recipient URL carrying a token that encodes that
contact's id and email.

Never paste a real unsubscribe URL into a template. It belongs to one recipient,
so everyone who clicked it would unsubscribe that same person instead of
themselves.

## Subject lines

| File | Subject |
| --- | --- |
${index.join('\n')}
`,
  'utf8',
);

console.log(`Wrote ${emails.length} emails + README to emails/`);
