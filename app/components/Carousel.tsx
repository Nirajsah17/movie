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
    <div className={`relative w-full ${className}`} role="region" aria-roledescription="carousel" aria-label="Featured content carousel"
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
        className={`relative overflow-hidden rounded-base ${heightClassName}`}
      >
        {items.map((item, index) => {
          const isActive =
            index === currentIndex;

          return (
            <div key={item.id ?? index}
              className={` absolute inset-0 transition-opacity duration-700 ease-in-out
                ${
                  isActive
                    ? "z-10 opacity-100"
                    : "z-0 opacity-0"
                }
              `}
              aria-hidden={!isActive}
            >
              <img src={item.src} alt={item.alt ?? item.title ?? ""} className="w-full absolute inset-0 h-full w-full object-cover"/>
              <div className=" absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"/>
              <div
                className=" absolute inset-x-0 bottom-0 z-20 p-6 text-white md:p-10">
                {item.title && (<h2 className=" mb-2 text-2xl font-bold md:text-4xl">{item.title}</h2>)}

                {item.description && ( <p className=" mb-5 max-w-2xl text-sm text-white/90 md:text-base"> {item.description}</p> )}

                {item.buttonText &&
                  item.buttonHref && (
                    <a
                      href={item.buttonHref}
                      className=" inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/40">
                      {item.buttonText}
                      <svg className="ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6 6 6-6 6"/>
                      </svg>
                    </a>
                  )}
              </div>
            </div>
          );
        })}
      </div>

      {isVisible && totalSlides > 1 && (
        <button onClick={goToPrevious} aria-label="Previous slide" className=" group absolute left-0 top-0 z-30 flex h-full items-center px-4 cursor-pointer">
          <span className=" flex h-10 w-10 items-center justify-center bg-white/30 rounded-full transition group-hover:bg-[#e50914]">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
            </svg>
          </span>
        </button>
      )}

      {isVisible && totalSlides > 1 && (
        <button onClick={goToNext} aria-label="Next slide" className=" group absolute right-0 top-0 z-30 flex h-full items-center px-4 cursor-pointer">
          <span
            className="flex h-10 w-10 items-center justify-center bg-white/30 rounded-full transition group-hover:bg-[#e50914]">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default Carousel;