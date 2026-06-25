"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Structured modeling & editorial fashion photography database
interface Photo {
  id: string;
  unsplashId: string;
  title: string;
  description: string;
  category: "editorial" | "streetwear" | "minimalist" | "studio" | "retro";
  location: string;
  photographer: string;
  photographerUsername: string;
  aspectRatio: "square" | "portrait" | "landscape" | "tall" | "wide";
  camera: {
    model: string;
    lens: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
  };
  tags: string[];
}

const PHOTOS: Photo[] = [
  {
    id: "1",
    unsplashId: "photo-1509631179647-0177331693ae",
    title: "Elysian Drapes",
    description: "Avant-garde editorial gown shot against a textured plaster backdrop, capturing movement and form.",
    category: "editorial",
    location: "Studio 4, Paris",
    photographer: "Toyin Adedokun",
    photographerUsername: "toyin_adedokun",
    aspectRatio: "portrait",
    camera: {
      model: "Phase One XF IQ4",
      lens: "Schneider Kreuznach 80mm f/2.8 Blue Ring",
      aperture: "f/5.6",
      shutterSpeed: "1/160s",
      iso: "50",
    },
    tags: ["editorial", "gown", "movement", "monochrome", "avant-garde"],
  },
  {
    id: "2",
    unsplashId: "photo-1539109136881-3be0616acf4b",
    title: "Neon Silhouette",
    description: "Vibrant yellow streetwear set against a dark concrete street scene with warm accent lighting.",
    category: "streetwear",
    location: "Shibuya, Tokyo",
    photographer: "Sora Sagano",
    photographerUsername: "sorasagano",
    aspectRatio: "portrait",
    camera: {
      model: "Sony A7R V",
      lens: "Sony FE 50mm f/1.2 GM",
      aperture: "f/1.2",
      shutterSpeed: "1/250s",
      iso: "320",
    },
    tags: ["streetwear", "tokyo", "neon", "yellow", "urban"],
  },
  {
    id: "3",
    unsplashId: "photo-1494790108377-be9c29b29330",
    title: "Natural Clarity",
    description: "Soft window-lit portrait highlighting subtle skin tones and minimalist expression.",
    category: "studio",
    location: "Daylight Studio, London",
    photographer: "Michael Dam",
    photographerUsername: "michaeldam",
    aspectRatio: "portrait",
    camera: {
      model: "Canon EOS R5",
      lens: "Canon RF 85mm f/1.2L USM",
      aperture: "f/1.8",
      shutterSpeed: "1/200s",
      iso: "100",
    },
    tags: ["portrait", "minimalist", "natural-light", "studio", "makeup"],
  },
  {
    id: "4",
    unsplashId: "photo-1524504388940-b1c1722653e1",
    title: "Desert Sunset Line",
    description: "High-contrast editorial piece using structured lines and summer silhouettes in the dunes.",
    category: "editorial",
    location: "Mojave Desert, USA",
    photographer: "Fotis Fotopoulos",
    photographerUsername: "ffotopoulos",
    aspectRatio: "landscape",
    camera: {
      model: "Leica SL2",
      lens: "Leica Vario-Elmarit-SL 24-90mm",
      aperture: "f/8.0",
      shutterSpeed: "1/500s",
      iso: "100",
    },
    tags: ["editorial", "desert", "drapes", "silhouette", "summer"],
  },
  {
    id: "5",
    unsplashId: "photo-1507679799987-c73779587ccf",
    title: "Classic Tailoring",
    description: "Sleek double-breasted woolen suit styled in an industrial concrete loft setting.",
    category: "minimalist",
    location: "Studio Loft, Milan",
    photographer: "Drew Hays",
    photographerUsername: "drew_hays",
    aspectRatio: "portrait",
    camera: {
      model: "Fujifilm GFX 100S",
      lens: "GF 110mm f/2 R LM WR",
      aperture: "f/2.0",
      shutterSpeed: "1/125s",
      iso: "200",
    },
    tags: ["suit", "tailoring", "men", "minimalist", "editorial"],
  },
  {
    id: "6",
    unsplashId: "photo-1488161628813-04466f872be2",
    title: "Urban Utility",
    description: "Relaxed linen coordinates and bucket hat, styled for effortless high-summer urban streetwear.",
    category: "streetwear",
    location: "Berlin, Germany",
    photographer: "Marius Muresan",
    photographerUsername: "mariuss",
    aspectRatio: "portrait",
    camera: {
      model: "Sony A7 III",
      lens: "Zeiss Batis 85mm f/1.8",
      aperture: "f/2.2",
      shutterSpeed: "1/400s",
      iso: "100",
    },
    tags: ["streetwear", "casual", "linen", "summer", "urban"],
  },
  {
    id: "7",
    unsplashId: "photo-1515886657613-9f3515b0c78f",
    title: "Canary Palette",
    description: "Vibrant and structured yellow outerwear styled against a stark, high-contrast concrete wall.",
    category: "minimalist",
    location: "Barcelona, Spain",
    photographer: "Dom Hill",
    photographerUsername: "dom_hill",
    aspectRatio: "portrait",
    camera: {
      model: "Hasselblad X1D II 50C",
      lens: "XCD 45mm f/3.5",
      aperture: "f/5.6",
      shutterSpeed: "1/180s",
      iso: "100",
    },
    tags: ["yellow", "minimalist", "color-block", "outerwear", "concrete"],
  },
  {
    id: "8",
    unsplashId: "photo-1544005313-94ddf0286df2",
    title: "Tonal Nuance",
    description: "A fine-art close-up portrait exploring warm earth tones, texture, and soft sidelight shadows.",
    category: "studio",
    location: "Studio B, Copenhagen",
    photographer: "Matheus Ferrero",
    photographerUsername: "matheusferrero",
    aspectRatio: "portrait",
    camera: {
      model: "Canon EOS R6",
      lens: "Canon RF 50mm f/1.2L",
      aperture: "f/1.2",
      shutterSpeed: "1/160s",
      iso: "100",
    },
    tags: ["portrait", "studio", "earthy", "classic", "fine-art"],
  },
  {
    id: "9",
    unsplashId: "photo-1506794778202-cad84cf45f1d",
    title: "Monochrome Profile",
    description: "Dramatic high-key black and white portrait focusing on jawlines and structured shadows.",
    category: "studio",
    location: "Studio 1, Stockholm",
    photographer: "Albert Dera",
    photographerUsername: "albertdera",
    aspectRatio: "portrait",
    camera: {
      model: "Nikon Z7 II",
      lens: "Nikkor Z 85mm f/1.8 S",
      aperture: "f/2.8",
      shutterSpeed: "1/125s",
      iso: "64",
    },
    tags: ["monochrome", "portrait", "studio", "male", "high-key"],
  },
  {
    id: "10",
    unsplashId: "photo-1534528741775-53994a69daeb",
    title: "Cyberpunk Glow",
    description: "Editorial portrait utilizing dramatic neon light rings reflecting off glossy styling textures.",
    category: "retro",
    location: "Cyber City, Seoul",
    photographer: "Alexander Kovalev",
    photographerUsername: "alexanderkovalev",
    aspectRatio: "portrait",
    camera: {
      model: "Sony A7S III",
      lens: "Sony FE 35mm f/1.4 GM",
      aperture: "f/1.4",
      shutterSpeed: "1/200s",
      iso: "800",
    },
    tags: ["neon", "cyberpunk", "retro", "glow", "editorial"],
  },
  {
    id: "11",
    unsplashId: "photo-1517841905240-472988babdf9",
    title: "Sunkissed Denim",
    description: "Classic vintage denim styling set against warm sun flares in an open wildflower meadow.",
    category: "retro",
    location: "Texas, USA",
    photographer: "Brooke Cagle",
    photographerUsername: "brookecagle",
    aspectRatio: "portrait",
    camera: {
      model: "Canon EOS 5D Mark IV",
      lens: "Canon EF 50mm f/1.4 USM",
      aperture: "f/2.0",
      shutterSpeed: "1/320s",
      iso: "100",
    },
    tags: ["retro", "vintage", "denim", "sunlight", "outdoor"],
  },
  {
    id: "12",
    unsplashId: "photo-1529139574466-a303027c1d8b",
    title: "Sartorial Contrast",
    description: "Runway silhouettes in high contrast lighting showcasing drape texture and layered fabrics.",
    category: "editorial",
    location: "Fashion Week, New York",
    photographer: "Flaunter",
    photographerUsername: "flaunter",
    aspectRatio: "landscape",
    camera: {
      model: "Sony A9 II",
      lens: "Sony FE 70-200mm f/2.8 GM OSS",
      aperture: "f/2.8",
      shutterSpeed: "1/640s",
      iso: "400",
    },
    tags: ["runway", "editorial", "drape", "designer", "nyfw"],
  },
];

