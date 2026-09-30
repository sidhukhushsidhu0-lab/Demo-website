/* -------------------------------------------------------------------------- */
/* Danial's Cafe & Bistro — Centralized Admin Store & Analytics Engine         */
/* -------------------------------------------------------------------------- */

import type { ConfirmedOrderDetails, TableReservationDetails, CartItem, OrderType } from "@/routes/index";

export type OrderStatus =
  | "New"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type ReservationStatus =
  | "Confirmed"
  | "Seated"
  | "Completed"
  | "Cancelled";

export interface StoredOrder extends ConfirmedOrderDetails {
  status: OrderStatus;
  createdAt: string;
  paymentMethod?: string;
  paymentType?: "Postpaid" | "Prepaid";
}

export interface StoredReservation extends TableReservationDetails {
  status: ReservationStatus;
  createdAt: string;
}

export interface WhatsAppClickLog {
  id: string;
  source: string;
  timestamp: string;
  device: string;
}

export interface DailyViewData {
  date: string;
  dayLabel: string;
  views: number;
}

export interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  todayViews: number;
  todayDate: string;
  dailyViews: DailyViewData[];
  whatsappClicksTotal: number;
  whatsappLogs: WhatsAppClickLog[];
}

export interface AdminCredentials {
  username: string;
  password: string;
  lastUpdated: string;
}

export interface SiteStatusConfig {
  isOnline: boolean;
  offlineMessage: string;
  lastToggledAt: string;
}

export const DEFAULT_SITE_STATUS: SiteStatusConfig = {
  isOnline: true,
  offlineMessage:
    "Danial's Cafe & Bistro is temporarily closed for kitchen preparation and maintenance. Online ordering and table reservations will resume shortly!",
  lastToggledAt: "2026-09-30T10:00:00Z",
};

/* -------------------------------------------------------------------------- */
/* Storage Keys                                                               */
/* -------------------------------------------------------------------------- */
const STORAGE_KEYS = {
  ORDERS: "danials_admin_orders_v3",
  RESERVATIONS: "danials_admin_reservations_v3",
  ANALYTICS: "danials_admin_analytics_v3",
  CREDS: "danials_admin_credentials_v2",
  AUTH_SESSION: "danials_admin_session_auth",
  VISITOR_ID: "danials_visitor_token",
  SITE_STATUS: "danials_admin_site_status_v2",
  MESSAGES: "danials_admin_customer_messages_v1",
};

/* -------------------------------------------------------------------------- */
/* Default Strong Admin Credentials                                           */
/* -------------------------------------------------------------------------- */
export const DEFAULT_ADMIN_CREDS: AdminCredentials = {
  username: "admin@danials.cafe",
  password: "Danial#Bistro!2026",
  lastUpdated: "2026-09-30T10:00:00Z",
};

