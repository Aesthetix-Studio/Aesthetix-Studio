import { getAccessToken } from "./session";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: Record<string, string>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function createOrder(amount: number, options?: { currency?: string; plan?: string; receipt?: string; invoiceId?: string }) {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ amount, currency: options?.currency ?? "INR", plan: options?.plan, receipt: options?.receipt }),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function createInvoiceOrder(invoiceId: string) {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/api/invoices/${invoiceId}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Failed to create invoice order");
  return res.json();
}

export async function verifyPayment(data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  invoiceId?: string;
}) {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/api/payments/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Payment verification failed");
  return res.json();
}

export async function openRazorpayCheckout(options: {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
  name: string;
  description?: string;
  prefill?: Record<string, string>;
  onSuccess: (response: RazorpayResponse) => void;
  onDismiss?: () => void;
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded) throw new Error("Failed to load Razorpay SDK");

  const razorpay = new window.Razorpay({
    key: options.key,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.orderId,
    handler: options.onSuccess,
    prefill: options.prefill,
    theme: { color: "#6150F6" },
    modal: { ondismiss: options.onDismiss },
  });

  razorpay.open();
}
