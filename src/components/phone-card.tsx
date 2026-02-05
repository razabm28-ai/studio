import Image from 'next/image';
import type { PhoneListing } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type PhoneCardProps = {
  listing: PhoneListing;
};

export default function PhoneCard({ listing }: PhoneCardProps) {
  const formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(listing.price);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-0 relative aspect-[3/4]">
        <Image
          src={listing.imageUrl}
          alt={`Image of ${listing.model}`}
          data-ai-hint={listing.imageHint}
          fill
          className="object-cover"
        />
      </CardContent>
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight truncate">{listing.model}</CardTitle>
          <div className="flex items-center justify-between pt-1">
             <CardDescription className="text-xl font-bold text-primary">{formatPrice}</CardDescription>
             <Badge variant={listing.condition === 'New' ? 'default' : 'secondary'}>{listing.condition}</Badge>
          </div>
        </CardHeader>
        <CardFooter className="mt-auto">
          <Button asChild className="w-full">
            <Link href={`/messages?listing=${listing.id}`}>Message Seller</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