/* -------------------------------------------------------------------------- */
/* Helper Functions                                                           */
/* -------------------------------------------------------------------------- */
function isClient(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function getTodayString(): string {
  const now = new Date();
  return now.toISOString().split("T")[0]; // YYYY-MM-DD
}

function formatCurrentDateTime(): string {
  const now = new Date();
  return now.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/* -------------------------------------------------------------------------- */
/* Initial Mock Seeds (Used if local storage is empty)                        */
/* -------------------------------------------------------------------------- */
const INITIAL_DEMO_ORDERS: StoredOrder[] = [
  {
    orderId: "DNL-74291",
    orderType: "Dine-In",
    customerName: "Harmanpreet Singh",
    customerPhone: "09876543210",
    customerEmail: "harman.singh@gmail.com",
    tableOrAddress: "Table #04 (Indoor Lounge)",
    notes: "Please make peri peri fries extra crispy. Serve coffee along with food.",
    items: [
      {
        item: {
          id: "b2",
          name: "Cheese Burst Burger",
          description: "Double cheese layer with roasted bun and herb mayo.",
          price: "₹119",
          priceNumber: 119,
          isPopular: true,
        },
        quantity: 2,
      },
      {
        item: {
          id: "b5",
          name: "Peri Peri Fries",
          description: "Tossed in fiery African peri peri seasoning.",
          price: "₹89",
          priceNumber: 89,
          isPopular: true,
        },
        quantity: 1,
      },
      {
        item: {
          id: "c2",
          name: "Hazelnut Cold Coffee",
          description: "Rich espresso blend with roasted hazelnut drizzle.",
          price: "₹99",
          priceNumber: 99,
          isPopular: true,
        },
        quantity: 1,
      },
    ],
    total: 445,
    time: "Today, 01:25 PM",
    status: "Preparing",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    paymentMethod: "Postpaid — UPI QR on Arrival",
    paymentType: "Postpaid",
  },
  {
    orderId: "DNL-74292",
    orderType: "Delivery",
    customerName: "Simran Kaur",
    customerPhone: "07814512345",
    customerEmail: "simran.kaur@yahoo.com",
    tableOrAddress: "House #42, Street 3, Bhan Singh Colony, Faridkot",
    notes: "Ring bell twice, no onions in burger please (Jain style).",
    items: [
      {
        item: {
          id: "p2",
          name: "Farmhouse Veg Pizza",
          description: "Crisp capsicum, onion, golden corn and mushroom.",
          price: "₹189",
          priceNumber: 189,
          isPopular: true,
        },
        quantity: 1,
      },
      {
        item: {
          id: "p4",
          name: "Cheese Garlic Bread",
          description: "Buttery toasted baguette under melted mozzarella.",
          price: "₹99",
          priceNumber: 99,
        },
        quantity: 1,
      },
      {
        item: {
          id: "s1",
          name: "Belgian Chocolate Shake",
          description: "Dense dark chocolate ganache whipped with fresh milk cream.",
          price: "₹119",
          priceNumber: 119,
          isPopular: true,
        },
        quantity: 1,
      },
    ],
    total: 407,
    time: "Today, 12:40 PM",
    status: "Out for Delivery",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    paymentMethod: "Postpaid — Cash on Delivery",
    paymentType: "Postpaid",
  },
  {
    orderId: "DNL-74288",
    orderType: "Takeaway",
    customerName: "Aman Sharma",
    customerPhone: "09812345678",
    customerEmail: "aman.sharma99@gmail.com",
    tableOrAddress: "Takeaway Counter (Self Pickup)",
    notes: "Packed tightly for travel.",
    items: [
      {
        item: {
          id: "b3",
          name: "Paneer Tikka Burger",
          description: "Tandoori spiced grilled paneer with tangy mint chutney.",
          price: "₹129",
          priceNumber: 129,
          isPopular: true,
        },
        quantity: 2,
      },
      {
        item: {
          id: "b4",
          name: "Salted Fries",
          description: "Hot, golden crisp and lightly salted.",
          price: "₹69",
          priceNumber: 69,
        },
        quantity: 1,
      },
    ],
    total: 327,
    time: "Today, 11:30 AM",
    status: "Delivered",
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    paymentMethod: "Postpaid — Pay at Counter (Cash)",
    paymentType: "Postpaid",
  },
];

const INITIAL_DEMO_RESERVATIONS: StoredReservation[] = [
  {
    reservationId: "RES-8102",
    guestName: "Gurpreet Singh Gill",
    phone: "09872345678",
    email: "gurpreet.gill@gmail.com",
    guestsCount: 4,
    date: getTodayString(),
    timeSlot: "07:30 PM",
    seatingArea: "Indoor Lounge (AC Section)",
    occasion: "Birthday Celebration",
    specialRequests: "Please reserve a corner booth with simple birthday table decor if possible.",
    timestamp: "Today, 10:15 AM",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    reservationId: "RES-8095",
    guestName: "Dr. Rajesh Verma",
    phone: "09417234567",
    email: "rajesh.verma@faridkothealth.org",
    guestsCount: 2,
    date: getTodayString(),
    timeSlot: "01:30 PM",
    seatingArea: "Bistro Booth (Private Seating)",
    occasion: "Lunch Date / Casual",
    specialRequests: "Quiet table near window for business discussion.",
    timestamp: "Today, 09:30 AM",
    status: "Seated",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    reservationId: "RES-8088",
    guestName: "Jasleen Kaur",
    phone: "07837123456",
    email: "jasleen.k@outlook.com",
    guestsCount: 6,
    date: getTodayString(),
    timeSlot: "08:15 PM",
    seatingArea: "Family Section (Dining Hall)",
    occasion: "Anniversary Celebration",
    specialRequests: "Need high chair for a toddler and strict Jain food options.",
    timestamp: "Yesterday, 06:45 PM",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
  },
];

const INITIAL_DEMO_WHATSAPP_LOGS: WhatsAppClickLog[] = [
  {
    id: "wa-101",
    source: "Order Confirmation Screen",
    timestamp: "Today, 01:28 PM",
    device: "Mobile (Android)",
  },
  {
    id: "wa-102",
    source: "FAQ Support & Helpdesk",
    timestamp: "Today, 12:45 PM",
    device: "Desktop",
  },
  {
    id: "wa-103",
    source: "Table Booking Confirmation",
    timestamp: "Today, 11:10 AM",
    device: "Mobile (iOS)",
  },
  {
    id: "wa-104",
    source: "Footer Quick Contact",
    timestamp: "Today, 10:20 AM",
    device: "Desktop",
  },
  {
    id: "wa-105",
    source: "Visit Us & Contact Section",
    timestamp: "Today, 09:05 AM",
    device: "Mobile (Android)",
  },
];

const INITIAL_DAILY_VIEWS: DailyViewData[] = [
  { date: "2026-09-24", dayLabel: "Thu", views: 182 },
  { date: "2026-09-25", dayLabel: "Fri", views: 234 },
  { date: "2026-09-26", dayLabel: "Sat", views: 348 },
  { date: "2026-09-27", dayLabel: "Sun", views: 395 },
  { date: "2026-09-28", dayLabel: "Mon", views: 196 },
  { date: "2026-09-29", dayLabel: "Tue", views: 228 },
  { date: "2026-09-30", dayLabel: "Today", views: 264 },
];

/* -------------------------------------------------------------------------- */
/* Admin Authentication Methods                                               */
/* -------------------------------------------------------------------------- */
export function getAdminCredentials(): AdminCredentials {
  if (!isClient()) return DEFAULT_ADMIN_CREDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CREDS);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.CREDS,
        JSON.stringify(DEFAULT_ADMIN_CREDS)
      );
      return DEFAULT_ADMIN_CREDS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ADMIN_CREDS;
  }
}

