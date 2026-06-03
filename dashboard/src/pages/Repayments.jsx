import { useMemo } from 'react'
import { RefreshCw, TrendingUp, AlertTriangle, Landmark } from 'lucide-react'
import KPICard from '../components/KPICard'
import {
    CollectionRateTrendChart,
    RepaymentValueChart,
    DueOutstandingChart,
    InterestChart,
} from '../components/RepaymentsCharts'
import {
    monthlyData as mockMonthlyData,
    interestMonthlyData as mockInterestMonthlyData,
    currentKPIs as mockCurrentKPIs,
    prevKPIs as mockPrevKPIs,
} from '../data/mockData'

function delta(curr, prev) {
    if (!prev || prev === 0) return null
    return (curr - prev) / prev
}

export default function Repayments({ filters, data }) {
    const monthlyData = data?.monthlyData ?? mockMonthlyData
    const interestMonthlyData = data?.interestMonthlyData ?? mockInterestMonthlyData
    const currentKPIs = data?.currentKPIs ?? mockCurrentKPIs
    const prevKPIs = data?.prevKPIs ?? mockPrevKPIs

    const filtered = useMemo(() => {
        const from = filters.fromMonth?.replace('-', '') || '000000'
        const to = filters.toMonth?.replace('-', '') || '999999'
        return monthlyData.filter((d) => d.month >= from && d.month <= to)
    }, [monthlyData, filters.fromMonth, filters.toMonth])

    const filteredInterest = useMemo(() => {
        const from = filters.fromMonth?.replace('-', '') || '000000'
        const to = filters.toMonth?.replace('-', '') || '999999'
        return interestMonthlyData.filter((d) => d.month >= from && d.month <= to)
    }, [interestMonthlyData, filters.fromMonth, filters.toMonth])

    const kpi = currentKPIs
    const prev = prevKPIs

    // Interest recovery rate (paid / accrued for last month)
    const lastInterest = interestMonthlyData[interestMonthlyData.length - 1]
    const prevInterest = interestMonthlyData[interestMonthlyData.length - 2]
    const interestRecovery = lastInterest.paid / lastInterest.accrued
    const prevInterestRecovery = prevInterest.paid / prevInterest.accrued

    return (
        <div className="flex flex-col gap-6">
            {/* Page title */}
            <div>
                <h1 className="text-xl font-bold text-slate-800">Repayments & Performance</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    {filters.product} · {filters.segment} · {filters.telco} · {filters.granularity}
                </p>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    title="Collection Rate"
                    value={kpi.repayRate}
                    subValue="Repayment performance"
                    delta={delta(kpi.repayRate, prev.repayRate)}
                    deltaLabel="vs last month"
                    icon={TrendingUp}
                    color="bg-violet-500"
                    format="percent"
                />
                <KPICard
                    title="Outstanding Balance"
                    value={kpi.outstanding * 1_000_000}
                    subValue="Loans still unpaid"
                    delta={delta(kpi.outstanding, prev.outstanding) * -1}
                    deltaLabel="vs last month"
                    icon={AlertTriangle}
                    color="bg-rose-500"
                    format="currency"
                />
                <KPICard
                    title="Interest Recovery Rate"
                    value={interestRecovery}
                    subValue={`KES ${(lastInterest.paid / 1_000_000).toFixed(0)}M of ${(lastInterest.accrued / 1_000_000).toFixed(0)}M accrued`}
                    delta={delta(interestRecovery, prevInterestRecovery)}
                    deltaLabel="vs last month"
                    icon={Landmark}
                    color="bg-amber-500"
                    format="percent"
                />
            </div>

            {/* Row 1: Collection Rate + Repayment Value */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CollectionRateTrendChart data={filtered} />
                <RepaymentValueChart data={filtered} />
            </div>

            {/* Row 2: Due vs Outstanding + Interest */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DueOutstandingChart data={filtered} />
                <InterestChart data={filteredInterest} />
            </div>
        </div>
    )
}
