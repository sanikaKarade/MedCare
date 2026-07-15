import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  GraduationCap,
  Building,
  Clock,
  Calendar,
  ArrowLeft,
} from "lucide-react"
import { prisma } from "@/lib/prisma"


export const dynamic = "force-dynamic"

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
      status: "APPROVED",
    },
  })
  
  if (!doctor) {
    notFound()
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/doctors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Doctors
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Doctor Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-secondary">
                      <Image
                        src={doctor.imageUrl || "/placeholder-doctor.jpg"}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h1 className="text-2xl font-bold">{doctor.name}</h1>
                          <p className="text-lg text-muted-foreground">
                            {doctor.specialization}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
  Available
</Badge>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-5 w-5" />
                          <span>{doctor.experience} years experience</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Education</p>
                        <p className="text-sm text-muted-foreground">
                        {doctor.degree || "Not Provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
                      <Building className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Hospital</p>
                        <p className="text-sm text-muted-foreground">
                          {doctor.hospital}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold">About</h3>
                    <p className="mt-2 text-muted-foreground">
                      {doctor.name} is a highly skilled {doctor.specialization}{" "}
                      with over {doctor.experience} years of experience in
                      providing exceptional patient care. Known for their
                      compassionate approach and thorough diagnostics, they have
                      helped thousands of patients achieve better health
                      outcomes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Card */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">Book an Appointment</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select a time slot that works for you
                  </p>

                  <div className="mt-4 flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                    <span className="text-sm">Consultation Fee</span>
                    <span className="text-lg font-bold">
                    ₹{doctor.consultationFee}
                    </span>
                  </div>
                  <div className="mt-4 rounded-lg bg-secondary/50 p-4">
  <p className="text-sm text-muted-foreground">
    Time slots will be selected during appointment booking.
  </p>
</div>

                  <Button className="mt-6 w-full" asChild>
                    <Link href={`/appointment?doctor=${doctor.id}`}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Link>
                  </Button>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Free cancellation up to 24 hours before your appointment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
