import { PrismaClient } from "../lib/generated/prisma"

const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: [
      {
        name: "Paracetamol",
        description: "Used to reduce fever and relieve mild to moderate pain.",
        manufacturer: "Cipla",
        category: "Pain Relief",
        power: "500 mg",
        prescription: false,
        price: 25,
        stock: 100,
        imageUrl: "/medicines/paracetamol.png",
      },
      {
        name: "Dolo 650",
        description: "Effective for fever, body pain, and headaches.",
        manufacturer: "Micro Labs",
        category: "Pain Relief",
        power: "650 mg",
        prescription: false,
        price: 35,
        stock: 80,
        imageUrl: "/medicines/dolo650.png",
      },
      {
        name: "Vitamin D3",
        description: "Supports bone health and boosts immunity.",
        manufacturer: "Sun Pharma",
        category: "Vitamin",
        power: "60000 IU",
        prescription: false,
        price: 120,
        stock: 50,
        imageUrl: "/medicines/vitamind3.png",
      },
      {
        name: "Amoxicillin",
        description: "Antibiotic used for bacterial infections.",
        manufacturer: "Mankind",
        category: "Antibiotic",
        power: "250 mg",
        prescription: true,
        price: 90,
        stock: 60,
        imageUrl: "/medicines/amoxicillin.png",
      },
      {
        name: "Cetirizine",
        description: "Provides relief from allergies and itching.",
        manufacturer: "Cipla",
        category: "Allergy",
        power: "10 mg",
        prescription: false,
        price: 20,
        stock: 100,
        imageUrl: "/medicines/cetirizine.png",
      },
    ],
  })

  console.log("✅ Products seeded successfully!")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })