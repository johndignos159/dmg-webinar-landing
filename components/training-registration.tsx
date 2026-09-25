import Script from 'next/script';
import { REGISTRATION_FORM_ID, PRICE, REFUND_POLICY_ES } from '@/lib/training-config.mjs';

const FORM_HEIGHT = 700;

/**
 * Registration step for the Spanish training.
 *
 * Deliberately renders nothing resembling a form until REGISTRATION_FORM_ID is
 * set. An iframe pointed at an empty id loads GoHighLevel's 404, which looks to
 * a visitor like a broken checkout on a page asking for $197 — worse than an
 * honest "not open yet" panel, and the kind of thing that only gets noticed
 * after the ad has been running for a day.
 */
export default function TrainingRegistration() {
  return (
    <section id="registro" className="blueprint-bg py-20 md:py-28 scroll-mt-8">
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            CUPO LIMITADO
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
            Reserva tu lugar
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600">
            Completa tus datos y pasarás al pago seguro de ${PRICE} USD.
          </p>
        </div>

        {!REGISTRATION_FORM_ID ? (
          <div className="rounded-2xl border-2 border-dashed border-brand-navy/20 bg-white/70 p-10 text-center">
            <p className="font-heading text-xl font-bold text-brand-navy mb-3">
              Inscripciones abren pronto
            </p>
            <p className="text-gray-600 leading-relaxed">
              Estamos terminando los últimos detalles. Escríbenos y te avisamos
              en cuanto se abra el registro.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl overflow-hidden">
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${REGISTRATION_FORM_ID}`}
                style={{
                  width: '100%',
                  height: `${FORM_HEIGHT}px`,
                  border: 'none',
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
