"use client"

import { Shield, Globe, DollarSign, Truck, CheckCircle, Clock, Users, Award } from "lucide-react"

const trustItems = [
  { icon: Shield, text: "LICENSED MEDICAL PROVIDERS" },
  { icon: Globe, text: "100% ONLINE" },
  { icon: DollarSign, text: "CLEAR PRICING" },
  { icon: Truck, text: "SHIPPED TO YOUR DOOR" },
  { icon: CheckCircle, text: "HIPAA COMPLIANT" },
  { icon: Clock, text: "24/7 SUPPORT" },
  { icon: Users, text: "50K+ PATIENTS" },
  { icon: Award, text: "BOARD CERTIFIED DOCTORS" },
]

export function TrustBanner() {
  return (
    <div className="relative overflow-hidden bg-primary py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...trustItems, ...trustItems].map((item, index) => (
          <div
            key={index}
            className="mx-8 flex items-center gap-2 text-primary-foreground"
          >
            <item.icon className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
