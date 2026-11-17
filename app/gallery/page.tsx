import { GalleryViewer } from "@/components/gallery-viewer";
export const metadata = { title: "Bhutan photo gallery", description: "Explore Bhutan's dzongs, monasteries, festivals, landscapes and people." };
const source = [
  ["paro-taktsang.jpg", "Paro Taktsang, Tiger's Nest", "Monasteries"],
  ["tashichho-dzong.jpg", "Tashichho Dzong, Thimphu", "Dzongs"],
  ["punakha-dzong.jpg", "Punakha Dzong", "Dzongs"],
  ["phobjikha-valley.jpg", "Phobjikha Valley", "Adventure"],
  ["bhutanese-mask-dance.jpg", "Traditional Bhutanese Cham dance", "Festivals"],
  ["buddha-dordenma.webp", "Buddha Dordenma, Thimphu", "Culture"],
  ["paro-taktsang.jpg", "Tiger's Nest in the Paro mountains", "Adventure"],
  ["bhutanese-mask-dance.jpg", "Bhutanese festival mask dance", "Culture"],
  ["tashichho-dzong.jpg", "Bhutanese dzong architecture", "Dzongs"],
  ["punakha-dzong.jpg", "Traditional Bhutanese architecture", "Monasteries"],
  ["phobjikha-valley.jpg", "A quiet Bhutanese valley", "Adventure"],
  ["buddha-dordenma.webp", "Buddhist heritage in Bhutan", "Culture"],
  ["bhutanese-archery.jpg", "Traditional Bhutanese archery", "Culture"],
  ["bumthang-jakar-dzong.jpg", "Jakar Dzong, Bumthang", "Dzongs"],
  ["trongsa-dzong.jpg", "Trongsa Dzong", "Dzongs"],
].map(([file,title,category],index)=>({id:`bhutan-${index}`,title,category,src:`/images/bhutan/${file}`}));
const credits = [
  ["Paro Taktsang, Bhutan (edited).jpg", "Nina R from Africa; derivative by UnpetitproleX", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Paro_Taktsang,_Bhutan_(edited).jpg"],
  ["Tashichho Dzong, Bhutan 01.jpg", "Bernard Gagnon", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Tashichho_Dzong,_Bhutan_01.jpg"],
  ["Punakha Dzong, Bhutan 01.jpg", "Bernard Gagnon", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Punakha_Dzong,_Bhutan_01.jpg"],
  ["Phobjikha valley.jpg", "Kheng Singye Dorji (KSD)", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Phobjikha_valley.jpg"],
  ["Masked Buddhist Dance.jpg", "Sabine Blankevoort", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Masked_Buddhist_Dance.jpg"],
  ["Dordenma Buddha Statue.webp", "Adityaroy007", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Dordenma_Buddha_Statue.webp"],
  ["Archery in Bhutan.jpg", "Footlooseinme", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Archery_in_Bhutan.jpg"],
  ["Jakar Dzong, Bumthang.jpg", "Christopher J. Fynn", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Jakar_Dzong,_Bumthang.jpg"],
  ["Trongsa Dzong.jpg", "WindHorse", "CC BY-SA 1.0", "https://commons.wikimedia.org/wiki/File:Trongsa_Dzong.jpg"],
];
export default function Gallery() {
 return <main><section className="inner-hero"><div className="eyebrow light"><span/> BHUTAN IN PICTURES</div><h1>Explore the<br/><em>gallery.</em></h1><p>Every photograph here shows a place or cultural scene in Bhutan. Select any image to open the full-size viewer.</p></section><section className="inner-content"><GalleryViewer photos={source}/><section id="photo-credits" className="photo-credits"><h2>Photo credits</h2><p>Photos are shared under the licenses listed below. Each link opens the original Wikimedia Commons file page.</p><ul>{credits.map(([file,author,license,url])=><li key={file}><a href={url} target="_blank" rel="noreferrer">{file}</a> — {author}, {license}</li>)}</ul></section></section></main>;
}





