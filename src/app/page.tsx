import { getListingRecommendations } from '@/ai/flows/listing-recommendations';
import { phoneListings } from '@/lib/data';
import type { PhoneListing } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PhoneCard from '@/components/phone-card';
import Listings from '@/components/listings';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function RecommendedListings() {
  let recommendations: PhoneListing[] = [];
  try {
    const userHistory = "The user has previously shown interest in premium models like the iFruit 15 Pro and Galaxy Nova 12. They prefer phones that are 'New' or 'Used - Like New' and have larger storage capacities.";
    const currentListings = phoneListings.map(p => `ID: ${p.id}, Model: ${p.model}, Condition: ${p.condition}, Price: $${p.price}`).join('\n');
    
    const result = await getListingRecommendations({ userHistory, currentListings });
    const recommendedIds = result.recommendations.split(',').map(id => id.trim());
    
    recommendations = phoneListings.filter(p => recommendedIds.includes(p.id));

    if (recommendations.length < 3) {
      // Fallback to first few listings if AI gives not enough results or invalid IDs
      recommendations = phoneListings.slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to get listing recommendations:", error);
    // Fallback in case of an error with the AI flow
    recommendations = phoneListings.slice(0, 4);
  }

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {recommendations.map((listing) => (
            <CarouselItem key={listing.id} className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <PhoneCard listing={listing} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}

function RecommendedListingsSkeleton() {
    return (
        <div className="flex space-x-4 p-1">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="min-w-0 shrink-0 grow-0 basis-full pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className="w-full">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/4 mt-2" />
                    </CardHeader>
                  </Card>
                </div>
            ))}
        </div>
    )
}

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <section className="mb-12">
        <Card className="overflow-hidden bg-transparent sm:bg-card border-none sm:border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">Recommended For You</CardTitle>
          </CardHeader>
          <CardContent className='px-2 sm:px-6'>
            <Suspense fallback={<RecommendedListingsSkeleton />}>
              <RecommendedListings />
            </Suspense>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-8">Explore All Phones</h2>
        <Listings allListings={phoneListings} />
      </section>
    </div>
  );
}
