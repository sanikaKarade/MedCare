import "dotenv/config"
import { getPrisma } from "../lib/prisma"
import { doctors } from "../lib/data"

async function main() {
  const prisma = await getPrisma()

  await prisma.appointment.deleteMany()
  await prisma.doctor.deleteMany()

  await prisma.doctor.createMany({
    data: doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      consultationFee: doctor.consultationFee,
      imageUrl: doctor.image,
      hospital: doctor.hospital,
    })),
  })

  console.log(`Seeded ${doctors.length} doctors`)
}

main()
  .catch(console.error)
  .finally(async () => {
    const prisma = await getPrisma()
    await prisma.$disconnect()
  })
