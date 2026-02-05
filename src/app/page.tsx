import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Listings from '@/components/listings';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Home as HomeIcon, Smartphone, Cpu, Car, Bike, Camera, Laptop, Monitor } from 'lucide-react';
import Link from 'next/link';

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

const categories = [
    { name: 'Home', icon: <HomeIcon className="w-6 h-6 text-primary" />, href: '#' },
    { name: 'Mobile', icon: <Smartphone className="w-6 h-6 text-primary" />, href: '#' },
    { name: 'Electronics', icon: <Cpu className="w-6 h-6 text-primary" />, href: '#' },
    { name: 'Cars', icon: <Car className="w-6 h-6 text-primary" />, href: '#' },
    { name: 'Bikes', icon: <Bike className="w-6 h-6 text-primary" />, href: '#' },
    { name: 'Camera', icon: <Camera className="w-6 h-6 text-primary" />, href: '#' },
    { name: 'Laptop', icon: <Laptop className="w-6 h-6 text-primary" />, href: '#' },
    { name: 'DSLR', icon: <Camera className="w-6 h-6 text-primary" />, href: '#' },
    { name: 'Computer', icon: <Monitor className="w-6 h-6 text-primary" />, href: '#' },
];


export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
            {categories.map((category) => (
            <Link href={category.href} key={category.name} className="group flex flex-col items-center justify-center space-y-2 w-24 text-center transition-transform hover:-translate-y-1">
                <div className="p-5 bg-card border rounded-full shadow-sm group-hover:shadow-lg group-hover:bg-accent/50 transition-all duration-300">
                    {category.icon}
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{category.name}</span>
            </Link>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-8">Explore All Phones</h2>
        <Suspense fallback={<ListingsSkeleton />}>
            <Listings />
        </Suspense>
      </section>
    </div>
  );
}
