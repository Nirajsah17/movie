"use client"

import React, { useCallback, useEffect, useRef, useState} from "react";

export type CarouselItem = {
  id?: string | number;
  src: string;
  alt?: string;

  title?: string;
  description?: string;

  buttonText?: string;
  buttonHref?: string;
};

type CarouselProps = {
  items: CarouselItem[];

  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;

  showIndicators?: boolean;
  showControls?: boolean;

  className?: string;
  heightClassName?: string;
};

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  interval = 5000,
  pauseOnHover = true,
  className = "",
  heightClassName = "h-56 md:h-96",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = items.length;

  const goToNext = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev + 1) % totalSlides
    );
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + totalSlides) % totalSlides
    );
  }, [totalSlides]);

  useEffect(() => {
    if (
      !autoPlay ||
      isPaused ||
      totalSlides <= 1
    ) {
      return;
    }

    const timer = window.setInterval(
      goToNext,
      interval
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [
    autoPlay,
    interval,
    isPaused,
    totalSlides,
    goToNext,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [goToNext, goToPrevious]);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      event.touches[0].clientX;
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current =
      event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current -
      touchEndX.current;

    if (Math.abs(distance) >= 50) {
      distance > 0
        ? goToNext()
        : goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!items.length) {
    return null;
  }

  return (
    <div
      className={`relative w-full ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured content carousel"
      onMouseEnter={() => {
        if (pauseOnHover) {
          setIsPaused(true);
          setVisible(true);
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover) {
          setIsPaused(false);
          setVisible(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`relative overflow-hidden rounded-lg sm:rounded-xl ${heightClassName}`}
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={item.id ?? index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={item.src}
                alt={item.alt ?? item.title ?? ""}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 sm:from-black/80 sm:via-black/30 sm:to-transparent" />

              <div className="absolute inset-x-0 bottom-0 z-20 p-4 pb-5 text-white sm:p-6 md:p-10">
                {item.title && (
                  <h2 className="mb-1.5 line-clamp-2 text-xl font-bold leading-tight sm:mb-2 sm:text-2xl md:text-4xl">
                    {item.title}
                  </h2>
                )}

                {item.description && (
                  <p className="mb-3 line-clamp-2 max-w-xl text-xs leading-relaxed text-white/90 sm:mb-5 sm:line-clamp-3 sm:text-sm md:max-w-2xl md:text-base">
                    {item.description}
                  </p>
                )}

                {item.buttonText && item.buttonHref && (
                  <a
                    href={item.buttonHref}
                    className="inline-flex min-h-9 items-center rounded-md bg-[#E50914] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-black/20 transition-colors hover:bg-[#B20710] focus:outline-none focus:ring-4 focus:ring-[#E50914]/40 sm:min-h-10 sm:rounded-lg sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    {item.buttonText}

                    <svg
                      className="ms-1.5 h-3.5 w-3.5 sm:ms-2 sm:h-4 sm:w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-6-6 6 6-6 6"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isVisible && totalSlides > 1 && (
        <button
          onClick={goToPrevious}
          aria-label="Previous slide"
          className="group absolute left-1 top-0 z-30 flex h-full items-center px-1.5 cursor-pointer sm:left-0 sm:px-3 md:px-4"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 transition group-hover:bg-[#E50914] sm:h-10 sm:w-10">
            <svg
              className="h-4 w-4 text-white sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m15 19-7-7 7-7"
              />
            </svg>
          </span>
        </button>
      )}

      {isVisible && totalSlides > 1 && (
        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="group absolute right-1 top-0 z-30 flex h-full items-center px-1.5 cursor-pointer sm:right-0 sm:px-3 md:px-4"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 transition group-hover:bg-[#E50914] sm:h-10 sm:w-10">
            <svg
              className="h-4 w-4 text-white sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default Carousel;