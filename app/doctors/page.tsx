import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-5xl font-bold">Find Your Perfect Doctor</h1>
          <p className="mt-6 text-lg text-blue-100">
            Book appointments with experienced specialists.
          </p>
        </div>
      </section>

      {/* Doctors */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-3xl font-bold">Available Doctors</h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-3xl border bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold">{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="rounded-xl border border-blue-600 py-3 text-center text-blue-600"
                >
                  View Profile
                </Link>

                <Link
                  href={`/appointment?doctor=${doctor.id}`}
                  className="rounded-xl bg-blue-600 py-3 text-center text-white"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
