import React from 'react';
import { profile } from './data/profile';

/** Fidelity International mark — replace `profile.companyLogoSrc` / file in `public/` with official brand artwork if required. */
export default function FidelityLogo({ className = 'h-7 w-auto' }) {
  return (
    <img
      src={profile.companyLogoSrc}
      alt=""
      aria-hidden
      className={`object-contain ${className}`}
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
    />
  );
}
