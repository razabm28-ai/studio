// 'use server'

/**
 * @fileOverview Provides personalized phone listing recommendations based on user history and preferences.
 *
 * - getListingRecommendations - A function that retrieves listing recommendations for a user.
 * - ListingRecommendationsInput - The input type for the getListingRecommendations function.
 * - ListingRecommendationsOutput - The return type for the getListingRecommendations function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ListingRecommendationsInputSchema = z.object({
  userHistory: z
    .string()
    .describe(
      'A summary of the user history, including past browsing history and preferences.'
    ),
  currentListings: z
    .string()
    .describe('A summary of the current listings available to recommend.'),
});
export type ListingRecommendationsInput =
  z.infer<typeof ListingRecommendationsInputSchema>;

const ListingRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of recommended listing IDs, based on the user history and current listings.'
    ),
});
export type ListingRecommendationsOutput =
  z.infer<typeof ListingRecommendationsOutputSchema>;

export async function getListingRecommendations(
  input: ListingRecommendationsInput
): Promise<ListingRecommendationsOutput> {
  return listingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'listingRecommendationsPrompt',
  input: {schema: ListingRecommendationsInputSchema},
  output: {schema: ListingRecommendationsOutputSchema},
  prompt: `You are a recommendation engine for a phone marketplace app.

Based on the user's past browsing history and preferences, and the current available listings, you will return a list of recommended listing IDs.

User History: {{{userHistory}}}
Current Listings: {{{currentListings}}}

Recommendations:`,
});

const listingRecommendationsFlow = ai.defineFlow(
  {
    name: 'listingRecommendationsFlow',
    inputSchema: ListingRecommendationsInputSchema,
    outputSchema: ListingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
