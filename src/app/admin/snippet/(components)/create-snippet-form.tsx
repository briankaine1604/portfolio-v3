"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { insertSnippetSchema } from "@/db/schema/snippets";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSnippetSchema = insertSnippetSchema.omit({ slug: true });

export function CreateSnippetForm() {
  const router = useRouter();
  const trpc = useTRPC();
  const mutation = useMutation(trpc.snippet.create.mutationOptions());
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createSnippetSchema>>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      title: "",
      content: "",
      language: "TypeScript",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof createSnippetSchema>) {
    mutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.snippet.getAll.queryKey(),
        });
        toast.success("Snippet created!");
        router.push("/admin/snippet");
      },
      onError: () => {
        toast.error("Snippet creation failed!");
      },
    });
    console.log(values);
  }

  return (
    <div className="mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Snippet form</h1>
        <p className="text-gray-600">
          Share your stories and write ups with the community
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Snippet Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your snippet title"
                    {...field}
                    className="mt-2 block w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  />
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Snippet Language
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., TypeScript, Python, JavaScript"
                    {...field}
                    value={field.value ?? "TypeScript"}
                    className="mt-2 block w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  />
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Snippet Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a short description for your snippet"
                    {...field}
                    value={field.value ?? ""}
                    className="mt-2 block w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  />
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Your code snippet
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your code snippet"
                    {...field}
                    value={field.value ?? ""}
                    className="mt-2 block w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  />
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="flex items-center justify-center gap-2">
                <Plus className="size-4 mr-2" />
                Create
                {mutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
