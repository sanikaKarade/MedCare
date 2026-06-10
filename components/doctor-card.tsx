import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
interface DoctorCardProps {
  doctor: any
  variant?: "default" | "compact"
}

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
              <p className="text-xs text-muted-foreground">
  {doctor.experience} years experience
</p>
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
  src={doctor.imageUrl || "/placeholder-user.jpg"}
  alt={doctor.name}
  fill
  className="object-cover transition-transform duration-300 group-hover:scale-110"
/>
<Badge className="absolute right-3 top-3 bg-green-100 text-green-700">
  Available
</Badge>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">
            {doctor.specialization}
          </p>
          <div className="mt-3">
  {doctor.hospital && (
    <p className="text-sm text-muted-foreground">
      {doctor.hospital}
    </p>
  )}

  {doctor.city && (
    <p className="text-sm text-muted-foreground">
      {doctor.city}
    </p>
  )}
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
