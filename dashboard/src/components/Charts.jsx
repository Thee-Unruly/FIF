import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Area, AreaChart, ComposedChart
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
    rose: '#f43f5e',
    violet: '#8b5cf6',
    cyan: '#06b6d4',
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

export function DisbursementsChart({ data }) {
    return (
        <ChartCard title="Disbursements & Repayments" subtitle="Monthly value (KES)">
            <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="disbGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.18} />
                            <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="repayGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.18} />
                            <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={2} />
                    <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip
                        formatter={(v, name) => [fmt(v), name]}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Area type="monotone" dataKey="disbVal" name="Disbursements" stroke={COLORS.blue} strokeWidth={2} fill="url(#disbGrad)" dot={false} />
                    <Area type="monotone" dataKey="repayVal" name="Repayments" stroke={COLORS.emerald} strokeWidth={2} fill="url(#repayGrad)" dot={false} />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

export function CollectionRateChart({ data }) {
    return (
        <ChartCard title="Collection Rate Trend" subtitle="Monthly repayment performance (%)">
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={2} />
                    <YAxis domain={[0.7, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip
                        formatter={(v) => [`${(v * 100).toFixed(2)}%`, 'Collection Rate']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="repayRate" name="Collection Rate" stroke={COLORS.violet} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

export function CustomerBaseChart({ data }) {
    return (
        <ChartCard title="Customer Base Growth" subtitle="Monthly opt-ins (cumulative)">
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={2} />
                    <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip
                        formatter={(v) => [fmt(v), 'Customers']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Bar dataKey="custBase" name="Customer Base" fill={COLORS.indigo} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

export function OutstandingChart({ data }) {
    return (
        <ChartCard title="Outstanding vs Due" subtitle="Monthly performance (KES Mn)">
            <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={2} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Bar dataKey="outstanding" name="Outstanding (Mn)" fill={COLORS.rose} radius={[4, 4, 0, 0]} opacity={0.8} />
                    <Line type="monotone" dataKey="due" name="Due (Mn)" stroke={COLORS.amber} strokeWidth={2} dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}
