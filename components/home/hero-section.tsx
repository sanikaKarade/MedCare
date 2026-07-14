import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  HelpCircle,
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-primary/5 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-accent/10 blur-3xl animate-pulse-soft delay-500" />
      </div>

      {/* Not sure which doctor? — pinned to the top-right corner */}
      <Link
        href="/consult"
        className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border bg-background/90 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur transition-all hover:scale-105 hover:border-primary hover:shadow-md sm:right-6 sm:top-6"
      >
        <HelpCircle className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">Not sure which doctor?</span>
        <span className="sm:hidden">Not sure?</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm animate-fade-in-down">
              <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground animate-pulse-soft">
                New
              </span>
              <span className="text-muted-foreground">
                24/7 Online Consultations Available
              </span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in-up">
              Your Health,{" "}
              <span className="text-primary">Our Priority</span>
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground animate-fade-in-up delay-100">
              Experience healthcare reimagined. Book appointments with top
              doctors, manage prescriptions, access health records, and get
              expert medical advice — all from one platform.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-200">
              <Button size="lg" className="gap-2 transition-all hover:scale-105 hover:shadow-lg" asChild>
                <Link href="/appointment">
                  Book Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="transition-all hover:scale-105" asChild>
                <Link href="/doctors">Find a Doctor</Link>
              </Button>
            </div>
            {/* Trust badges */}
            <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in-up delay-300">
              <div className="text-center group cursor-default">
                <div className="flex justify-center">
                  <Shield className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                </div>
                <p className="mt-2 text-sm font-medium">HIPAA Compliant</p>
              </div>
              <div className="text-center group cursor-default">
                <div className="flex justify-center">
                  <Clock className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                </div>
                <p className="mt-2 text-sm font-medium">24/7 Support</p>
              </div>
              <div className="text-center group cursor-default">
                <div className="flex justify-center">
                  <Users className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                </div>
                <p className="mt-2 text-sm font-medium">50K+ Patients</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative hidden lg:block animate-fade-in-right delay-200">
            <div className="relative aspect-square">
              {/* Main card */}
              <div className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl hover-lift">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10">
                    <svg
                      viewBox="0 0 64 64"
                      className="h-full w-full p-3 text-primary"
                      fill="currentColor"
                    >
                      <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4zm0 4c13.255 0 24 10.745 24 24S45.255 56 32 56 8 45.255 8 32 18.745 8 32 8zm-4 12v8h-8v8h8v8h8v-8h8v-8h-8v-8h-8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">
                      Cardiologist • Available Now
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-secondary p-4 transition-all hover:bg-secondary/80">
                    <p className="text-2xl font-bold text-primary">15+</p>
                    <p className="text-sm text-muted-foreground">Years Exp.</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4 transition-all hover:bg-secondary/80">
                    <p className="text-2xl font-bold text-primary">4.9</p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
                <Button className="mt-6 w-full transition-all hover:scale-[1.02]" asChild>
                  <Link href="/appointment">Book Consultation</Link>
                </Button>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-4 top-20 rounded-xl bg-card p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Appointment Confirmed</p>
                    <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-20 rounded-xl bg-card p-4 shadow-lg animate-float delay-500">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Prescription Ready</p>
                    <p className="text-xs text-muted-foreground">View Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
