import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Listings from '@/components/listings';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function ListingsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}


export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-8">Explore All Phones</h2>
        <Suspense fallback={<ListingsSkeleton />}>
            <Listings />
        </Suspense>
      </section>
    </div>
  );
}

    