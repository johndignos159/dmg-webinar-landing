import Script from 'next/script';
import { REGISTRATION_FORM_ID, PRICE, REFUND_POLICY_ES } from '@/lib/training-config.mjs';

const FORM_HEIGHT = 700;

/**
 * Registration step for the Spanish training.
 *
 * Dark panel treatment, matching the dashboard reference John supplied. The
 * GoHighLevel form inside is white and cannot be restyled from here — the
 * iframe is cross-origin, so the browser blocks any CSS this page applies to
 * it. Its colours live in the GHL form builder under Styles.
 *
 * So the white form is treated as the deliberate focal card rather than fought
 * with: dark section, light panel, form sitting in it. That is a stronger
 * layout for a paid conversion anyway — the one bright element on the page is
 * the thing you want clicked.
 *
 * Renders nothing resembling a form until REGISTRATION_FORM_ID is set. An
 * iframe pointed at an empty id loads GHL's 404, which reads to a visitor as a
 * broken checkout on a page asking for $197 — and only gets noticed after the
 * ad has been running for a day.
 */
export default function TrainingRegistration() {
  return (
    <section id="registro" className="dashboard-bg py-20 md:py-28 scroll-mt-8">
      {/* relative + z-10 lifts content above the ambient pools and vignette,
          which are painted by ::before / ::after on the section itself. */}
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-block bg-brand-red/15 border border-brand-red/70 text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            CUPO LIMITADO
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mb-4">
            Reserva tu lugar
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-400">
            Completa tus datos y pasarás al pago seguro de ${PRICE} USD.
          </p>
        </div>

        {!REGISTRATION_FORM_ID ? (
          <div className="dashboard-panel p-10 text-center">
            <p className="font-heading text-xl font-bold text-white mb-3">
              Inscripciones abren pronto
            </p>
            <p className="text-gray-400 leading-relaxed">
              Estamos terminando los últimos detalles. Escríbenos y te avisamos
              en cuanto se abra el registro.
            </p>
          </div>
        ) : (
          <>
            {/* overflow-hidden clips the white iframe to the panel's radius so
                its square corners do not poke past the border. */}
            <div className="dashboard-panel overflow-hidden p-2 sm:p-3">
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${REGISTRATION_FORM_ID}`}
                style={{
                  width: '100%',
                  height: `${FORM_HEIGHT}px`,
                  border: 'none',
                  borderRadius: '12px',
                  // iframes are inline by default and sit on the text baseline,
                  // leaving a few pixels of descender space that would show as
                  // a dark strip under the form.
                  display: 'block',
                }}
                id={`inline-${REGISTRATION_FORM_ID}`}
                data-layout="{'id':'INLINE'}"
                data-form-name="Registro Entrenamiento Despacho"
                data-height={FORM_HEIGHT}
                data-layout-iframe-id={`inline-${REGISTRATION_FORM_ID}`}
                data-form-id={REGISTRATION_FORM_ID}
                title="Registro Entrenamiento de Despacho"
              />
            </div>
            <Script
              src="https://link.msgsndr.com/js/form_embed.js"
              strategy="afterInteractive"
            />
          </>
        )}

        <p className="text-xs text-gray-500 leading-relaxed mt-6 text-center">
          {REFUND_POLICY_ES} Al registrarte aceptas recibir correos y mensajes de
          texto sobre este entrenamiento. Puedes darte de baja en cualquier
          momento.
        </p>
      </div>
    </section>
  );
}
