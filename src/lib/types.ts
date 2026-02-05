import type { Timestamp } from "firebase/firestore";

export type PhoneListing = {
  id: string;
  userId: string;
  model: string;
  description: string;
  price: number;
  condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
  imageUrl: string;
  imageHint: string;
  postDate: Timestamp;
};

export type Message = {
  id: string;
  sender: 'user' | 'seller';
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  phoneModel: string;
  messages: Message[];
};

    