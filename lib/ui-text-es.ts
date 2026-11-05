// Spanish wording for the shared components, which default to English.
// Kept out of the components themselves: they are client components, and a
// server page that imports a plain value from a 'use client' file gets a
// client reference instead of the value.

/** CountdownTimer `units`. */
export const UNITS_ES = ['Días', 'Horas', 'Minutos', 'Segundos'] as const;

/** FlipCard `text`. */
export const FLIP_TEXT_ES = {
  cta: 'Qué se necesita →',
  back: 'Qué se necesita para empezar',
  hint: 'Ver qué se necesita para empezar.',
};
