import type { Conversation } from '@/lib/types';

// This file now only contains mock data for conversations, which will be replaced soon.
// Phone listings are now fetched directly from the database.

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    sellerName: 'John D.',
    sellerAvatar: 'https://picsum.photos/seed/avatar1/100/100',
    lastMessage: 'Yes, it\'s still available!',
    lastMessageTimestamp: '2 hours ago',
    phoneModel: 'iFruit 14 Max',
    messages: [
      { id: 'm1', sender: 'user', text: 'Hi, is the iFruit 14 Max still available?', timestamp: '3 hours ago' },
      { id: 'm2', sender: 'seller', text: 'Yes, it\'s still available!', timestamp: '2 hours ago' },
    ],
  },
  {
    id: 'conv2',
    sellerName: 'Sarah K.',
    sellerAvatar: 'https://picsum.photos/seed/avatar2/100/100',
    lastMessage: 'Sorry, price is firm.',
    lastMessageTimestamp: '1 day ago',
    phoneModel: 'PixelShift 8 Pro',
    messages: [
       { id: 'm3', sender: 'user', text: 'Would you take $900 for the Pixel?', timestamp: '1 day ago' },
       { id: 'm4', sender: 'seller', text: 'Sorry, price is firm.', timestamp: '1 day ago' },
    ],
  },
    {
    id: 'conv3',
    sellerName: 'Mike T.',
    sellerAvatar: 'https://picsum.photos/seed/avatar3/100/100',
    lastMessage: 'Great! I can ship it tomorrow morning.',
    lastMessageTimestamp: '3 days ago',
    phoneModel: 'OneMinus 11T',
    messages: [
       { id: 'm5', sender: 'user', text: 'I\'ll take it.', timestamp: '3 days ago' },
       { id: 'm6', sender: 'seller', text: 'Great! I can ship it tomorrow morning.', timestamp: '3 days ago' },
    ],
  },
];

    