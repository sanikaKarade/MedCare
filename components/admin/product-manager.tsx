"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Pencil, Trash2, ImagePlus, CheckCircle2 } from "lucide-react"
import { useUploadThing } from "@/lib/uploadthing"

type Product = {
  id: string
  name: string
  description: string | null
  manufacturer: string | null
  category: string | null
  power: string | null
  prescription: boolean
  price: number
  stock: number
  imageUrl: string | null
}

const emptyForm = {
  name: "",
  description: "",
  manufacturer: "",
  category: "",
  power: "",
  prescription: false,
  price: "",
  stock: "",
  imageUrl: "" as string | null,
}

function ProductForm({
  initial,
  apiBase,
  uploadEndpoint,
  onSaved,
  onClose,
}: {
  initial?: Product
  apiBase: string
  uploadEndpoint: "medicineImage" | "vendorProductImage"
  onSaved: () => void
  onClose: () => void
}) {
  const [form, setForm] = useState(
    initial
      ? {
          name: initial.name,
          description: initial.description || "",
          manufacturer: initial.manufacturer || "",
          category: initial.category || "",
          power: initial.power || "",
          prescription: initial.prescription,
          price: String(initial.price),
          stock: String(initial.stock),
          imageUrl: initial.imageUrl,
        }
      : emptyForm
  )
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const { startUpload } = useUploadThing(uploadEndpoint, {
    onUploadError: (error) => {
      alert(`Image upload failed: ${error.message}`)
      setUploading(false)
    },
  })

  async function handleImageSelected(file: File | undefined) {
    if (!file) return
    setUploading(true)
    try {
      const result = await startUpload([file])
      const url = result?.[0]?.ufsUrl || result?.[0]?.url
      if (url) setForm((f) => ({ ...f, imageUrl: url }))
    } catch (error) {
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit() {
    if (!form.name.trim() || form.price === "" || form.stock === "") {
      alert("Name, price, and stock are required.")
      return
    }

    setSaving(true)
    try {
      const payload = {
        name: form.name,
        description: form.description || null,
        manufacturer: form.manufacturer || null,
        category: form.category || null,
        power: form.power || null,
        prescription: form.prescription,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl || null,
      }

      const res = await fetch(
        initial ? `${apiBase}/${initial.id}` : apiBase,
        {
          method: initial ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error || "Failed to save medicine")
        return
      }

      onSaved()
      onClose()
    } catch (error) {
      console.error(error)
      alert("Something went wrong saving this medicine.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <Label>Manufacturer</Label>
          <Input value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} />
        </div>
        <div>
          <Label>Category</Label>
          <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </div>
        <div>
          <Label>Power / Dosage</Label>
          <Input placeholder="e.g. 500 mg" value={form.power} onChange={(e) => setForm({ ...form, power: e.target.value })} />
        </div>
        <div>
          <Label>Price (₹)</Label>
          <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div>
          <Label>Stock</Label>
          <Input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Switch checked={form.prescription} onCheckedChange={(v) => setForm({ ...form, prescription: v })} />
          <Label>Requires prescription</Label>
        </div>
        <div className="col-span-2">
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="col-span-2">
          <Label className="mb-1 block">Image</Label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed p-3 hover:border-blue-400">
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            ) : form.imageUrl ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <ImagePlus className="h-5 w-5 text-slate-500" />
            )}
            <span className="text-sm">
              {form.imageUrl ? "Image uploaded ✓" : "Click to upload an image"}
            </span>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleImageSelected(e.target.files?.[0])}
            />
          </label>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={saving || uploading}>
          {saving ? "Saving..." : initial ? "Save Changes" : "Add Medicine"}
        </Button>
      </DialogFooter>
    </div>
  )
}

export function ProductManager({
  products,
  apiBase = "/api/admin/products",
  uploadEndpoint = "medicineImage",
}: {
  products: Product[]
  apiBase?: string
  uploadEndpoint?: "medicineImage" | "vendorProductImage"
}) {
  const router = useRouter()
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  async function handleDelete(id: string) {
    if (!confirm("Delete this medicine? This can't be undone.")) return

    const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      alert(data.error || "Failed to delete")
      return
    }
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Medicine</DialogTitle>
            </DialogHeader>
            <ProductForm
              apiBase={apiBase}
              uploadEndpoint={uploadEndpoint}
              onSaved={() => router.refresh()}
              onClose={() => setAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Rx</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No medicines yet. Click "Add Medicine" to create your first one.
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category || "—"}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>
                  <span className={product.stock === 0 ? "text-red-600" : ""}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  {product.prescription && <Badge variant="outline">Rx</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => setEditing(product)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
          </DialogHeader>
          {editing && (
            <ProductForm
              initial={editing}
              apiBase={apiBase}
              uploadEndpoint={uploadEndpoint}
              onSaved={() => router.refresh()}
              onClose={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
