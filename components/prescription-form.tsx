"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PrescriptionForm({
  appointmentId,
}: {
  appointmentId: string
}) {
  const router = useRouter()

  const [diagnosis, setDiagnosis] = useState("")
  const [tests, setTests] = useState("")
  const [advice, setAdvice] = useState("")
  const [notes, setNotes] = useState("")

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  ])

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ])
  }

  const updateMedicine = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...medicines]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setMedicines(updated)
  }

  const savePrescription = async () => {
    try {
      const response = await fetch(
        "/api/prescription",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            appointmentId,
            diagnosis,
            tests,
            advice,
            notes,
            medicines,
          }),
        }
      )

      const data = await response.json()

if (!response.ok) {
  throw new Error(
    data.error || "Failed to save prescription"
  )
}

router.push(`/prescription/${data.id}`)
    } catch (error) {
      console.error(error)
      alert("Failed to save prescription")
    }
  }

  return (
    <div className="space-y-4">

      <textarea
        placeholder="Diagnosis"
        className="w-full border rounded p-3"
        value={diagnosis}
        onChange={(e) =>
          setDiagnosis(e.target.value)
        }
      />

      <textarea
        placeholder="Tests"
        className="w-full border rounded p-3"
        value={tests}
        onChange={(e) =>
          setTests(e.target.value)
        }
      />

      <textarea
        placeholder="Advice"
        className="w-full border rounded p-3"
        value={advice}
        onChange={(e) =>
          setAdvice(e.target.value)
        }
      />

      <textarea
        placeholder="Notes"
        className="w-full border rounded p-3"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
      />

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Medicines
        </h3>

        {medicines.map(
          (medicine, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 mb-3"
            >
              <input
                className="border rounded p-2"
                placeholder="Medicine"
                value={medicine.name}
                onChange={(e) =>
                  updateMedicine(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

              <input
                className="border rounded p-2"
                placeholder="Dosage"
                value={medicine.dosage}
                onChange={(e) =>
                  updateMedicine(
                    index,
                    "dosage",
                    e.target.value
                  )
                }
              />

              <input
                className="border rounded p-2"
                placeholder="Frequency"
                value={medicine.frequency}
                onChange={(e) =>
                  updateMedicine(
                    index,
                    "frequency",
                    e.target.value
                  )
                }
              />

              <input
                className="border rounded p-2"
                placeholder="Duration"
                value={medicine.duration}
                onChange={(e) =>
                  updateMedicine(
                    index,
                    "duration",
                    e.target.value
                  )
                }
              />
            </div>
          )
        )}

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={addMedicine}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Medicine
          </button>

          <button
            type="button"
            onClick={savePrescription}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  )
}