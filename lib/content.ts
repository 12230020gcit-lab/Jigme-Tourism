export const destinations = [
  { name: "Paro", region: "Western Bhutan", slug: "paro", image: "/images/bhutan/paro-taktsang.jpg", description: "Home to the iconic Tiger's Nest and Bhutan's only international airport." },
  { name: "Thimphu", region: "Western Bhutan", slug: "thimphu", image: "/images/bhutan/tashichho-dzong.jpg", description: "The capital, where the giant Buddha Dordenma overlooks the valley." },
  { name: "Punakha", region: "Western Bhutan", slug: "punakha", image: "/images/bhutan/punakha-dzong.jpg", description: "The majestic Punakha Dzong at the meeting of two rivers." },
  { name: "Phobjikha", region: "Central Bhutan", slug: "phobjikha", image: "/images/bhutan/phobjikha-valley.jpg", description: "A glacial valley and winter home of the black-necked cranes." },
  { name: "Bumthang", region: "Central Bhutan", slug: "bumthang", image: "/images/bhutan/bumthang-jakar-dzong.jpg", description: "Bhutan's spiritual heartland of ancient temples and legends." },
  { name: "Haa", region: "Western Bhutan", slug: "haa", image: "/images/bhutan/phobjikha-valley.jpg", description: "A remote, unspoiled valley reached over the high Chele La pass." },
  { name: "Trongsa", region: "Central Bhutan", slug: "trongsa", image: "/images/bhutan/trongsa-dzong.jpg", description: "Ancestral seat of Bhutan's royal family and its largest dzong." },
];
export const tours = [
  { slug: "bhutan-cultural-discovery", title: "Bhutan Cultural Discovery", duration: "7 days", route: "Paro - Thimphu - Punakha", image: "/images/bhutan/punakha-dzong.jpg", intro: "Bhutan's great dzongs, monasteries and living traditions in one week.", tags: ["Cultural", "Tiger's Nest hike", "Punakha Dzong"], itinerary:["Arrive in Paro", "Discover Thimphu", "Explore Punakha", "Tiger's Nest hike"] },
  { slug: "heart-of-the-himalaya", title: "Heart of the Himalaya", duration: "10 days", route: "Paro - Phobjikha - Bumthang - Trongsa", image: "/images/bhutan/phobjikha-valley.jpg", intro: "Go deeper into central Bhutan: crane valleys, ancient temples and rural life.", tags: ["Cultural", "Phobjikha valley", "Bumthang temples"], itinerary:["Arrive in Paro", "Walk in Phobjikha", "Visit Bumthang temples", "Discover Trongsa Dzong"] },
  { slug: "druk-path-trek", title: "Druk Path Trek", duration: "9 days", route: "Paro - High mountain lakes - Thimphu", image: "/images/bhutan/paro-taktsang.jpg", intro: "A classic high-altitude trek between Paro and Thimphu past alpine lakes.", tags: ["Adventure", "Alpine lakes", "Himalayan views"], itinerary:["Arrive in Paro", "Acclimatise in Paro", "Trek to alpine lakes", "Descend to Thimphu"] },
  { slug: "family-adventure-bhutan", title: "Family Adventure in Bhutan", duration: "8 days", route: "Paro - Thimphu - Punakha", image: "/images/bhutan/bhutanese-mask-dance.jpg", intro: "Gentle walks, rafting, archery and farm visits that children love.", tags: ["Family", "River rafting", "Try archery"], itinerary:["Arrive in Paro", "Explore Thimphu", "Raft in Punakha", "Farm visit and departure"] },
  { slug: "luxury-bhutan-retreat", title: "Luxury Bhutan Retreat", duration: "8 days", route: "Paro - Thimphu - Punakha", image: "/images/bhutan/tashichho-dzong.jpg", intro: "Five-star lodges, private experiences and spa days across western Bhutan.", tags: ["Luxury", "Private experiences", "Valley picnics"], itinerary:["Arrive in Paro", "Private valley tour", "Punakha retreat", "Blessing ceremony"] },
  { slug: "tailor-made-journey", title: "Tailor-Made Journey", duration: "Your dates", route: "Designed around you", image: "/images/bhutan/phobjikha-valley.jpg", intro: "Design your own trip with us. Any length, any interests, any pace.", tags: ["Custom", "Your dates", "Your pace"], itinerary:["Share your travel ideas", "Choose your dates and pace", "We design your Bhutan journey"] },
];
export type DestinationContent={name:string;region:string;slug:string;image:string;description:string};
export type TourContent={slug:string;title:string;duration:string;route:string;image:string;intro:string;tags:string[];itinerary:string[]};
export const imageUrl = (id: string, _width = 1000) => id.startsWith("/images/bhutan/") ? id : "/images/bhutan/paro-taktsang.jpg";
const destinationImages: Record<string,string> = Object.fromEntries(destinations.map(item=>[item.slug,item.image]));
const tourImages: Record<string,string> = Object.fromEntries(tours.map(item=>[item.slug,item.image]));
export async function getDestinations():Promise<DestinationContent[]> {
  try { const {prisma}=await import("@/lib/prisma");const rows=await prisma.destination.findMany({where:{published:true},orderBy:{name:"asc"}});return rows.map((d:{name:string;region:string;slug:string;image:string;description:string})=>({name:d.name,region:d.region,slug:d.slug,image:d.image.startsWith("/images/bhutan/")?d.image:(destinationImages[d.slug]||"/images/bhutan/paro-taktsang.jpg"),description:d.description})); } catch { return destinations; }
}
export async function getTours():Promise<TourContent[]> {
  try { const {prisma}=await import("@/lib/prisma");const rows=await prisma.tourPackage.findMany({where:{published:true},orderBy:{name:"asc"}});return rows.map((t:{slug:string;name:string;duration:string;destinations:string[];image:string;summary:string;highlights:string[];itinerary:unknown})=>({slug:t.slug,title:t.name,duration:t.duration,route:t.destinations.join(" - "),image:t.image.startsWith("/images/bhutan/")?t.image:(tourImages[t.slug]||"/images/bhutan/paro-taktsang.jpg"),intro:t.summary,tags:t.highlights,itinerary:Array.isArray(t.itinerary)?t.itinerary.map(String):[]})); } catch { return tours as TourContent[]; }
}