export function saveAdminCredentials(
  newCreds: AdminCredentials
): { success: boolean; message: string } {
  if (!isClient()) return { success: false, message: "Client error" };
  if (!newCreds.username || newCreds.username.trim().length < 3) {
    return { success: false, message: "Username must be at least 3 characters" };
  }
  if (!newCreds.password || newCreds.password.length < 8) {
    return {
      success: false,
      message: "Strong password must be at least 8 characters with letters, numbers, and symbols",
    };
  }

  try {
    const payload: AdminCredentials = {
      username: newCreds.username.trim(),
      password: newCreds.password,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.CREDS, JSON.stringify(payload));
    return { success: true, message: "Admin credentials successfully updated!" };
  } catch {
    return { success: false, message: "Failed to save credentials in browser storage" };
  }
}

export function verifyAdminLogin(usernameInput: string, passwordInput: string): boolean {
  const current = getAdminCredentials();
  return (
    usernameInput.trim().toLowerCase() === current.username.trim().toLowerCase() &&
    passwordInput === current.password
  );
}

export function isAdminAuthenticated(): boolean {
  if (!isClient()) return false;
  return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === "true";
}

export function setAdminAuthenticated(authenticated: boolean): void {
  if (!isClient()) return;
  if (authenticated) {
    sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, "true");
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  }
}

/* -------------------------------------------------------------------------- */
/* Orders Management Methods                                                  */
/* -------------------------------------------------------------------------- */
/* Real-Time Live Sync Event Dispatcher                                       */
/* -------------------------------------------------------------------------- */
export function notifyAdminDataChanged(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("danials_admin_data_updated"));
  }
}

/* -------------------------------------------------------------------------- */
/* Orders Management Methods                                                  */
/* -------------------------------------------------------------------------- */
export function getStoredOrders(): StoredOrder[] {
  if (!isClient()) return INITIAL_DEMO_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.ORDERS,
        JSON.stringify(INITIAL_DEMO_ORDERS)
      );
      return INITIAL_DEMO_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      // Auto-heal empty or broken cache with rich demo orders
      localStorage.setItem(
        STORAGE_KEYS.ORDERS,
        JSON.stringify(INITIAL_DEMO_ORDERS)
      );
      return INITIAL_DEMO_ORDERS;
    }
    return parsed;
  } catch {
    return INITIAL_DEMO_ORDERS;
  }
}

export function saveNewOrder(order: ConfirmedOrderDetails): StoredOrder {
  const newStored: StoredOrder = {
    ...order,
    status: "New",
    createdAt: new Date().toISOString(),
    paymentMethod: order.paymentMethod || "Postpaid — Cash on Delivery",
    paymentType: order.paymentType || "Postpaid",
  };

  if (!isClient()) return newStored;

  try {
    const current = getStoredOrders();
    // Prepend new order to top of list
    const updated = [newStored, ...current];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    notifyAdminDataChanged();
  } catch (err) {
    console.error("Failed to save order to localStorage", err);
  }

  return newStored;
}

