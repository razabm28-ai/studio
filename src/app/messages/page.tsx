"use client"

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

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
            <Card className="h-[calc(100vh-12rem)]">
              <CardContent className="h-full flex flex-col items-center justify-center text-center">
                  <MessageSquare className="w-20 h-20 text-muted-foreground/50 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Chat System Coming Soon!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    I'm working on building a real-time chat feature so you can connect with buyers and sellers directly. Stay tuned!
                  </p>
              </CardContent>
            </Card>
        </div>
    );
}

    