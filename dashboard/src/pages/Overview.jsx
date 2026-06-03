import { useMemo } from 'react'
import {
    Banknote, Users, TrendingUp, RefreshCw,
    AlertTriangle, PiggyBank, Ticket, Activity
} from 'lucide-react'
import KPICard from '../components/KPICard'
import {
    DisbursementsChart, CollectionRateChart,
    CustomerBaseChart, OutstandingChart
} from '../components/Charts'
import {
    monthlyData as mockMonthlyData,
    bridgeMonthlyData as mockBridgeMonthlyData,
    currentKPIs as mockCurrentKPIs,
    prevKPIs as mockPrevKPIs,
} from '../data/mockData'

function delta(curr, prev) {
    if (!prev || prev === 0) return null
    return (curr - prev) / prev
}

export default function Overview({ filters, data }) {
    const monthlyData = data?.monthlyData ?? mockMonthlyData
    const bridgeMonthlyData = data?.bridgeMonthlyData ?? mockBridgeMonthlyData
    const currentKPIs = data?.currentKPIs ?? mockCurrentKPIs
    const prevKPIs = data?.prevKPIs ?? mockPrevKPIs

    // Pick dataset based on product filter
    const rawData = filters.product === 'Bridge' ? bridgeMonthlyData : monthlyData

    // Filter by date range
    const filtered = useMemo(() => {
        return rawData.filter((d) => {
            const from = filters.fromMonth?.replace('-', '') || '000000'
            const to = filters.toMonth?.replace('-', '') || '999999'
            return d.month >= from && d.month <= to
        })
    }, [rawData, filters.fromMonth, filters.toMonth])

    const kpi = currentKPIs
    const prev = prevKPIs ?? currentKPIs

    return (
        <div className="flex flex-col gap-6">
            {/* Page title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Overview</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        {filters.product} · {filters.segment} · {filters.telco} · {filters.granularity}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-1.5">
                    <Activity size={13} className="text-blue-500" />
                    <span className="text-xs font-semibold text-blue-600">Live Data · Mar 2026</span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Total Disbursements"
                    value={kpi.disbVal}
                    subValue={`${(kpi.disbVol / 1_000_000).toFixed(1)}M transactions`}
                    delta={delta(kpi.disbVal, prev.disbVal)}
                    deltaLabel="vs last month"
                    icon={Banknote}
                    color="bg-blue-500"
                    format="currency"
                />
                <KPICard
                    title="Total Repayments"
                    value={kpi.repayVal}
                    subValue={`${(kpi.repayVol / 1_000_000).toFixed(1)}M transactions`}
                    delta={delta(kpi.repayVal, prev.repayVal)}
                    deltaLabel="vs last month"
                    icon={RefreshCw}
                    color="bg-emerald-500"
                    format="currency"
                />
                <KPICard
                    title="Customer Base"
                    value={kpi.custBase}
                    subValue="Opt-in customers"
                    delta={delta(kpi.custBase, prev.custBase)}
                    deltaLabel="vs last month"
                    icon={Users}
                    color="bg-indigo-500"
                    format="compact"
                />
                <KPICard
                    title="Collection Rate"
                    value={kpi.repayRate}
                    subValue="Repayment performance"
                    delta={delta(kpi.repayRate, prev.repayRate)}
                    deltaLabel="vs last month"
                    icon={TrendingUp}
                    color="bg-violet-500"
                    format="percent"
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Outstanding Loans"
                    value={kpi.outstanding * 1_000_000}
                    subValue="Balance"
                    delta={delta(kpi.outstanding, prev.outstanding) * -1}
                    deltaLabel="vs last month"
                    icon={AlertTriangle}
                    color="bg-rose-500"
                    format="currency"
                />
                <KPICard
                    title="Mandatory Savings"
                    value={kpi.mandatorySvgs * 1_000_000}
                    subValue="Cumulative"
                    delta={delta(kpi.mandatorySvgs, prev.mandatorySvgs)}
                    deltaLabel="vs last month"
                    icon={PiggyBank}
                    color="bg-amber-500"
                    format="currency"
                />
                <KPICard
                    title="Avg Ticket Size"
                    value={kpi.avgTicket}
                    subValue="Per loan disbursed"
                    delta={delta(kpi.avgTicket, prev.avgTicket)}
                    deltaLabel="vs last month"
                    icon={Ticket}
                    color="bg-cyan-500"
                    format="number"
                />
                <KPICard
                    title="Amount Due"
                    value={kpi.due * 1_000_000}
                    subValue="Loans past due"
                    delta={delta(kpi.due, prev.due) * -1}
                    deltaLabel="vs last month"
                    icon={AlertTriangle}
                    color="bg-orange-500"
                    format="currency"
                />
            </div>

            {/* Charts — Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DisbursementsChart data={filtered} />
                <CollectionRateChart data={filtered} />
            </div>

            {/* Charts — Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CustomerBaseChart data={filtered} />
                <OutstandingChart data={filtered} />
            </div>
        </div>
    )
}
