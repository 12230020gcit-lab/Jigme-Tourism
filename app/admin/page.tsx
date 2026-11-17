import {redirect} from "next/navigation";
import {getSession} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {AdminInquiries} from "@/components/admin-inquiries";
import {AdminContactMessages} from "@/components/admin-contact";
import {AdminContentManager} from "@/components/admin-content";
import {AdminReviews} from "@/components/admin-reviews";

export const metadata={title:"Inquiry dashboard"};
type TourRow={slug:string;name:string;duration:string;destinations:string[];summary:string;highlights:string[];image:string;published:boolean;itinerary:unknown};

export default async function AdminPage(){
  const session=await getSession();if(session?.role!=="ADMIN")redirect("/login");
  const [total,newCount,confirmed,completed,messagesCount,inquiries,messages,destinations,tours,reviews]=await Promise.all([
    prisma.bookingInquiry.count(),prisma.bookingInquiry.count({where:{status:"NEW"}}),
    prisma.bookingInquiry.count({where:{status:"CONFIRMED"}}),prisma.bookingInquiry.count({where:{status:"COMPLETED"}}),
    prisma.contactMessage.count({where:{handled:false}}),
    prisma.bookingInquiry.findMany({orderBy:{createdAt:"desc"},take:100,include:{tourPackage:true}}),
    prisma.contactMessage.findMany({orderBy:{createdAt:"desc"},take:100}),
    prisma.destination.findMany({orderBy:{name:"asc"},select:{slug:true,name:true,region:true,summary:true,description:true,image:true,published:true}}),
    prisma.tourPackage.findMany({orderBy:{name:"asc"},select:{slug:true,name:true,duration:true,destinations:true,summary:true,highlights:true,image:true,published:true,itinerary:true}}),
    prisma.review.findMany({orderBy:{createdAt:"desc"},take:100,select:{id:true,customerName:true,country:true,rating:true,packageName:true,text:true,published:true,createdAt:true}})
  ]);
  const destinationEntries=destinations as unknown as Record<string,string|boolean|string[]>[];
  const tourEntries=(tours as TourRow[]).map((t:TourRow)=>({...t,itinerary:Array.isArray(t.itinerary)?t.itinerary.map(String):[]})) as unknown as Record<string,string|boolean|string[]>[];
  return <main><section className="inner-hero"><div className="eyebrow light"><span/> JIGME BHUTAN TOURISM - ADMIN</div><h1>Inquiry<br/><em>dashboard.</em></h1><p>Manage guest inquiries, messages, reviews, destinations and journeys shown on your website.</p></section><section className="inner-content"><div className="admin-stats">{[["All inquiries",total],["New",newCount],["Confirmed",confirmed],["Completed",completed],["Unread messages",messagesCount]].map(([label,value])=><div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><h2 className="admin-section-title">Destinations and tour packages</h2><AdminContentManager destinations={destinationEntries} tours={tourEntries}/><h2 className="admin-section-title">Recent travel inquiries</h2><AdminInquiries rows={inquiries}/><h2 className="admin-section-title">Guest reviews</h2><AdminReviews rows={reviews}/><h2 className="admin-section-title">General messages</h2><AdminContactMessages rows={messages}/></section></main>;
}
