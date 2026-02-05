import Image from 'next/image';
import type { PhoneListing } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type PhoneCardProps = {
  listing: PhoneListing;
};

export default function PhoneCard({ listing }: PhoneCardProps) {
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
          <CardTitle className="text-lg font-semibold tracking-tight truncate">Advance Profile</CardTitle>
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
