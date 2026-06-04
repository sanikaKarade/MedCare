import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  await prisma.doctor.createMany({
    data: [
      {
        name: "Dr. Amit Sharma",
        specialization: "Cardiologist",
        experience: 10,
        consultationFee: 500,
        city: "Bhopal",
        hospital: "City Hospital",
      },
      {
        name: "Dr. Priya Patel",
        specialization: "Dermatologist",
        experience: 7,
        consultationFee: 700,
        city: "Indore",
        hospital: "Care Hospital",
      },
      {
        name: "Dr. Raj Verma",
        specialization: "Orthopedic",
        experience: 12,
        consultationFee: 800,
        city: "Bhopal",
        hospital: "Apollo Clinic",
      },
    ],
  })

  console.log("Doctors added")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())