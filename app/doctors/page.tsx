import { prisma } from "@/lib/prisma"

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>

      <div className="grid gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="border rounded-lg p-4"
          >
            <h2 className="font-semibold">{doctor.name}</h2>
            <p>{doctor.specialization}</p>
            <p>{doctor.experience} years experience</p>
            <p>₹{doctor.consultationFee}</p>
            <p>{doctor.hospital}</p>
          </div>
        ))}
      </div>
    </div>
  )
}