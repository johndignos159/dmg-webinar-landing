// ============================================================================
// META PIXEL — the one value you edit to switch tracking on.
// ============================================================================
//
// WHERE TO FIND IT
// Meta Events Manager -> Data Sources -> your dataset. The ID sits under the
// dataset name, and also appears inside the base code Meta shows you, on the
// line that reads:  fbq('init', '1234567890123456');
// It is the 15-16 digit number in those quotes.
//
// It is NOT the business_id in the browser address bar — that identifies your
// ad account, not the pixel, and tracking silently records nothing if you use
// it by mistake.
//
// The pixel ID is not a secret. It ships in the page source of every site that
// uses one, which is why it lives here rather than in an environment variable.
//
// Set on 2026-08-18. Emptying this string switches all tracking off again —
// no script, no network request — which is the clean way to disable it without
// unpicking the components.
// Keep both datasets initialized globally. One fbq('track', 'PageView') call
// sends the event to each initialized dataset without duplicating the call.
export const META_PIXEL_IDS = ['1752983249236168', '1650730799896868'] as const;

// Kept for the existing webinar Lead-event component, which only needs to
// know whether the original webinar pixel is enabled.
export const META_PIXEL_ID = META_PIXEL_IDS[0];
