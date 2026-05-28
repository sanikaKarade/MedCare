"use client"

import { LayoutDashboard, CalendarCheck, FileText, Bell, TrendingUp, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: LayoutDashboard,
    title: "All-in-One Dashboard",
    description: "Track your health journey, view appointments, and manage prescriptions from a single, intuitive interface.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Scheduling",
    description: "Book, reschedule, or cancel appointments with just a few clicks. No phone calls needed.",
  },
  {
    icon: FileText,
    title: "Digital Health Records",
    description: "Access your complete medical history, lab results, and doctor's notes anytime, anywhere.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Never miss a medication or appointment with personalized notifications and alerts.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your health metrics over time with visual charts and insights from your care team.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description: "Securely communicate with your healthcare providers without waiting on hold.",
  },
]

export function PatientPortal() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in-left">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Patient Portal
            </p>
            <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
              Everything you need, all in one place
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Our patient portal puts you in control of your healthcare journey. Track progress, communicate with providers, and manage your care seamlessly.
            </p>

            {/* Portal preview */}
            <div className="mt-8 relative">
              <div className="rounded-2xl bg-card shadow-2xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold">Welcome back, John!</p>
                    <p className="text-sm text-muted-foreground">Last visit: 2 days ago</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-secondary p-3 text-center transition-transform hover:scale-105">
                    <p className="text-2xl font-bold text-primary">3</p>
                    <p className="text-xs text-muted-foreground">Upcoming</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3 text-center transition-transform hover:scale-105">
                    <p className="text-2xl font-bold text-green-600">12</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3 text-center transition-transform hover:scale-105">
                    <p className="text-2xl font-bold text-amber-600">2</p>
                    <p className="text-xs text-muted-foreground">Messages</p>
                  </div>
                </div>
              </div>
              {/* Floating notification */}
              <div className="absolute -right-4 -bottom-4 rounded-xl bg-card p-3 shadow-lg animate-bounce-soft">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CalendarCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Appointment Confirmed</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right features grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3 transition-transform group-hover:scale-110">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
