import { ChevronDown, SlidersHorizontal } from 'lucide-react'

export default function FiltersBar({ filters, onChange }) {
    const set = (k) => (e) => onChange({ ...filters, [k]: e.target.value })

    return (
        <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                <SlidersHorizontal size={14} />
                Filters
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <FilterSelect label="Product" value={filters.product} onChange={set('product')} options={['FIF', 'Bridge']} />
                <FilterSelect label="Segment" value={filters.segment} onChange={set('segment')} options={['Individuals', 'Groups']} />
                <FilterSelect label="Telco" value={filters.telco} onChange={set('telco')} options={['All', 'Airtel', 'Telkom']} />
                <FilterSelect label="Granularity" value={filters.granularity} onChange={set('granularity')} options={['Monthly', 'Daily']} />
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <label className="text-xs text-slate-400 font-medium whitespace-nowrap">From</label>
                <input
                    type="month"
                    value={filters.fromMonth}
                    onChange={set('fromMonth')}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-xs text-slate-400 font-medium">To</label>
                <input
                    type="month"
                    value={filters.toMonth}
                    onChange={set('toMonth')}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    )
}

function FilterSelect({ label, value, onChange, options }) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">{label}:</span>
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="text-xs border border-slate-200 rounded-lg pl-2.5 pr-7 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer hover:border-slate-300 transition-colors"
                >
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
        </div>
    )
}
