import {
    AreaChart, Area,
    LineChart, Line,
    BarChart, Bar,
    ComposedChart,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, ReferenceLine,
} from 'recharts'

const fmt = (v) => {
    if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)}B`
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(0)}M`
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`
    return v
}

const COLORS = {
    blue: '#3b82f6',
    indigo: '#6366f1',
    emerald: '#10b981',
    amber: '#f59e0b',
    violet: '#8b5cf6',
    rose: '#f43f5e',
    orange: '#f97316',
    sky: '#0ea5e9',
    teal: '#14b8a6',
    slate: '#64748b',
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

function CurrencyTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs">
            <p className="font-semibold text-slate-600 mb-1.5">{label}</p>
            {payload.map((p) => (
                <div key={p.name} className="flex items-center gap-2 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                    <span className="text-slate-500">{p.name}:</span>
                    <span className="font-semibold text-slate-700">
                        {typeof p.value === 'number' && (p.value > 1 || p.name?.includes('Rate'))
                            ? p.name?.includes('Rate') || p.name?.includes('%')
                                ? `${(p.value * 100).toFixed(2)}%`
                                : `KES ${fmt(p.value)}`
                            : p.value}
                    </span>
                </div>
            ))}
        </div>
    )
}

// Chart 1: Collection Rate trend with 90% reference line
export function CollectionRateTrendChart({ data }) {
    return (
        <ChartCard title="Collection Rate Trend" subtitle="Monthly repayment performance — target ≥ 90%">
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        interval={3}
                    />
                    <YAxis
                        domain={[0.65, 1]}
                        tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        width={44}
                    />
                    <Tooltip
                        formatter={(v) => [`${(v * 100).toFixed(2)}%`, 'Collection Rate']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <ReferenceLine y={0.9} stroke={COLORS.emerald} strokeDasharray="4 4" label={{ value: '90% target', position: 'right', fontSize: 10, fill: COLORS.emerald }} />
                    <Line
                        type="monotone"
                        dataKey="repayRate"
                        name="Collection Rate"
                        stroke={COLORS.violet}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5, fill: COLORS.violet }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

// Chart 2: Repayment Value trend (area)
export function RepaymentValueChart({ data }) {
    return (
        <ChartCard title="Repayment Value Over Time" subtitle="Monthly total repayments (KES)">
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="repayGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        interval={3}
                    />
                    <YAxis
                        tickFormatter={fmt}
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        width={48}
                    />
                    <Tooltip
                        formatter={(v) => [`KES ${fmt(v)}`, 'Repayments']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="repayVal"
                        name="Repayment Value"
                        stroke={COLORS.emerald}
                        strokeWidth={2.5}
                        fill="url(#repayGrad)"
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

// Chart 3: Due vs Outstanding over time (composed)
export function DueOutstandingChart({ data }) {
    return (
        <ChartCard title="Amount Due vs Outstanding" subtitle="Monthly loan performance (KES Mn) — after 14-day grace">
            <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        interval={3}
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        width={48}
                    />
                    <Tooltip
                        formatter={(v, name) => [`KES ${v.toLocaleString()} Mn`, name]}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                    <Bar dataKey="due" name="Amount Due (Mn)" fill={COLORS.rose} radius={[3, 3, 0, 0]} opacity={0.85} maxBarSize={20} />
                    <Line type="monotone" dataKey="outstanding" name="Outstanding (Mn)" stroke={COLORS.amber} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

// Chart 4: Interest Accrued vs Paid
export function InterestChart({ data }) {
    const display = data.slice(-12)
    return (
        <ChartCard title="Interest & Penalty — Accrued vs Paid" subtitle="Last 12 months (KES)">
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={display} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={2}>
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
                    <YAxis
                        tickFormatter={fmt}
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        width={48}
                    />
                    <Tooltip
                        formatter={(v) => [`KES ${fmt(v)}`, '']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
                    <Bar dataKey="accrued" name="Accrued" fill={COLORS.orange} radius={[3, 3, 0, 0]} maxBarSize={18} />
                    <Bar dataKey="paid" name="Paid" fill={COLORS.teal} radius={[3, 3, 0, 0]} maxBarSize={18} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}
