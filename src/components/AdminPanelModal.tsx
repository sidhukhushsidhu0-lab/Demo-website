/* -------------------------------------------------------------------------- */
/* Danial's Cafe & Bistro — Complete Admin & Management Panel Portal          */
/* -------------------------------------------------------------------------- */

import { useState, useEffect, useMemo } from "react";
import {
  Shield,
  Lock,
  User,
  Key,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  Download,
  TrendingUp,
  Users,
  ShoppingBag,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Search,
  Phone,
  Mail,
  MapPin,
  Printer,
  Trash2,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Coffee,
  Check,
  Power,
  Banknote,
} from "lucide-react";

import {
  getAdminCredentials,
  saveAdminCredentials,
  verifyAdminLogin,
  isAdminAuthenticated,
  setAdminAuthenticated,
  getStoredOrders,
  updateOrderStatus,
  deleteStoredOrder,
  getStoredReservations,
  updateReservationStatus,
  deleteStoredReservation,
  getAnalyticsData,
  resetAdminDataToDemo,
  getSiteStatus,
  setSiteStatus,
  toggleSiteStatus,
  type SiteStatusConfig,
  type StoredOrder,
  type StoredReservation,
  type AnalyticsData,
  type OrderStatus,
  type ReservationStatus,
  DEFAULT_ADMIN_CREDS,
} from "@/lib/adminStore";

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = "analytics" | "orders" | "reservations" | "whatsapp" | "security";

