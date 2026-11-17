import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { destinations, tours } from "../lib/content";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL || "" }) });

async function main() {
  for (const destination of destinations) {
    const data = {
      slug: destination.slug,
      name: destination.name,
      region: destination.region,
      summary: destination.description,
      description: destination.description,
      image: destination.image,
      published: true,
    };
    await prisma.destination.upsert({ where: { slug: data.slug }, create: data, update: data });
  }
  for (const tour of tours) {
    const data = {
      slug: tour.slug,
      name: tour.title,
      duration: tour.duration,
      destinations: tour.route.split(" - ").map(part => part.trim()),
      summary: tour.intro,
      highlights: tour.tags,
      itinerary: tour.itinerary,
      image: tour.image,
      published: true,
    };
    await prisma.tourPackage.upsert({ where: { slug: data.slug }, create: data, update: data });
  }
}

main().finally(() => prisma.$disconnect());
