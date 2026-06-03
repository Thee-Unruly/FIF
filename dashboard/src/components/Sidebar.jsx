import { LayoutDashboard, BarChart2, RefreshCw, PiggyBank, Database, ChevronRight } from 'lucide-react'

const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'disbursements', label: 'Disbursements', icon: BarChart2 },
    { id: 'repayments', label: 'Repayments', icon: RefreshCw },
    { id: 'savings', label: 'Savings', icon: PiggyBank },
    { id: 'data', label: 'Data Entry', icon: Database },
]

export default function Sidebar({ active, onSelect }) {
    return (
        <aside className="w-56 min-h-screen bg-slate-900 flex flex-col shrink-0">
            {/* Logo */}
            <div className="px-5 py-5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                        <span className="text-white font-black text-xs">FIF</span>
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm leading-tight">FIF Analytics</p>
                        <p className="text-slate-400 text-xs">Mar 2026 Report</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 px-3 pt-4 flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 mb-2">Navigation</p>
                {navItems.map(({ id, label, icon: Icon }) => {
                    const isActive = active === id
                    return (
                        <button
                            key={id}
                            onClick={() => onSelect(id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full group
                ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Icon size={16} />
                            <span className="flex-1">{label}</span>
                            {isActive && <ChevronRight size={14} className="opacity-60" />}
                        </button>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-800">
                <p className="text-xs text-slate-500">Financial Inclusion Fund</p>
                <p className="text-xs text-slate-600 mt-0.5">End of March 2026</p>
            </div>
        </aside>
    )
}
