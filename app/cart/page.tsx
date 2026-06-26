import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="mt-3 text-muted-foreground">
            Your selected medicines will appear here.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}