export function AdminPanelModal({ isOpen, onClose }: AdminPanelModalProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");

  // Data States
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [reservations, setReservations] = useState<StoredReservation[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  // Filters & Search
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [reservationSearch, setReservationSearch] = useState("");
  const [reservationStatusFilter, setReservationStatusFilter] = useState<string>("all");

  // Selected Order for Receipt / Details
  const [inspectOrder, setInspectOrder] = useState<StoredOrder | null>(null);

  // Security Form State
  const [newUsername, setNewUsername] = useState("");
  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [securityMessage, setSecurityMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Toast / Action notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Master Website Online / Offline Operational State
  const [siteStatus, setSiteStatusState] = useState<SiteStatusConfig>(() => getSiteStatus());

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync authentication and data on open
  useEffect(() => {
    if (isOpen) {
      const authed = isAdminAuthenticated();
      setIsAuthenticated(authed);
      setSiteStatusState(getSiteStatus());
      if (authed) {
        loadData();
      }
    }
  }, [isOpen]);

  // Keep site status in sync if toggled from anywhere
  useEffect(() => {
    const handleStatusChange = (e: Event) => {
      const customEvent = e as CustomEvent<SiteStatusConfig>;
      if (customEvent.detail) {
        setSiteStatusState(customEvent.detail);
      } else {
        setSiteStatusState(getSiteStatus());
      }
    };
    window.addEventListener("danials_site_status_changed", handleStatusChange);
    return () => window.removeEventListener("danials_site_status_changed", handleStatusChange);
  }, []);

  // Handle Master Power Toggle (Online / Offline)
  const handleToggleSiteStatus = () => {
    const updated = toggleSiteStatus();
    setSiteStatusState(updated);
    if (updated.isOnline) {
      showToast("🟢 Website is now LIVE! Customers can place orders and reserve tables.");
    } else {
      showToast("🔴 Website is now OFFLINE! Customer orders and reservations are paused.");
    }
  };

  const loadData = () => {
    setOrders(getStoredOrders());
    setReservations(getStoredReservations());
    setAnalytics(getAnalyticsData());
  };

  // Handle Login Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const valid = verifyAdminLogin(usernameInput, passwordInput);
    if (valid) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setUsernameInput("");
      setPasswordInput("");
      loadData();
      showToast("Welcome, Admin! Successfully authenticated.");
    } else {
      setLoginError("Invalid username or password. Please verify your credentials.");
    }
  };

  // Quick fill default credentials for convenience
  const handleQuickFill = () => {
    const creds = getAdminCredentials();
    setUsernameInput(creds.username);
    setPasswordInput(creds.password);
    setLoginError(null);
  };

  // Handle Logout
  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    showToast("Logged out successfully.");
  };

  // Handle Reset Demo Data
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset orders, bookings, and analytics to factory demo data?")) {
      resetAdminDataToDemo();
      loadData();
      showToast("System data restored to default demo state.");
    }
  };

  // Handle Change Order Status
  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    const updated = updateOrderStatus(orderId, nextStatus);
    setOrders(updated);
    if (inspectOrder && inspectOrder.orderId === orderId) {
      setInspectOrder((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
    showToast(`Order #${orderId} marked as ${nextStatus}`);
  };

  // Handle Delete Order
  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`Are you sure you want to delete Order #${orderId}?`)) {
      const updated = deleteStoredOrder(orderId);
      setOrders(updated);
      if (inspectOrder?.orderId === orderId) setInspectOrder(null);
      showToast(`Order #${orderId} deleted.`);
    }
  };

  // Handle Change Reservation Status
  const handleUpdateResStatus = (resId: string, nextStatus: ReservationStatus) => {
    const updated = updateReservationStatus(resId, nextStatus);
    setReservations(updated);
    showToast(`Booking #${resId} marked as ${nextStatus}`);
  };

  // Handle Delete Reservation
  const handleDeleteReservation = (resId: string) => {
    if (window.confirm(`Are you sure you want to delete Reservation #${resId}?`)) {
      const updated = deleteStoredReservation(resId);
      setReservations(updated);
      showToast(`Reservation #${resId} deleted.`);
    }
  };

  // Handle Update Security Credentials
  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);
    const currentCreds = getAdminCredentials();

    if (currentPasswordConfirm !== currentCreds.password) {
      setSecurityMessage({
        type: "error",
        text: "Current password does not match. Please verify your current password.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setSecurityMessage({
        type: "error",
        text: "New password must be at least 8 characters long with letters and numbers.",
      });
      return;
    }

    const result = saveAdminCredentials({
      username: newUsername.trim() || currentCreds.username,
      password: newPassword,
      lastUpdated: new Date().toISOString(),
    });

    if (result.success) {
      setSecurityMessage({ type: "success", text: result.message });
      setCurrentPasswordConfirm("");
      setNewPassword("");
      setNewUsername("");
      showToast("Admin credentials updated successfully!");
    } else {
      setSecurityMessage({ type: "error", text: result.message });
    }
  };

  // Export Data as JSON
  const handleExportData = () => {
    const payload = {
      exportDate: new Date().toISOString(),
      cafe: "Danial's Cafe & Bistro, Faridkot",
      analytics: analytics,
      totalOrders: orders.length,
      orders: orders,
      totalReservations: reservations.length,
      reservations: reservations,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `danials_bistro_admin_export_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Export downloaded successfully!");
  };

  // Print Order Receipt
  const handlePrintReceipt = (order: StoredOrder) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt #${order.orderId} - Danial's Cafe & Bistro</title>
          <style>
            body { font-family: monospace; padding: 24px; max-width: 400px; margin: 0 auto; line-height: 1.4; }
            .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 12px; margin-bottom: 12px; }
            .row { display: flex; justify-content: space-between; margin: 4px 0; }
            .bold { font-weight: bold; }
            .footer { border-top: 2px dashed #000; padding-top: 12px; margin-top: 16px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>DANIAL'S CAFE & BISTRO</h2>
            <p>Opp. Gaushala, near MGM School, Faridkot<br>Phone: 078145 00305</p>
            <p class="bold">ORDER RECEIPT #${order.orderId}</p>
            <p>${order.time} | Type: ${order.orderType}</p>
          </div>
          <div>
            <div class="row"><span>Customer:</span><span class="bold">${order.customerName}</span></div>
            <div class="row"><span>Phone:</span><span>${order.customerPhone}</span></div>
            <div class="row"><span>Location:</span><span>${order.tableOrAddress}</span></div>
            ${order.customerEmail ? `<div class="row"><span>Email:</span><span>${order.customerEmail}</span></div>` : ""}
          </div>
          <div style="border-top: 1px solid #ccc; margin: 10px 0; padding-top: 8px;">
            <p class="bold">ORDERED ITEMS:</p>
            ${order.items
              .map(
                (ci) => `
              <div class="row">
                <span>${ci.quantity}x ${ci.item.name}</span>
                <span>₹${ci.item.priceNumber * ci.quantity}</span>
              </div>
            `
              )
              .join("")}
          </div>
          <div style="border-top: 1px dashed #000; padding-top: 6px;">
            <div class="row bold" style="font-size: 16px;">
              <span>GRAND TOTAL:</span>
              <span>₹${order.total}</span>
            </div>
            <div class="row" style="color: #444; font-size: 12px;">
              <span>Payment Mode:</span>
              <span>${order.paymentMethod || "Cash / Counter"}</span>
            </div>
          </div>
          ${order.notes ? `<div style="margin-top: 10px; font-size: 11px; background: #eee; padding: 6px;"><strong>Notes:</strong> ${order.notes}</div>` : ""}
          <div class="footer">
            <p>Thank you for choosing Danial's Cafe!<br>Pure Veg Kitchen • 10:00 AM – 10:30 PM</p>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus =
        orderStatusFilter === "all" || o.status === orderStatusFilter;
      if (!matchesStatus) return false;
      if (!orderSearch.trim()) return true;
      const q = orderSearch.toLowerCase().trim();
      return (
        o.orderId.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.toLowerCase().includes(q) ||
        o.tableOrAddress.toLowerCase().includes(q) ||
        (o.paymentMethod && o.paymentMethod.toLowerCase().includes(q)) ||
        (o.paymentType && o.paymentType.toLowerCase().includes(q)) ||
        o.items.some((i) => i.item.name.toLowerCase().includes(q))
      );
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // Filtered Reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      const matchesStatus =
        reservationStatusFilter === "all" || r.status === reservationStatusFilter;
      if (!matchesStatus) return false;
      if (!reservationSearch.trim()) return true;
      const q = reservationSearch.toLowerCase().trim();
      return (
        r.reservationId.toLowerCase().includes(q) ||
        r.guestName.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.seatingArea.toLowerCase().includes(q)
      );
    });
  }, [reservations, reservationStatusFilter, reservationSearch]);

  // Calculated Totals
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-3 sm:p-5 backdrop-blur-md transition-all animate-in fade-in duration-200"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-60 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-2xl animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="relative w-full max-w-7xl max-h-[92vh] flex flex-col rounded-3xl bg-[#faf8f4] text-[#1c2e28] shadow-2xl border border-emerald-900/30 overflow-hidden">
        {/* ================================================================= */}
        {/* VIEW 1: AUTHENTICATION LOGIN SCREEN                               */}
        {/* ================================================================= */}
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-[500px]">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 transition-colors"
              title="Close Portal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="w-full max-w-md space-y-6">
              {/* Brand Header */}
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#083e35] text-[#5cdbb5] shadow-lg shadow-emerald-950/20">
                  <Shield className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#083e35]">
                  Danial's Cafe &amp; Bistro
                </h2>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
                  <Lock className="h-3.5 w-3.5 text-[#00a884]" />
                  <span>Staff &amp; Management Portal • Operations Center</span>
                </div>
                <p className="text-xs text-stone-500 pt-1">
                  Access live customer orders, table reservations, website traffic analytics, and WhatsApp leads.
                </p>
              </div>

              {/* Error Alert */}
              {loginError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium animate-in shake">
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Admin Username
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="e.g. admin@danials.cafe"
                      className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#00a884] focus:ring-2 focus:ring-[#00a884]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Secure Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                      <Key className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter strong password"
                      className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#00a884] focus:ring-2 focus:ring-[#00a884]/20 outline-hidden transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#083e35] py-3 text-sm font-bold text-white shadow-md hover:bg-[#062c25] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4 text-[#5cdbb5]" />
                  <span>Login to Command Center</span>
                </button>
              </form>

              {/* Secure Credentials Hint Box */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#083e35] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#00a884]" />
                    <span>Configured Admin Credentials</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleQuickFill}
                    className="text-[11px] font-bold text-[#00a884] hover:underline hover:text-[#008f6f]"
                  >
                    Auto-Fill Credentials
                  </button>
                </div>
                <div className="space-y-1 font-mono text-stone-700">
                  <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-emerald-100">
                    <span className="text-stone-500 font-sans">Username:</span>
                    <strong className="text-[#083e35]">admin@danials.cafe</strong>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-emerald-100">
                    <span className="text-stone-500 font-sans">Password:</span>
                    <strong className="text-[#083e35]">Danial#Bistro!2026</strong>
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 italic">
                  * Note: You can customize username and password anytime in the "Security &amp; Settings" tab after logging in.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* VIEW 2: AUTHENTICATED ADMIN DASHBOARD COMMAND CENTER             */
          /* ================================================================= */
          <div className="flex flex-col h-full max-h-[92vh]">
            {/* Top Admin Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 bg-[#083e35] px-6 py-4 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#5cdbb5] border border-white/20">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-extrabold tracking-wide">
                      Danial's Cafe &amp; Bistro
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-[#5cdbb5] border border-emerald-400/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Command Center
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-100/70">
                    Faridkot Operations • Orders, Bookings, Viewers &amp; WhatsApp Analytics
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Master Site Online / Offline Switch */}
                <div
                  className={`flex items-center gap-2 rounded-xl px-3 py-1.5 border transition-all ${
                    siteStatus.isOnline
                      ? "bg-emerald-950/70 border-emerald-400/40 text-white shadow-inner"
                      : "bg-rose-950/80 border-rose-400/50 text-white shadow-inner"
                  }`}
                  title={
                    siteStatus.isOnline
                      ? "Website is currently LIVE & taking orders. Click switch to turn OFF (Maintenance Mode)."
                      : "Website is currently OFFLINE / Closed. Click switch to turn ON (Live Mode)."
                  }
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        siteStatus.isOnline
                          ? "bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400"
                          : "bg-rose-500 animate-pulse shadow-xs shadow-rose-500"
                      }`}
                    />
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-200/80">
                        Site Power
                      </span>
                      <span
                        className={`text-[11px] font-extrabold ${
                          siteStatus.isOnline ? "text-emerald-300" : "text-rose-300"
                        }`}
                      >
                        {siteStatus.isOnline ? "LIVE (ON)" : "PAUSED (OFF)"}
                      </span>
                    </div>
                  </div>

                  {/* Accessible Clickable Toggle Button */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={siteStatus.isOnline}
                    onClick={handleToggleSiteStatus}
                    className={`relative inline-flex h-5.5 w-11 shrink-0 cursor-pointer rounded-full border border-white/25 transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      siteStatus.isOnline ? "bg-emerald-500" : "bg-rose-600/90"
                    }`}
                  >
                    <span className="sr-only">Toggle Website Status</span>
                    <span
                      className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-[1px] ml-[2px] ${
                        siteStatus.isOnline ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={handleExportData}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 font-semibold text-white hover:bg-white/20 transition-colors"
                  title="Export all data as JSON"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Export Data</span>
                </button>

                <button
                  onClick={handleResetData}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 text-amber-200 px-3 py-2 font-semibold hover:bg-amber-500/30 transition-colors"
                  title="Reset to initial factory demo data"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Reset Demo</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/20 text-red-200 px-3 py-2 font-semibold hover:bg-red-500/30 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title="Return to Website"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Strip */}
            <div className="flex border-b border-stone-200 bg-white px-6 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "analytics"
                    ? "border-[#00a884] text-[#083e35]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <TrendingUp className="h-4 w-4 text-[#00a884]" />
                <span>Overview &amp; Viewers (Live Analytics)</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "orders"
                    ? "border-[#00a884] text-[#083e35]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <ShoppingBag className="h-4 w-4 text-[#00a884]" />
                <span>Orders ({orders.length}) (Live Orders)</span>
              </button>

              <button
                onClick={() => setActiveTab("reservations")}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "reservations"
                    ? "border-[#00a884] text-[#083e35]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <Calendar className="h-4 w-4 text-[#00a884]" />
                <span>Table Bookings ({reservations.length}) (Reservations)</span>
              </button>

              <button
                onClick={() => setActiveTab("whatsapp")}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "whatsapp"
                    ? "border-[#00a884] text-[#083e35]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <Send className="h-4 w-4 text-emerald-600" />
                <span>WhatsApp Leads ({analytics?.whatsappClicksTotal || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "security"
                    ? "border-[#00a884] text-[#083e35]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <Key className="h-4 w-4 text-[#00a884]" />
                <span>Security &amp; Password (Settings)</span>
              </button>
            </div>

            {/* Scrollable Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              {/* ============================================================= */}
              {/* TAB 1: OVERVIEW & ANALYTICS VIEWERS                           */}
              {/* ============================================================= */}
              {activeTab === "analytics" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Master Site Control & Status Banner */}
                  <div
                    className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      siteStatus.isOnline
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-950"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                          siteStatus.isOnline
                            ? "bg-[#083e35] text-[#5cdbb5] shadow-md shadow-emerald-950/20"
                            : "bg-rose-700 text-white shadow-md shadow-rose-950/20"
                        }`}
                      >
                        <Power className="h-6 w-6" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-display text-base sm:text-lg font-extrabold text-[#083e35]">
                            Website Master Power Switch (On / Off)
                          </h4>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                              siteStatus.isOnline
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-rose-100 text-rose-800 border border-rose-300"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                siteStatus.isOnline ? "bg-emerald-600 animate-pulse" : "bg-rose-600 animate-pulse"
                              }`}
                            />
                            {siteStatus.isOnline
                              ? "ONLINE • Website Accepting Orders & Bookings"
                              : "OFFLINE • Website Paused (Maintenance Mode)"}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 max-w-2xl">
                          {siteStatus.isOnline
                            ? "Your website is currently active. Customers can browse all food items, place online takeaway/delivery orders, and reserve tables."
                            : "Your website is currently turned OFF. Customers see a maintenance announcement and cannot submit food orders or reserve tables."}
                        </p>
                        <p className="text-[11px] text-stone-400">
                          Last toggled: {siteStatus.lastToggledAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={handleToggleSiteStatus}
                        className={`btn-spring inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer ${
                          siteStatus.isOnline
                            ? "bg-rose-600 hover:bg-rose-700 shadow-rose-950/20"
                            : "bg-[#00a884] hover:bg-[#008f6f] shadow-emerald-950/20"
                        }`}
                      >
                        <Power className="h-4 w-4" />
                        <span>
                          {siteStatus.isOnline
                            ? "Turn Site OFF (Pause Orders)"
                            : "Turn Site ON (Go Live)"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Top Key Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Metric 1: Total Website Viewers */}
                    <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                          Total Website Views
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#00a884]">
                          <Users className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-[#083e35]">
                          {analytics?.totalPageViews.toLocaleString() || "1,847"}
                        </div>
                        <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          <span>{analytics?.todayViews || 264} views logged today</span>
                        </p>
                      </div>
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span>Unique Visitors:</span>
                        <strong className="text-stone-800">{analytics?.uniqueVisitors || 624}</strong>
                      </div>
                    </div>

                    {/* Metric 2: Total Online Orders */}
                    <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                          Total Online Orders
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#00a884]">
                          <ShoppingBag className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-[#083e35]">
                          {orders.length}
                        </div>
                        <p className="text-xs text-stone-600 font-medium mt-1">
                          Total Order Volume: <strong className="text-[#00a884]">₹{totalRevenue}</strong>
                        </p>
                      </div>
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span>New Active Orders:</span>
                        <strong className="text-amber-600">
                          {orders.filter((o) => o.status === "New" || o.status === "Preparing").length}
                        </strong>
                      </div>
                    </div>

                    {/* Metric 3: Table Bookings */}
                    <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                          Table Reservations
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#00a884]">
                          <Calendar className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-[#083e35]">
                          {reservations.length}
                        </div>
                        <p className="text-xs text-stone-600 font-medium mt-1">
                          Confirmed Guests:{" "}
                          <strong className="text-[#00a884]">
                            {reservations.reduce((sum, r) => sum + r.guestsCount, 0)} persons
                          </strong>
                        </p>
                      </div>
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span>Confirmed Slots:</span>
                        <strong className="text-emerald-700">
                          {reservations.filter((r) => r.status === "Confirmed").length}
                        </strong>
                      </div>
                    </div>

                    {/* Metric 4: WhatsApp Leads */}
                    <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                          WhatsApp Click Leads
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                          <Send className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-emerald-700">
                          {analytics?.whatsappClicksTotal || 38}
                        </div>
                        <p className="text-xs text-stone-600 font-medium mt-1">
                          Direct chat interactions initiated
                        </p>
                      </div>
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span>Latest Click:</span>
                        <span className="font-medium text-stone-700 truncate max-w-[120px]">
                          {analytics?.whatsappLogs[0]?.timestamp || "Recent"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 7-Day Traffic Graph & Traffic Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Visual Bar Chart: Daily Views */}
                    <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display text-base font-bold text-[#083e35]">
                            7-Day Website Traffic Overview (Visitor Analytics)
                          </h4>
                          <p className="text-xs text-stone-500">
                            Daily visitors and view activity tracked across Faridkot
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-100">
                          Live Counter
                        </span>
                      </div>

                      {/* Bar Visualization */}
                      <div className="pt-4">
                        <div className="flex items-end justify-between gap-3 h-44 px-2 border-b border-stone-200">
                          {(analytics?.dailyViews || []).map((day, idx) => {
                            const maxViews = Math.max(
                              ...((analytics?.dailyViews || []).map((d) => d.views) || [100])
                            );
                            const heightPercent = Math.max(
                              18,
                              Math.round((day.views / (maxViews || 1)) * 100)
                            );

                            return (
                              <div
                                key={idx}
                                className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end"
                              >
                                {/* Tooltip */}
                                <div className="absolute -top-7 hidden group-hover:flex items-center justify-center rounded-md bg-[#083e35] px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                                  {day.views} views
                                </div>
                                <div
                                  style={{ height: `${heightPercent}%` }}
                                  className={`w-full max-w-[42px] rounded-t-xl transition-all duration-500 ${
                                    day.dayLabel.includes("Today")
                                      ? "bg-[#00a884] shadow-md shadow-emerald-500/20"
                                      : "bg-emerald-800/40 group-hover:bg-emerald-700/60"
                                  }`}
                                />
                                <span className="text-[11px] font-semibold text-stone-600 mt-2 truncate max-w-full">
                                  {day.dayLabel}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-between pt-3 text-[11px] text-stone-500 px-2">
                          <span>Updated in Realtime</span>
                          <span className="font-semibold text-[#00a884]">
                            Peak Day: 395 views (Weekend)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick WhatsApp Lead Sources Box */}
                    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                          <Send className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-bold text-[#083e35]">
                            WhatsApp Inquiries Sources
                          </h4>
                          <p className="text-[11px] text-stone-500">
                            Where customers click WhatsApp most
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                            <span>Order Confirmation Screen</span>
                            <span className="text-emerald-700">42%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                            <div className="h-full rounded-full bg-[#00a884]" style={{ width: "42%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                            <span>FAQ Support &amp; Helpdesk</span>
                            <span className="text-emerald-700">28%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                            <div className="h-full rounded-full bg-[#083e35]" style={{ width: "28%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                            <span>Table Booking Confirmation</span>
                            <span className="text-emerald-700">18%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                            <div className="h-full rounded-full bg-teal-500" style={{ width: "18%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                            <span>Footer &amp; Contact Bar</span>
                            <span className="text-emerald-700">12%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-400" style={{ width: "12%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl bg-emerald-50/70 p-3 border border-emerald-100 text-xs text-emerald-950">
                        <strong className="block font-bold text-[#083e35] mb-0.5">
                          High Conversion Insight:
                        </strong>
                        Customers ordering online frequently chat to verify spice level and delivery ETA.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 2: ONLINE FOOD ORDERS MANAGEMENT                          */}
              {/* ============================================================= */}
              {activeTab === "orders" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Search and Status Filters */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                        <Search className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder="Search orders (ID, customer name, phone, item)..."
                        className="w-full rounded-xl border border-stone-300 bg-white py-2 pl-10 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] outline-hidden"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
                      {["all", "New", "Preparing", "Out for Delivery", "Delivered", "Cancelled"].map((st) => (
                        <button
                          key={st}
                          onClick={() => setOrderStatusFilter(st)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                            orderStatusFilter === st
                              ? "bg-[#083e35] text-white shadow-xs"
                              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                          }`}
                        >
                          {st === "all" ? "All Orders" : st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orders Cards Grid */}
                  {filteredOrders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center space-y-2">
                      <ShoppingBag className="mx-auto h-8 w-8 text-stone-400" />
                      <h4 className="text-sm font-bold text-stone-700">No orders match your filter</h4>
                      <p className="text-xs text-stone-500">Try adjusting your search query or status filter.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {filteredOrders.map((ord) => {
                        const statusColors: Record<string, string> = {
                          New: "bg-blue-50 text-blue-800 border-blue-200",
                          Preparing: "bg-amber-50 text-amber-800 border-amber-200",
                          "Out for Delivery": "bg-purple-50 text-purple-800 border-purple-200",
                          Delivered: "bg-emerald-50 text-emerald-800 border-emerald-200",
                          Cancelled: "bg-red-50 text-red-800 border-red-200",
                        };

                        return (
                          <div
                            key={ord.orderId}
                            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                          >
                            <div className="space-y-3">
                              {/* Card Header */}
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm font-bold text-[#083e35]">
                                      #{ord.orderId}
                                    </span>
                                    <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-700">
                                      {ord.orderType}
                                    </span>
                                  </div>
                                  <p className="text-xs text-stone-500 mt-0.5">{ord.time}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                                      statusColors[ord.status] || "bg-stone-100 text-stone-700"
                                    }`}
                                  >
                                    {ord.status}
                                  </span>
                                </div>
                              </div>

                              {/* Customer Details */}
                              <div className="rounded-xl bg-stone-50 p-3 space-y-1 text-xs">
                                <div className="font-bold text-stone-900">{ord.customerName}</div>
                                <div className="flex flex-wrap items-center gap-3 text-stone-600">
                                  <a
                                    href={`tel:${ord.customerPhone}`}
                                    className="flex items-center gap-1 hover:text-[#00a884] font-medium"
                                  >
                                    <Phone className="h-3 w-3 text-[#00a884]" />
                                    <span>{ord.customerPhone}</span>
                                  </a>
                                  {ord.customerEmail && (
                                    <a
                                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                                        ord.customerEmail
                                      )}&su=${encodeURIComponent(`Danial's Cafe - Update on Order #${ord.orderId}`)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="flex items-center gap-1 hover:text-[#00a884] truncate max-w-[200px]"
                                      title="Reply via Gmail Web"
                                    >
                                      <Mail className="h-3 w-3 text-[#00a884]" />
                                      <span>{ord.customerEmail}</span>
                                    </a>
                                  )}
                                </div>
                                <div className="flex items-start gap-1 text-stone-600 pt-1">
                                  <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                                  <span className="text-[11px]">{ord.tableOrAddress}</span>
                                </div>
                              </div>

                              {/* Items Breakdown */}
                              <div className="space-y-1.5 text-xs">
                                <div className="font-bold uppercase tracking-wider text-[10px] text-stone-400">
                                  Ordered Dishes:
                                </div>
                                {ord.items.map((ci, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-stone-700">
                                    <span>
                                      <strong className="text-[#083e35]">{ci.quantity}x</strong> {ci.item.name}
                                    </span>
                                    <span className="font-mono text-stone-500">
                                      ₹{ci.item.priceNumber * ci.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {ord.notes && (
                                <div className="rounded-lg bg-amber-50/80 p-2 text-[11px] text-amber-900 border border-amber-200">
                                  <strong>Special Instructions:</strong> {ord.notes}
                                </div>
                              )}
                            </div>

                            {/* Card Footer: Bill Total & Status Action Buttons */}
                            <div className="pt-3 border-t border-stone-100 space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-xs text-stone-500 font-medium block">Grand Total</span>
                                  <span
                                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border mt-0.5 ${
                                      ord.paymentType === "Postpaid" ||
                                      !ord.paymentType ||
                                      ord.paymentMethod?.toLowerCase().includes("postpaid") ||
                                      ord.paymentMethod?.toLowerCase().includes("cash")
                                        ? "bg-amber-50 text-amber-800 border-amber-200"
                                        : "bg-emerald-50 text-emerald-800 border-emerald-200"
                                    }`}
                                  >
                                    <Banknote className="h-3 w-3" />
                                    <span>{ord.paymentMethod || "Postpaid — Cash on Delivery"}</span>
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="font-mono text-base font-extrabold text-[#083e35] block">
                                    ₹{ord.total}
                                  </span>
                                  <span className="text-[10px] text-stone-400 font-medium">
                                    {ord.paymentType === "Prepaid" ? "Prepaid Online" : "Due on Arrival"}
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                                {/* Quick Status Transition */}
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {ord.status === "New" && (
                                    <button
                                      onClick={() => handleUpdateOrderStatus(ord.orderId, "Preparing")}
                                      className="rounded-lg bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-amber-600 transition-colors"
                                    >
                                      Send to Kitchen
                                    </button>
                                  )}
                                  {ord.status === "Preparing" && (
                                    <button
                                      onClick={() => handleUpdateOrderStatus(ord.orderId, "Out for Delivery")}
                                      className="rounded-lg bg-purple-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-700 transition-colors"
                                    >
                                      Out for Delivery
                                    </button>
                                  )}
                                  {(ord.status === "Preparing" || ord.status === "Out for Delivery") && (
                                    <button
                                      onClick={() => handleUpdateOrderStatus(ord.orderId, "Delivered")}
                                      className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700 transition-colors"
                                    >
                                      Mark Completed
                                    </button>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handlePrintReceipt(ord)}
                                    className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
                                    title="Print Order Receipt"
                                  >
                                    <Printer className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteOrder(ord.orderId)}
                                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                    title="Delete Order"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 3: TABLE RESERVATIONS MANAGEMENT                          */}
              {/* ============================================================= */}
              {activeTab === "reservations" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Search and Status Filters */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                        <Search className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={reservationSearch}
                        onChange={(e) => setReservationSearch(e.target.value)}
                        placeholder="Search reservations (Guest name, phone, date)..."
                        className="w-full rounded-xl border border-stone-300 bg-white py-2 pl-10 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] outline-hidden"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
                      {["all", "Confirmed", "Seated", "Completed", "Cancelled"].map((st) => (
                        <button
                          key={st}
                          onClick={() => setReservationStatusFilter(st)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                            reservationStatusFilter === st
                              ? "bg-[#083e35] text-white shadow-xs"
                              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                          }`}
                        >
                          {st === "all" ? "All Bookings" : st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reservation Cards */}
                  {filteredReservations.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center space-y-2">
                      <Calendar className="mx-auto h-8 w-8 text-stone-400" />
                      <h4 className="text-sm font-bold text-stone-700">No reservations found</h4>
                      <p className="text-xs text-stone-500">No bookings match your current filter parameters.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {filteredReservations.map((res) => {
                        const whatsAppGuestMsg = encodeURIComponent(
                          `Hello ${res.guestName}! Your table reservation for ${res.guestsCount} guests at Danial's Cafe & Bistro, Faridkot on ${res.date} at ${res.timeSlot} is confirmed. Booking ID: #${res.reservationId}. We look forward to hosting you!`
                        );

                        return (
                          <div
                            key={res.reservationId}
                            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                          >
                            <div className="space-y-3">
                              {/* Header */}
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm font-bold text-[#083e35]">
                                      #{res.reservationId}
                                    </span>
                                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#00a884] border border-emerald-200">
                                      {res.guestsCount} Guests
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 mt-1">
                                    <Clock className="h-3.5 w-3.5 text-stone-400" />
                                    <span>
                                      {res.date} • {res.timeSlot}
                                    </span>
                                  </div>
                                </div>

                                <span
                                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                                    res.status === "Confirmed"
                                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                      : res.status === "Seated"
                                      ? "bg-blue-50 text-blue-800 border-blue-200"
                                      : res.status === "Completed"
                                      ? "bg-stone-100 text-stone-700 border-stone-200"
                                      : "bg-red-50 text-red-800 border-red-200"
                                  }`}
                                >
                                  {res.status}
                                </span>
                              </div>

                              {/* Guest Info */}
                              <div className="rounded-xl bg-stone-50 p-3 space-y-1.5 text-xs">
                                <div className="font-bold text-stone-900 text-sm">{res.guestName}</div>
                                <div className="flex flex-wrap items-center gap-3 text-stone-600">
                                  <a
                                    href={`tel:${res.phone}`}
                                    className="flex items-center gap-1 hover:text-[#00a884] font-medium"
                                  >
                                    <Phone className="h-3 w-3 text-[#00a884]" />
                                    <span>{res.phone}</span>
                                  </a>
                                  {res.email && (
                                    <a
                                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                                        res.email
                                      )}&su=${encodeURIComponent(`Danial's Cafe - Table Reservation #${res.id}`)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="flex items-center gap-1 hover:text-[#00a884] truncate max-w-[200px]"
                                      title="Reply via Gmail Web"
                                    >
                                      <Mail className="h-3 w-3 text-[#00a884]" />
                                      <span>{res.email}</span>
                                    </a>
                                  )}
                                </div>
                                <div className="text-[11px] text-stone-600 pt-1">
                                  <strong>Seating:</strong> {res.seatingArea}
                                </div>
                                {res.occasion && (
                                  <div className="text-[11px] text-stone-600">
                                    <strong>Occasion:</strong> {res.occasion}
                                  </div>
                                )}
                              </div>

                              {res.specialRequests && (
                                <div className="rounded-lg bg-emerald-50/80 p-2.5 text-xs text-emerald-950 border border-emerald-100">
                                  <strong className="text-[#083e35]">Special Requests:</strong>{" "}
                                  {res.specialRequests}
                                </div>
                              )}
                            </div>

                            {/* Card Footer Actions */}
                            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                              {/* Direct Guest Messaging Actions */}
                              <div className="flex items-center gap-2">
                                <a
                                  href={`https://wa.me/91${res.phone.replace(/\D/g, "").slice(-10)}?text=${whatsAppGuestMsg}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 rounded-lg bg-[#25d366] px-2.5 py-1 text-xs font-bold text-white hover:bg-[#20ba59] transition-colors"
                                  title="Send WhatsApp confirmation to guest"
                                >
                                  <Send className="h-3 w-3" />
                                  <span>WhatsApp</span>
                                </a>

                                <a
                                  href={`tel:${res.phone}`}
                                  className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors"
                                >
                                  <Phone className="h-3 w-3 text-stone-500" />
                                  <span>Call</span>
                                </a>
                              </div>

                              {/* Status Transition buttons */}
                              <div className="flex items-center gap-1.5">
                                {res.status === "Confirmed" && (
                                  <button
                                    onClick={() => handleUpdateResStatus(res.reservationId, "Seated")}
                                    className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                                  >
                                    Seat Guest
                                  </button>
                                )}
                                {res.status === "Seated" && (
                                  <button
                                    onClick={() => handleUpdateResStatus(res.reservationId, "Completed")}
                                    className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                                  >
                                    Complete
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteReservation(res.reservationId)}
                                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                  title="Delete Reservation"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 4: WHATSAPP CLICK LOGS                                    */}
              {/* ============================================================= */}
              {activeTab === "whatsapp" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display text-base font-bold text-[#083e35] flex items-center gap-2">
                        <Send className="h-4 w-4 text-emerald-600" />
                        <span>WhatsApp Button Interaction Logs (Direct Leads)</span>
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Realtime record of every user who tapped or clicked WhatsApp on the website.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-emerald-700">
                          {analytics?.whatsappClicksTotal || 0}
                        </div>
                        <div className="text-[10px] text-stone-500 uppercase font-semibold">Total Clicks</div>
                      </div>
                    </div>
                  </div>

                  {/* Logs Table */}
                  <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="py-3 px-4">Event ID</th>
                            <th className="py-3 px-4">Website Section / Source</th>
                            <th className="py-3 px-4">Device</th>
                            <th className="py-3 px-4">Timestamp</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {(analytics?.whatsappLogs || []).map((log, idx) => (
                            <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                              <td className="py-3 px-4 font-mono font-medium text-stone-500">
                                {log.id}
                              </td>
                              <td className="py-3 px-4 font-bold text-stone-800">
                                {log.source}
                              </td>
                              <td className="py-3 px-4 text-stone-600">
                                <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-700">
                                  {log.device}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-medium text-stone-500">
                                {log.timestamp}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <a
                                  href="https://wa.me/917814500305"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00a884] hover:underline"
                                >
                                  <span>Test Chat</span>
                                  <ArrowUpRight className="h-3 w-3" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 5: SECURITY & CREDENTIAL SETTINGS                         */}
              {/* ============================================================= */}
              {activeTab === "security" && (
                <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
                  <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#00a884]">
                        <Key className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-base font-bold text-[#083e35]">
                          Security &amp; Admin Credentials (Access Control)
                        </h4>
                        <p className="text-xs text-stone-500">
                          Update the administrative username and strong password for Danial's Cafe portal.
                        </p>
                      </div>
                    </div>

                    {securityMessage && (
                      <div
                        className={`rounded-xl p-3 text-xs font-semibold flex items-center gap-2 ${
                          securityMessage.type === "success"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {securityMessage.type === "success" ? (
                          <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                        )}
                        <span>{securityMessage.text}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveSecurity} className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Current Admin Username
                        </label>
                        <input
                          type="text"
                          value={newUsername}
                          placeholder={getAdminCredentials().username}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="w-full rounded-xl border border-stone-300 bg-white py-2 px-3 text-xs sm:text-sm text-stone-900 focus:border-[#00a884] outline-hidden"
                        />
                        <span className="text-[11px] text-stone-400 mt-1 block">
                          Leave blank to keep existing username ({getAdminCredentials().username})
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Current Password (for verification) *
                        </label>
                        <input
                          type="password"
                          required
                          value={currentPasswordConfirm}
                          onChange={(e) => setCurrentPasswordConfirm(e.target.value)}
                          placeholder="Enter current password"
                          className="w-full rounded-xl border border-stone-300 bg-white py-2 px-3 text-xs sm:text-sm text-stone-900 focus:border-[#00a884] outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                          New Strong Password *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="e.g. Danial#SuperBistro!99"
                          className="w-full rounded-xl border border-stone-300 bg-white py-2 px-3 text-xs sm:text-sm text-stone-900 focus:border-[#00a884] outline-hidden"
                        />
                        <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className={newPassword.length >= 8 ? "text-emerald-600 font-bold" : "text-stone-400"}>
                              ✓ Minimum 8 characters
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={/[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "text-emerald-600 font-bold" : "text-stone-400"}>
                              ✓ Mix of uppercase, lowercase &amp; numbers
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={/[!@#$%^&*]/.test(newPassword) ? "text-emerald-600 font-bold" : "text-stone-400"}>
                              ✓ Special symbols (!@#$%^&amp;*)
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="rounded-xl bg-[#083e35] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#062c25] transition-colors"
                      >
                        Update Credentials
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
