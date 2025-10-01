"use client";

import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { insertBlogSchema } from "@/db/schema/blogs";
import { insertCategorySchema } from "@/db/schema/categories";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreateCategoryForm } from "../../category/(components)/create-category-form";
import { useRouter } from "next/navigation";

const editBlogSchema = insertBlogSchema.omit({ slug: true });
const createCategorySchema = insertCategorySchema.omit({ slug: true });

export function EditBlogForm({ slug }: { slug: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const maxTags = 12;

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const mutation = useMutation(trpc.blog.edit.mutationOptions());
  const { data: blog } = useSuspenseQuery(trpc.blog.getOne.queryOptions(slug));
  const { data: categories } = useQuery(trpc.category.getAll.queryOptions());
  const queryClient = useQueryClient();
  const { mutate: categoryMutation, isPending: isCategoryPending } =
    useMutation(trpc.category.create.mutationOptions());

  const form = useForm<z.infer<typeof editBlogSchema>>({
    resolver: zodResolver(editBlogSchema),
    defaultValues: {
      title: blog?.title,
      excerpt: blog?.excerpt,
      content: blog?.content,
      categoryId: blog?.categoryId,
    },
  });
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: blog?.content,
    onUpdate: ({ editor }) => {
      // Update form field when editor content changes
      form.setValue("content", editor.getHTML());
    },
  });

  function onSubmit(values: z.infer<typeof editBlogSchema>) {
    const content = editor?.getHTML();
    const payload = {
      ...values,
      content: content || "",
    };

    try {
      mutation.mutate(
        { data: payload, slug },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: trpc.blog.getOne.queryKey(slug),
            });
            queryClient.invalidateQueries({
              queryKey: trpc.blog.getAll.queryKey(),
            });
            toast.success("Blog updated!");
            router.push("/admin/blog");
          },
          onError: () => {
            toast.error("Blog update failed!");
          },
        }
      );
    } catch (error) {
      console.error("Error in mutation:", error);
    }
    console.log(payload);
  }

  function createCategory(name: string) {
    categoryMutation(
      { name },
      {
        // wrap into object
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: trpc.category.getAll.queryKey(),
          });
          toast.success("Category created!");
          setIsOpen(false);
        },
        onError: () => {
          toast.error("Category creation failed!");
          setIsOpen(false);
        },
      }
    );
  }

  return (
    <div className="mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog form</h1>
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
                  Blog Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your blog title"
                    {...field}
                    className="mt-2 block w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  />
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Blog Excerpt
                </FormLabel>
                <FormControl>
                  <div className="relative max-w-3xl">
                    <Textarea {...field} value={field.value ?? ""} />
                  </div>
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Category
                </FormLabel>
                <FormControl>
                  <div className="relative mt-2 flex gap-x-5">
                    <Select
                      value={field.value ? String(field.value) : undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => setIsOpen(true)} type="button">
                      Add new Category +
                    </Button>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Category</DialogTitle>
                          <DialogDescription asChild>
                            <CreateCategoryForm
                              onSubmit={createCategory}
                              isPending={isCategoryPending}
                            />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* Demo URL Field */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Your story / Write up
                </FormLabel>
                <FormControl>
                  <div className="relative mt-2">
                    <SimpleEditor editor={editor} />
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
                Update
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
