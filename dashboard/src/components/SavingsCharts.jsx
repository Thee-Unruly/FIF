import {
    AreaChart, Area,
    BarChart, Bar,
    ComposedChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer,
} from 'recharts'

const fmt = (v) => {
    if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)}B`
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(0)}M`
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`
    return v
}

const COLORS = {
    amber: '#f59e0b',
    emerald: '#10b981',
    indigo: '#6366f1',
    rose: '#f43f5e',
    sky: '#0ea5e9',
    violet: '#8b5cf6',
    teal: '#14b8a6',
    orange: '#f97316',
    slate: '#94a3b8',
}

function ChartCard({ title, subtitle, children }) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
                {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            {children}
        </div>
    )
}

function KESTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs">
            <p className="font-semibold text-slate-600 mb-1.5">{label}</p>
            {payload.map((p) => (
                <div key={p.name} className="flex items-center gap-2 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                    <span className="text-slate-500">{p.name}:</span>
                    <span className="font-semibold text-slate-700">KES {fmt(p.value)}</span>
                </div>
            ))}
        </div>
    )
}

// Chart 1: Mandatory Savings trend (area)
export function MandatorySavingsChart({ data }) {
    return (
        <ChartCard title="Mandatory Savings" subtitle="Monthly cumulative value — linked to loan opt-ins (KES)">
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="mandGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.amber} stopOpacity={0.25} />
                            <stop offset="95%" stopColor={COLORS.amber} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={3} />
                    <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={48} />
                    <Tooltip content={<KESTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="mandatoryVal"
                        name="Mandatory Savings"
                        stroke={COLORS.amber}
                        strokeWidth={2.5}
                        fill="url(#mandGrad)"
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

// Chart 2: Voluntary Savings trend (area)
export function VoluntarySavingsChart({ data }) {
    // Only show from Jun 2023 when voluntary savings started
    const active = data.filter(d => d.voluntaryVal > 0)
    return (
        <ChartCard title="Voluntary Savings" subtitle="Monthly cumulative value — customer opt-in deposits (KES)">
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={active} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.25} />
                            <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={2} />
                    <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={48} />
                    <Tooltip content={<KESTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="voluntaryVal"
                        name="Voluntary Savings"
                        stroke={COLORS.emerald}
                        strokeWidth={2.5}
                        fill="url(#volGrad)"
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

// Chart 3: Withdrawals trend (bar)
export function WithdrawalsChart({ data }) {
    const active = data.filter(d => d.withdrawnVal > 0)
    return (
        <ChartCard title="Savings Withdrawals" subtitle="Monthly withdrawn amounts (KES) — volume annotated">
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={active} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        interval={2}
                        angle={-30}
                        textAnchor="end"
                        height={40}
                    />
                    <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={48} />
                    <Tooltip
                        formatter={(v, name) => [`KES ${fmt(v)}`, name]}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Bar dataKey="withdrawnVal" name="Withdrawn" fill={COLORS.rose} radius={[4, 4, 0, 0]} maxBarSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

// Chart 4: All three savings types stacked — net savings view
export function SavingsComparisonChart({ data }) {
    const display = data.slice(-12)
    return (
        <ChartCard title="Savings Overview — Last 12 Months" subtitle="Mandatory vs Voluntary deposits vs Withdrawals (KES)">
            <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={display} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        interval={1}
                        angle={-30}
                        textAnchor="end"
                        height={40}
                    />
                    <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={48} />
                    <Tooltip content={<KESTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
                    <Bar dataKey="mandatoryVal" name="Mandatory" stackId="sv" fill={COLORS.amber} maxBarSize={22} />
                    <Bar dataKey="voluntaryVal" name="Voluntary" stackId="sv" fill={COLORS.emerald} radius={[3, 3, 0, 0]} maxBarSize={22} />
                    <Line type="monotone" dataKey="withdrawnVal" name="Withdrawn" stroke={COLORS.rose} strokeWidth={2} dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}
