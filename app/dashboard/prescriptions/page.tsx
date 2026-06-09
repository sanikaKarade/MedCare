import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Pill, Clock } from "lucide-react"
import { EmptyState } from "@/components/states"

export default async function PrescriptionsPage() {
  const prescriptions = await prisma.prescription.findMany({
    include: {
      medicines: true,
      appointment: {
        include: {
          doctor: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Prescriptions</h1>
        <p className="text-muted-foreground">
          View and manage your prescriptions
        </p>
      </div>

      {prescriptions.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <EmptyState
              title="No prescriptions"
              description="Your prescriptions will appear here after your consultations."
              icon={<FileText className="h-6 w-6 text-muted-foreground" />}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">
                    {prescription.diagnosis}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Prescribed by {prescription.appointment.doctor.name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {new Date(
                      prescription.createdAt
                    ).toLocaleDateString()}
                  </Badge>

                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Medications</h4>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {prescription.medicines.map((med) => (
                      <div
                        key={med.id}
                        className="flex items-start gap-3 rounded-lg border p-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Pill className="h-5 w-5 text-primary" />
                        </div>

                        <div>
                          <p className="font-medium">{med.name}</p>

                          <p className="text-sm text-muted-foreground">
                            {med.dosage}
                          </p>

                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {med.frequency} for {med.duration}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {prescription.notes && (
                    <div className="rounded-lg border p-3">
                      <p className="text-sm font-medium">Notes</p>
                      <p className="text-sm text-muted-foreground">
                        {prescription.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}