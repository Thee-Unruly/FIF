import { useMemo } from 'react'
import { Banknote, Hash, Ticket, Users } from 'lucide-react'
import KPICard from '../components/KPICard'
import {
    DisbValueVolumeChart,
    AvgTicketChart,
    TelcoComparisonChart,
    SegmentBreakdownChart,
} from '../components/DisbursementsCharts'
import {
    monthlyData as mockMonthlyData,
    telcoMonthlyDisb as mockTelcoMonthlyDisb,
    segmentMonthlyDisb as mockSegmentMonthlyDisb,
    currentKPIs as mockCurrentKPIs,
    prevKPIs as mockPrevKPIs,
} from '../data/mockData'

function delta(curr, prev) {
    if (!prev || prev === 0) return null
    return (curr - prev) / prev
}

export default function Disbursements({ filters, data }) {
    const monthlyData = data?.monthlyData ?? mockMonthlyData
    const telcoMonthlyDisb = data?.telcoMonthlyDisb ?? mockTelcoMonthlyDisb
    const segmentMonthlyDisb = data?.segmentMonthlyDisb ?? mockSegmentMonthlyDisb
    const currentKPIs = data?.currentKPIs ?? mockCurrentKPIs
    const prevKPIs = data?.prevKPIs ?? mockPrevKPIs
    const filtered = useMemo(() => {
        const from = filters.fromMonth?.replace('-', '') || '000000'
        const to = filters.toMonth?.replace('-', '') || '999999'
        return monthlyData.filter((d) => d.month >= from && d.month <= to)
    }, [monthlyData, filters.fromMonth, filters.toMonth])

    const filteredTelco = useMemo(() => {
        const from = filters.fromMonth?.replace('-', '') || '000000'
        const to = filters.toMonth?.replace('-', '') || '999999'
        return telcoMonthlyDisb.filter((d) => d.month >= from && d.month <= to)
    }, [telcoMonthlyDisb, filters.fromMonth, filters.toMonth])

    const filteredSegment = useMemo(() => {
        const from = filters.fromMonth?.replace('-', '') || '000000'
        const to = filters.toMonth?.replace('-', '') || '999999'
        return segmentMonthlyDisb.filter((d) => d.month >= from && d.month <= to)
    }, [filters.fromMonth, filters.toMonth])

    const kpi = currentKPIs
    const prev = prevKPIs

    return (
        <div className="flex flex-col gap-6">
            {/* Page title */}
            <div>
                <h1 className="text-xl font-bold text-slate-800">Disbursements</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    {filters.product} · {filters.segment} · {filters.telco} · {filters.granularity}
                </p>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Disbursement Value"
                    value={kpi.disbVal}
                    subValue="Total loans disbursed"
                    delta={delta(kpi.disbVal, prev.disbVal)}
                    deltaLabel="vs last month"
                    icon={Banknote}
                    color="bg-blue-500"
                    format="currency"
                />
                <KPICard
                    title="Disbursement Volume"
                    value={kpi.disbVol}
                    subValue="Number of loans"
                    delta={delta(kpi.disbVol, prev.disbVol)}
                    deltaLabel="vs last month"
                    icon={Hash}
                    color="bg-indigo-500"
                    format="compact"
                />
                <KPICard
                    title="Customer Count"
                    value={kpi.disbCust}
                    subValue="Unique borrowers"
                    delta={delta(kpi.disbCust, prev.disbCust)}
                    deltaLabel="vs last month"
                    icon={Users}
                    color="bg-violet-500"
                    format="compact"
                />
                <KPICard
                    title="Avg Ticket Size"
                    value={kpi.avgTicket}
                    subValue="Per loan (KES)"
                    delta={delta(kpi.avgTicket, prev.avgTicket)}
                    deltaLabel="vs last month"
                    icon={Ticket}
                    color="bg-cyan-500"
                    format="number"
                />
            </div>

            {/* Row 1: Value & Volume trend + Avg Ticket */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DisbValueVolumeChart data={filtered} />
                <AvgTicketChart data={filtered} />
            </div>

            {/* Row 2: Telco comparison + Segment breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TelcoComparisonChart data={filteredTelco} />
                <SegmentBreakdownChart data={filteredSegment} />
            </div>
        </div>
    )
}
