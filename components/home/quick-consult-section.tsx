import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HelpCircle, ArrowRight } from "lucide-react"

export function QuickConsultSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-6 rounded-3xl border bg-gradient-to-br from-blue-50 to-primary/5 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <HelpCircle className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Not sure which doctor to see?
              </h2>
              <p className="mt-1 text-muted-foreground">
                Tell us what's going on — we'll match you with the right
                doctor and confirm your appointment.
              </p>
            </div>
          </div>

          <Button size="lg" asChild className="shrink-0">
            <Link href="/consult">
              Get Matched
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
