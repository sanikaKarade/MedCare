"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    router.push(`/medicines?${params.toString()}`)
  }

  return (
    <div className="relative mt-8 max-w-xl">
      <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

      <Input
        defaultValue={
          searchParams.get("search") ?? ""
        }
        placeholder="Search medicines..."
        className="h-12 rounded-full bg-white pl-12 text-black"
        onChange={(e) =>
          handleSearch(e.target.value)
        }
      />
    </div>
  )
}