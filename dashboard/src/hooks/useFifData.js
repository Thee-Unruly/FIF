/**
 * useFifData — fetches real data from the Flask backend.
 * Falls back transparently to static mock data if the API is unavailable.
 */
import { useState, useEffect } from 'react'
// Mock data import removed – API only

export function useFifData() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0)

    const refresh = () => setRefreshKey(k => k + 1)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                // Fetch all endpoints in parallel
                const BASE_URL = import.meta.env.VITE_API_URL;
                const [fif, bridge, telco, interest, savings] = await Promise.all([
                    fetch(`${BASE_URL ? BASE_URL : ''}/api/monthly?product=FIF`),
                    fetch(`${BASE_URL ? BASE_URL : ''}/api/monthly?product=Bridge`),
                    fetch(`${BASE_URL ? BASE_URL : ''}/api/telco`),
                    fetch(`${BASE_URL ? BASE_URL : ''}/api/interest`),
                    fetch(`${BASE_URL ? BASE_URL : ''}/api/savings`),
                ]);

                if (!fif.ok) throw new Error(`API error: ${fif.status}`)

                const [fifRaw, bridgeRaw, telcoData, interestData, savingsData] =
                    await Promise.all([fif.json(), bridge.json(), telco.json(), interest.json(), savings.json()])

                if (cancelled) return

                // Normalize units to match mockData conventions:
                // mandatorySvgs, due, outstanding → stored in Mn (÷1M) so charts/KPI cards work unchanged
                function normRow(row) {
                    return {
                        ...row,
                        mandatorySvgs: row.mandatorySvgs / 1_000_000,
                        due: row.due / 1_000_000,
                        outstanding: row.outstanding / 1_000_000,
                    }
                }

                const monthlyData = fifRaw.map(normRow)
                const bridgeMonthlyData = bridgeRaw.map(normRow)

                // Use last non-zero row as currentKPIs (skip sparse tail months)
                const full = monthlyData.filter(r => r.disbVal > 0 || r.repayVal > 0)
                const last = full.length > 0 ? full[full.length - 1] : monthlyData[monthlyData.length - 1]
                const prev = full.length > 1 ? full[full.length - 2] : last

                const currentKPIs = { ...last }
                const prevKPIs = { ...prev }

                // telcoMonthlyDisb: same shape as mockData
                const telcoMonthlyDisb = telcoData

                // savingsMonthlyData: map API response to expected shape
                const savingsMonthlyData = savingsData.map(d => ({
                    month: d.month,
                    label: d.label,
                    mandatoryVal: d.mandatoryVal,
                    mandatoryVol: d.mandatoryVol,
                    voluntaryVal: d.voluntaryVal,
                    voluntaryVol: d.voluntaryVol,
                    withdrawnVal: d.withdrawnVal,
                    withdrawnVol: d.withdrawnVol,
                }))

                // interestMonthlyData: same shape as mockData
                const interestMonthlyData = interestData

                // segmentMonthlyDisb not yet in API — use mock as fallback
                const segmentMonthlyDisb = []

                setData({
                    monthlyData,
                    bridgeMonthlyData,
                    currentKPIs,
                    prevKPIs,
                    interestMonthlyData,
                    telcoMonthlyDisb,
                    segmentMonthlyDisb,
                    savingsMonthlyData,
                    source: 'api',
                })
            } catch (err) {
                if (!cancelled) {
                    console.error('[useFifData] API error:', err);
                    setError(err.message);
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => { cancelled = true }
    }, [refreshKey])

    return { data, loading, error, refresh }
}
