"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DoctorCard } from "@/components/doctor-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { specializations } from "@/lib/data"
import { Search, SlidersHorizontal } from "lucide-react"

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialization, setSpecialization] = useState("All Specializations")
  const [availability, setAvailability] = useState("all")
  const [doctors, setDoctors] = useState<any[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/doctors")
      const data = await response.json()

      console.log("API Response:", data)

      if (!Array.isArray(data)) {
        console.error("API did not return an array:", data)
        setDoctors([])
        return
      }

      const transformedDoctors = data.map((doctor: any) => ({
        id: doctor.id,
        name: doctor.name,
        specialization: doctor.specialization,
        experience: doctor.experience,
        image: doctor.imageUrl || "/placeholder.svg",
        rating: 4.8,
        reviews: 120,
        availability: "Available Today",
      }))

      setDoctors(transformedDoctors)
    } catch (error) {
      console.error("Failed to fetch doctors", error)
    } finally {
      setLoading(false)
    }
  }

  fetchDoctors()
}, [])
if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Loading Doctors...
    </div>
  )
}

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialization =
      specialization === "All Specializations" ||
      doctor.specialization === specialization

    const matchesAvailability =
      availability === "all" ||
      (availability === "today" && doctor.availability.includes("Today")) ||
      (availability === "tomorrow" &&
        doctor.availability.includes("Tomorrow")) ||
      (availability === "this-week" && !doctor.availability.includes("Today"))

    return matchesSearch && matchesSpecialization && matchesAvailability
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold sm:text-4xl">Find a Doctor</h1>
              <p className="mt-4 text-muted-foreground">
                Browse our network of certified healthcare professionals and
                book an appointment with the right specialist for your needs.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mx-auto mt-8 max-w-4xl">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name or specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={specialization}
                  onValueChange={setSpecialization}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Availability</SelectItem>
                    <SelectItem value="today">Available Today</SelectItem>
                    <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredDoctors.length} doctor
                {filteredDoctors.length !== 1 ? "s" : ""}
              </p>
              {(searchQuery ||
                specialization !== "All Specializations" ||
                availability !== "all") && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("")
                    setSpecialization("All Specializations")
                    setAvailability("all")
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>

            {filteredDoctors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No doctors found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSpecialization("All Specializations")
                    setAvailability("all")
                  }}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
