import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Video,
  FileText,
  Calendar,
  FolderHeart,
  Phone,
  TestTube,
  ArrowRight,
  Check,
  Shield,
  Clock,
  Users,
} from "lucide-react"
import { services } from "@/lib/data"

const iconMap: Record<string, React.ReactNode> = {
  Video: <Video className="h-8 w-8" />,
  FileText: <FileText className="h-8 w-8" />,
  Calendar: <Calendar className="h-8 w-8" />,
  FolderHeart: <FolderHeart className="h-8 w-8" />,
  Phone: <Phone className="h-8 w-8" />,
  TestTube: <TestTube className="h-8 w-8" />,
}

const serviceDetails: Record<
  string,
  { features: string[]; color: string }
> = {
  srv_1: {
    features: [
      "HD video consultations",
      "Chat with doctors",
      "Share medical files",
      "Get instant prescriptions",
    ],
    color: "bg-blue-100 text-blue-700",
  },
  srv_2: {
    features: [
      "Digital prescriptions",
      "Medication reminders",
      "Auto-refill requests",
      "Drug interaction alerts",
    ],
    color: "bg-green-100 text-green-700",
  },
  srv_3: {
    features: [
      "Easy online booking",
      "Instant confirmations",
      "Calendar integration",
      "Flexible rescheduling",
    ],
    color: "bg-amber-100 text-amber-700",
  },
  srv_4: {
    features: [
      "Secure cloud storage",
      "Easy sharing with doctors",
      "Complete medical history",
      "Download anytime",
    ],
    color: "bg-rose-100 text-rose-700",
  },
  srv_5: {
    features: [
      "24/7 availability",
      "Quick response time",
      "Ambulance coordination",
      "Priority care access",
    ],
    color: "bg-red-100 text-red-700",
  },
  srv_6: {
    features: [
      "Wide range of tests",
      "Home sample collection",
      "Fast digital reports",
      "Expert pathologists",
    ],
    color: "bg-cyan-100 text-cyan-700",
  },
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Our Healthcare Services
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Comprehensive healthcare solutions designed to make your health
              management seamless, accessible, and personalized.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/appointment">Book Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/doctors">Find a Doctor</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="border-b py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">HIPAA Compliant</p>
                  <p className="text-sm text-muted-foreground">
                    Secure & Private
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">24/7 Support</p>
                  <p className="text-sm text-muted-foreground">Always Here</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">200+ Doctors</p>
                  <p className="text-sm text-muted-foreground">Expert Care</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Check className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">50K+ Patients</p>
                  <p className="text-sm text-muted-foreground">Trusted Care</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const details = serviceDetails[service.id]
                return (
                  <Card
                    key={service.id}
                    className="group overflow-hidden transition-all hover:shadow-lg"
                  >
                    <CardContent className="p-0">
                      <div
                        className={`p-6 ${details?.color || "bg-secondary"}`}
                      >
                        {iconMap[service.icon]}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          {service.description}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {details?.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button variant="ghost" className="mt-4 p-0" asChild>
                          <Link href="/appointment">
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
              Join thousands of patients who have transformed their healthcare
              experience with MedCare Connect.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
