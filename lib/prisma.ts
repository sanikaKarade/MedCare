import path from "node:path"
import { PGlite } from "@electric-sql/pglite"
import { PrismaPGlite } from "pglite-prisma-adapter"
import { PrismaClient } from "@/lib/generated/prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pglite: PGlite | undefined
  initPromise: Promise<PrismaClient> | undefined
}

const dataDir = path.join(process.cwd(), "prisma", "pglite-data")

const schemaSql = `
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

CREATE TABLE "Doctor" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "specialization" TEXT NOT NULL,
  "experience" INTEGER NOT NULL,
  "consultationFee" INTEGER NOT NULL,
  "imageUrl" TEXT,
  "hospital" TEXT,
  "city" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Appointment" (
  "id" TEXT NOT NULL,
  "patientId" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "patientName" TEXT NOT NULL,
  "patientPhone" TEXT NOT NULL,
  "appointmentDate" TIMESTAMP(3) NOT NULL,
  "appointmentTime" TEXT NOT NULL,
  "reason" TEXT,
  "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
`

async function initializeDatabase(client: PGlite) {
  const tables = await client.query<{ tablename: string }>(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'Doctor'`
  )

  if (tables.rows.length === 0) {
    await client.exec(schemaSql)
  }
}

async function createPrismaClient(): Promise<PrismaClient> {
  const client = globalForPrisma.pglite ?? new PGlite({ dataDir })

  if (!globalForPrisma.pglite) {
    globalForPrisma.pglite = client
    await initializeDatabase(client)
  }

  const adapter = new PrismaPGlite(client)
  return new PrismaClient({ adapter })
}

export async function getPrisma(): Promise<PrismaClient> {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }

  if (!globalForPrisma.initPromise) {
    globalForPrisma.initPromise = createPrismaClient().then((client) => {
      globalForPrisma.prisma = client
      return client
    })
  }

  return globalForPrisma.initPromise
}
