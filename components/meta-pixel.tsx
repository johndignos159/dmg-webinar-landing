'use client';

import Script from 'next/script';
import { META_PIXEL_IDS } from '@/lib/meta-pixel';

/**
 * Meta Pixel base code plus the automatic PageView.
 *
 * The base script is placed in the document head and initializes each dataset
 * once. A single PageView call is broadcast to all initialized datasets.
 */
export default function MetaPixel() {
  const initialization = META_PIXEL_IDS.map((id) => `fbq('init', '${id}');`).join('\n');

  return (
    <Script id="meta-pixel" strategy="beforeInteractive">
      {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          ${initialization}
          fbq('track', 'PageView');
        `}
    </Script>
  );
}

/** Meta's no-JavaScript PageView fallback, rendered in the document body. */
export function MetaPixelNoScript() {
  return (
    <noscript>
      {META_PIXEL_IDS.map((id) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={id}
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      ))}
    </noscript>
  );
}
