import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function KPICard({ title, value, subValue, delta, deltaLabel, icon: Icon, color, format = 'number' }) {
    const isPositive = delta > 0
    const isNeutral = delta === 0 || delta === null || delta === undefined

    const fmt = (v) => {
        if (v === null || v === undefined) return '—'
        if (format === 'currency') {
            if (v >= 1_000_000_000) return `KES ${(v / 1_000_000_000).toFixed(2)}B`
            if (v >= 1_000_000) return `KES ${(v / 1_000_000).toFixed(1)}M`
            return `KES ${v.toLocaleString()}`
        }
        if (format === 'percent') return `${(v * 100).toFixed(2)}%`
        if (format === 'compact') {
            if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`
            if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`
            return v.toLocaleString()
        }
        if (format === 'kes-mn') return `KES ${(v / 1_000_000).toFixed(1)}Mn`
        return v.toLocaleString()
    }

    const deltaVal = delta !== null && delta !== undefined ? Math.abs(delta * 100).toFixed(1) : null

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{title}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={18} className="text-white" />
                </div>
            </div>

            <div>
                <p className="text-2xl font-bold text-slate-800 leading-tight">{fmt(value)}</p>
                {subValue && <p className="text-xs text-slate-400 mt-0.5">{subValue}</p>}
            </div>

            {deltaVal !== null && (
                <div className="flex items-center gap-1.5 text-xs">
                    {isNeutral ? (
                        <Minus size={13} className="text-slate-400" />
                    ) : isPositive ? (
                        <TrendingUp size={13} className="text-emerald-500" />
                    ) : (
                        <TrendingDown size={13} className="text-red-400" />
                    )}
                    <span className={isNeutral ? 'text-slate-400' : isPositive ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>
                        {isNeutral ? 'No change' : `${isPositive ? '+' : '-'}${deltaVal}%`}
                    </span>
                    {deltaLabel && <span className="text-slate-400">{deltaLabel}</span>}
                </div>
            )}
        </div>
    )
}
