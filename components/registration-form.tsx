import Script from 'next/script';
import { WEBINAR_DATE_DISPLAY, WEBINAR_TIME_DISPLAY } from '@/lib/webinar-config';

const FORM_ID = 'chuVjUognnNozdZ3Fy7r';

/**
 * GoHighLevel form embed.
 *
 * The form itself renders inside an iframe, so its styling comes from the GHL
 * form builder, not from this page. To change how the fields look, edit the
 * form in GHL — nothing here will affect it.
 *
 * form_embed.js listens for a postMessage from the iframe and sets the height
 * to fit the content. The height below is only a starting value so the layout
 * does not collapse before that script runs.
 */
export default function RegistrationForm() {
  return (
    <section id="register" className="py-20 md:py-28 bg-brand-gray scroll-mt-8">
      <div className="max-w-2xl mx-auto px-6">
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

        {/* White card on a grey section, so a GHL form left at its default
            white background blends in with no styling needed on their side. */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
          <iframe
            src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
            style={{
              width: '100%',
              height: '560px',
              border: 'none',
              borderRadius: '4px',
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
            data-height="undefined"
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
