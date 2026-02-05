"use client"

import { Suspense, useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { conversations as mockConversations } from '@/lib/data';
import type { Conversation } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Send, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

function ConversationList({ conversations, onSelect, selectedId }: { conversations: Conversation[], onSelect: (id: string) => void, selectedId: string | null }) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-2">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              selectedId === conv.id && "bg-accent"
            )}
            onClick={() => onSelect(conv.id)}
          >
            <div className="flex w-full items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.sellerAvatar} alt={conv.sellerName} />
                <AvatarFallback>{conv.sellerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <div className="font-semibold">{conv.sellerName}</div>
                <div className="text-xs text-muted-foreground">re: {conv.phoneModel}</div>
                <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
              <div className="text-xs text-muted-foreground self-start">{conv.lastMessageTimestamp}</div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

function ChatView({ conversation, onBack }: { conversation: Conversation, onBack?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-2 pr-4 border-b">
        {onBack && 
          <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        }
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={conversation.sellerAvatar} alt={conversation.sellerName} />
          <AvatarFallback>{conversation.sellerName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <p className="font-semibold">{conversation.sellerName}</p>
          <p className="text-sm text-muted-foreground truncate">Inquiry about {conversation.phoneModel}</p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4 bg-blue-50/20">
        <div className="space-y-4">
          {conversation.messages.map((message) => (
            <div key={message.id} className={cn("flex items-end gap-2", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn("max-w-[75%] rounded-lg px-4 py-2", message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form className="relative">
          <Input placeholder="Type your message..." className="pr-12" />
          <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

function MessagesContent() {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const listingParam = searchParams.get('listing');
  
  const initialConvId = useMemo(() => {
    if (!listingParam) return mockConversations[0]?.id || null;
    const conv = mockConversations.find(c => c.id === `conv${listingParam}`);
    return conv?.id || mockConversations[0]?.id || null;
  }, [listingParam]);

  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  useState(() => {
    setSelectedConvId(initialConvId)
  });
  
  const selectedConversation = mockConversations.find(c => c.id === selectedConvId);

  const handleSelectConversation = (id: string) => {
    setSelectedConvId(id);
  }

  const handleBack = () => {
    setSelectedConvId(null);
  }
  
  if (isMobile) {
    return (
      <Card className="h-[calc(100vh-12rem)] w-full">
        {!selectedConversation ? (
          <div className='h-full flex flex-col'>
            <h2 className="p-4 text-lg font-semibold border-b">Conversations</h2>
            <ConversationList conversations={mockConversations} onSelect={handleSelectConversation} selectedId={selectedConvId} />
          </div>
        ) : (
          <ChatView conversation={selectedConversation} onBack={handleBack} />
        )}
      </Card>
    );
  }

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
        <div className="md:col-span-1 lg:col-span-1 border-r h-full flex flex-col">
          <h2 className="p-4 text-lg font-semibold">Conversations</h2>
          <Separator />
          <ConversationList conversations={mockConversations} onSelect={handleSelectConversation} selectedId={selectedConvId} />
        </div>
        <div className="md:col-span-2 lg:col-span-3 h-full">
          {selectedConversation ? <ChatView conversation={selectedConversation} /> : (
            <div className="flex h-full items-center justify-center bg-muted/20">
              <div className="text-center">
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm text-muted-foreground">Your messages will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function MessagesPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/login?from=/messages');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                <p className="text-muted-foreground">Manage your conversations with buyers and sellers.</p>
            </div>
            <Suspense fallback={<div className="h-[calc(100vh-12rem)] w-full bg-muted rounded-lg animate-pulse" />}>
              <MessagesContent />
            </Suspense>
        </div>
    );
}
