"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";

interface Props {
  onSubmit: (name: string) => void;
  isPending: boolean;
}

export function CreateCategoryForm({ onSubmit, isPending }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name.trim());
    setName(""); // reset after submit
  };

  return (
    <div className="mx-auto p-6">
      <div className="mb-4">
        <label
          htmlFor="categoryName"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Category Name
        </label>
        <Input
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          disabled={isPending}
          className="w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:bg-white transition-all duration-200"
        />
      </div>

      <Button
        onClick={handleSubmit}
        type="button"
        disabled={isPending || !name.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span className="flex items-center justify-center gap-2">
          <Plus className="size-4" />
          Create
          {isPending && <Loader2 className="size-4 animate-spin" />}
        </span>
      </Button>
    </div>
  );
}
