import { PrismaClient } from "../lib/generated/prisma"

const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Paracetamol 500mg",
        description: "Fever and pain relief",
        price: 25,
        stock: 100,
        manufacturer: "Cipla",
      },
      {
        name: "Dolo 650",
        description: "Pain and fever",
        price: 35,
        stock: 80,
        manufacturer: "Micro Labs",
      },
      {
        name: "Vitamin D3",
        description: "Bone health supplement",
        price: 120,
        stock: 50,
        manufacturer: "Sun Pharma",
      },
      {
        name: "Amoxicillin 250mg",
        description: "Antibiotic",
        price: 90,
        stock: 60,
        manufacturer: "Mankind",
      },
      {
        name: "Cetirizine",
        description: "Allergy relief",
        price: 20,
        stock: 100,
        manufacturer: "Cipla",
      },
    ],
  })

  console.log("Products seeded")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())