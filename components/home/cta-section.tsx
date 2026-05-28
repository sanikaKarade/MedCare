import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground md:p-12 lg:p-16 animate-scale-in">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl animate-pulse-soft" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl animate-pulse-soft delay-500" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div className="animate-fade-in-left delay-200">
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">
                Ready to Take Control of Your Health?
              </h2>
              <p className="mt-4 text-pretty text-primary-foreground/90">
                Join thousands of patients who trust MedCare Connect for their
                healthcare needs. Book your first consultation today and
                experience the future of healthcare.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 transition-all hover:scale-105 hover:shadow-lg"
                  asChild
                >
                  <Link href="/appointment">
                    Book Appointment
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary-foreground transition-all hover:scale-105 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  asChild
                >
                  <a href="tel:+15551234567">
                    <Phone className="h-4 w-4" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in-right delay-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Emergency Support
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
                  <p className="text-3xl font-bold">15 min</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Average Wait Time
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Secure & Private
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
                  <p className="text-3xl font-bold">Free</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    First Consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
