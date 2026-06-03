import { useState, useMemo } from 'react'
import { Plus, Search, Pencil, Trash2, ChevronUp, ChevronDown, ChevronsUpDown, Download } from 'lucide-react'
import DataEntryModal from '../components/DataEntryModal'
import { monthlyData as mockMonthlyData, bridgeMonthlyData as mockBridgeMonthlyData } from '../data/mockData'

// Flatten data into table rows
function buildRows(monthlyData, bridgeMonthlyData) {
    const fif = monthlyData.map((d) => ({
        id: `FIF-Ind-${d.month}`,
        month: d.month,
        label: d.label,
        product: 'FIF',
        segment: 'Individuals',
        telco: 'All',
        custBase: d.custBase,
        disbVal: d.disbVal,
        disbVol: d.disbVol,
        avgTicket: d.avgTicket,
        repayVal: d.repayVal,
        repayRate: d.repayRate,
        outstanding: d.outstanding,
        due: d.due,
    }))
    const bridge = bridgeMonthlyData.map((d) => ({
        id: `Bridge-Ind-${d.month}`,
        month: d.month,
        label: d.label,
        product: 'Bridge',
        segment: 'Individuals',
        telco: 'All',
        custBase: d.custBase,
        disbVal: d.disbVal,
        disbVol: d.disbVol,
        avgTicket: d.avgTicket,
        repayVal: d.repayVal,
        repayRate: d.repayRate,
        outstanding: d.outstanding,
        due: d.due,
    }))
    return [...fif, ...bridge].sort((a, b) => b.month.localeCompare(a.month))
}

const PAGE_SIZE = 15

const fmt = (v, type) => {
    if (v === null || v === undefined || v === '') return '—'
    if (type === 'currency') {
        if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(2)}B`
        if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
        return v.toLocaleString()
    }
    if (type === 'volume') {
        if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
        if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`
        return v.toLocaleString()
    }
    if (type === 'percent') return `${(v * 100).toFixed(1)}%`
    if (type === 'ticket') return v.toLocaleString()
    return v
}

const COLUMNS = [
    { key: 'label', label: 'Period', sortable: true, type: 'text' },
    { key: 'product', label: 'Product', sortable: true, type: 'text' },
    { key: 'segment', label: 'Segment', sortable: true, type: 'text' },
    { key: 'custBase', label: 'Cust Base', sortable: true, type: 'volume' },
    { key: 'disbVal', label: 'Disb Value', sortable: true, type: 'currency' },
    { key: 'disbVol', label: 'Disb Volume', sortable: true, type: 'volume' },
    { key: 'avgTicket', label: 'Avg Ticket', sortable: true, type: 'ticket' },
    { key: 'repayVal', label: 'Repay Value', sortable: true, type: 'currency' },
    { key: 'repayRate', label: 'Coll Rate', sortable: true, type: 'percent' },
    { key: 'outstanding', label: 'Outstanding', sortable: true, type: 'currency' },
]

function SortIcon({ colKey, sortKey, sortDir }) {
    if (sortKey !== colKey) return <ChevronsUpDown size={12} className="opacity-30" />
    return sortDir === 'asc'
        ? <ChevronUp size={12} className="text-blue-500" />
        : <ChevronDown size={12} className="text-blue-500" />
}

function BadgeProduct({ v }) {
    const cls = v === 'FIF'
        ? 'bg-blue-100 text-blue-700'
        : 'bg-violet-100 text-violet-700'
    return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{v}</span>
}

