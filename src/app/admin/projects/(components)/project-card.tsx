// components/ProjectCard.tsx
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

type ProjectCardProps = {
  title: string;
  description?: string;
  date?: string | Date;
  image?: string;
  slug: string;
};

export function ProjectCard({
  title,
  description,
  date,
  image,
  slug,
}: ProjectCardProps) {
  const [open, setIsOpen] = useState(false);
  const trpc = useTRPC();
  const mutation = useMutation(trpc.project.delete.mutationOptions());
  const queryClient = useQueryClient();

  const onDelete = (slug: string) => {
    mutation.mutate(slug, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.project.getAll.queryKey(),
        });
        toast.success("Project deleted!");
      },
      onError: () => {
        toast.error("Project delete failed!");
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200">
        {/* Image thumbnail */}
        {image && (
          <div className="h-48 w-full overflow-hidden bg-gray-100">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
              {description}
            </p>
          )}

          {/* Footer with date and actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {date && (
              <span className="text-xs text-gray-500">
                {format(new Date(date), "MMM d, yyyy")}
              </span>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-1 ml-auto">
              <Link
                href={`/admin/projects/${slug}`}
                className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={`Edit ${title}`}
              >
                <Edit className="h-4 w-4" />
              </Link>
              <button
                type="button"
                disabled={mutation.isPending}
                className="p-2 rounded-md hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                aria-label={`Delete ${title}`}
                onClick={() => setIsOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={open} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => onDelete(slug)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
