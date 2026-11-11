'use client';

import type { ReactNode } from 'react';

type Fbq = (...args: unknown[]) => void;

/**
 * Link to the one-on-one (private) training order page in DMG Shop.
 *
 * The shop's order pages carry no Meta pixel, so this page is the last place
 * Meta can see the visitor. The click reports InitiateCheckout with the private
 * price, so an ad that sends people here still gets credit for the interest.
 * Navigation is a normal link: if the pixel is blocked, nothing changes.
 */
export default function PrivateCheckoutLink({
  href,
  price,
  name,
  className,
  children,
}: {
  href: string;
  price: string;
  name: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        const fbq = (window as { fbq?: Fbq }).fbq;
        if (fbq) {
          fbq('track', 'InitiateCheckout', {
            value: Number(price),
            currency: 'USD',
            content_name: name,
          });
        }
      }}
    >
      {children}
    </a>
  );
}
