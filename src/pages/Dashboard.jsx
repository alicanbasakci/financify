import { useTransactions } from "../interfaces/useTransactions"
import BalanceCard from "../components/BalanceCard"
import TransactionForm from "../components/TransactionForm"
import TransactionItem from "../components/TransactionItem"

const Dashboard = () => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    totalIncome,
    totalExpense,
    balance,
    loading,
  } = useTransactions()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">💰</p>
          <p className="text-gray-500 font-medium">Veriler yükleniyor...</p>
          <p className="text-gray-400 text-sm mt-1">API'den örnek veriler çekiliyor</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <BalanceCard
          balance={balance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />

        <TransactionForm onAdd={addTransaction} />

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            İşlemler
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({transactions.length} kayıt)
            </span>
          </h2>

          {transactions.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-12 text-center">
              <p className="text-4xl mb-3">💸</p>
              <p className="text-gray-500 font-medium">Henüz işlem yok</p>
              <p className="text-gray-400 text-sm mt-1">
                Yukarıdan ilk işlemini ekle!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={deleteTransaction}
                  onUpdate={updateTransaction}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard