const BalanceCard = ({ balance, totalIncome, totalExpense }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Toplam Bakiye */}
      <div className="md:col-span-1 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
        <p className="text-violet-200 text-sm font-medium mb-1">Toplam Bakiye</p>
        <h2 className="text-3xl font-bold">
          {formatCurrency(balance)}
        </h2>
        <p className="text-violet-300 text-xs mt-2">Tüm zamanlar</p>
      </div>

      {/* Toplam Gelir */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">↑</span>
          <p className="text-emerald-100 text-sm font-medium">Toplam Gelir</p>
        </div>
        <h3 className="text-2xl font-bold">{formatCurrency(totalIncome)}</h3>
      </div>

      {/* Toplam Gider */}
      <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">↓</span>
          <p className="text-rose-100 text-sm font-medium">Toplam Gider</p>
        </div>
        <h3 className="text-2xl font-bold">{formatCurrency(totalExpense)}</h3>
      </div>
    </div>
  )
}

export default BalanceCard