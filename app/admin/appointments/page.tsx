import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/is-admin"
import { prisma } from "@/lib/prisma"
import { AppointmentAssignmentList } from "@/components/admin/appointment-assignment-list"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminAppointmentsPage() {
  const adminId = await requireAdmin()
  if (!adminId) {
    redirect("/")
  }

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: null, status: { not: "CANCELLED" } },
    orderBy: { appointmentDate: "asc" },
  })

  const doctors = await prisma.doctor.findMany({
    where: { status: "APPROVED" },
    select: { id: true, name: true, specialization: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">
        <AdminHeader />
        <h1 className="text-4xl font-bold mb-2">Unassigned Appointments</h1>
        <p className="text-muted-foreground mb-8">
          Patients who requested a general consultation without picking a doctor. Assign one to confirm.
        </p>
        <AppointmentAssignmentList
          appointments={JSON.parse(JSON.stringify(appointments))}
          doctors={doctors}
        />
      </div>
    </div>
  )
}
