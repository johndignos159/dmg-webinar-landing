import type { Metadata } from 'next';
import { CheckCircle2, Calendar, Clock, Video, Mail } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CountdownTimer from '@/components/countdown-timer';
import {
  DAY_1_DISPLAY,
  DAY_2_DISPLAY,
  MEETING_URL,
  TRAINING_TIMESTAMP,
  TIMES_CONFIRMED,
  START_TIME,
  END_TIME,
  TIMEZONE_LABEL,
  SUPPORT_EMAIL,
} from '@/lib/training-config.mjs';

export const metadata: Metadata = {
  title: 'Estás inscrito | DMG Agency Core',
  description: 'Tu lugar en el Entrenamiento de Despacho está confirmado.',
  // Never index a confirmation page. Anyone arriving from a search result
  // would skip both the form and the payment, and the Zoom link is on it.
  robots: { index: false, follow: false },
};

const SCHEDULE_LINE =
  TIMES_CONFIRMED && START_TIME && END_TIME
    ? `${START_TIME} – ${END_TIME} ${TIMEZONE_LABEL}`
    : 'Te enviaremos el horario exacto por correo';

const STEPS = [
  {
    title: 'Revisa tu correo ahora',
    body: 'Te acabamos de enviar la confirmación y el enlace para entrar. Si no llega en unos minutos, revisa la carpeta de spam y marca el correo como "no es spam" para que te lleguen los recordatorios.',
  },
  {
    title: 'Guarda el enlace',
    body: 'Es el mismo enlace los dos días. Guárdalo ahora y funcionará el 31 de octubre y el 1 de noviembre.',
  },
  {
    title: 'Te recordaremos',
    body: 'Recibirás recordatorios conforme se acerque la fecha: dos semanas antes, una semana antes, tres días, un día y la mañana del entrenamiento.',
  },
];

export default function ConfirmadoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader ctaLabel="Reservar mi lugar" ctaHref="/entrenamiento#registro" />

      <section className="relative bg-brand-navy text-white overflow-hidden flex-1">
        <div className="absolute inset-0 z-0 bg-brand-navy">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/90 to-brand-navy" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-red/15 border border-brand-red flex items-center justify-center mb-8">
            <CheckCircle2 className="w-8 h-8 text-brand-red" />
          </div>

          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            PAGO CONFIRMADO
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
            Estás inscrito
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-12 leading-relaxed">
            Tu lugar está reservado. Revisa tu correo — acabamos de enviarte la
            confirmación y los datos para entrar.
          </p>

          <div className="w-full grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
              <div className="bg-brand-teal/15 p-3 rounded-xl text-brand-teal shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Día 1
                </p>
                <p className="font-bold leading-snug">{DAY_1_DISPLAY}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
              <div className="bg-brand-teal/15 p-3 rounded-xl text-brand-teal shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Día 2
                </p>
                <p className="font-bold leading-snug">{DAY_2_DISPLAY}</p>
              </div>
            </div>

            <div className="sm:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
              <div className="bg-brand-teal/15 p-3 rounded-xl text-brand-teal shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Horario
                </p>
                <p className="font-bold leading-snug">{SCHEDULE_LINE}</p>
              </div>
            </div>
          </div>

          <CountdownTimer
            target={TRAINING_TIMESTAMP}
            label="El entrenamiento empieza en"
          />

          {/* Only render the room when there is one. An empty href would give a
              paying customer a dead link on the page that confirms their $197. */}
          {MEETING_URL ? (
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 text-brand-teal mb-3">
                <Video className="w-4 h-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Tu sala de Zoom
                </p>
              </div>
              <a
                href={MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red hover:underline font-medium break-all text-sm"
              >
                {MEETING_URL}
              </a>
              <p className="text-xs text-gray-500 mt-3">
                El mismo enlace los dos días — guárdalo ahora.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-300 leading-relaxed">
                Te enviaremos el enlace de acceso por correo antes del
                entrenamiento.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-24 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-brand-navy mb-4 text-center">
            Qué sigue
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-12" />

          <ol className="space-y-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <div className="shrink-0 w-9 h-9 rounded-full bg-brand-red text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">
                    {step.title}
                  </h3>
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
              <p className="font-bold text-brand-navy mb-1">
                ¿No llega la confirmación?
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Escríbenos a{' '}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-brand-red font-medium hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>{' '}
                y lo resolvemos.
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
