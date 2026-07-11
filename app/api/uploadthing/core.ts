import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { auth } from "@clerk/nextjs/server"
import { requireAdmin } from "@/lib/is-admin"

const f = createUploadthing()

export const ourFileRouter = {
  // Used for Aadhaar, degree, and medical registration certificate uploads
  // during doctor registration. Accepts either an image or a PDF.
  doctorDocument: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const { userId } = await auth()
      if (!userId) throw new UploadThingError("You must be signed in to upload documents")
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Doctor document uploaded by", metadata.userId, file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Doctor's public profile photo — image only, slightly larger allowance.
  doctorProfilePhoto: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const { userId } = await auth()
      if (!userId) throw new UploadThingError("You must be signed in to upload a photo")
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile photo uploaded by", metadata.userId, file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Uploaded at checkout when the cart contains a prescription-required medicine.
  medicinePrescription: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const { userId } = await auth()
      if (!userId) throw new UploadThingError("You must be signed in to upload a prescription")
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Prescription uploaded by", metadata.userId, file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Product photo for the pharmacy catalog — admin only.
  medicineImage: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const adminId = await requireAdmin()
      if (!adminId) throw new UploadThingError("Admin access required")
      return { userId: adminId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Medicine image uploaded by", metadata.userId, file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