// Helper to construct unsplash image URLs
function getImageUrl(unsplashId: string, size: "thumb" | "full" = "thumb") {
  const width = size === "full" ? 1600 : 800;
  const quality = size === "full" ? 90 : 80;
  return `https://images.unsplash.com/${unsplashId}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export default function PhotoGalleryPage() {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Filter logic
  const filteredPhotos = PHOTOS.filter((photo) => {
    const matchesCategory = activeCategory === "all" || photo.category === activeCategory;
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.photographer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedPhoto = PHOTOS.find((p) => p.id === selectedPhotoId);

  // Find related photos (sharing the same category or tags, excluding current)
  const relatedPhotos = selectedPhoto
    ? PHOTOS.filter(
        (p) => p.id !== selectedPhoto.id && (p.category === selectedPhoto.category || p.tags.some((t) => selectedPhoto.tags.includes(t)))
      ).slice(0, 4)
    : [];

  const handleOpenPhoto = (id: string) => {
    setSelectedPhotoId(id);
    dialogRef.current?.showModal();
  };

  const handleClosePhoto = () => {
    dialogRef.current?.close();
  };

  const handleSelectRelated = (id: string) => {
    setSelectedPhotoId(id);
    // Focus management inside dialog
    dialogRef.current?.focus();
  };

  // Keyboard navigation through filtered photos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhotoId) return;
      const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhotoId);
      if (currentIndex === -1) return;

      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % filteredPhotos.length;
        setSelectedPhotoId(filteredPhotos[nextIndex].id);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        setSelectedPhotoId(filteredPhotos[prevIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoId, filteredPhotos]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClosePhoto();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans pb-16 selection:bg-violet-600/30">
      {/* Header Section */}
      <header className="relative overflow-hidden border-b border-slate-800 bg-slate-950/60 py-12 shadow-2xl backdrop-blur-md">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-violet-600/10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-600/10 blur-[100px]"></div>

        <div className="mx-auto max-w-7xl px-6 text-center md:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-violet-400"></span>
            Vivid Editorial Hub
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 sm:text-5xl md:text-6xl">
            Vivid Models
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400 md:text-lg">
            A premium photo showcase displaying high-fidelity editorial, streetwear, and portrait modeling campaigns with rich EXIF camera metadata.
          </p>
        </div>
      </header>

      {/* Control panel (Filters + Search) */}
      <section className="mx-auto mt-12 max-w-7xl px-6 md:px-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-800/80 bg-slate-950/40 p-6 shadow-glow backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {["all", "editorial", "streetwear", "minimalist", "studio", "retro"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-2xl px-5 py-2.5 text-sm font-medium capitalize tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                    : "bg-slate-900/60 text-slate-400 hover:bg-slate-900 hover:text-slate-100 border border-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search campaign, model, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 py-3 pl-12 pr-4 text-sm text-slate-100 placeholder-slate-500 backdrop-blur-sm outline-none transition focus:border-violet-500/60 focus:bg-slate-900/60 focus:ring-1 focus:ring-violet-500/20"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto mt-12 max-w-7xl px-6 md:px-8">
        {filteredPhotos.length > 0 ? (
          <div className="columns-1 gap-6 [column-fill:_auto] sm:columns-2 lg:columns-3 xl:columns-4 space-y-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handleOpenPhoto(photo.id)}
                className="group relative break-inside-avoid overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700/60 hover:shadow-2xl cursor-pointer"
              >
                <div className={`relative w-full ${
                  photo.aspectRatio === "portrait" ? "aspect-w-portrait" :
                  photo.aspectRatio === "tall" ? "aspect-w-tall" :
                  photo.aspectRatio === "landscape" ? "aspect-w-landscape" :
                  photo.aspectRatio === "wide" ? "aspect-w-wide" : "aspect-w-1"
                }`}>
                  <Image
                    src={getImageUrl(photo.unsplashId, "thumb")}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Grid card meta overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block rounded-full bg-violet-600/80 px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wider text-slate-100 backdrop-blur-md">
                    {photo.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white leading-snug">{photo.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {photo.photographer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950/20 py-24 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-300">No images match your search</h3>
            <p className="mt-2 text-sm text-slate-500">Try searching for other styles or tags like "neon", "minimalist", or "tokyo".</p>
          </div>
        )}
      </section>

      {/* Photo Detail Modal Dialog */}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        onClose={() => setSelectedPhotoId(null)}
        className="backdrop:backdrop-blur-md outline-none"
      >
        {selectedPhoto && (
          <div className="mx-auto flex max-h-screen w-screen max-w-6xl flex-col bg-slate-950 border border-slate-800/80 shadow-2xl rounded-3xl overflow-hidden md:flex-row h-[90vh] md:h-[80vh]">
            {/* Modal Image container */}
            <div className="relative flex-1 bg-slate-950 h-[50%] md:h-full">
              <Image
                src={getImageUrl(selectedPhoto.unsplashId, "full")}
                alt={selectedPhoto.title}
                fill
                priority
                className="object-contain"
              />
              {/* Back / Close button for mobile */}
              <button
                onClick={handleClosePhoto}
                className="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-slate-300 backdrop-blur-md transition hover:bg-slate-900 hover:text-white border border-slate-800 md:hidden"
                aria-label="Close dialog"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal details sidebar */}
            <div className="w-full border-t border-slate-800/80 bg-slate-950/40 p-6 flex flex-col justify-between overflow-y-auto md:w-[400px] md:border-t-0 md:border-l border-slate-800/80 h-[50%] md:h-full backdrop-blur-sm">
              <div className="space-y-6">
                {/* Header detail */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full bg-violet-600/30 px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wider text-violet-300 border border-violet-500/20">
                      {selectedPhoto.category}
                    </span>
                    <h2 className="mt-3 text-2xl font-black text-white leading-tight">{selectedPhoto.title}</h2>
                    <p className="mt-1 text-sm text-slate-400 flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedPhoto.location}
                    </p>
                  </div>
                  <button
                    onClick={handleClosePhoto}
                    className="hidden h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 text-slate-400 backdrop-blur-md transition hover:bg-slate-900 hover:text-white border border-slate-800 md:flex"
                    aria-label="Close dialog"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-light">{selectedPhoto.description}</p>

                {/* Photographer attribution */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full bg-violet-600/20 text-violet-300 flex items-center justify-center font-bold text-sm">
                      {selectedPhoto.photographer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Photographer</p>
                      <p className="text-sm font-semibold text-slate-200">{selectedPhoto.photographer}</p>
                    </div>
                  </div>
                  <a
                    href={`https://unsplash.com/@${selectedPhoto.photographerUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition"
                  >
                    Profile
                  </a>
                </div>

                {/* EXIF Camera Data */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Camera Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-3">
                      <p className="text-3xs uppercase tracking-wider text-slate-500 font-medium">Camera</p>
                      <p className="text-xs font-semibold text-slate-300 truncate mt-1">{selectedPhoto.camera.model}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-3">
                      <p className="text-3xs uppercase tracking-wider text-slate-500 font-medium">Lens</p>
                      <p className="text-xs font-semibold text-slate-300 truncate mt-1">{selectedPhoto.camera.lens}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-3">
                      <p className="text-3xs uppercase tracking-wider text-slate-500 font-medium">Aperture</p>
                      <p className="text-xs font-semibold text-slate-300 mt-1">{selectedPhoto.camera.aperture}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-3">
                      <p className="text-3xs uppercase tracking-wider text-slate-500 font-medium">Exposure</p>
                      <p className="text-xs font-semibold text-slate-300 mt-1">{selectedPhoto.camera.shutterSpeed}</p>
                    </div>
                  </div>
                </div>

                {/* Related Photos section */}
                {relatedPhotos.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Related Photos</h3>
                    <div className="grid grid-cols-4 gap-2.5">
                      {relatedPhotos.map((relPhoto) => (
                        <button
                          key={relPhoto.id}
                          onClick={() => handleSelectRelated(relPhoto.id)}
                          className="relative aspect-square w-full overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950 hover:border-violet-500/50 hover:scale-95 transition-all duration-300"
                        >
                          <Image
                            src={getImageUrl(relPhoto.unsplashId, "thumb")}
                            alt={relPhoto.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation help */}
              <div className="border-t border-slate-800/50 pt-4 mt-6 text-2xs text-slate-500 text-center flex items-center justify-between">
                <span>← Previous</span>
                <span className="uppercase tracking-widest">Use Arrow Keys</span>
                <span>Next →</span>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
