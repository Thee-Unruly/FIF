import { useMemo } from 'react'
import { PiggyBank, TrendingUp, ArrowDownCircle, BarChart2 } from 'lucide-react'
import KPICard from '../components/KPICard'
import {
    MandatorySavingsChart,
    VoluntarySavingsChart,
    WithdrawalsChart,
    SavingsComparisonChart,
} from '../components/SavingsCharts'
import { savingsMonthlyData as mockSavingsMonthlyData } from '../data/mockData'

function delta(curr, prev) {
    if (!prev || prev === 0) return null
    return (curr - prev) / prev
}

export default function Savings({ filters, data }) {
    const savingsMonthlyData = data?.savingsMonthlyData ?? mockSavingsMonthlyData

    const filtered = useMemo(() => {
        const from = filters?.fromMonth?.replace('-', '') || '000000'
        const to = filters?.toMonth?.replace('-', '') || '999999'
        return savingsMonthlyData.filter(d => d.month >= from && d.month <= to)
    }, [savingsMonthlyData, filters?.fromMonth, filters?.toMonth])

    const display = filtered.length > 0 ? filtered : savingsMonthlyData

    const curr = display[display.length - 1]
    const prev = display.length > 1 ? display[display.length - 2] : null

    const totalWithdrawn = display.reduce((s, d) => s + (d.withdrawnVal ?? 0), 0)
    const prevWithdrawn = display.slice(0, -1).reduce((s, d) => s + (d.withdrawnVal ?? 0), 0)

    const netSavings = (curr?.mandatoryVal ?? 0) + (curr?.voluntaryVal ?? 0) - totalWithdrawn
    const prevNet = (prev?.mandatoryVal ?? 0) + (prev?.voluntaryVal ?? 0) - prevWithdrawn

    return (
        <div className="flex flex-col gap-6">
            {/* Page title */}
            <div>
                <h1 className="text-xl font-bold text-slate-800">Savings</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    {filters?.product} · {filters?.segment} · {filters?.telco} · {filters?.granularity}
                </p>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Mandatory Savings"
                    value={curr?.mandatoryVal}
                    subValue="Cumulative balance — loan-linked"
                    delta={delta(curr?.mandatoryVal, prev?.mandatoryVal)}
                    deltaLabel="vs last month"
                    icon={PiggyBank}
                    color="bg-amber-500"
                    format="currency"
                />
                <KPICard
                    title="Voluntary Savings"
                    value={curr?.voluntaryVal}
                    subValue={`${((curr?.voluntaryVol ?? 0) / 1000).toFixed(0)}K subscribers`}
                    delta={delta(curr?.voluntaryVal, prev?.voluntaryVal)}
                    deltaLabel="vs last month"
                    icon={TrendingUp}
                    color="bg-emerald-500"
                    format="currency"
                />
                <KPICard
                    title="Total Withdrawals"
                    value={totalWithdrawn}
                    subValue="Cumulative withdrawn amount"
                    delta={delta(totalWithdrawn, prevWithdrawn) * -1}
                    deltaLabel="vs last month"
                    icon={ArrowDownCircle}
                    color="bg-rose-500"
                    format="currency"
                />
                <KPICard
                    title="Net Savings Balance"
                    value={netSavings}
                    subValue="Mandatory + Voluntary − Withdrawn"
                    delta={delta(netSavings, prevNet)}
                    deltaLabel="vs last month"
                    icon={BarChart2}
                    color="bg-indigo-500"
                    format="currency"
                />
            </div>

            {/* Charts row 1 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <MandatorySavingsChart data={display} />
                <VoluntarySavingsChart data={display} />
            </div>

            {/* Charts row 2 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <WithdrawalsChart data={display} />
                <SavingsComparisonChart data={display} />
            </div>
        </div>
    )
}