export function updateOrderStatus(orderId: string, newStatus: OrderStatus): StoredOrder[] {
  if (!isClient()) return [];
  try {
    const current = getStoredOrders();
    const updated = current.map((ord) =>
      ord.orderId === orderId ? { ...ord, status: newStatus } : ord
    );
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    notifyAdminDataChanged();
    return updated;
  } catch {
    return [];
  }
}

export function deleteStoredOrder(orderId: string): StoredOrder[] {
  if (!isClient()) return [];
  try {
    const current = getStoredOrders();
    const updated = current.filter((ord) => ord.orderId !== orderId);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    notifyAdminDataChanged();
    return updated;
  } catch {
    return [];
  }
}

/**
 * Quick Test Order Creator (Allows Admin to test live order processing instantly)
 */
export function createQuickTestOrder(): StoredOrder[] {
  if (!isClient()) return INITIAL_DEMO_ORDERS;
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const testCustomers = [
    { name: "Gurwinder Singh", phone: "+91 98765 43210", email: "gurwinder@gmail.com", addr: "Near MGM School, Faridkot", type: "Delivery" as const },
    { name: "Navjot Kaur", phone: "+91 98145 67890", email: "navjot.k@yahoo.com", addr: "Table 6 (Window Side)", type: "Dine-In" as const },
    { name: "Amandeep Verma", phone: "+91 98721 34567", email: "aman.verma@hotmail.com", addr: "Takeaway Counter", type: "Takeaway" as const },
  ];
  const pick = testCustomers[Math.floor(Math.random() * testCustomers.length)];

  const testOrder: ConfirmedOrderDetails = {
    orderId: `DCB-${randomNum}`,
    orderType: pick.type,
    customerName: pick.name,
    customerPhone: pick.phone,
    customerEmail: pick.email,
    tableOrAddress: pick.addr,
    notes: "Order placed via Live Admin Test Action",
    items: [
      {
        item: {
          id: "b1",
          name: "Crispy Aloo Tikki Burger",
          description: "Golden spiced potato patty topped with house mint mayo.",
          price: "₹79",
          priceNumber: 79,
          isPopular: true,
        },
        quantity: 2,
      },
      {
        item: {
          id: "s1",
          name: "Belgian Chocolate Shake",
          description: "Dense dark chocolate ganache whipped with fresh milk cream.",
          price: "₹119",
          priceNumber: 119,
          isPopular: true,
        },
        quantity: 1,
      },
    ],
    total: 277,
    time: `Today, ${timeStr}`,
    paymentMethod: "Postpaid — Cash on Delivery",
    paymentType: "Postpaid",
  };

  saveNewOrder(testOrder);
  return getStoredOrders();
}

/* -------------------------------------------------------------------------- */
/* Table Reservations Management Methods                                      */
/* -------------------------------------------------------------------------- */
export function getStoredReservations(): StoredReservation[] {
  if (!isClient()) return INITIAL_DEMO_RESERVATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.RESERVATIONS,
        JSON.stringify(INITIAL_DEMO_RESERVATIONS)
      );
      return INITIAL_DEMO_RESERVATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      // Auto-heal empty or broken cache with rich demo reservations
      localStorage.setItem(
        STORAGE_KEYS.RESERVATIONS,
        JSON.stringify(INITIAL_DEMO_RESERVATIONS)
      );
      return INITIAL_DEMO_RESERVATIONS;
    }
    return parsed;
  } catch {
    return INITIAL_DEMO_RESERVATIONS;
  }
}

