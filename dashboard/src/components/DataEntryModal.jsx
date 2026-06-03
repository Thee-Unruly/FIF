import { useState } from 'react'
import { X, Save, ChevronDown } from 'lucide-react'

const PRODUCTS = ['FIF', 'Bridge']
const SEGMENTS = ['Individuals', 'Groups']
const TELCOS = ['All', 'Airtel', 'Telkom']

// Map focusSection → human-readable title for the modal subtitle
const SECTION_LABELS = {
    disbursements: 'Disbursements',
    repayments:    'Repayments & Performance',
    savings:       'Savings',
    null:          'Full Monthly Record',
}

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
            {children}
        </div>
    )
}

function Input({ ...props }) {
    return (
        <input
            {...props}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full"
        />
    )
}

function Select({ options, ...props }) {
    return (
        <div className="relative">
            <select
                {...props}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full appearance-none pr-8"
            >
                {options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
    )
}

export default function DataEntryModal({ onClose, onSave, initialData = null, focusSection = null }) {
    const isEdit = !!initialData

    const [form, setForm] = useState({
        month:          initialData?.month ?? '',
        product:        initialData?.product ?? 'FIF',
        segment:        initialData?.segment ?? 'Individuals',
        telco:          initialData?.telco ?? 'All',
        custBase:       initialData?.custBase ?? '',
        mandatorySvgs:  initialData?.mandatorySvgs ?? '',
        disbVol:        initialData?.disbVol ?? '',
        disbVal:        initialData?.disbVal ?? '',
        disbCust:       initialData?.disbCust ?? '',
        avgTicket:      initialData?.avgTicket ?? '',
        repayVol:       initialData?.repayVol ?? '',
        repayVal:       initialData?.repayVal ?? '',
        repayCust:      initialData?.repayCust ?? '',
        due:            initialData?.due ?? '',
        outstanding:    initialData?.outstanding ?? '',
        repayRate:      initialData?.repayRate ?? '',
        interestAccrued: initialData?.interestAccrued ?? '',
        interestPaid:   initialData?.interestPaid ?? '',
    })

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

    const handleSave = () => {
        if (!form.month) return alert('Please enter a month (YYYYMM)')
        onSave(form)
        onClose()
    }

    // Determine which sections to show
    const show = {
        savings:     !focusSection || focusSection === 'savings',
        disb:        !focusSection || focusSection === 'disbursements',
        repayments:  !focusSection || focusSection === 'repayments',
        performance: !focusSection || focusSection === 'repayments',
        interest:    !focusSection || focusSection === 'repayments',
    }

    const sectionLabel = SECTION_LABELS[focusSection] ?? 'Full Monthly Record'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl">
                    <div>
                        <h2 className="text-base font-bold text-slate-800">
                            {isEdit ? 'Edit Record' : `Add ${sectionLabel} Record`}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {isEdit ? `Editing: ${initialData.month}` : 'Enter data for a new reporting period'}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <X size={18} className="text-slate-500" />
                    </button>
                </div>

                <div className="px-6 py-5 flex flex-col gap-6">
                    {/* Period & Segment — always shown */}
                    <section>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Period & Segment</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Month (YYYYMM)">
                                <Input type="text" placeholder="e.g. 202504" value={form.month} onChange={set('month')} maxLength={6} />
                            </Field>
                            <Field label="Product">
                                <Select options={PRODUCTS} value={form.product} onChange={set('product')} />
                            </Field>
                            <Field label="Segment">
                                <Select options={SEGMENTS} value={form.segment} onChange={set('segment')} />
                            </Field>
                            <Field label="Telco">
                                <Select options={TELCOS} value={form.telco} onChange={set('telco')} />
                            </Field>
                        </div>
                    </section>

                    {/* Customers & Savings */}
                    {show.savings && (
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Customers & Savings</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Customer Base (Opt-ins)">
                                    <Input type="number" placeholder="e.g. 1200000" value={form.custBase} onChange={set('custBase')} />
                                </Field>
                                <Field label="Mandatory Savings (Mn KES)">
                                    <Input type="number" placeholder="e.g. 590.5" value={form.mandatorySvgs} onChange={set('mandatorySvgs')} />
                                </Field>
                            </div>
                        </section>
                    )}

                    {/* Disbursements */}
                    {show.disb && (
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Disbursements</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Volume (# loans)">
                                    <Input type="number" placeholder="e.g. 12500000" value={form.disbVol} onChange={set('disbVol')} />
                                </Field>
                                <Field label="Value (KES)">
                                    <Input type="number" placeholder="e.g. 10000000000" value={form.disbVal} onChange={set('disbVal')} />
                                </Field>
                                <Field label="Customer Count">
                                    <Input type="number" placeholder="e.g. 10000000" value={form.disbCust} onChange={set('disbCust')} />
                                </Field>
                                <Field label="Avg Ticket Size (KES)">
                                    <Input type="number" placeholder="e.g. 800" value={form.avgTicket} onChange={set('avgTicket')} />
                                </Field>
                            </div>
                        </section>
                    )}

                    {/* Repayments */}
                    {show.repayments && (
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Repayments</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Volume (# repayments)">
                                    <Input type="number" placeholder="e.g. 14000000" value={form.repayVol} onChange={set('repayVol')} />
                                </Field>
                                <Field label="Value (KES)">
                                    <Input type="number" placeholder="e.g. 9000000000" value={form.repayVal} onChange={set('repayVal')} />
                                </Field>
                                <Field label="Customer Count">
                                    <Input type="number" placeholder="e.g. 9300000" value={form.repayCust} onChange={set('repayCust')} />
                                </Field>
                                <Field label="Collection Rate (0–1)">
                                    <Input type="number" step="0.0001" placeholder="e.g. 0.9312" value={form.repayRate} onChange={set('repayRate')} />
                                </Field>
                            </div>
                        </section>
                    )}

                    {/* Loan Performance */}
                    {show.performance && (
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Loan Performance</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Amount Due (Mn KES)">
                                    <Input type="number" placeholder="e.g. 9011.1" value={form.due} onChange={set('due')} />
                                </Field>
                                <Field label="Outstanding (Mn KES)">
                                    <Input type="number" placeholder="e.g. 779.0" value={form.outstanding} onChange={set('outstanding')} />
                                </Field>
                            </div>
                        </section>
                    )}

                    {/* Interest & Penalty */}
                    {show.interest && (
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Interest & Penalty</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Accrued (KES)">
                                    <Input type="number" placeholder="e.g. 1234567890" value={form.interestAccrued} onChange={set('interestAccrued')} />
                                </Field>
                                <Field label="Paid (KES)">
                                    <Input type="number" placeholder="e.g. 1123456789" value={form.interestPaid} onChange={set('interestPaid')} />
                                </Field>
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                    >
                        <Save size={15} />
                        Save Record
                    </button>
                </div>
            </div>
        </div>
    )
}
