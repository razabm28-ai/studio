import Image from 'next/image';
import type { PhoneListing } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type PhoneCardProps = {
  listing: PhoneListing;
};

export default function PhoneCard({ listing }: PhoneCardProps) {
  const USD_TO_INR_RATE = 83.5;
  const priceInRupees = Math.round(listing.price * USD_TO_INR_RATE);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={listing.imageUrl}
          alt={`Image of ${listing.model}`}
          data-ai-hint={listing.imageHint}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-2">
        <CardHeader className="p-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold tracking-tight truncate pr-2">{listing.model}</CardTitle>
            <Badge variant="outline" className="shrink-0">{listing.condition}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <p className="text-2xl font-bold text-primary">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
            }).format(priceInRupees)}
          </p>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {listing.description}
          </p>
        </CardContent>
        <CardFooter className="p-0 pt-2 mt-auto">
          <Button asChild className="w-full">
            <Link href={`/messages?listing=${listing.id}`}>Message Seller</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
