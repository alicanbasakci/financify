import { useState } from "react"
import { CATEGORIES } from "../interfaces/transaction"

const TransactionForm = ({ onAdd }) => {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [category, setCategory] = useState("Diğer")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !amount || parseFloat(amount) <= 0) return
    onAdd(title, amount, type, category)
    setTitle("")
    setAmount("")
    setCategory("Diğer")
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Yeni İşlem Ekle</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Gelir / Gider Seçimi */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { setType("income"); setCategory("Diğer") }}
            className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
              type === "income"
                ? "bg-emerald-500 text-white shadow"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            ↑ Gelir
          </button>
          <button
            type="button"
            onClick={() => { setType("expense"); setCategory("Diğer") }}
            className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
              type === "expense"
                ? "bg-rose-500 text-white shadow"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            ↓ Gider
          </button>
        </div>

        {/* Başlık */}
        <input
          type="text"
          placeholder="Başlık (örn: Market Alışverişi)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        {/* Miktar */}
        <input
          type="number"
          placeholder="Miktar (₺)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        {/* Kategori */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          {CATEGORIES[type].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Gönder */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow"
        >
          + Ekle
        </button>
      </form>
    </div>
  )
}

export default TransactionForm