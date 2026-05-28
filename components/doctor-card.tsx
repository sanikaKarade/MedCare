import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Doctor } from "@/lib/data"

interface DoctorCardProps {
  doctor: Doctor
  variant?: "default" | "compact"
}

export function DoctorCard({ doctor, variant = "default" }: DoctorCardProps) {
  if (variant === "compact") {
    return (
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-secondary">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">
                {doctor.specialization}
              </p>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium">{doctor.rating}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <CardContent className="p-0">
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge
            className={`absolute right-3 top-3 transition-transform duration-300 group-hover:scale-105 ${
              doctor.availability.includes("Today")
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : "bg-amber-100 text-amber-700 hover:bg-amber-100"
            }`}
          >
            {doctor.availability}
          </Badge>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">
            {doctor.specialization}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{doctor.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({doctor.reviews} reviews)
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {doctor.experience} years experience
          </p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1 transition-all hover:scale-[1.02]" asChild>
              <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
            </Button>
            <Button className="flex-1 transition-all hover:scale-[1.02] hover:shadow-md" asChild>
              <Link href={`/appointment?doctor=${doctor.id}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
