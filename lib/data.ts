// Mock data for the medical healthcare website

export interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  rating: number
  reviews: number
  availability: string
  image: string
  education: string
  hospital: string
  consultationFee: number
  availableSlots: string[]
}

export interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  doctorSpecialization: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  symptoms?: string
}

export interface Prescription {
  id: string
  doctorName: string
  date: string
  medications: {
    name: string
    dosage: string
    frequency: string
    duration: string
  }[]
  diagnosis: string
}

export interface HealthRecord {
  id: string
  type: "Blood Test" | "X-Ray" | "MRI" | "CT Scan" | "Checkup"
  date: string
  doctor: string
  status: "Normal" | "Attention Required" | "Critical"
  file?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
  type: "appointment" | "prescription" | "report" | "reminder"
}

export const doctors: Doctor[] = [
  {
  id: "doc_1",
  name: "Dr. Amit Sharma",
  specialization: "Cardiologist",
  experience: 15,
  rating: 4.9,
  reviews: 328,
  availability: "Available Today",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
  education: "MD, AIIMS Delhi",
  hospital: "AIIMS Bhopal",
  consultationFee: 800,
  availableSlots: ["09:00 AM", "10:00 AM", "02:00 PM", "04:00 PM"],
  },
  {
  id: "doc_2",
  name: "Dr. Priya Verma",
  specialization: "Neurologist",
  experience: 12,
  rating: 4.8,
  reviews: 256,
  availability: "Available Tomorrow",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
  education: "DM Neurology, PGIMER Chandigarh",
  hospital: "Apollo Hospital Indore",
  consultationFee: 1200,
  availableSlots: ["11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"],
  },
  {
  id: "doc_3",
  name: "Dr. Neha Joshi",
  specialization: "Dermatologist",
  experience: 8,
  rating: 4.7,
  reviews: 189,
  availability: "Available Today",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
  education: "MD Dermatology, KEM Mumbai",
  hospital: "Bansal Hospital",
  consultationFee: 700,
  availableSlots: ["09:30 AM", "11:30 AM", "02:30 PM", "04:30 PM"],
  },
  {
  id: "doc_4",
  name: "Dr. Vikram Singh",
  specialization: "Orthopedic Surgeon",
  experience: 20,
  rating: 4.9,
  reviews: 412,
  availability: "Available in 2 Days",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
  education: "MS Orthopedics, AIIMS Delhi",
  hospital: "Care Hospital Bhopal",
  consultationFee: 1500,
  availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM"],
  },
  {
  id: "doc_5",
  name: "Dr. Sneha Patel",
  specialization: "Pediatrician",
  experience: 10,
  rating: 4.8,
  reviews: 298,
  availability: "Available Today",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha",
  education: "MD Pediatrics, BJ Medical College",
  hospital: "Children Care Clinic",
  consultationFee: 600,
  availableSlots: ["08:00 AM", "10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"],
  },
  {
  id: "doc_6",
  name: "Dr. Rajesh Gupta",
  specialization: "General Physician",
  experience: 18,
  rating: 4.6,
  reviews: 523,
  availability: "Available Today",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
  education: "MBBS, Gandhi Medical College",
  hospital: "MedCare Family Clinic",
  consultationFee: 500,
  availableSlots: ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:00 PM", "05:30 PM"],
  },
  ]
  
export const appointments: Appointment[] = [
  {
    id: "apt_1",
    doctorId: "doc_1",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialization: "Cardiologist",
    date: "2026-05-28",
    time: "10:00 AM",
    status: "upcoming",
    symptoms: "Chest pain and shortness of breath",
  },
  {
    id: "apt_2",
    doctorId: "doc_5",
    doctorName: "Dr. Lisa Patel",
    doctorSpecialization: "Pediatrician",
    date: "2026-05-30",
    time: "02:00 PM",
    status: "upcoming",
    symptoms: "Regular checkup for child",
  },
  {
    id: "apt_3",
    doctorId: "doc_3",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialization: "Dermatologist",
    date: "2026-05-20",
    time: "11:00 AM",
    status: "completed",
    symptoms: "Skin rash and irritation",
  },
  {
    id: "apt_4",
    doctorId: "doc_6",
    doctorName: "Dr. Robert Kim",
    doctorSpecialization: "General Physician",
    date: "2026-05-15",
    time: "09:00 AM",
    status: "completed",
    symptoms: "Annual health checkup",
  },
]

