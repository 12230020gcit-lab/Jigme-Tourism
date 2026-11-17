import Image from "next/image";
import Link from "next/link";
import { getDestinations, imageUrl } from "@/lib/content";
export const dynamic="force-dynamic";
export const metadata = { title: "Destinations in Bhutan", description: "Explore the valleys, towns and mountain landscapes of Bhutan." };
export default async function DestinationsPage() { const destinations=await getDestinations();return <main><section className="inner-hero"><div className="eyebrow light"><span/> FOLLOW THE VALLEYS</div><h1>Find your place<br/><em>in Bhutan.</em></h1><p>Each valley has its own pace and personality. Take a look around, then tell us which places are calling.</p></section><div className="inner-content"><div className="destination-grid">{destinations.map((d,i)=><Link className={`destination-card destination-${i===0?1:2}`} key={d.slug} href={`/destinations/${d.slug}`}><Image src={imageUrl(d.image)} alt={`Explore ${d.name}, Bhutan`} fill sizes="(max-width: 700px) 100vw, 50vw"/><span className="card-no">0{i+1}</span><div className="destination-info"><small>{d.region}</small><h3>{d.name}</h3><span>{d.description}</span><b className="round-arrow">↗</b></div></Link>)}</div></div></main>; }
