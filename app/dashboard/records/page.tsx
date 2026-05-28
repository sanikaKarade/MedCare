import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FolderHeart,
  Download,
  FileText,
  Activity,
  Scan,
  ClipboardCheck,
} from "lucide-react"
import { healthRecords } from "@/lib/data"
import { EmptyState } from "@/components/states"

const typeIcons: Record<string, React.ReactNode> = {
  "Blood Test": <Activity className="h-5 w-5" />,
  "X-Ray": <Scan className="h-5 w-5" />,
  MRI: <Scan className="h-5 w-5" />,
  "CT Scan": <Scan className="h-5 w-5" />,
  Checkup: <ClipboardCheck className="h-5 w-5" />,
}

const statusColors: Record<string, string> = {
  Normal: "bg-green-100 text-green-700",
  "Attention Required": "bg-amber-100 text-amber-700",
  Critical: "bg-red-100 text-red-700",
}

export default function RecordsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Health Records</h1>
        <p className="text-muted-foreground">
          Access your medical history and test results
        </p>
      </div>

      {healthRecords.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <EmptyState
              title="No health records"
              description="Your health records and test results will appear here."
              icon={<FolderHeart className="h-6 w-6 text-muted-foreground" />}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {healthRecords.map((record) => (
            <Card key={record.id} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {typeIcons[record.type] || <FileText className="h-5 w-5" />}
                  </div>
                  <Badge className={statusColors[record.status]}>
                    {record.status}
                  </Badge>
                </div>
                <h3 className="mt-4 font-semibold">{record.type}</h3>
                <p className="text-sm text-muted-foreground">{record.doctor}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {new Date(record.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