export const prescriptions: Prescription[] = [
  {
    id: "presc_1",
    doctorName: "Dr. Sarah Johnson",
    date: "2026-05-20",
    diagnosis: "Mild hypertension",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
      },
      {
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
  },
  {
    id: "presc_2",
    doctorName: "Dr. Emily Rodriguez",
    date: "2026-05-20",
    diagnosis: "Contact dermatitis",
    medications: [
      {
        name: "Hydrocortisone Cream",
        dosage: "1%",
        frequency: "Twice daily",
        duration: "14 days",
      },
      {
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "7 days",
      },
    ],
  },
]

export const healthRecords: HealthRecord[] = [
  {
    id: "rec_1",
    type: "Blood Test",
    date: "2026-05-18",
    doctor: "Dr. Robert Kim",
    status: "Normal",
  },
  {
    id: "rec_2",
    type: "X-Ray",
    date: "2026-05-10",
    doctor: "Dr. James Wilson",
    status: "Normal",
  },
  {
    id: "rec_3",
    type: "Checkup",
    date: "2026-05-05",
    doctor: "Dr. Sarah Johnson",
    status: "Attention Required",
  },
]

export const notifications: Notification[] = [
  {
    id: "notif_1",
    title: "Upcoming Appointment",
    message: "Reminder: You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM.",
    date: "2026-05-27",
    read: false,
    type: "appointment",
  },
  {
    id: "notif_2",
    title: "Prescription Ready",
    message: "Your prescription from Dr. Emily Rodriguez is ready for pickup.",
    date: "2026-05-26",
    read: false,
    type: "prescription",
  },
  {
    id: "notif_3",
    title: "Lab Results Available",
    message: "Your blood test results are now available. View them in your health records.",
    date: "2026-05-25",
    read: true,
    type: "report",
  },
  {
    id: "notif_4",
    title: "Health Reminder",
    message: "It's time for your annual flu vaccination. Schedule an appointment today.",
    date: "2026-05-24",
    read: true,
    type: "reminder",
  },
]

export const testimonials = [
  {
    id: "test_1",
    name: "Amanda Thompson",
    role: "Patient",
    content: "MedCare Connect has transformed how I manage my family's healthcare. Booking appointments is so easy, and the doctors are incredibly professional.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda",
  },
  {
    id: "test_2",
    name: "David Martinez",
    role: "Patient",
    content: "The online consultation feature saved me so much time. I got expert medical advice from the comfort of my home. Highly recommended!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
  },
  {
    id: "test_3",
    name: "Jennifer Lee",
    role: "Patient",
    content: "Finally, a healthcare platform that puts patients first. The prescription management feature is a game-changer for me.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
  },
]

export const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "Simply navigate to the Doctors page, select your preferred doctor, choose an available time slot, and confirm your booking. You'll receive a confirmation email with all the details.",
  },
  {
    question: "Is online consultation secure?",
    answer: "Yes, all our online consultations are conducted through encrypted, HIPAA-compliant video conferencing. Your privacy and data security are our top priorities.",
  },
  {
    question: "How can I access my health records?",
    answer: "Once logged in, go to your Dashboard and click on 'Health Records' to view all your medical history, test results, and prescriptions in one place.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital wallets. You can also use health insurance for eligible consultations.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer: "Yes, you can reschedule or cancel appointments up to 24 hours before the scheduled time through your dashboard without any charges.",
  },
  {
    question: "Is there 24/7 emergency support?",
    answer: "Yes, our emergency support line is available 24/7. For life-threatening emergencies, please call 911 immediately.",
  },
]

export const services = [
  {
    id: "srv_1",
    title: "Online Consultation",
    description: "Connect with certified doctors through secure video calls from anywhere, anytime.",
    icon: "Video",
  },
  {
    id: "srv_2",
    title: "Prescription Management",
    description: "Digital prescriptions, automatic refills, and medication reminders all in one place.",
    icon: "FileText",
  },
  {
    id: "srv_3",
    title: "Appointment Booking",
    description: "Easy scheduling with your preferred doctors. Get instant confirmations.",
    icon: "Calendar",
  },
  {
    id: "srv_4",
    title: "Health Records",
    description: "Access your complete medical history, test results, and reports securely online.",
    icon: "FolderHeart",
  },
  {
    id: "srv_5",
    title: "Emergency Support",
    description: "24/7 emergency assistance with immediate connection to medical professionals.",
    icon: "Phone",
  },
  {
    id: "srv_6",
    title: "Lab Services",
    description: "Book lab tests, get home sample collection, and receive digital reports.",
    icon: "TestTube",
  },
]

export const specializations = [
  "All Specializations",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "General Physician",
  "Psychiatrist",
  "Gynecologist",
  "ENT Specialist",
]
