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

  const { data, loading, refresh } = useFifData()

  const handleSave = async (form) => {
    const record = {
      month: form.month,
      label: form.month,
      product: form.product,
      segment: form.segment,
      telco: form.telco,
      custBase: Number(form.custBase) || 0,
      mandatorySvgs: Number(form.mandatorySvgs) || 0,
      disbVal: Number(form.disbVal) || 0,
      disbVol: Number(form.disbVol) || 0,
      disbCust: Number(form.disbCust) || 0,
      avgTicket: Number(form.avgTicket) || 0,
      repayVal: Number(form.repayVal) || 0,
      repayVol: Number(form.repayVol) || 0,
      repayCust: Number(form.repayCust) || 0,
      repayRate: Number(form.repayRate) || 0,
      outstanding: Number(form.outstanding) || 0,
      due: Number(form.due) || 0,
      interestAccrued: Number(form.interestAccrued) || 0,
      interestPaid: Number(form.interestPaid) || 0,
    }
    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
      if (!res.ok) console.error('Save failed:', await res.text())
    } catch (e) {
      console.error('Save error:', e)
    }
    refresh()
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
      case 'data': return <DataEntry data={data} onRefresh={refresh} />
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
