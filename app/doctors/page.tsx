import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { doctors } from "@/lib/data"
import {
  Stethoscope,
  Building2,
  BriefcaseMedical,
  IndianRupee,
} from "lucide-react"

export default async function DoctorsPage() {
  

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
                  {doctor.specialization}
                </p>

                <p className="mt-2">
                  {doctor.experience} Years Experience
                </p>

                <p>
                  ₹{doctor.consultationFee}
                </p>

                <p>
                  {doctor.hospital}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}