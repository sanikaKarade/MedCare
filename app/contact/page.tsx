"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Healthcare Avenue", "Medical City, MC 12345"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["contact@medcareconnect.com", "support@medcareconnect.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat - Sun: 9:00 AM - 5:00 PM"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Have questions or need assistance? We&apos;re here to help. Reach
              out to us through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Information */}
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <Card key={info.title}>
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{info.title}</h3>
                          {info.details.map((detail, index) => (
                            <p
                              key={index}
                              className="text-sm text-muted-foreground"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">
                          Message Sent!
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          Thank you for contacting us. We&apos;ll get back to
                          you within 24 hours.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-6"
                          onClick={() => {
                            setIsSubmitted(false)
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              subject: "",
                              message: "",
                            })
                          }}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-xl font-semibold">
                          Send us a Message
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Fill out the form below and we&apos;ll respond as soon
                          as possible.
                        </p>
                        <form
                          onSubmit={handleSubmit}
                          className="mt-6 space-y-4"
                        >
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="subject">Subject</Label>
                              <Select
                                value={formData.subject}
                                onValueChange={(value) =>
                                  setFormData({ ...formData, subject: value })
                                }
                              >
                                <SelectTrigger id="subject">
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="general">
                                    General Inquiry
                                  </SelectItem>
                                  <SelectItem value="appointment">
                                    Appointment Related
                                  </SelectItem>
                                  <SelectItem value="billing">
                                    Billing Question
                                  </SelectItem>
                                  <SelectItem value="technical">
                                    Technical Support
                                  </SelectItem>
                                  <SelectItem value="feedback">
                                    Feedback
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              placeholder="How can we help you?"
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  message: e.target.value,
                                })
                              }
                              required
                              className="min-h-[150px]"
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </form>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="border-t py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-center text-2xl font-bold">
              Find Us on the Map
            </h2>
            <div className="overflow-hidden rounded-xl border">
              <div className="relative h-[400px] bg-muted">
                {/* Map placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-primary" />
                    <p className="mt-4 text-lg font-medium">
                      MedCare Connect Headquarters
                    </p>
                    <p className="text-muted-foreground">
                      123 Healthcare Avenue, Medical City
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
