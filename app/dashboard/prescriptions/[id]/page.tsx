import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import DownloadPDF from "@/components/downloadPDF"

export default async function PrescriptionDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const prescription = await prisma.prescription.findUnique({
    where: {
      id,
    },
    include: {
      medicines: true,
      appointment: {
        include: {
          doctor: true,
        },
      },
    },
  })

  if (!prescription) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Prescription</h1>

      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="font-semibold">{prescription.diagnosis}</h2>
          <p>Doctor: {prescription.appointment.doctor.name}</p>
        </div>

        <div>
          <h3 className="font-medium">Medicines</h3>

          {prescription.medicines.map((med) => (
            <div key={med.id}>
              {med.name} - {med.dosage}
            </div>
          ))}
        </div>

        {prescription.notes && (
          <div>
            <h3 className="font-medium">Notes</h3>
            <p>{prescription.notes}</p>
          </div>
        )}
      </div>

      <DownloadPDF />
    </div>
  )
}