import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DoctorCard } from "@/components/doctor-card"
import { doctors } from "@/lib/data"

export function DoctorsSection() {
  // Show first 3 doctors on homepage
  const featuredDoctors = doctors.slice(0, 3)

  return (
    <section className="bg-secondary/30 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center animate-fade-in-up">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Our Doctors
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Meet Our Expert Physicians
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Our team of certified doctors are here to provide you with the
              best medical care and guidance.
            </p>
          </div>
          <Button variant="outline" className="transition-all hover:scale-105" asChild>
            <Link href="/doctors">View All Doctors</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDoctors.map((doctor, index) => (
            <div 
              key={doctor.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
