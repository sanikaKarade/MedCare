import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import {
  Stethoscope,
  Building2,
  BriefcaseMedical,
  IndianRupee,
} from "lucide-react"

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-8">
            Our Doctors
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold">
                  {doctor.name}
                </h2>

                <p className="text-blue-600">
                  {doctor.specialization || "General Physician"}
                </p>

                <p className="mt-2">
                  {doctor.experience} Years Experience
                </p>

                <p>
                  ₹{doctor.consultationFee}
                </p>

                <p>{doctor.hospital ?? "Hospital not specified"}</p>
                <div className="mt-4">
  <Link
    href={`/appointment?doctor=${doctor.id}`}
    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  >
    Book Appointment
  </Link>
</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}