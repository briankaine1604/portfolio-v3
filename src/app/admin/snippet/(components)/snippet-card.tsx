"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

type Props = {
  title: string;
  date?: string | Date;
  slug: string;
};

export function SnippetCard({ title, date, slug }: Props) {
  const [open, setIsOpen] = useState(false);
  const trpc = useTRPC();
  const mutation = useMutation(trpc.snippet.delete.mutationOptions());
  const queryClient = useQueryClient();

  const onDelete = (slug: string) => {
    mutation.mutate(slug, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.snippet.getAll.queryKey(),
        });
        toast.success("Snippet deleted!");
      },
      onError: () => {
        toast.error("Snippet delete failed!");
        setIsOpen(false);
      },
    });
  };

  return (
    <div
      className="
        relative w-full rounded-xl border border-gray-200 bg-white
        p-4 shadow-sm
        
      "
    >
      {/* Action buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <Link
          href={`/admin/snippet/${slug}`}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label={`Edit ${title}`}
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          aria-label={`Delete ${title}`}
          onClick={() => setIsOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 pr-14">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>
        {date && (
          <span className="inline-block w-fit rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 font-mono">
            {format(new Date(date), "MMM d, yyyy")}
          </span>
        )}
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={open} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              snippet post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500"
              onClick={() => onDelete(slug)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
