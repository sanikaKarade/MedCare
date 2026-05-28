"use client"

import Link from "next/link"
import { ArrowRight, Heart, Brain, Activity, Sparkles, Stethoscope, Pill } from "lucide-react"

const categories = [
  {
    title: "Primary Care",
    description: "Comprehensive health checkups and preventive care",
    icon: Stethoscope,
    href: "/services",
    color: "bg-blue-50 text-blue-600",
    hoverColor: "group-hover:bg-blue-100",
  },
  {
    title: "Mental Health",
    description: "Therapy, counseling, and psychiatric support",
    icon: Brain,
    href: "/services",
    color: "bg-purple-50 text-purple-600",
    hoverColor: "group-hover:bg-purple-100",
  },
  {
    title: "Cardiology",
    description: "Heart health monitoring and treatment",
    icon: Heart,
    href: "/services",
    color: "bg-red-50 text-red-600",
    hoverColor: "group-hover:bg-red-100",
  },
  {
    title: "Wellness",
    description: "Nutrition, fitness, and lifestyle guidance",
    icon: Sparkles,
    href: "/services",
    color: "bg-amber-50 text-amber-600",
    hoverColor: "group-hover:bg-amber-100",
  },
  {
    title: "Chronic Care",
    description: "Ongoing management for chronic conditions",
    icon: Activity,
    href: "/services",
    color: "bg-green-50 text-green-600",
    hoverColor: "group-hover:bg-green-100",
  },
  {
    title: "Prescriptions",
    description: "Easy prescription refills and management",
    icon: Pill,
    href: "/services",
    color: "bg-teal-50 text-teal-600",
    hoverColor: "group-hover:bg-teal-100",
  },
]

export function ServiceCategories() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Care Categories
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            Healthcare designed for your needs
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground max-w-2xl mx-auto">
            From routine checkups to specialized care, find the right service for your health journey
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${category.color} ${category.hoverColor}`}>
                  <category.icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {category.title}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
