import {TripPlanner} from "@/components/trip-planner";
export const metadata={title:"Bhutan trip planner",description:"Build a simple day-by-day outline for your Bhutan journey."};
export default function PlannerPage(){return <main><section className="inner-hero"><div className="eyebrow light"><span/> YOUR IDEAS, IN ONE PLACE</div><h1>Make a little<br/><em>plan of your own.</em></h1><p>Start with a few ideas. You can change the order, add days and ask us to help shape the rest.</p></section><section className="inner-content"><TripPlanner/></section></main>;}
