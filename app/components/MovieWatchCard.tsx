"use client";

import React from "react";

export type MovieBannerProps = {
  src: string;
  alt?: string;

  title?: string;
  description?: string;

  buttonText?: string;
  buttonHref?: string;

  className?: string;
  heightClassName?: string;
};

const MovieBanner: React.FC<MovieBannerProps> = ({
  src,
  alt = "",
  title,
  description,
  buttonText,
  buttonHref,
  className = "",
  heightClassName = "h-56 md:h-96",
}) => {
  return (
    <div className={`relative w-full ${className}`} role="region" aria-label={title || "Featured movie"}>
      <div className={`relative overflow-hidden rounded-base ${heightClassName}`}>
        <img src={src} alt={alt || title || ""} className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-20 p-6 text-white md:p-10">
          {title && (
            <h2 className="mb-2 text-2xl font-bold md:text-4xl">
              {title}
            </h2>
          )}

          {description && (
            <p className="mb-5 max-w-2xl text-sm text-white/90 md:text-base">
              {description}
            </p>
          )}

          {buttonText && buttonHref && (
            <a
              href={buttonHref} className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/40">
              {buttonText}
              <svg className="ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6 6 6-6 6"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;