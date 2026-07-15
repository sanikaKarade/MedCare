"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useUser, useClerk } from "@clerk/nextjs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  CalendarIcon,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Loader2,
  HelpCircle,
} from "lucide-react"

const concerns = [
  "Weight Loss",
  "Skin Problem",
  "Supplements",
  "Hair Loss",
  "Skin Care",
  "Women's Health",
  "Men's Health",
  "Mental Health",
  "General Consultation",
  "Not Sure / Something Else",
]

export default function ConsultPage() {
  const { isSignedIn, isLoaded } = useUser()
  const { openSignIn } = useClerk()

  const [step, setStep] = useState(1)
  const [selectedConcern, setSelectedConcern] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [awaitingSignIn, setAwaitingSignIn] = useState(false)

  // Once they've picked a concern and signed in, automatically move them
  // on to the date/time step instead of making them click Continue twice.
  useEffect(() => {
    if (awaitingSignIn && isSignedIn) {
      setAwaitingSignIn(false)
      setStep(2)
    }
  }, [awaitingSignIn, isSignedIn])

  const handleContinueFromConcern = () => {
    if (!selectedConcern) return

    if (!isSignedIn) {
      // Stay on this page — just ask them to sign in before continuing,
      // instead of gating the whole page behind login up front.
      setAwaitingSignIn(true)
      openSignIn({})
      return
    }

    setStep(2)
  }

  const handleSubmit = async () => {
    if (!patientName.trim()) {
      alert("Patient name is required")
      return
    }
    if (!patientPhone.trim()) {
      alert("Phone number is required")
      return
    }
    if (!/^[6-9]\d{9}$/.test(patientPhone)) {
      alert("Please enter a valid 10-digit phone number")
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // No doctorId — this is a general consult request. An admin
          // will assign the right doctor and confirm it afterward.
          patientName,
          patientPhone,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
          reason: selectedConcern,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsComplete(true)
      } else {
        alert(data.error || "Something went wrong submitting your request.")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong submitting your request.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto max-w-2xl px-4 py-16">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold">Request Received!</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                We've got your consultation request for{" "}
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {selectedTime}. Our team will match you with the right
                doctor and confirm your appointment shortly — you'll get a
                notification once it's set.
              </p>
              <div className="mt-8 flex gap-4">
                <Button asChild>
                  <Link href="/dashboard/appointments">View My Appointments</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Go Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <HelpCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Not Sure Which Doctor?</h1>
              <p className="text-muted-foreground">
                Tell us what's going on and we'll match you with the right doctor.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quick Consultation Request</CardTitle>
                <div className="text-sm text-muted-foreground">Step {step} of 3</div>
              </div>
              <div className="mt-4 flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      s <= step ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                ))}
              </div>
            </CardHeader>

            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <Label>What's this about?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {concerns.map((concern) => (
                      <Button
                        key={concern}
                        type="button"
                        variant={selectedConcern === concern ? "default" : "outline"}
                        onClick={() => setSelectedConcern(concern)}
                        className="h-auto whitespace-normal py-3 text-sm"
                      >
                        {concern}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleContinueFromConcern} disabled={!selectedConcern}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label>Preferred Date</Label>
                    <div className="mt-2 flex justify-center rounded-lg border p-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                          date < new Date() || date.getDay() === 0 || date.getDay() === 6
                        }
                        className="rounded-md"
                      />
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <Label>Preferred Time</Label>
                      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map(
                          (slot) => (
                            <Button
                              key={slot}
                              variant={selectedTime === slot ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(slot)}
                              className="justify-start"
                            >
                              <Clock className="mr-2 h-3 w-3" />
                              {slot}
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label>
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <Label>
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="rounded-lg border bg-secondary/30 p-4">
                    <h4 className="font-semibold">Request Summary</h4>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Concern</span>
                        <span className="font-medium">{selectedConcern}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span>
                          {selectedDate?.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Doctor</span>
                        <span className="text-muted-foreground">To be assigned by our team</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !patientName.trim() || !patientPhone.trim()}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Know exactly who you want to see instead?{" "}
            <Link href="/doctors" className="text-primary underline">
              Browse doctors directly
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
