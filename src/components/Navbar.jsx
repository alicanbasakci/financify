const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-violet-600 to-purple-700 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2">
            <span className="text-2xl">💰</span>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold tracking-tight">Financify</h1>
            <p className="text-violet-200 text-xs">Bütçe Takip Uygulaması</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl px-3 py-1.5">
          <p className="text-violet-100 text-xs font-medium">
            {new Date().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar