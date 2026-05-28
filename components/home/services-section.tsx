import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Video,
  FileText,
  Calendar,
  FolderHeart,
  Phone,
  TestTube,
  ArrowRight,
} from "lucide-react"
import { services } from "@/lib/data"

const iconMap: Record<string, React.ReactNode> = {
  Video: <Video className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Calendar: <Calendar className="h-6 w-6" />,
  FolderHeart: <FolderHeart className="h-6 w-6" />,
  Phone: <Phone className="h-6 w-6" />,
  TestTube: <TestTube className="h-6 w-6" />,
}

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Our Services
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            From online consultations to emergency support, we provide all the
            healthcare services you need under one roof.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                    index % 3 === 0
                      ? "bg-primary/10 text-primary"
                      : index % 3 === 1
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {iconMap[service.icon]}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in-up delay-600">
          <Button size="lg" variant="outline" className="transition-all hover:scale-105" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
