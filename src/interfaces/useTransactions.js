import { useState, useEffect } from "react"
import { createTransaction } from "./transaction"

const STORAGE_KEY = "financify_transactions"

const fetchSampleTransactions = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
  const posts = await response.json()

  const types = ["income", "expense", "expense", "income", "expense", "income"]
  const categories = ["Maaş", "Mutfak", "Ulaşım", "Freelance", "Eğlence", "Yatırım"]
  const amounts = [8500, 1200, 450, 3200, 800, 5000]

  return posts.map((post, index) => ({
    id: crypto.randomUUID(),
    title: post.title.slice(0, 40),
    amount: amounts[index],
    type: types[index],
    category: categories[index],
    date: new Date(Date.now() - index * 86400000).toISOString(),
  }))
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setTransactions(JSON.parse(stored))
      } else {
        try {
          const sample = await fetchSampleTransactions()
          setTransactions(sample)
        } catch (error) {
          console.error("API hatası:", error)
        }
      }
      setLoading(false)
    }
    init()
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    }
  }, [transactions, loading])

  const addTransaction = (title, amount, type, category) => {
    const newTransaction = createTransaction(title, amount, type, category)
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const updateTransaction = (id, updatedData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    )
  }

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    totalIncome,
    totalExpense,
    balance,
    loading,
  }
}