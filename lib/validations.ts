import { z } from "zod"

export const createAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor is required"),
  appointmentDate: z.string().min(1, "Date is required"),
  appointmentTime: z.string().min(1, "Time is required"),
  patientName: z.string().trim().min(1, "Patient name is required").max(100),
  patientPhone: z.string().trim().min(7, "Enter a valid phone number").max(15),
  reason: z.string().trim().max(1000).optional().nullable(),
})

export const doctorRegisterSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(15),
  aadhaarNumber: z.string().trim().min(1, "Aadhaar number is required"),
  registrationNumber: z.string().trim().min(1, "Registration number is required"),
  degree: z.string().trim().min(1, "Degree is required"),
  specialization: z.string().trim().min(1, "Specialization is required"),
  experience: z.coerce.number().int().min(0).max(80),
  hospital: z.string().trim().min(1, "Hospital is required"),
  city: z.string().trim().min(1, "City is required"),
  consultationFee: z.coerce.number().min(0),
  aadhaarFile: z.string().url("Aadhaar document upload is required"),
  degreeFile: z.string().url("Degree document upload is required"),
  registrationFile: z.string().url("Registration document upload is required"),
  profilePhoto: z.string().url().optional().nullable(),
})

export const updateAppointmentStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["PENDING", "CONFIRMED", "ONGOING", "COMPLETED", "CANCELLED"]),
})

export const createPrescriptionSchema = z.object({
  appointmentId: z.string().min(1),
  diagnosis: z.string().trim().min(1, "Diagnosis is required").max(2000),
  tests: z.string().trim().max(2000).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
  followUpDate: z.string().optional().nullable(),
  medicines: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Medicine name is required"),
        dosage: z.string().trim().min(1, "Dosage is required"),
        frequency: z.string().trim().min(1, "Frequency is required"),
        duration: z.string().trim().min(1, "Duration is required"),
      })
    )
    .min(1, "At least one medicine is required"),
})

const cartItemSchema = z.object({
  id: z.string().min(1),
  quantity: z.coerce.number().int().positive("Quantity must be a positive number"),
})

export const createOrderSchema = z.object({
  cart: z.array(cartItemSchema).min(1, "Cart is empty"),
  prescriptionFile: z.string().url().optional().nullable(),
})

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  formData: z.object({
    name: z.string().trim().min(1, "Name is required"),
    phone: z.string().trim().min(7, "Enter a valid phone number"),
    email: z.string().trim().email("Enter a valid email"),
    address: z.string().trim().min(1, "Address is required"),
    city: z.string().trim().min(1, "City is required"),
    state: z.string().trim().min(1, "State is required"),
    pincode: z.string().trim().min(4, "Enter a valid pincode"),
  }),
  cart: z.array(cartItemSchema).min(1, "Cart is empty"),
  prescriptionFile: z.string().url().optional().nullable(),
})

export const doctorStatusSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
})

export const orderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "PAID",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
})

export const markNotificationReadSchema = z.union([
  z.object({ all: z.literal(true) }),
  z.object({ id: z.string().min(1) }),
])

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  description: z.string().trim().max(2000).optional().nullable(),
  manufacturer: z.string().trim().max(200).optional().nullable(),
  category: z.string().trim().max(100).optional().nullable(),
  power: z.string().trim().max(100).optional().nullable(),
  prescription: z.boolean().default(false),
  price: z.coerce.number().min(0, "Price must be 0 or more"),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or more"),
  imageUrl: z.string().url().optional().nullable(),
})

export const updateProductSchema = createProductSchema.partial()
