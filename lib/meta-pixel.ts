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
// Leave it empty and no tracking code renders at all — no script, no network
// request, no console noise. That is the current state.
export const META_PIXEL_ID = '';
