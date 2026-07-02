import { useState, useEffect } from "react";
import { fetchInvoices, type InvoiceRow } from "../../lib/invoices";
import { Download, CreditCard, Loader2 } from "lucide-react";
import { createInvoiceOrder, openRazorpayCheckout, verifyPayment } from "../../lib/razorpay";
import { captureError } from "../../lib/error-tracking";

export default function PortalInvoices() {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [summary, setSummary] = useState({ total: "₹0", paid: "₹0", outstanding: "₹0" });
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchInvoices()
      .then((r) => { setInvoices(r.invoices); setSummary(r.summary); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePay = async (invId: string) => {
    setLoadingId(invId);
    try {
      const order = await createInvoiceOrder(invId);
      openRazorpayCheckout({
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        key: order.keyId,
        name: "Aesthetix Studio",
        description: `Payment for invoice ${invId}`,
        onSuccess: async (response) => {
          await verifyPayment({ ...response, invoiceId: invId });
          window.location.reload();
        },
        onDismiss: () => setLoadingId(null),
      });
    } catch (err) {
      captureError(err, { context: "invoice-payment", invoiceId: invId });
      setLoadingId(null);
    }
  };

  const stats = [
    { label: "Total Invoiced", value: summary.total, color: "#6150F6" },
    { label: "Total Paid", value: summary.paid, color: "#16A34A" },
    { label: "Outstanding", value: summary.outstanding, color: "#F59E0B" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Invoices</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>View and manage your billing history.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-muted-foreground mb-2" style={{ fontSize: "12px" }}>{s.label}</p>
            <p className="text-foreground" style={{ fontSize: "22px", fontWeight: 700 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "var(--secondary)" }}>
              {["Invoice", "Project", "Amount", "Issued", "Due", "Status", "Action"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-sm">No invoices yet.</td></tr>
            ) : (
              invoices.map((inv, i) => {
                const statusColor = inv.status === "Paid" ? "#16A34A" : inv.status === "Pending" ? "#F59E0B" : "#EF4444";
                return (
                  <tr key={inv.id} className="border-t hover:bg-secondary/30 transition-colors" style={{ borderColor: "var(--border)", background: i % 2 === 0 ? "var(--card)" : undefined }}>
                    <td className="px-4 py-3"><span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{inv.id}</span></td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-foreground" style={{ fontSize: "13px" }}>{inv.project}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{inv.client}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{inv.amount}</span></td>
                    <td className="px-4 py-3"><span className="text-muted-foreground" style={{ fontSize: "13px" }}>{inv.issued}</span></td>
                    <td className="px-4 py-3"><span className="text-muted-foreground" style={{ fontSize: "13px" }}>{inv.due}</span></td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full" style={{ background: `${statusColor}18`, color: statusColor, fontSize: "11px", fontWeight: 600 }}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {inv.status === "Pending" || inv.status === "Overdue" ? (
                        <button onClick={() => handlePay(inv.id)} disabled={loadingId !== null} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ background: "var(--brand)", fontSize: "12px", fontWeight: 500 }}>
                          {loadingId === inv.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                          {loadingId === inv.id ? "Processing..." : "Pay now"}
                        </button>
                      ) : (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "12px" }}>
                          <Download className="w-3.5 h-3.5" /> Download
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
