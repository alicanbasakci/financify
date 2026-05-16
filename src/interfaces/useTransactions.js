import { useState, useEffect } from "react"
import { createTransaction } from "./transaction"

const STORAGE_KEY = "financify_user_transactions"

const fetchSampleTransactions = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
  const posts = await response.json()

  const types = ["income", "expense", "expense", "income", "expense", "income"]
  const categories = ["Maaş", "Mutfak", "Ulaşım", "Freelance", "Eğlence", "Yatırım"]
  const amounts = [8500, 1200, 450, 3200, 800, 5000]

  return posts.map((post, index) => ({
    id: "sample_" + post.id,
    title: post.title.slice(0, 40),
    amount: amounts[index],
    type: types[index],
    category: categories[index],
    date: new Date(Date.now() - index * 86400000).toISOString(),
    isSample: true,
  }))
}

export const useTransactions = () => {
  const [userTransactions, setUserTransactions] = useState([])
  const [sampleTransactions, setSampleTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  // Kullanıcının kendi işlemlerini localStorage'dan yükle
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setUserTransactions(JSON.parse(stored))
    }
  }, [])

  // API'den her zaman örnek verileri çek
  useEffect(() => {
    const loadSamples = async () => {
      try {
        const samples = await fetchSampleTransactions()
        setSampleTransactions(samples)
      } catch (error) {
        console.error("API hatası:", error)
      }
      setLoading(false)
    }
    loadSamples()
  }, [])

  // Kullanıcı işlemleri değişince localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userTransactions))
  }, [userTransactions])

  // Kullanıcı işlemleri + örnek işlemler birleşik liste
  const transactions = [...userTransactions, ...sampleTransactions]

  const addTransaction = (title, amount, type, category) => {
    const newTransaction = createTransaction(title, amount, type, category)
    setUserTransactions((prev) => [newTransaction, ...prev])
  }

  const deleteTransaction = (id) => {
    if (id.startsWith("sample_")) {
      setSampleTransactions((prev) => prev.filter((t) => t.id !== id))
    } else {
      setUserTransactions((prev) => prev.filter((t) => t.id !== id))
    }
  }

  const updateTransaction = (id, updatedData) => {
    if (id.startsWith("sample_")) {
      setSampleTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
      )
    } else {
      setUserTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
      )
    }
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