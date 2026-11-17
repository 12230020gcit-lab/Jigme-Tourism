"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Photo = { id: string; title: string; category: string; src: string };
const categories = ["All", "Dzongs", "Culture", "Monasteries", "Festivals", "Adventure", "People"];
export function GalleryViewer({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const visible = photos.map((photo, index) => ({ photo, index })).filter(({ photo }) => category === "All" || photo.category === category);
  const close = () => setActive(null);
  const move = (direction: number) => { if (active === null) return; const list = visible.map(item => item.index); const current = list.indexOf(active); setActive(list[(current + direction + list.length) % list.length]); };
  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", onKey); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active, visible.length]);
  return <>
    <div className="gallery-filters" role="group" aria-label="Filter gallery by category">{categories.map(item => <button key={item} type="button" className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => { setCategory(item); setActive(null); }}>{item}</button>)}</div>
    <div className="gallery-grid">{visible.map(({ photo, index }) => <button className="gallery-tile" key={photo.id} type="button" onClick={() => setActive(index)} aria-label={`View ${photo.title}`}><Image src={photo.src} alt={photo.title} fill sizes="(max-width: 700px) 100vw, 33vw"/><span>{photo.title}</span></button>)}</div>
    {active !== null && photos[active] && <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={photos[active].title} onClick={close}><button className="gallery-close" type="button" aria-label="Close image" onClick={close}>×</button><button className="gallery-prev" type="button" aria-label="Previous image" onClick={event => { event.stopPropagation(); move(-1); }}>‹</button><figure onClick={event => event.stopPropagation()}><Image src={photos[active].src} alt={photos[active].title} fill sizes="100vw" priority/><figcaption>{photos[active].title} · {photos[active].category}</figcaption></figure><button className="gallery-next" type="button" aria-label="Next image" onClick={event => { event.stopPropagation(); move(1); }}>›</button></div>}
  </>;
}
