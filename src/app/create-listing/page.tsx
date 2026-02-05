"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { useUser, useFirestore, addDocumentNonBlocking, useMemoFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { collection, serverTimestamp } from "firebase/firestore";


const formSchema = z.object({
  model: z.string().min(3, "Model name must be at least 3 characters."),
  description: z.string().min(20, "Description must be at least 20 characters.").max(500, "Description must be less than 500 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  condition: z.enum(['New', 'Used - Like New', 'Used - Good', 'Used - Fair']),
});

export default function CreateListingPage() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      description: "",
      price: undefined,
      condition: "Used - Good",
    },
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace("/login?from=/create-listing");
    }
  }, [user, isUserLoading, router]);


  const phoneListingsCollection = useMemoFirebase(
    () => user && firestore ? collection(firestore, 'users', user.uid, 'phoneListings') : null,
    [firestore, user]
  );


  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || !phoneListingsCollection) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to create a listing.",
        });
        return;
    }
      
    const newListing = {
        ...values,
        userId: user.uid,
        postDate: serverTimestamp(),
        imageUrls: [], // Placeholder for now
    };

    addDocumentNonBlocking(phoneListingsCollection, newListing);
    
    toast({
      title: "Listing Created!",
      description: `Your ad for the ${values.model} has been posted.`,
    });
    form.reset();
  }

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
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sell Your Phone</CardTitle>
          <CardDescription>Fill out the details below to create your listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Galaxy Nova 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the phone's condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Used - Like New">Used - Like New</SelectItem>
                        <SelectItem value="Used - Good">Used - Good</SelectItem>
                        <SelectItem value="Used - Fair">Used - Fair</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 70000" {...field} />
                    </FormControl>
                    <FormDescription>Enter price in INR (₹).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the phone's features, condition, and any included accessories."
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-accent/20 hover:bg-accent/40">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Camera className="w-10 h-10 mb-3 text-muted-foreground"/>
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                            <FormDescription className="mt-2">Photo upload is a demo feature.</FormDescription>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" disabled />
                    </label>
                  </div> 
                </FormControl>
              </FormItem>

              <Button type="submit" className="w-full sm:w-auto" size="lg">Create Listing</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
