"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Trash2, Pencil, PlusCircle, RefreshCw } from "lucide-react";
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
import { toast } from "sonner";

export function CategoryList() {
  const [open, setIsOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const trpc = useTRPC();
  const qc = useQueryClient();

  const { data: categories = [], isLoading } = useQuery(
    trpc.category.getAll.queryOptions()
  );

  const addCategory = useMutation(
    trpc.category.create.mutationOptions({
      onSuccess: () =>
        qc.invalidateQueries({
          queryKey: trpc.category.getAll.queryKey(),
        }),
    })
  );

  const deleteCategory = useMutation(
    trpc.category.delete.mutationOptions({
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: trpc.category.getAll.queryKey() });
      },

      onError: (error) => {
        toast.error(error.message || "Failed to delete category");
      },
    })
  );

  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    addCategory.mutate({ name: newCategory });
    setNewCategory("");
  };

  const handleDelete = (slug: string) => {
    deleteCategory.mutate(slug);
    setIsOpen(false);
  };

  return (
    <Card className="mt-12">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          📂 Categories
        </h2>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              qc.invalidateQueries(trpc.category.getAll.queryOptions())
            }
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Add new category */}
        <div className="flex items-center gap-3 mb-6">
          <Input
            placeholder="Enter new category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="max-w-xs"
          />
          <Button
            onClick={handleAdd}
            disabled={addCategory.isPending}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add
          </Button>
        </div>

        {/* Category table */}
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-slate-500">No categories found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-slate-100 text-slate-600 uppercase">
                <tr>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Slug</th>
                  <th className="text-left py-2 px-4">Created</th>
                  <th className="text-right py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-t hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-2 px-4 font-medium">{cat.name}</td>
                    <td className="py-2 px-4 text-slate-500">{cat.slug}</td>
                    <td className="py-2 px-4 text-slate-500">
                      {format(new Date(cat.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="py-2 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedSlug(cat.slug);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
      <AlertDialog open={open} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              blog category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => handleDelete(selectedSlug!)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
