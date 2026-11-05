import type { Metadata } from 'next';
import { CheckCircle2, Calendar, Clock, Mail, CalendarPlus, Download } from 'lucide-react';
import CountdownTimer from '@/components/countdown-timer';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import MetaPixelEvent from '@/components/meta-pixel-event';
import { UNITS_ES } from '@/lib/ui-text-es';
import {
  WEBINAR_ES_DATE_DISPLAY,
  WEBINAR_ES_TIME_DISPLAY,
  WEBINAR_ES_TIME_PACIFIC,
  WEBINAR_ES_DURATION_MINUTES,
  WEBINAR_ES_TIMESTAMP,
  GOOGLE_CALENDAR_URL_ES,
  ICS_DATA_URI_ES,
  JOIN_URL_ES,
  ZOOM_MEETING_ID_ES,
  ZOOM_PASSCODE_ES,
} from '@/lib/webinar-es-config';

export const metadata: Metadata = {
  title: '¡Ya estás registrado! | DMG Agency Core',
  description: 'Tu lugar en la masterclass en español de DMG Agency Core está confirmado.',
  // Thank-you pages stay out of search results: a visitor from Google would skip the form.
  robots: { index: false, follow: false },
};

// The English /confirmed page in Spanish. The Spanish GHL form redirects here.
export default function ConfirmadoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Reaching this page means the form was submitted: the conversion Meta optimises for. */}
      <MetaPixelEvent event="Lead" />
      <SiteHeader ctaLabel="Reservar mi lugar" ctaHref="/es#registro" />

      <section className="relative bg-brand-navy text-white overflow-hidden flex-1">
        <div className="absolute inset-0 z-0 bg-brand-navy">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/90 to-brand-navy" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-red/15 border border-brand-red flex items-center justify-center mb-8">
            <CheckCircle2 className="w-8 h-8 text-brand-red" />
          </div>

          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            LUGAR CONFIRMADO
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
            ¡Ya estás dentro!
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-12 leading-relaxed">
            Tu lugar está reservado. Revisa tu correo — te acabamos de enviar tu
            confirmación y los datos para entrar.
          </p>

          <div className="w-full grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
              <div className="bg-brand-teal/15 p-3 rounded-xl text-brand-teal shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Fecha
                </p>
                <p className="font-bold">{WEBINAR_ES_DATE_DISPLAY}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
              <div className="bg-brand-teal/15 p-3 rounded-xl text-brand-teal shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Hora
                </p>
                <p className="font-bold">
                  {WEBINAR_ES_TIME_DISPLAY}{' '}
                  <span className="font-normal text-gray-400">
                    ({WEBINAR_ES_DURATION_MINUTES} min)
                  </span>
                </p>
                <p className="text-sm text-gray-400">{WEBINAR_ES_TIME_PACIFIC}</p>
              </div>
            </div>
          </div>

          <CountdownTimer
            target={WEBINAR_ES_TIMESTAMP}
            label="La masterclass empieza en"
            units={UNITS_ES}
            liveText="La masterclass está en vivo ahora"
          />

          {/* The room, one click away on the night. */}
          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Tu sala de Zoom
            </p>
            <a
              href={JOIN_URL_ES}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:underline font-medium break-all text-sm"
            >
              {JOIN_URL_ES}
            </a>
            <p className="text-sm text-gray-300 mt-3">
              ID de reunión: <span className="font-bold">{ZOOM_MEETING_ID_ES}</span> · Código:{' '}
              <span className="font-bold">{ZOOM_PASSCODE_ES}</span>
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Guarda este enlace — es el mismo que usarás el día del webinar.
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href={GOOGLE_CALENDAR_URL_ES}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-6 sm:px-8 rounded-full text-base"
            >
              <CalendarPlus className="mr-2 w-5 h-5" />
              Agregar a Google Calendar
            </a>

            <a
              href={ICS_DATA_URI_ES}
              download="dmg-webinar-es.ics"
              className="btn-glow-soft w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap border-2 border-white/25 hover:border-white text-white font-bold py-4 px-6 sm:px-8 rounded-full text-base"
            >
              <Download className="mr-2 w-5 h-5" />
              Apple / Outlook
            </a>
          </div>

          <p className="text-sm text-gray-400 max-w-md">
            Agregarlo a tu calendario es lo mejor que puedes hacer para no perderte la
            sesión.
          </p>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="py-20 md:py-24 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-brand-navy mb-4 text-center">
            Qué sigue
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-12" />

          <ol className="space-y-6">
            {[
              {
                title: 'Revisa tu correo ahora',
                body: 'Tu confirmación va en camino con el enlace para entrar. Si no llega en unos minutos, revisa la carpeta de spam y márcalo como "no es spam" para que te lleguen los recordatorios.',
              },
              {
                title: 'Te enviaremos recordatorios',
                body: 'Antes del webinar te recordamos por correo y por mensaje de texto. Nada de spam entre medio.',
              },
              {
                title: 'Conéctate en vivo — no habrá grabación',
                body: 'Es solo en vivo, así que no habrá nada que ver después. Entra unos minutos antes, con tu pregunta más importante lista — al final hay preguntas en vivo.',
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-5">
                <div className="shrink-0 w-9 h-9 rounded-full bg-brand-red text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-brand-teal/10 p-3 rounded-xl text-brand-teal shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-brand-navy mb-1">¿No te llegó la confirmación?</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Escríbenos a{' '}
                <a
                  href="mailto:admin@dmgagencycorellc.com"
                  className="text-brand-red font-medium hover:underline"
                >
                  admin@dmgagencycorellc.com
                </a>{' '}
                y te ayudamos con tu lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        tagline="Lanzar · Operar · Generar ingresos · Proteger"
        rightsText="Todos los derechos reservados."
      />
    </div>
  );
}
