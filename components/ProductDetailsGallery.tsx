"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Maximize2, Share2, X } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

const ZOOM = 2.6;
const LENS_SIZE = 132;

export function ProductDetailsGallery({ name, images }: { name: string; images: string[] }) {
  const [active, setActive] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeImage = images[active];

  const previous = useCallback(() => setActive((value) => (value - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((value) => (value + 1) % images.length), [images.length]);

  return (
    <>
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <ProductGallery
          name={name}
          images={images}
          active={active}
          activeImage={activeImage}
          onChange={setActive}
          onPrevious={previous}
          onNext={next}
          onOpenLightbox={() => setIsLightboxOpen(true)}
        />
      </aside>

      {isLightboxOpen && (
        <ImageLightbox
          name={name}
          images={images}
          active={active}
          onChange={setActive}
          onClose={() => setIsLightboxOpen(false)}
          onPrevious={previous}
          onNext={next}
        />
      )}
    </>
  );
}

function ProductGallery({
  name,
  images,
  active,
  activeImage,
  onChange,
  onPrevious,
  onNext,
  onOpenLightbox
}: {
  name: string;
  images: string[];
  active: number;
  activeImage: string;
  onChange: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenLightbox: () => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">Ships within 24 hrs</span>
        <div className="flex gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600" aria-label="Wishlist">
            <Heart size={17} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600" aria-label="Share">
            <Share2 size={17} />
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[72px_minmax(0,1fr)]">
        <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:block sm:space-y-2 sm:overflow-visible">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => onChange(index)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white ${
                active === index ? "border-[#f04b16] ring-2 ring-orange-100" : "border-slate-200"
              }`}
              aria-label={`Show product image ${index + 1}`}
            >
              <Image src={image} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>

        <ProductImage image={activeImage} name={name} onPrevious={onPrevious} onNext={onNext} onOpenLightbox={onOpenLightbox} />
      </div>
    </div>
  );
}

function ProductImage({
  image,
  name,
  onPrevious,
  onNext,
  onOpenLightbox
}: {
  image: string;
  name: string;
  onPrevious: () => void;
  onNext: () => void;
  onOpenLightbox: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomPanelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [isZooming, setIsZooming] = useState(false);

  const updateZoom = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;
      const lens = lensRef.current;
      const panel = zoomPanelRef.current;

      if (!container || !lens || !panel) return;

      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const left = Math.max(0, Math.min(x - LENS_SIZE / 2, rect.width - LENS_SIZE));
      const top = Math.max(0, Math.min(y - LENS_SIZE / 2, rect.height - LENS_SIZE));
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      lens.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      panel.style.backgroundImage = `url("${image}")`;
      panel.style.backgroundSize = `${rect.width * ZOOM}px ${rect.height * ZOOM}px`;
      panel.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    },
    [image]
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const { clientX, clientY } = event;
    frameRef.current = requestAnimationFrame(() => updateZoom(clientX, clientY));
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    setIsZooming(true);
    updateZoom(event.clientX, event.clientY);
  };

  const handlePointerLeave = () => {
    setIsZooming(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  };

  return (
    <div className="relative order-1 sm:order-2">
      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={onOpenLightbox}
        className="magnifier relative h-[340px] touch-pan-y overflow-hidden rounded-md border border-slate-100 bg-white lg:h-[430px]"
      >
        <Image src={image} alt={name} fill priority sizes="(min-width: 1024px) 360px, 100vw" className="object-contain p-7" />
        <Magnifier refProp={lensRef} visible={isZooming} />
        <button onClick={(event) => { event.stopPropagation(); onPrevious(); }} className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow" aria-label="Previous image">
          <ChevronLeft size={18} />
        </button>
        <button onClick={(event) => { event.stopPropagation(); onNext(); }} className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow" aria-label="Next image">
          <ChevronRight size={18} />
        </button>
        <button onClick={(event) => { event.stopPropagation(); onOpenLightbox(); }} className="absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full bg-slate-950 px-3 py-2 text-xs font-bold text-white" aria-label="Open fullscreen gallery">
          <Maximize2 size={14} /> View
        </button>
      </div>

      <ZoomPanel refProp={zoomPanelRef} visible={isZooming} />
    </div>
  );
}

const Magnifier = memo(function Magnifier({ refProp, visible }: { refProp: React.RefObject<HTMLDivElement | null>; visible: boolean }) {
  return (
    <div
      ref={refProp}
      className={`pointer-events-none absolute left-0 top-0 z-10 hidden border border-[#f04b16]/60 bg-orange-200/30 shadow-sm transition-opacity duration-100 lg:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: LENS_SIZE, height: LENS_SIZE }}
    />
  );
});

const ZoomPanel = memo(function ZoomPanel({ refProp, visible }: { refProp: React.RefObject<HTMLDivElement | null>; visible: boolean }) {
  return (
    <div
      ref={refProp}
      className={`pointer-events-none absolute left-[calc(100%+16px)] top-0 z-40 hidden h-[430px] w-[520px] rounded-lg border border-slate-200 bg-white bg-no-repeat shadow-2xl transition-opacity duration-100 xl:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
});

function ImageLightbox({
  name,
  images,
  active,
  onChange,
  onClose,
  onPrevious,
  onNext
}: {
  name: string;
  images: string[];
  active: number;
  onChange: (index: number) => void;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const touchStart = useRef<number | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/90 p-5"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = touchStart.current - event.changedTouches[0].clientX;
        if (Math.abs(delta) > 45) delta > 0 ? onNext() : onPrevious();
        touchStart.current = null;
      }}
    >
      <button onClick={onClose} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-slate-950" aria-label="Close fullscreen gallery">
        <X size={20} />
      </button>
      <button onClick={onPrevious} className="absolute left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-950 sm:grid" aria-label="Previous image">
        <ChevronLeft />
      </button>
      <div className="relative h-[78vh] w-full max-w-5xl touch-pinch-zoom">
        <Image src={images[active]} alt={name} fill sizes="90vw" className="object-contain" />
      </div>
      <button onClick={onNext} className="absolute right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-950 sm:grid" aria-label="Next image">
        <ChevronRight />
      </button>
      <div className="absolute bottom-5 flex max-w-[90vw] gap-2 overflow-x-auto rounded-full bg-white/10 p-2">
        {images.map((image, index) => (
          <button
            key={`${image}-lightbox-${index}`}
            onClick={() => onChange(index)}
            className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-full border ${active === index ? "border-[#f04b16]" : "border-white/40"}`}
            aria-label={`Show image ${index + 1}`}
          >
            <Image src={image} alt="" fill sizes="48px" className="object-contain bg-white p-1" />
          </button>
        ))}
      </div>
    </div>
  );
}
