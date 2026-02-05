import type { PhoneListing, Conversation } from '@/lib/types';

export const phoneListings: PhoneListing[] = [
  {
    id: '1',
    model: 'Galaxy Nova 12',
    description: 'Barely used, comes with original box and accessories. No scratches or dents. 256GB storage.',
    price: 850,
    condition: 'Used - Like New',
    imageUrl: 'https://picsum.photos/seed/phone1/600/800',
    imageHint: 'smartphone screen'
  },
  {
    id: '2',
    model: 'PixelShift 8 Pro',
    description: 'Brand new, sealed in box. Unwanted gift. 128GB model in Obsidian Black.',
    price: 999,
    condition: 'New',
    imageUrl: 'https://picsum.photos/seed/phone2/600/800',
    imageHint: 'smartphone table'
  },
  {
    id: '3',
    model: 'iFruit 14 Max',
    description: 'Used for one year. Has minor scuffs on the corner but screen is pristine. Battery health at 92%.',
    price: 650,
    condition: 'Used - Good',
    imageUrl: 'https://picsum.photos/seed/phone3/600/800',
    imageHint: 'smartphone hand'
  },
  {
    id: '4',
    model: 'OneMinus 11T',
    description: 'Good condition, works perfectly. Screen has some micro-scratches, not visible when on. 512GB.',
    price: 450,
    condition: 'Used - Good',
    imageUrl: 'https://picsum.photos/seed/phone4/600/800',
    imageHint: 'smartphone camera'
  },
  {
    id: '5',
    model: 'Xenon Zenfone X',
    description: 'For parts or repair. Does not turn on. Screen is cracked. Sold as-is.',
    price: 50,
    condition: 'Used - Fair',
    imageUrl: 'https://picsum.photos/seed/phone5/600/800',
    imageHint: 'smartphones'
  },
  {
    id: '6',
    model: 'iFruit 15 Pro',
    description: 'Newest model, pristine condition. Used for 2 weeks. 256GB in Natural Titanium.',
    price: 1100,
    condition: 'Used - Like New',
    imageUrl: 'https://picsum.photos/seed/phone6/600/800',
    imageHint: 'white smartphone'
  },
  {
    id: '7',
    model: 'Galaxy Nova 11',
    description: 'A reliable phone that has served me well. Some visible wear and tear, but fully functional.',
    price: 320,
    condition: 'Used - Fair',
    imageUrl: 'https://picsum.photos/seed/phone7/600/800',
    imageHint: 'black smartphone'
  },
  {
    id: '8',
    model: 'PixelShift 7a',
    description: 'Excellent budget phone. Bought 6 months ago, in great shape. Comes with a case.',
    price: 350,
    condition: 'Used - Good',
    imageUrl: 'https://picsum.photos/seed/phone8/600/800',
    imageHint: 'smartphone charging'
  },
];

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
