/**
 * Generates the English training emails into emails-training-en/.
 *
 * Run:  node scripts/build-training-en-emails.mjs
 *
 * Never edit the generated .html by hand — change
 * scripts/training-en-email-content.mjs and re-run. Hand edits are silently
 * lost on the next build, which is how the webinar README got overwritten once.
 *
 * Output is deliberately kept in its own folder, separate from the Spanish
 * training's emails-entrenamiento/ and the webinar's emails/, so there is no
 * chance of pasting the wrong training's reminder into a GHL template.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { emails, USING_FALLBACK_PAY_URL } from './training-en-email-content.mjs';
import {
  SESSION_1,
  SESSION_2,
  DAY_1_DISPLAY,
  DAY_2_DISPLAY,
  DAY_1_TIME,
  DAY_2_TIME,
  PRICE,
  LANDING_URL,
} from '../lib/training-en-config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'emails-training-en');

const NAVY = '#1a1a1a';
const RED = '#E23B3B';
const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

// The logo has to load from a host that actually resolves. The training's own
// subdomain does not exist yet, so assets come from the webinar host, which is
// live and serves the same file. Switch this to the training domain once its
// DNS is in place — a broken logo in a paid customer's receipt looks like a
// phishing attempt.
const ASSET_ORIGIN = 'https://webinar.dmgagencycore.com';
const LOGO = `${ASSET_ORIGIN}/images/dmg-logo-email.png`;

// --------------------------------------------------------------- blocks ----

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
        <a href="${ASSET_ORIGIN}" style="text-decoration:none;">
          <img src="${LOGO}" width="58" height="58" alt="DMG Agency Core"
               style="display:block;margin:0 auto 10px;border:0;outline:none;text-decoration:none;">
          <span style="font-family:${FONT};font-size:15px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff;">DMG Agency Core</span>
        </a>
      </td></tr>

      <tr><td style="padding:32px 28px 12px;">
        ${body}
      </td></tr>

      <!--
        No unsubscribe link here on purpose. GHL appends its own per-recipient
        link at send time; one hardcoded into a template would unsubscribe the
        same person every time anyone clicked it. The physical address below is
        the part CAN-SPAM needs from us.
      -->
      <tr><td style="padding:20px 28px 28px;border-top:1px solid #eee;">
        <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:#999;">
          DMG Agency Core LLC &nbsp;&middot;&nbsp; 321-204-9035<br>
          7901 4th St N #22791, St. Petersburg, FL 33702<br>
          <a href="${ASSET_ORIGIN}" style="color:#999;">dmgagencycore.com</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ---------------------------------------------------------------- guards ----
// Refuse to generate rather than produce an email with a dead link in it. An
// email that fails to build is a problem for one developer; an email with a
// broken Zoom link is a problem for everyone who paid $197.
if (!SESSION_1.meetingUrl || !SESSION_2.meetingUrl) {
  console.error('A session is missing its Zoom URL in lib/training-en-config.mjs — refusing to build.');
  process.exit(1);
}
if (SESSION_1.meetingUrl === SESSION_2.meetingUrl) {
  console.error('Both sessions share a Zoom URL in lib/training-en-config.mjs — refusing to build.');
  process.exit(1);
}

// CHECKOUT_URL being empty is NOT fatal here, unlike the Spanish generator:
// the payment link does not exist yet and the recovery buttons fall back to
// the landing page, which works. But it must be impossible to miss.
if (USING_FALLBACK_PAY_URL) {
  console.warn('');
  console.warn('  ⚠  CHECKOUT_URL is empty in lib/training-en-config.mjs.');
  console.warn(`     The 3 recovery emails point at ${LANDING_URL} instead of a`);
  console.warn('     direct payment link. Set CHECKOUT_URL and re-run before the');
  console.warn('     recovery sequence goes live, or people who already registered');
  console.warn('     are asked to register a second time.');
  console.warn('');
}

// ----------------------------------------------------------------- write ----
fs.mkdirSync(OUT, { recursive: true });

const written = [];
for (const e of emails) {
  const html = shell(e.subject, e.blocks);

  // Catch any [PLACEHOLDER] that survived into the output. This is the exact
  // failure that reached real inboxes on the webinar: [MEETING LINK] rendered
  // as literal text because nothing checked.
  const leftovers = html.match(/\[[A-Z_ ]{3,}\]/g);
  if (leftovers) {
    console.error(`${e.file}: unresolved placeholder(s) ${[...new Set(leftovers)].join(', ')}`);
    process.exit(1);
  }

  fs.writeFileSync(path.join(OUT, `${e.file}.html`), html);
  written.push(e);
}

// ---------------------------------------------------------------- readme ----
const row = (e) => `| \`${e.file}.html\` | ${e.ghl} | ${e.trigger} | ${e.en} |`;
const paid = written.filter((e) => e.track === 'paid');
const recovery = written.filter((e) => e.track === 'recovery');

const readme = `# Group Dispatch Training (English) — emails

Generated by \`scripts/build-training-en-emails.mjs\` from
\`scripts/training-en-email-content.mjs\`. **Do not edit the .html files** —
change the content file and re-run:

\`\`\`
node scripts/build-training-en-emails.mjs
\`\`\`

Every date, time and link comes from \`lib/training-en-config.mjs\`, so the
emails cannot disagree with the landing page.

- **Day 1:** ${DAY_1_DISPLAY}
- **Day 2:** ${DAY_2_DISPLAY}
- **Day 1 time:** ${DAY_1_TIME}
- **Day 2 time:** ${DAY_2_TIME}  ← different, and a different Zoom room
- **Price:** $${PRICE} USD

> **These are the English training's emails.** The Spanish training's live in
> \`emails-entrenamiento/\` and its GHL templates are named \`TRAINING - …\`
> while these are \`TRAINING EN - …\`. Pasting one into the other's workflow
> sends a buyer the wrong language, the wrong dates and the wrong Zoom room.

## Track 1 — paid (${paid.length} emails)

Everyone who completes payment. Runs from the receipt through the morning of
day 2.

| File | GHL template | When it sends | What it says |
| --- | --- | --- | --- |
${paid.map(row).join('\n')}

## Track 2 — recovery (${recovery.length} emails)

Registered but never paid. Short on purpose: they already understand the offer,
what is missing is the decision. A longer sequence reads as pressure and costs
unsubscribes.

| File | GHL template | When it sends | What it says |
| --- | --- | --- | --- |
${recovery.map(row).join('\n')}

**The last recovery email promises no further contact about this training.**
Honour it — do not add them to another sequence for this offer.

## Subject lines

| File | Subject |
| --- | --- |
${written.map((e) => `| \`${e.file}.html\` | ${e.subject} |`).join('\n')}

## Loading one into GHL

1. Marketing → Emails → Templates → create a template with the name above
2. Open the \`.html\`, select all, copy
3. Paste over the template's code, save

**Then re-select the template inside every workflow Send Email action.** A
workflow action holds its own copy of a template taken when it was first
chosen; editing the template afterwards does not reach it. That caught us on
the webinar — the templates were right for two days while the emails going out
were still wrong.

## Unsubscribe

There is deliberately no unsubscribe link in these templates. GHL appends a
per-recipient one at send time. A hardcoded link belongs to one contact and
would unsubscribe that same person every time anyone else clicked it.

## Assets

The logo loads from \`${ASSET_ORIGIN}\` because the training subdomain does not
resolve yet. Switch \`ASSET_ORIGIN\` in the generator once it does — a broken
logo in a paid customer's receipt reads as phishing.
`;

fs.writeFileSync(path.join(OUT, 'README.md'), readme);

console.log(`Wrote ${written.length} emails + README to emails-training-en/`);
console.log(`  paid:     ${paid.length}`);
console.log(`  recovery: ${recovery.length}`);
