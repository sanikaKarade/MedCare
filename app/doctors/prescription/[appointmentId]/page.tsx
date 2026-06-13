import { prisma } from "@/lib/prisma"
import PrescriptionForm from "@/components/prescription-form"

export default async function PrescriptionPage({
  params,
}: {
  params: Promise<{ appointmentId: string }>
}) {
  const { appointmentId } = await params

  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
    include: {
      doctor: true,
    },
  })

  if (!appointment) {
    return (
      <div className="p-6">
        Appointment not found
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Generate Prescription
      </h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-semibold text-lg mb-3">
          Patient Details
        </h2>

        <p>
          <strong>Name:</strong>{" "}
          {appointment.patientName}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {appointment.patientPhone}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {appointment.appointmentDate.toLocaleDateString()}
        </p>
      </div>

      <PrescriptionForm
        appointmentId={appointment.id}
      />
    </div>
  )
}