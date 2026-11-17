import {NextResponse} from "next/server";
import {z} from "zod";
import {getSession} from "@/lib/auth";
import {prisma} from "@/lib/prisma";

const base=z.object({slug:z.string().trim().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),originalSlug:z.string().optional(),name:z.string().trim().min(2).max(160),image:z.string().trim().min(3).max(1000).refine(v=>v.startsWith("photo-")||v.startsWith("https://images.unsplash.com/")||v.startsWith("/images/bhutan/")),published:z.boolean()});
const destinationSchema=base.extend({region:z.string().trim().min(2).max(120),summary:z.string().trim().min(5).max(300),description:z.string().trim().min(10).max(6000)});
const tourSchema=base.extend({duration:z.string().trim().min(2).max(80),destinations:z.string().trim().min(2).max(500),summary:z.string().trim().min(10).max(6000),highlights:z.string().trim().min(2).max(500),itinerary:z.string().trim().min(2).max(6000)});
const requestSchema=z.object({kind:z.enum(["destination","tour"]),action:z.enum(["save","delete"]),data:z.record(z.string(),z.unknown())});

export async function POST(req:Request){
  const session=await getSession();if(session?.role!=="ADMIN")return NextResponse.json({error:"Not authorized"},{status:403});
  const raw=requestSchema.safeParse(await req.json().catch(()=>null));if(!raw.success)return NextResponse.json({error:"Invalid content update."},{status:400});
  const {kind,action,data}=raw.data;const slug=z.string().min(2).max(100).safeParse(data.originalSlug||data.slug);if(!slug.success)return NextResponse.json({error:"Choose a content item first."},{status:400});
  try{
    if(action==="delete"){if(kind==="destination")await prisma.destination.delete({where:{slug:slug.data}});else await prisma.tourPackage.delete({where:{slug:slug.data}});return NextResponse.json({ok:true});}
    const parsed=(kind==="destination"?destinationSchema:tourSchema).safeParse(data);if(!parsed.success)return NextResponse.json({error:"Check the required fields and try again."},{status:400});
    if(kind==="destination"){
      const d=parsed.data as z.infer<typeof destinationSchema>;const fields={slug:d.slug,name:d.name,region:d.region,summary:d.summary,description:d.description,image:d.image,published:d.published};
      if(d.originalSlug&&d.originalSlug!==d.slug)await prisma.destination.update({where:{slug:d.originalSlug},data:fields});else await prisma.destination.upsert({where:{slug:d.slug},create:fields,update:fields});
    }else{
      const t=parsed.data as z.infer<typeof tourSchema>;const fields={slug:t.slug,name:t.name,duration:t.duration,destinations:t.destinations.split(/[\r\n,]+/).map(x=>x.trim()).filter(Boolean),summary:t.summary,highlights:t.highlights.split(/[\r\n,]+/).map(x=>x.trim()).filter(Boolean),itinerary:t.itinerary.split(/[\r\n,]+/).map(x=>x.trim()).filter(Boolean),image:t.image,published:t.published};
      if(t.originalSlug&&t.originalSlug!==t.slug)await prisma.tourPackage.update({where:{slug:t.originalSlug},data:fields});else await prisma.tourPackage.upsert({where:{slug:t.slug},create:fields,update:fields});
    }
    return NextResponse.json({ok:true});
  }catch(error){console.error("Admin content update failed",error);return NextResponse.json({error:"Could not save this content. The URL slug may already be in use."},{status:409});}
}

