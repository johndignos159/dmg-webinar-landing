import Script from 'next/script';
import { WEBINAR_DATE_DISPLAY, WEBINAR_TIME_DISPLAY } from '@/lib/webinar-config';

const FORM_ID = 'chuVjUognnNozdZ3Fy7r';

// Taken from data-height in the embed code GHL generates. Re-copy the embed
// code and update this if you add or remove fields, otherwise the form loads
// with either a scrollbar (too small) or a blank strip below it (too large).
const FORM_HEIGHT = 923;

/**
 * GoHighLevel form embed.
 *
 * The form itself renders inside an iframe, so its styling comes from the GHL
 * form builder, not from this page. To change how the fields look, edit the
 * form in GHL — nothing here will affect it.
 *
 * form_embed.js listens for a postMessage from the iframe and sets the height
 * to fit the content. The height below is only a starting value so the layout
 * does not collapse before that script runs — set close to the real height so
 * there is no visible jump, no gap under the form, and no inner scrollbar.
 *
 * Note: nothing here can change padding *inside* the form. The iframe is
 * cross-origin, so the browser blocks any styling from this page reaching it.
 * Inner spacing is set in the GHL form builder under Styles.
 */
export default function RegistrationForm() {
  return (
    <section
      id="register"
      className="blueprint-bg py-20 md:py-28 scroll-mt-8"
    >
      {/* relative + z-10 lifts the content above the grid and drifting glow,
          which are painted by ::before / ::after on the section itself. */}
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            LIMITED SEATS
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
            Reserve Your Seat
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600">
            {WEBINAR_DATE_DISPLAY} at {WEBINAR_TIME_DISPLAY}. It is free, and the
            recording is not guaranteed — the room is where the Q&amp;A happens.
          </p>
        </div>

        {/* No background or padding here on purpose. The GHL form carries its
            own solid colour, so any wrapper styling shows up as a frame around
            it. overflow-hidden just clips the iframe to the rounded corners. */}
        <div className="rounded-2xl overflow-hidden">
          <iframe
            src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
            style={{
              width: '100%',
              height: `${FORM_HEIGHT}px`,
              border: 'none',
              // iframes are inline elements by default, so they sit on the text
              // baseline and leave a few pixels of descender space underneath.
              // That gap shows the section background as a strip under the form.
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

        <p className="text-center text-sm text-gray-500 mt-6">
          We will only email you about this masterclass. Unsubscribe any time.
        </p>
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
