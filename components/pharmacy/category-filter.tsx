"use client"

import { Button } from "@/components/ui/button"

const categories = [
  "All",
  "Pain Relief",
  "Antibiotic",
  "Vitamin",
  "Allergy",
  "Diabetes",
  "Heart Care",
]

export function CategoryFilter() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {categories.map((category) => (
        <Button
        key={category}
        variant={category === "All" ? "default" : "outline"}
        className={`rounded-full ${
          category === "All"
            ? ""
            : "bg-white text-slate-700 border-slate-300 hover:bg-blue-50 hover:text-blue-600"
        }`}
      >
        {category}
      </Button>
      ))}
    </div>
  )
}