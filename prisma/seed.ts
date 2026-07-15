import "dotenv/config"
import { PrismaClient } from "../lib/generated/prisma/client"
import { doctors } from "../lib/data"

const prisma = new PrismaClient()

async function main() {
  await prisma.appointment.deleteMany()
  await prisma.doctor.deleteMany()

  await prisma.doctor.createMany({
    data: doctors.map((doctor) => ({
      id: doctor.id,
      status: "APPROVED", // seeded doctors aren't tied to a real login, so approve them directly
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      consultationFee: doctor.consultationFee,
      imageUrl: doctor.image,
      hospital: doctor.hospital,
      // city: doctor.city ?? null,
    })),
  })

  console.log(`Seeded ${doctors.length} doctors`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })