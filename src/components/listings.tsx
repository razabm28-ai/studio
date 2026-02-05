"use client";

import { useState, useMemo, useEffect } from 'react';
import type { PhoneListing } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import PhoneCard from './phone-card';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';

export default function Listings({ allListings }: { allListings: PhoneListing[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [condition, setCondition] = useState('all');
  
  const maxPrice = useMemo(() => Math.ceil(Math.max(...allListings.map(p => p.price), 100) / 10) * 10, [allListings]);
  const [price, setPrice] = useState(maxPrice);

  useEffect(() => {
    setIsMounted(true);
    setPrice(maxPrice);
  }, [maxPrice]);

  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      const searchMatch = listing.model.toLowerCase().includes(searchTerm.toLowerCase());
      const conditionMatch = condition === 'all' || listing.condition === condition;
      const priceMatch = listing.price <= price;
      return searchMatch && conditionMatch && priceMatch;
    });
  }, [allListings, searchTerm, condition, price]);

  const resetFilters = () => {
    setSearchTerm('');
    setCondition('all');
    setPrice(maxPrice);
  };
  
  const conditions = ['all', 'New', 'Used - Like New', 'Used - Good', 'Used - Fair'];

  if (!isMounted) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <div className="aspect-[3/4] bg-muted rounded-lg animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
                        <div className="h-5 bg-muted rounded w-1/4 animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
  }

  return (
    <div>
      <div className="mb-8 p-4 md:p-6 bg-card border rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="text-sm font-medium mb-2 block">Search by model</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="e.g., iFruit 15 Pro"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label htmlFor="condition" className="text-sm font-medium mb-2 block">Condition</label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger id="condition">
                <SelectValue placeholder="All Conditions" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map(c => <SelectItem key={c} value={c}>{c === 'all' ? 'All Conditions' : c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2 lg:col-span-3 mt-4">
             <div className="flex justify-between mb-2">
                 <label className="text-sm font-medium">Max Price</label>
                 <span className="text-sm font-medium text-primary">${price}</span>
             </div>
            <Slider
              min={0}
              max={maxPrice}
              step={10}
              value={[price]}
              onValueChange={(value) => setPrice(value[0])}
            />
          </div>

          <div className="col-start-1 lg:col-start-3">
             <Button onClick={resetFilters} variant="ghost" className="w-full">
                <X className="mr-2 h-4 w-4" /> Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map(listing => (
            <PhoneCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <p className="text-lg text-muted-foreground">No phones match your criteria.</p>
          <Button variant="link" onClick={resetFilters}>Clear filters and try again</Button>
        </div>
      )}
    </div>
  );
}