export function saveNewReservation(reservation: TableReservationDetails): StoredReservation {
  const newStored: StoredReservation = {
    ...reservation,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  if (!isClient()) return newStored;

  try {
    const current = getStoredReservations();
    const updated = [newStored, ...current];
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
    notifyAdminDataChanged();
  } catch (err) {
    console.error("Failed to save reservation to localStorage", err);
  }

  return newStored;
}

export function updateReservationStatus(
  resId: string,
  newStatus: ReservationStatus
): StoredReservation[] {
  if (!isClient()) return [];
  try {
    const current = getStoredReservations();
    const updated = current.map((res) =>
      res.reservationId === resId ? { ...res, status: newStatus } : res
    );
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
    notifyAdminDataChanged();
    return updated;
  } catch {
    return [];
  }
}

export function deleteStoredReservation(resId: string): StoredReservation[] {
  if (!isClient()) return [];
  try {
    const current = getStoredReservations();
    const updated = current.filter((res) => res.reservationId !== resId);
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
    notifyAdminDataChanged();
    return updated;
  } catch {
    return [];
  }
}

/**
 * Quick Test Table Booking Creator
 */
export function createQuickTestReservation(): StoredReservation[] {
  if (!isClient()) return INITIAL_DEMO_RESERVATIONS;
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const testRes: TableReservationDetails = {
    reservationId: `RES-${randomNum}`,
    guestName: "Simranjit Singh Dhillon",
    phone: "+91 98789 12345",
    email: "simranjit.dhillon@gmail.com",
    guestsCount: 4,
    date: getTodayString(),
    timeSlot: "08:00 PM",
    seatingArea: "Indoor Lounge (AC Section)",
    occasion: "Family Dinner",
    specialRequests: "Table reserved via Admin Quick Action",
    timestamp: `Today, ${timeStr}`,
  };

  saveNewReservation(testRes);
  return getStoredReservations();
}

/* -------------------------------------------------------------------------- */
/* Website Viewers & Analytics Engine                                         */
/* -------------------------------------------------------------------------- */
export function getAnalyticsData(): AnalyticsData {
  if (!isClient()) {
    return {
      totalPageViews: 1847,
      uniqueVisitors: 624,
      todayViews: 264,
      todayDate: getTodayString(),
      dailyViews: INITIAL_DAILY_VIEWS,
      whatsappClicksTotal: 38,
      whatsappLogs: INITIAL_DEMO_WHATSAPP_LOGS,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    const today = getTodayString();

    if (!raw) {
      const initial: AnalyticsData = {
        totalPageViews: 1847,
        uniqueVisitors: 624,
        todayViews: 264,
        todayDate: today,
        dailyViews: INITIAL_DAILY_VIEWS,
        whatsappClicksTotal: 38,
        whatsappLogs: INITIAL_DEMO_WHATSAPP_LOGS,
      };
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(initial));
      return initial;
    }

    const parsed: AnalyticsData = JSON.parse(raw);

    // If date changed, reset today views and roll into dailyViews
    if (parsed.todayDate !== today) {
      parsed.todayDate = today;
      parsed.todayViews = 1; // start new day counter
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayLabel = dayNames[new Date().getDay()] || "Today";
      parsed.dailyViews = [
        ...parsed.dailyViews.slice(-6),
        { date: today, dayLabel: `${dayLabel} (Today)`, views: 1 },
      ];
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(parsed));
    }

    return parsed;
  } catch {
    return {
      totalPageViews: 1847,
      uniqueVisitors: 624,
      todayViews: 264,
      todayDate: getTodayString(),
      dailyViews: INITIAL_DAILY_VIEWS,
      whatsappClicksTotal: 38,
      whatsappLogs: INITIAL_DEMO_WHATSAPP_LOGS,
    };
  }
}

/**
 * Record a pageview when someone loads or navigates the site
 */
export function recordPageView(): void {
  if (!isClient()) return;

  try {
    const data = getAnalyticsData();
    data.totalPageViews += 1;
    data.todayViews += 1;

    // Check unique visitor via visitor token in localStorage
    if (!localStorage.getItem(STORAGE_KEYS.VISITOR_ID)) {
      const newToken = `v_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, newToken);
      data.uniqueVisitors += 1;
    }

    // Update today's entry in dailyViews array
    const today = getTodayString();
    const lastDaily = data.dailyViews[data.dailyViews.length - 1];
    if (lastDaily && lastDaily.date === today) {
      lastDaily.views += 1;
    } else {
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayLabel = dayNames[new Date().getDay()] || "Today";
      data.dailyViews.push({ date: today, dayLabel, views: 1 });
    }

    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to record page view", err);
  }
}

/**
 * Record when a user clicks any WhatsApp link or button
 */
export function recordWhatsAppClick(source: string): void {
  if (!isClient()) return;

  try {
    const data = getAnalyticsData();
    data.whatsappClicksTotal += 1;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const newLog: WhatsAppClickLog = {
      id: `wa_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      source: source || "General WhatsApp Button",
      timestamp: formatCurrentDateTime(),
      device: isMobile ? "Mobile Device" : "Desktop Computer",
    };

    // Prepend log, keep last 50 logs
    data.whatsappLogs = [newLog, ...(data.whatsappLogs || [])].slice(0, 50);

    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to record WhatsApp click", err);
  }
}

