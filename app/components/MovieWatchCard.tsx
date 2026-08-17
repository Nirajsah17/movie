"use client";

import React from "react";
import Link from "next/link";

export type MovieBannerProps = {
  id:string;
  src: string;
  alt?: string;

  title?: string;
  description?: string;

  buttonText?: string;
  buttonHref?: string;

  className?: string;
  heightClassName?: string;
  trailer?:string;
};

const MovieBanner: React.FC<MovieBannerProps> = ({
  id,
  src,
  alt = "",
  title,
  description,
  buttonText,
  buttonHref,
  trailer,
  className = "",
  heightClassName = "h-56 md:h-96",
}) => {
  return (
    <div
      className={`relative w-full ${className}`}
      role="region"
      aria-label={title || "Featured movie"}
    >
      <div
        className={`relative overflow-hidden rounded-lg sm:rounded-xl ${heightClassName}`}
      >
        <img
          src={src}
          alt={alt || title || ""}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 sm:from-black/80 sm:via-black/30 sm:to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-20 p-4 pb-5 text-white sm:p-6 md:p-10">
          {title && (
            <h2 className="mb-1.5 line-clamp-2 text-xl font-bold leading-tight sm:mb-2 sm:text-2xl md:text-4xl">
              {title}
            </h2>
          )}

          {description && (
            <p className="mb-4 line-clamp-2 max-w-xl text-xs leading-relaxed text-white/90 sm:mb-5 sm:line-clamp-3 sm:text-sm md:max-w-2xl md:text-base">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {buttonText && buttonHref && (
              <Link
                href={buttonHref}
                className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#E50914] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-black/20 transition-colors hover:bg-[#B20710] focus:outline-none focus:ring-4 focus:ring-[#E50914]/40 sm:min-h-10 sm:rounded-lg sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {buttonText}
              </Link>
            )}

            {trailer && (
              <Link
                href={`/watch/${id}?key=${trailer}`}
                className="inline-flex min-h-9 items-center justify-center rounded-md bg-white/90 px-3.5 py-2 text-xs font-semibold text-gray-900 shadow-md shadow-black/20 backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus:ring-4 focus:ring-white/40 sm:min-h-10 sm:rounded-lg sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Watch Trailer
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;