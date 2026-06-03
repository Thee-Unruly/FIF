import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import FiltersBar from './components/FiltersBar'
import DataEntryModal from './components/DataEntryModal'
import Overview from './pages/Overview'
import Disbursements from './pages/Disbursements'
import Repayments from './pages/Repayments'
import Savings from './pages/Savings'
import DataEntry from './pages/DataEntry'
import { useFifData } from './hooks/useFifData'
import { Plus, Bell, Loader2 } from 'lucide-react'

function App() {
  const [page, setPage] = useState('overview')
  const [showEntry, setShowEntry] = useState(false)
  const [filters, setFilters] = useState({
    product: 'FIF',
    segment: 'Individuals',
    telco: 'All',
    granularity: 'Monthly',
    fromMonth: '2023-03',
    toMonth: '2026-03',
  })

  const { data, loading } = useFifData()

  const handleSave = (record) => {
    console.log('New record:', record)
    // Future: POST to backend
  }

  const renderPage = () => {
    if (loading || !data) return (
      <div className="flex items-center justify-center h-64 gap-2 text-slate-400 text-sm">
        <Loader2 size={18} className="animate-spin" />
        Loading data…
      </div>
    )
    switch (page) {
      case 'overview': return <Overview filters={filters} data={data} />
      case 'disbursements': return <Disbursements filters={filters} data={data} />
      case 'repayments': return <Repayments filters={filters} data={data} />
      case 'savings': return <Savings filters={filters} data={data} />
      case 'data': return <DataEntry data={data} />
      default: return (
        <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
          Page coming soon
        </div>
      )
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar active={page} onSelect={setPage} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-slate-400">Financial Inclusion Fund</p>
            <h2 className="text-sm font-semibold text-slate-700 capitalize">{page}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell size={16} className="text-slate-400" />
            </button>
            <button
              onClick={() => setShowEntry(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              <Plus size={14} />
              Add Record
            </button>
          </div>
        </header>

        {/* Filters */}
        <FiltersBar filters={filters} onChange={setFilters} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-6 py-5">
          {renderPage()}
        </main>
      </div>

      {showEntry && (
        <DataEntryModal
          onClose={() => setShowEntry(false)}
          onSave={handleSave}
          focusSection={
            page === 'disbursements' ? 'disbursements' :
              page === 'repayments' ? 'repayments' :
                page === 'savings' ? 'savings' :
                  null
          }
        />
      )}
    </div>
  )
}

export default App
