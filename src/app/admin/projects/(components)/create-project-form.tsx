"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { insertProjectSchema } from "@/db/schema/projects";
import { useTRPC } from "@/trpc/client";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Github, Link2, Loader2, Plus, UploadCloud, X } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createProjectSchema = insertProjectSchema.omit({ slug: true });

export function CreateProjectForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const maxTags = 12;

  const trpc = useTRPC();
  const mutation = useMutation(trpc.project.create.mutationOptions());

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      tags: [],
      demo: "",
      github: "",
      priority: 0,
    },
  });

  function onSubmit(values: z.infer<typeof createProjectSchema>) {
    mutation.mutate(values);
    console.log(values);
  }

  return (
    <div className="mx-auto pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project form</h1>
        <p className="text-gray-600">Share your project with the community</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-x-5">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Project Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your project title"
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
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Priority
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your project title"
                      {...field}
                      value={field.value ?? 0}
                      type="number"
                      className="mt-2 block w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="mt-2 text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>
          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Project Description
                </FormLabel>
                <FormControl>
                  <div className="relative max-w-3xl">
                    <Textarea {...field} />
                  </div>
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* GitHub URL Field */}
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  GitHub Repository
                </FormLabel>
                <FormControl>
                  <div className="relative mt-2">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Github className="size-4" />
                    </div>
                    <Input
                      placeholder="github.com/username/repository"
                      {...field}
                      value={field.value ?? ""}
                      className="block w-full rounded-xl border-0 bg-gray-50 pl-10 pr-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* Demo URL Field */}
          <FormField
            control={form.control}
            name="demo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Live Demo
                </FormLabel>
                <FormControl>
                  <div className="relative mt-2">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Link2 className="size-4" />
                    </div>
                    <Input
                      placeholder="https://your-demo-site.com"
                      {...field}
                      value={field.value ?? ""}
                      className="block w-full rounded-xl border-0 bg-gray-50 pl-10 pr-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* Tags Field */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => {
              const tags: string[] = field.value ?? [];

              function addTagFromInput(raw = "") {
                const candidate = raw.trim().toLowerCase();
                if (!candidate) return;
                if (tags.includes(candidate)) return;
                if (tags.length >= maxTags) return;
                const newTags = [...tags, candidate].slice(0, maxTags);
                field.onChange(newTags);
                if (inputRef.current) inputRef.current.value = "";
              }

              return (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Technologies & Tags
                  </FormLabel>
                  <FormControl>
                    <div className="mt-2 flex min-h-[3rem] flex-wrap items-center gap-2 rounded-xl border-0 bg-gray-50 p-3 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 focus-within:bg-white transition-all duration-200">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
                        >
                          <span className="text-xs">#</span>
                          {tag}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(tags.filter((t) => t !== tag))
                            }
                            className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}

                      <input
                        ref={inputRef}
                        placeholder={
                          tags.length
                            ? "Add more tags..."
                            : "Type a tag and press Enter"
                        }
                        className="flex-1 min-w-[140px] border-none bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                        onKeyDown={(e) => {
                          const el = e.currentTarget as HTMLInputElement;
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            addTagFromInput(el.value);
                          } else if (
                            e.key === "Backspace" &&
                            el.value === "" &&
                            tags.length
                          ) {
                            field.onChange(tags.slice(0, tags.length - 1));
                          }
                        }}
                        onPaste={(e) => {
                          const pasted = e.clipboardData.getData("text");
                          if (pasted.includes(",") || pasted.includes("\n")) {
                            e.preventDefault();
                            const parts = pasted
                              .split(/[, \n]+/)
                              .map((p) => p.trim().toLowerCase())
                              .filter(Boolean);
                            const unique = parts.filter(
                              (p) => !tags.includes(p)
                            );
                            if (unique.length) {
                              field.onChange(
                                [...tags, ...unique].slice(0, maxTags)
                              );
                              if (inputRef.current) inputRef.current.value = "";
                            }
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <p className="mt-2 text-xs text-gray-500">
                    Add up to {maxTags} tags to help people discover your
                    project
                  </p>
                </FormItem>
              );
            }}
          />

          {/* Image Upload Field */}
          <FormField
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Project Image
                </FormLabel>
                <FormControl>
                  <div className="mt-2 space-y-4">
                    {/* Upload Area */}

                    <UploadButton
                      appearance={{
                        button:
                          "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
                        container: "flex flex-col items-center gap-3",
                        allowedContent: "text-sm text-gray-500 font-medium",
                      }}
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].ufsUrl);
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />

                    {/* Preview */}
                    {field.value && (
                      <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src={field.value}
                          alt="Project preview"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            type="button"
                            onClick={() => field.onChange("")}
                            className="rounded-full bg-red-500 p-1 text-white shadow-lg hover:bg-red-600 transition-colors"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* URL Input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Link2 className="size-4" />
                      </div>
                      <input
                        {...field}
                        placeholder="Or paste an image URL"
                        className="block w-full rounded-xl border-0 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>
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
