// Bir işlemin veri yapısı
// id: string (benzersiz kimlik)
// title: string (başlık - örn: "Market Alışverişi")
// amount: number (miktar - örn: 250)
// type: "income" | "expense" (gelir mi gider mi)
// category: string (kategori - örn: "Mutfak")
// date: string (tarih - ISO formatı)

export const createTransaction = (title, amount, type, category) => ({
  id: crypto.randomUUID(),
  title,
  amount: parseFloat(amount),
  type,
  category,
  date: new Date().toISOString(),
})

export const CATEGORIES = {
  income: ["Maaş", "Freelance", "Yatırım", "Diğer"],
  expense: ["Mutfak", "Kira", "Ulaşım", "Eğlence", "Sağlık", "Giyim", "Diğer"],
}