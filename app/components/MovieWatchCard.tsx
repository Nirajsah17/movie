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

          <div className="flex justify-between items-center">
            {buttonText && buttonHref && (
              <Link
                href={buttonHref} className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/40">
                {buttonText}
              </Link>
            )}

            {trailer && (
              <Link
                href={`/watch/${id}?key=${trailer}`} className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/40">
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