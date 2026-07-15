import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import PrintButton from "@/components/PrintButton"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{
    prescriptionId: string
  }>
}

export default async function PrescriptionViewPage({
  params,
}: PageProps) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const { prescriptionId } = await params

  const prescription = await prisma.prescription.findUnique({
    where: {
      id: prescriptionId,
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

  // Only the patient it belongs to, or the doctor who's assigned to that
  // appointment, can view it — not just anyone with the link.
  const isPatient = prescription.appointment.patientId === userId
  const isDoctor = prescription.appointment.doctor?.clerkUserId === userId
  if (!isPatient && !isDoctor) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 print-container">
      <div className="border rounded-xl p-8 bg-white shadow-sm">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold">
            Medical Prescription
          </h1>

          <p className="text-gray-600 mt-2">
            Generated on{" "}
            {new Date(
              prescription.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Doctor Details
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {prescription.appointment.doctor.name}
            </p>

            <p>
              <strong>Specialization:</strong>{" "}
              {
                prescription.appointment.doctor
                  .specialization
              }
            </p>

            {prescription.appointment.doctor.hospital && (
              <p>
                <strong>Hospital:</strong>{" "}
                {
                  prescription.appointment.doctor
                    .hospital
                }
              </p>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              Patient Details
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {prescription.appointment.patientName}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {prescription.appointment.patientPhone}
            </p>

            <p>
              <strong>Appointment Date:</strong>{" "}
              {new Date(
                prescription.appointment
                  .appointmentDate
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">
            Diagnosis
          </h2>

          <div className="border rounded p-4 bg-gray-50">
            {prescription.diagnosis}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">
            Medicines
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">
                    Medicine
                  </th>
                  <th className="border p-2">
                    Dosage
                  </th>
                  <th className="border p-2">
                    Frequency
                  </th>
                  <th className="border p-2">
                    Duration
                  </th>
                </tr>
              </thead>

              <tbody>
                {prescription.medicines.map(
                  (medicine) => (
                    <tr key={medicine.id}>
                      <td className="border p-2">
                        {medicine.name}
                      </td>

                      <td className="border p-2">
                        {medicine.dosage}
                      </td>

                      <td className="border p-2">
                        {medicine.frequency}
                      </td>

                      <td className="border p-2">
                        {medicine.duration}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {prescription.notes && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">
              Doctor Notes
            </h2>

            <div className="border rounded p-4 bg-gray-50">
              {prescription.notes}
            </div>
          </div>
        )}

        {prescription.followUpDate && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">
              Follow-up Date
            </h2>

            <p>
              {new Date(
                prescription.followUpDate
              ).toLocaleDateString()}
            </p>
          </div>
        )}

<div className="mt-8 flex gap-3">
  <PrintButton />
</div>
      </div>
    </div>
  )
}