export default function DataEntry({ data }) {
    const monthlyData = data?.monthlyData ?? mockMonthlyData
    const bridgeMonthlyData = data?.bridgeMonthlyData ?? mockBridgeMonthlyData

    const [rows, setRows] = useState(() => buildRows(monthlyData, bridgeMonthlyData))
    const [search, setSearch] = useState('')
    const [productFilter, setProductFilter] = useState('All')
    const [sortKey, setSortKey] = useState('month')
    const [sortDir, setSortDir] = useState('desc')
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [editRow, setEditRow] = useState(null)
    const [deleteId, setDeleteId] = useState(null)

    // Filtered + sorted rows
    const filtered = useMemo(() => {
        let data = rows
        if (productFilter !== 'All') data = data.filter(r => r.product === productFilter)
        if (search.trim()) {
            const q = search.toLowerCase()
            data = data.filter(r =>
                r.label.toLowerCase().includes(q) ||
                r.product.toLowerCase().includes(q) ||
                r.segment.toLowerCase().includes(q)
            )
        }
        return [...data].sort((a, b) => {
            let va = a[sortKey], vb = b[sortKey]
            if (typeof va === 'string') va = va.toLowerCase()
            if (typeof vb === 'string') vb = vb.toLowerCase()
            if (va < vb) return sortDir === 'asc' ? -1 : 1
            if (va > vb) return sortDir === 'asc' ? 1 : -1
            return 0
        })
    }, [rows, search, productFilter, sortKey, sortDir])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const handleSort = (key) => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        else { setSortKey(key); setSortDir('asc') }
        setPage(1)
    }

    const handleSave = (form) => {
        if (editRow) {
            // Update existing row
            setRows(rs => rs.map(r => r.id === editRow.id ? {
                ...r,
                month: form.month,
                label: form.month, // simplified
                product: form.product,
                segment: form.segment,
                telco: form.telco,
                custBase: Number(form.custBase) || 0,
                disbVal: Number(form.disbVal) || 0,
                disbVol: Number(form.disbVol) || 0,
                avgTicket: Number(form.avgTicket) || 0,
                repayVal: Number(form.repayVal) || 0,
                repayRate: Number(form.repayRate) || 0,
                outstanding: Number(form.outstanding) || 0,
                due: Number(form.due) || 0,
            } : r))
        } else {
            // Add new row
            const newRow = {
                id: `${form.product}-${form.segment}-${form.month}`,
                month: form.month,
                label: form.month,
                product: form.product,
                segment: form.segment,
                telco: form.telco,
                custBase: Number(form.custBase) || 0,
                disbVal: Number(form.disbVal) || 0,
                disbVol: Number(form.disbVol) || 0,
                avgTicket: Number(form.avgTicket) || 0,
                repayVal: Number(form.repayVal) || 0,
                repayRate: Number(form.repayRate) || 0,
                outstanding: Number(form.outstanding) || 0,
                due: Number(form.due) || 0,
            }
            setRows(rs => [newRow, ...rs])
        }
        setEditRow(null)
    }

    const handleDeleteConfirm = () => {
        setRows(rs => rs.filter(r => r.id !== deleteId))
        setDeleteId(null)
        if (page > totalPages) setPage(totalPages)
    }

    const handleExport = () => {
        const header = ['Period', 'Product', 'Segment', 'Telco', 'Cust Base', 'Disb Value', 'Disb Volume', 'Avg Ticket', 'Repay Value', 'Coll Rate', 'Outstanding']
        const csvRows = [header.join(','), ...filtered.map(r => [
            r.label, r.product, r.segment, r.telco,
            r.custBase, r.disbVal, r.disbVol, r.avgTicket,
            r.repayVal, r.repayRate, r.outstanding
        ].join(','))]
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'fif_data.csv'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="flex flex-col gap-5">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Data Entry</h1>
                    <p className="text-sm text-slate-400 mt-0.5">{filtered.length} records — click a row to edit</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        <Download size={15} />
                        Export CSV
                    </button>
                    <button
                        onClick={() => { setEditRow(null); setShowModal(true) }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus size={15} />
                        Add Record
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1) }}
                        placeholder="Search period, product, segment…"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                </div>
                <select
                    value={productFilter}
                    onChange={e => { setProductFilter(e.target.value); setPage(1) }}
                    className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
                >
                    <option value="All">All Products</option>
                    <option value="FIF">FIF</option>
                    <option value="Bridge">Bridge</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                {COLUMNS.map(col => (
                                    <th
                                        key={col.key}
                                        onClick={() => col.sortable && handleSort(col.key)}
                                        className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap select-none
                                            ${col.sortable ? 'cursor-pointer hover:text-slate-700' : ''}`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {col.label}
                                            {col.sortable && <SortIcon colKey={col.key} sortKey={sortKey} sortDir={sortDir} />}
                                        </span>
                                    </th>
                                ))}
                                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageRows.length === 0 && (
                                <tr>
                                    <td colSpan={COLUMNS.length + 1} className="px-4 py-12 text-center text-slate-400 text-sm">
                                        No records match your filters.
                                    </td>
                                </tr>
                            )}
                            {pageRows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={`border-b border-slate-50 hover:bg-blue-50/40 transition-colors group ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}
                                >
                                    <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">{row.label}</td>
                                    <td className="px-4 py-3"><BadgeProduct v={row.product} /></td>
                                    <td className="px-4 py-3 text-slate-600">{row.segment}</td>
                                    <td className="px-4 py-3 text-slate-600 tabular-nums">{fmt(row.custBase, 'volume')}</td>
                                    <td className="px-4 py-3 text-slate-600 tabular-nums">KES {fmt(row.disbVal, 'currency')}</td>
                                    <td className="px-4 py-3 text-slate-600 tabular-nums">{fmt(row.disbVol, 'volume')}</td>
                                    <td className="px-4 py-3 text-slate-600 tabular-nums">KES {fmt(row.avgTicket, 'ticket')}</td>
                                    <td className="px-4 py-3 text-slate-600 tabular-nums">KES {fmt(row.repayVal, 'currency')}</td>
                                    <td className="px-4 py-3">
                                        <span className={`font-semibold tabular-nums ${row.repayRate >= 0.9 ? 'text-emerald-600' : row.repayRate >= 0.8 ? 'text-amber-600' : 'text-red-500'}`}>
                                            {fmt(row.repayRate, 'percent')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 tabular-nums">KES {fmt(row.outstanding, 'currency')}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setEditRow(row); setShowModal(true) }}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-100 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(row.id)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-100 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                        Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                        >
                            Prev
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let p
                            if (totalPages <= 5) p = i + 1
                            else if (page <= 3) p = i + 1
                            else if (page >= totalPages - 2) p = totalPages - 4 + i
                            else p = page - 2 + i
                            return (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-7 text-xs rounded-lg border transition-colors
                                        ${page === p
                                            ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                                >
                                    {p}
                                </button>
                            )
                        })}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Add / Edit modal */}
            {showModal && (
                <DataEntryModal
                    initialData={editRow ? {
                        month: editRow.month,
                        product: editRow.product,
                        segment: editRow.segment,
                        telco: editRow.telco,
                        custBase: editRow.custBase,
                        disbVal: editRow.disbVal,
                        disbVol: editRow.disbVol,
                        avgTicket: editRow.avgTicket,
                        repayVal: editRow.repayVal,
                        repayRate: editRow.repayRate,
                        outstanding: editRow.outstanding,
                        due: editRow.due,
                    } : null}
                    onClose={() => { setShowModal(false); setEditRow(null) }}
                    onSave={handleSave}
                />
            )}

            {/* Delete confirmation */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
                        <h3 className="text-base font-bold text-slate-800 mb-2">Delete Record</h3>
                        <p className="text-sm text-slate-500 mb-5">
                            Are you sure you want to delete this record? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
