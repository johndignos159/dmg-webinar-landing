import Image from 'next/image';
import { Award, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/reveal';
import TiltCard from '@/components/tilt-card';

type Props = {
  kicker: string;
  heading: string;
  body: string;
  points: string[];
  /** Same limit the certificate itself prints in its footer. Not optional. */
  note: string;
  image: string;
  imageAlt: string;
  caption: string;
};

/**
 * Certificate of completion, shown before the price cards on both training pages.
 *
 * Everything said here is what really happens (checked Nov 13, 2026): when Cora
 * tags a student as Day 2 attended, the GHL workflow "Dispatch Training · Day 2
 * Documents + Certificate" issues the certificate, and the student's
 * my-certificates.com page offers Download PDF, Add to LinkedIn and Verify
 * credential. One-on-one students are tagged the same way after their sessions.
 *
 * The image is a sample made from the real GHL certificate template with a
 * placeholder name (source: docs/cora-resources/post-class-training/). The date
 * line is left empty on purpose so the sample never shows an old class date.
 */
export default function CertificateSection({
  kicker,
  heading,
  body,
  points,
  note,
  image,
  imageAlt,
  caption,
}: Props) {
  return (
    <section className="py-20 md:py-28 bg-brand-gray overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-12 lg:gap-16 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4 text-brand-red">
            <Award className="w-6 h-6 shrink-0" />
            <span className="font-heading text-sm font-bold uppercase tracking-widest">
              {kicker}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy leading-tight mb-4">
            {heading}
          </h2>
          <div className="w-24 h-1 bg-brand-red rounded-full mb-8" />
          <p className="text-gray-700 text-lg leading-relaxed mb-8">{body}</p>
          <ul className="space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 shrink-0 mt-0.5" />
                <span className="text-brand-navy font-medium leading-snug">{p}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 leading-relaxed mt-8">{note}</p>
        </div>

        <Reveal className="reveal-right">
          <TiltCard max={4}>
            <figure>
              <div className="rounded-2xl bg-white p-2 sm:p-3 ring-1 ring-black/5 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.45)]">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={1600}
                  height={1236}
                  sizes="(min-width: 1024px) 600px, (min-width: 640px) 90vw, 100vw"
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <figcaption className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
                {caption}
              </figcaption>
            </figure>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
