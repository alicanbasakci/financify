import { useState } from "react"
import { CATEGORIES } from "../interfaces/transaction"

const TransactionItem = ({ transaction, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(transaction.title)
  const [editAmount, setEditAmount] = useState(transaction.amount)
  const [editCategory, setEditCategory] = useState(transaction.category)

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount)

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  const handleSave = () => {
    if (!editTitle.trim() || parseFloat(editAmount) <= 0) return
    onUpdate(transaction.id, {
      title: editTitle,
      amount: parseFloat(editAmount),
      category: editCategory,
    })
    setIsEditing(false)
  }

  const isIncome = transaction.type === "income"

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow p-4 border-l-4 border-violet-400">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <input
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            {CATEGORIES[transaction.type].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-violet-600 text-white font-semibold py-2 rounded-xl hover:bg-violet-700 transition-all"
            >
              Kaydet
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-100 text-gray-600 font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow p-4 border-l-4 ${isIncome ? "border-emerald-400" : "border-rose-400"}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isIncome
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}>
              {transaction.category}
            </span>
            <span className="text-xs text-gray-400">{formatDate(transaction.date)}</span>
          </div>
          <p className="text-gray-800 font-semibold">{transaction.title}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>
            {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-violet-600 transition-colors text-lg"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="text-gray-400 hover:text-rose-600 transition-colors text-lg"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem