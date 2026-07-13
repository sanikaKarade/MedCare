import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, XCircle, FileQuestion } from "lucide-react"

export default async function VendorStatusPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  const vendor = await prisma.vendor.findUnique({
    where: { clerkUserId: userId },
  })

  if (vendor?.status === "APPROVED") {
    redirect("/vendor/products")
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-lg shadow-sm">
          <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
            {!vendor && (
              <>
                <FileQuestion className="h-14 w-14 text-slate-400" />
                <h1 className="text-2xl font-bold">No application found</h1>
                <p className="text-muted-foreground">
                  We couldn't find a vendor application linked to your account.
                  If you'd like to sell medicines on MedCare Connect, register below.
                </p>
                <Button asChild className="mt-2">
                  <Link href="/vendor/register">Register as a Vendor</Link>
                </Button>
              </>
            )}

            {vendor?.status === "PENDING" && (
              <>
                <Clock className="h-14 w-14 text-blue-500" />
                <h1 className="text-2xl font-bold">Application under review</h1>
                <p className="text-muted-foreground">
                  Thanks for registering, {vendor.businessName}. Our team is
                  reviewing your license and details. This usually takes
                  1–2 business days — you'll be able to add medicines as
                  soon as you're approved.
                </p>
                <Button asChild variant="outline" className="mt-2">
                  <Link href="/">Back to Home</Link>
                </Button>
              </>
            )}

            {vendor?.status === "REJECTED" && (
              <>
                <XCircle className="h-14 w-14 text-red-500" />
                <h1 className="text-2xl font-bold">Application not approved</h1>
                <p className="text-muted-foreground">
                  Unfortunately your vendor application wasn't approved. This
                  is usually because your license document couldn't be
                  verified. If you believe this is a mistake, please contact
                  our support team for details.
                </p>
                <Button asChild variant="outline" className="mt-2">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
