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
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Medical Prescription</h1>
  
      <div className="bg-white border rounded-xl p-8 shadow-sm space-y-8">
        {/* Doctor Details */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Doctor Details
          </h2>
  
          <div className="space-y-1">
            <p>
              <strong>Name:</strong>{" "}
              {prescription.appointment.doctor.name}
            </p>
  
            <p>
              <strong>Specialization:</strong>{" "}
              {prescription.appointment.doctor.specialization}
            </p>
          </div>
        </div>
  
        {/* Patient Details */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Patient Details
          </h2>
  
          <div className="space-y-1">
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
                prescription.appointment.appointmentDate
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
  
        {/* Diagnosis */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Diagnosis
          </h2>
  
          <div className="border rounded-lg p-4 bg-gray-50">
            {prescription.diagnosis}
          </div>
        </div>
  
        {/* Medicines */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Medicines
          </h2>
  
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">
                    Medicine
                  </th>
                  <th className="border p-3 text-left">
                    Dosage
                  </th>
                  <th className="border p-3 text-left">
                    Frequency
                  </th>
                  <th className="border p-3 text-left">
                    Duration
                  </th>
                </tr>
              </thead>
  
              <tbody>
                {prescription.medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td className="border p-3">
                      {medicine.name}
                    </td>
  
                    <td className="border p-3">
                      {medicine.dosage}
                    </td>
  
                    <td className="border p-3">
                      {medicine.frequency}
                    </td>
  
                    <td className="border p-3">
                      {medicine.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Notes */}
        {prescription.notes && (
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Notes
            </h2>
  
            <div className="border rounded-lg p-4 bg-yellow-50">
              {prescription.notes}
            </div>
          </div>
        )}
      </div>
    
      <DownloadPDF />
    </div>
    )}