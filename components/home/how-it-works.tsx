"use client"

import { ClipboardCheck, UserCheck, Stethoscope, Package } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Complete Your Profile",
    description: "Fill out a quick health questionnaire so our doctors can understand your needs and medical history.",
    icon: ClipboardCheck,
    color: "bg-blue-500",
  },
  {
    number: "02",
    title: "Match with a Doctor",
    description: "Get paired with a licensed physician who specializes in your area of concern for personalized care.",
    icon: UserCheck,
    color: "bg-primary",
  },
  {
    number: "03",
    title: "Virtual Consultation",
    description: "Meet with your doctor via video call or chat. Discuss symptoms, get diagnosed, and receive treatment plans.",
    icon: Stethoscope,
    color: "bg-teal-500",
  },
  {
    number: "04",
    title: "Receive Your Care",
    description: "Get prescriptions sent to your pharmacy or delivered to your door. Follow-up care included.",
    icon: Package,
    color: "bg-green-500",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Simple Process
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground max-w-2xl mx-auto">
            Getting the healthcare you need has never been easier. Follow these simple steps to start your journey to better health.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary to-primary/20 lg:block" />

          <div className="grid gap-8 lg:gap-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col lg:flex-row items-center gap-8 animate-fade-in-up ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"}`}>
                  <div className={`inline-block rounded-full ${step.color} px-3 py-1 text-xs font-bold text-white mb-3`}>
                    Step {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Icon */}
                <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-card shadow-lg ring-4 ring-background transition-transform duration-300 hover:scale-110">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${step.color}`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
