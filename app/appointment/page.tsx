"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { useAuth } from "@/lib/auth-context"
import { doctors } from "@/lib/data"
import {
  CalendarIcon,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { LoadingState } from "@/components/states"

function AppointmentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading } = useAuth()

  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    searchParams.get("doctor") || ""
  )
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [symptoms, setSymptoms] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const doctor = doctors.find((d) => d.id === selectedDoctor)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/appointment")
    }
  }, [authLoading, isAuthenticated, router])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  if (authLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingState message="Loading..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (isComplete) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Appointment Booked!</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Your appointment with {doctor?.name} has been confirmed for{" "}
          {selectedDate?.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          at {selectedTime}.
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
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Book an Appointment</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Step {step} of 3
              </div>
            </div>
            {/* Progress bar */}
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
            {/* Step 1: Select Doctor */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="doctor">Select Doctor</Label>
                  <Select
                    value={selectedDoctor}
                    onValueChange={setSelectedDoctor}
                  >
                    <SelectTrigger id="doctor" className="mt-2">
                      <SelectValue placeholder="Choose a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doc) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          <div className="flex items-center gap-2">
                            <span>{doc.name}</span>
                            <span className="text-muted-foreground">
                              - {doc.specialization}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {doctor && (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-secondary">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doctor.specialization}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${doctor.consultationFee} per consultation
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedDoctor}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>Select Date</Label>
                  <div className="mt-2 flex justify-center rounded-lg border p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date < new Date() ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      }
                      className="rounded-md"
                    />
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label>Select Time Slot</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {doctor?.availableSlots.map((slot) => (
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
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Symptoms & Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="symptoms">
                    Describe your symptoms (optional)
                  </Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Please describe your symptoms or reason for visit..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div className="rounded-lg border bg-secondary/30 p-4">
                  <h4 className="font-semibold">Appointment Summary</h4>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Doctor</span>
                      <span className="font-medium">{doctor?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Specialization
                      </span>
                      <span>{doctor?.specialization}</span>
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
                      <span className="font-medium">Consultation Fee</span>
                      <span className="font-bold">
                        ${doctor?.consultationFee}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div>
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <h3 className="font-semibold">Need Help?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our support team is available 24/7 to assist you with booking
              appointments.
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <span>Free rescheduling up to 24h before</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Instant booking confirmation</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>Average wait time: 5 minutes</span>
              </div>
            </div>
            <Button variant="outline" className="mt-6 w-full" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AppointmentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <Suspense
            fallback={
              <div className="flex min-h-[400px] items-center justify-center">
                <LoadingState message="Loading appointment form..." />
              </div>
            }
          >
            <AppointmentContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
