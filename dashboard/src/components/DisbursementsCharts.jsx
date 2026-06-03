import {
    ComposedChart, Bar, Line,
    LineChart,
    BarChart,
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
    blue: '#3b82f6',
    indigo: '#6366f1',
    emerald: '#10b981',
    amber: '#f59e0b',
    violet: '#8b5cf6',
    cyan: '#06b6d4',
    rose: '#f43f5e',
    orange: '#f97316',
    sky: '#0ea5e9',
    teal: '#14b8a6',
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

// Custom tooltip with KES formatting
function CurrencyTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs">
            <p className="font-semibold text-slate-600 mb-1.5">{label}</p>
            {payload.map((p) => (
                <div key={p.name} className="flex items-center gap-2 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-slate-500">{p.name}:</span>
                    <span className="font-semibold text-slate-700">
                        {typeof p.value === 'number' && p.value > 10000
                            ? `KES ${fmt(p.value)}`
                            : p.value?.toLocaleString?.() ?? p.value}
                    </span>
                </div>
            ))}
        </div>
    )
}

// Chart 1: Disbursement Value (bar) & Volume (line) over time
export function DisbValueVolumeChart({ data }) {
    return (
        <ChartCard title="Disbursement Value & Volume" subtitle="Monthly trend — KES value (bars) vs number of loans (line)">
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
                        yAxisId="val"
                        orientation="left"
                        tickFormatter={fmt}
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        width={48}
                    />
                    <YAxis
                        yAxisId="vol"
                        orientation="right"
                        tickFormatter={fmt}
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        width={48}
                    />
                    <Tooltip content={<CurrencyTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                    <Bar
                        yAxisId="val"
                        dataKey="disbVal"
                        name="Value (KES)"
                        fill={COLORS.blue}
                        radius={[3, 3, 0, 0]}
                        opacity={0.85}
                        maxBarSize={24}
                    />
                    <Line
                        yAxisId="vol"
                        type="monotone"
                        dataKey="disbVol"
                        name="Volume (loans)"
                        stroke={COLORS.amber}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

// Chart 2: Avg Ticket Size trend
export function AvgTicketChart({ data }) {
    return (
        <ChartCard title="Average Ticket Size" subtitle="KES per loan disbursed — monthly trend">
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
                        tickFormatter={(v) => `${v.toLocaleString()}`}
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false} axisLine={false}
                        width={52}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        formatter={(v) => [`KES ${v.toLocaleString()}`, 'Avg Ticket']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="avgTicket"
                        name="Avg Ticket Size"
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

// Chart 3: Airtel vs Telkom disbursement value comparison (grouped bar)
export function TelcoComparisonChart({ data }) {
    // Show last 12 months for readability
    const display = data.slice(-12)
    return (
        <ChartCard title="Airtel vs Telkom — Disbursements" subtitle="Monthly value comparison (KES)">
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
                    <Tooltip content={<CurrencyTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
                    <Bar dataKey="airtelVal" name="Airtel" fill={COLORS.sky} radius={[3, 3, 0, 0]} maxBarSize={18} />
                    <Bar dataKey="telkomVal" name="Telkom" fill={COLORS.teal} radius={[3, 3, 0, 0]} maxBarSize={18} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

// Chart 4: Individuals vs Groups stacked bar
export function SegmentBreakdownChart({ data }) {
    const display = data.slice(-12)
    return (
        <ChartCard title="Individuals vs Groups — Disbursements" subtitle="Monthly value split by segment (KES)">
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={display} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
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
                    <Tooltip content={<CurrencyTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
                    <Bar dataKey="indivVal" name="Individuals" stackId="seg" fill={COLORS.indigo} radius={[0, 0, 0, 0]} maxBarSize={22} />
                    <Bar dataKey="groupsVal" name="Groups" stackId="seg" fill={COLORS.orange} radius={[3, 3, 0, 0]} maxBarSize={22} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}
