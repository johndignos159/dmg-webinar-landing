import Script from 'next/script';
import { Check, Calendar, Clock, Video, Languages } from 'lucide-react';
import {
  WEBINAR_ES_DATE_DISPLAY,
  WEBINAR_ES_TIME_DISPLAY,
  WEBINAR_ES_DURATION_MINUTES,
  REGISTRATION_FORM_ID_ES,
  REGISTRATION_FORM_HEIGHT_ES,
} from '@/lib/webinar-es-config';

// The English registration section (registration-form.tsx), in Spanish. Same
// layout: the case for registering on the left, the GHL form on the right.
const BENEFITS = [
  ['Las cuatro formas de entrar', ' — y cuál te conviene de verdad'],
  ['El orden exacto para construir', ' — los cuatro pilares, de principio a fin'],
  ['El manual contra el fraude', ' — $725M perdidos en 2025, y las señales que lo delatan'],
  ['Preguntas en vivo', ' — trae tu situación y recibe una respuesta clara'],
  ['Todo en español', ' — de principio a fin'],
  ['Completamente gratis', ' — sin tarjeta de crédito'],
];

const DETAILS = [
  { icon: Calendar, label: 'Fecha', value: WEBINAR_ES_DATE_DISPLAY },
  { icon: Clock, label: 'Hora', value: `${WEBINAR_ES_TIME_DISPLAY} · ${WEBINAR_ES_DURATION_MINUTES} min` },
  { icon: Video, label: 'Dónde', value: 'En vivo por Zoom — el enlace te llega en cuanto te registras' },
  { icon: Languages, label: 'Idioma', value: 'Español' },
];

/**
 * The form renders inside a cross-origin iframe, so its look comes from the GHL
 * form builder, not from this page. Until REGISTRATION_FORM_ID_ES is set, a
 * notice stands in for it: an iframe with an empty id loads GHL's 404.
 */
export default function WebinarEsRegistration() {
  const formId = REGISTRATION_FORM_ID_ES;
  return (
    <section id="registro" className="blueprint-bg py-16 md:py-24 scroll-mt-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="lg:border-x lg:border-brand-navy/10">
          <div className="text-center px-2 pb-10 md:pb-14">
            <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
              CUPO LIMITADO
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black uppercase text-brand-navy leading-[0.95]">
              Reserva tu lugar
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 border-t border-brand-navy/10">
            {/* LEFT — the case for showing up */}
            <div className="space-y-10 py-10 lg:py-14 lg:pr-12 xl:pr-16">
              <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                Una sesión sobre cómo se construye de verdad un negocio de transporte —
                en el orden correcto, con alguien que se dedica a esto. Esto es lo que
                te llevas:
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
                  Solo en vivo. Sin grabación.
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

            {/* RIGHT — the form */}
            <div className="border-t border-brand-navy/10 lg:border-t-0 lg:border-l lg:pl-12 xl:pl-16 py-10 lg:py-14">
              {!formId ? (
                <div className="rounded-2xl border border-brand-navy/10 bg-white p-10 text-center">
                  <p className="font-heading text-xl font-bold text-brand-navy mb-3">
                    Inscripciones abren pronto
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Estamos terminando los últimos detalles. Escríbenos a{' '}
                    <a
                      href="mailto:admin@dmgagencycorellc.com"
                      className="text-brand-red font-medium hover:underline"
                    >
                      admin@dmgagencycorellc.com
                    </a>{' '}
                    y te avisamos en cuanto se abra el registro.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden">
                  <iframe
                    src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
                    style={{
                      width: '100%',
                      height: `${REGISTRATION_FORM_HEIGHT_ES}px`,
                      border: 'none',
                      display: 'block',
                    }}
                    id={`inline-${formId}`}
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Webinar Registration ES"
                    data-height={REGISTRATION_FORM_HEIGHT_ES}
                    data-layout-iframe-id={`inline-${formId}`}
                    data-form-id={formId}
                    title="Registro al webinar"
                  />
                </div>
              )}

              <p className="text-xs text-gray-500 leading-relaxed mt-6">
                Al registrarte aceptas que DMG Agency Core LLC te envíe correos y
                mensajes de texto sobre esta masterclass y sobre sus servicios para
                negocios de transporte. Pueden aplicar tarifas de mensajes y datos.
                Puedes darte de baja en cualquier momento con el enlace de cualquier
                correo, o respondiendo STOP a un mensaje de texto.
              </p>
            </div>
          </div>
        </div>
      </div>

      {formId && (
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
      )}
    </section>
  );
}
