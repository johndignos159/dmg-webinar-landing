import Script from 'next/script';
import { Check, Calendar, Clock, Video, Languages } from 'lucide-react';
import {
  WEBINAR_DATE_DISPLAY,
  WEBINAR_TIME_DISPLAY,
  WEBINAR_DURATION_MINUTES,
} from '@/lib/webinar-config';

const FORM_ID = 'chuVjUognnNozdZ3Fy7r';

// Taken from data-height in the embed code GHL generates. Re-copy the embed
// code and update this if you add or remove fields, otherwise the form loads
// with either a scrollbar (too small) or a blank strip below it (too large).
const FORM_HEIGHT = 923;

// Six reasons to register, in the order the session delivers them. Six because
// a shorter list looks thin next to a 923px form and a longer one starts
// reading as filler.
const BENEFITS = [
  ['The four ways in', ' — and which one actually fits you'],
  ['The exact order to build in', ' — the four pillars, start to finish'],
  ['The fraud playbook', ' — $725M lost in 2025, and the red flags that give it away'],
  ['Live Q&A', ' — bring your own situation, get a straight answer'],
  ['Presented bilingual', ' — English and Spanish'],
  ['Completely free', ' — no credit card, no pitch to sit through'],
];

// Session facts, pulled out of the intro copy so they sit somewhere scannable.
// This block takes the place of the product screenshot in the reference layout —
// a second photo here would only repeat the hero image a screen further down.
const DETAILS = [
  { icon: Calendar, label: 'Date', value: WEBINAR_DATE_DISPLAY },
  { icon: Clock, label: 'Time', value: `${WEBINAR_TIME_DISPLAY} · ${WEBINAR_DURATION_MINUTES} min` },
  { icon: Video, label: 'Where', value: 'Live on Zoom — link sent straight after you register' },
  { icon: Languages, label: 'Language', value: 'English and Spanish' },
];

/**
 * GoHighLevel form embed, in a two-column layout: the case for registering on
 * the left, the form itself on the right.
 *
 * The form renders inside an iframe, so its styling comes from the GHL form
 * builder, not from this page. To change how the fields look, edit the form in
 * GHL — nothing here will affect it. The same goes for padding *inside* the
 * form: the iframe is cross-origin, so the browser blocks any styling from this
 * page reaching it. Inner spacing is set in the GHL form builder under Styles.
 *
 * form_embed.js listens for a postMessage from the iframe and sets the height
 * to fit the content. FORM_HEIGHT above is only a starting value so the layout
 * does not collapse before that script runs.
 */
export default function RegistrationForm() {
  return (
    <section id="register" className="blueprint-bg py-16 md:py-24 scroll-mt-8">
      {/* relative + z-10 lifts the content above the grid and drifting glow,
          which are painted by ::before / ::after on the section itself. */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* The rules are the layout. Vertical edges only appear once the two
            columns exist, so they are gated to lg alongside the grid. */}
        <div className="lg:border-x lg:border-brand-navy/10">
          <div className="text-center px-2 pb-10 md:pb-14">
            <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
              LIMITED SEATS
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black uppercase text-brand-navy leading-[0.95]">
              Reserve Your Seat
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 border-t border-brand-navy/10">
            {/* LEFT — the case for showing up */}
            <div className="space-y-10 py-10 lg:py-14 lg:pr-12 xl:pr-16">
              <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                One session on how a transportation business actually gets built —
                in the right order, by someone who does it for a living. Here is
                what you walk out with:
              </p>

              <ul className="space-y-4">
                {BENEFITS.map(([bold, rest]) => (
                  <li key={bold} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-brand-red" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-bold text-brand-navy">{bold}</span>
                      {rest}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="space-y-5">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy">
                  Live only. No recording.
                </h3>
                <div className="rounded-xl border border-brand-navy/10 bg-brand-navy p-6 space-y-5">
                  {DETAILS.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="mt-0.5 shrink-0 text-brand-red">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                          {label}
                        </p>
                        <p className="text-white font-medium leading-snug mt-0.5">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — the form. The divider flips from a top rule on mobile to
                a left rule once the columns sit side by side. */}
            <div className="border-t border-brand-navy/10 lg:border-t-0 lg:border-l lg:pl-12 xl:pl-16 py-10 lg:py-14">
              {/* No background or padding on this wrapper on purpose. The GHL
                  form carries its own solid colour, so any wrapper styling shows
                  up as a frame around it. overflow-hidden clips the iframe to
                  the rounded corners. */}
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
                  style={{
                    width: '100%',
                    height: `${FORM_HEIGHT}px`,
                    border: 'none',
                    // iframes are inline by default, so they sit on the text
                    // baseline and leave a few pixels of descender space
                    // underneath. That gap shows the section background as a
                    // strip under the form.
                    display: 'block',
                  }}
                  id={`inline-${FORM_ID}`}
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Webinar Registration"
                  data-height={FORM_HEIGHT}
                  data-layout-iframe-id={`inline-${FORM_ID}`}
                  data-form-id={FORM_ID}
                  title="Webinar Registration"
                />
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mt-6">
                By registering you agree that DMG Agency Core LLC may email and
                text you about this masterclass and related trucking business
                services. Message and data rates may apply. You can unsubscribe
                at any time from the link in any email, or by replying STOP to a
                text.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* afterInteractive rather than lazyOnload: the form is the point of the
          page, so the resize script should not wait for everything else. */}
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </section>
  );
}