/**
 * Reset demo data back to clean factory state
 */
export function resetAdminDataToDemo(): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_DEMO_ORDERS));
    localStorage.setItem(
      STORAGE_KEYS.RESERVATIONS,
      JSON.stringify(INITIAL_DEMO_RESERVATIONS)
    );
    const initialAnalytics: AnalyticsData = {
      totalPageViews: 1847,
      uniqueVisitors: 624,
      todayViews: 264,
      todayDate: getTodayString(),
      dailyViews: INITIAL_DAILY_VIEWS,
      whatsappClicksTotal: 38,
      whatsappLogs: INITIAL_DEMO_WHATSAPP_LOGS,
    };
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(initialAnalytics));
    notifyAdminDataChanged();
  } catch (err) {
    console.error("Failed to reset admin data", err);
  }
}

/**
 * Get current website online / offline status
 */
export function getSiteStatus(): SiteStatusConfig {
  if (!isClient()) return DEFAULT_SITE_STATUS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_STATUS);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.SITE_STATUS,
        JSON.stringify(DEFAULT_SITE_STATUS)
      );
      return DEFAULT_SITE_STATUS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SITE_STATUS;
  }
}

/**
 * Update website online / offline status and broadcast change
 */
export function setSiteStatus(
  updates: Partial<SiteStatusConfig>
): SiteStatusConfig {
  if (!isClient()) return DEFAULT_SITE_STATUS;
  try {
    const current = getSiteStatus();
    const updated: SiteStatusConfig = {
      ...current,
      ...updates,
      lastToggledAt: formatCurrentDateTime(),
    };
    localStorage.setItem(STORAGE_KEYS.SITE_STATUS, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent("danials_site_status_changed", { detail: updated })
    );
    return updated;
  } catch (err) {
    console.error("Failed to update site status", err);
    return DEFAULT_SITE_STATUS;
  }
}

/**
 * Quick toggle website between online (open) and offline (maintenance/paused)
 */
export function toggleSiteStatus(): SiteStatusConfig {
  const current = getSiteStatus();
  return setSiteStatus({ isOnline: !current.isOnline });
}

/* -------------------------------------------------------------------------- */
/* Customer Messages & Direct Email Inquiries                                */
/* -------------------------------------------------------------------------- */
export interface CustomerMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const INITIAL_DEMO_MESSAGES: CustomerMessage[] = [
  {
    id: "MSG-1082",
    name: "Gurpreet Singh",
    email: "gurpreet.pb@gmail.com",
    phone: "098141 23456",
    subject: "Party & Birthday Booking Inquiry",
    message: "Hello Danial's Cafe! We would like to book a corner table for 10 people this Saturday evening at 7:30 PM for a birthday celebration. Do you arrange cakes or decoration?",
    createdAt: "Today at 02:40 PM",
    isRead: false,
  },
  {
    id: "MSG-1081",
    name: "Simran Kaur",
    email: "simran.kaur99@yahoo.com",
    phone: "098722 55443",
    subject: "Catering for MGM School Event",
    message: "Hi team, we are organizing an event near MGM School and wanted to inquire about bulk sandwich and burger box pricing for 40 students.",
    createdAt: "Yesterday at 06:15 PM",
    isRead: true,
  },
];

export function getCustomerMessages(): CustomerMessage[] {
  if (!isClient()) return INITIAL_DEMO_MESSAGES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_DEMO_MESSAGES));
      return INITIAL_DEMO_MESSAGES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_MESSAGES;
  }
}

export function saveCustomerMessage(
  data: Omit<CustomerMessage, "id" | "createdAt" | "isRead">
): CustomerMessage {
  const newMsg: CustomerMessage = {
    ...data,
    id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: formatCurrentDateTime(),
    isRead: false,
  };

  if (!isClient()) return newMsg;
  try {
    const current = getCustomerMessages();
    const updated = [newMsg, ...current];
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("danials_new_message_received", { detail: newMsg }));
    return newMsg;
  } catch (err) {
    console.error("Failed to save message", err);
    return newMsg;
  }
}

export function markMessageRead(id: string, isRead = true): void {
  if (!isClient()) return;
  try {
    const current = getCustomerMessages();
    const updated = current.map((m) => (m.id === id ? { ...m, isRead } : m));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to mark message read", err);
  }
}

export function deleteCustomerMessage(id: string): void {
  if (!isClient()) return;
  try {
    const current = getCustomerMessages();
    const updated = current.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to delete message", err);
  }
}

