import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Utensils,
  Coffee,
  Users,
  Home as HomeIcon,
  MapPin,
  Phone,
  ArrowRight,
  Star,
  ShoppingBag,
  Navigation,
  Instagram,
  Facebook,
  X,
  Menu as MenuIcon,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Receipt,
  Calendar,
  ShieldCheck,
  FileText,
  Truck,
  RotateCcw,
  CreditCard,
  Lock,
  Mail,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Search,
  Shield,
  Power,
  AlertTriangle,
  Banknote,
  QrCode,
  Wallet,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";

import { toast } from "sonner";
import { EmailInquiryModal } from "@/components/EmailInquiryModal";

import heroFood from "@/assets/hero-food.jpg";
import heroFeast from "@/assets/hero-feast.jpg";
import interior from "@/assets/interior.jpg";
import coffeeImg from "@/assets/coffee.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import snacksImg from "@/assets/snacks.jpg";
import shakeImg from "@/assets/shake.jpg";
import galleryPizza from "@/assets/gallery-pizza.jpg";
import galleryDosa from "@/assets/gallery-dosa.jpg";
import galleryBrownie from "@/assets/gallery-brownie.jpg";
import galleryCounter from "@/assets/gallery-counter.jpg";
import storefrontImg from "@/assets/storefront.jpg";
import mapCardImg from "@/assets/map-card.jpg";

import { cafe, menu, type MenuItem } from "@/data/cafe";
import { AdminPanelModal } from "@/components/AdminPanelModal";
import {
  saveNewOrder,
  saveNewReservation,
  recordPageView,
  recordWhatsAppClick,
  getSiteStatus,
  type SiteStatusConfig,
} from "@/lib/adminStore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Danial's Cafe & Bistro — Faridkot, Punjab" },
      {
        name: "description",
        content:
          "Discover Danial's Cafe & Bistro in Faridkot — enjoy delicious burgers, pizza, coffee, shakes and good times. Select menu items and confirm your order online.",
      },
      { property: "og:title", content: "Danial's Cafe & Bistro — Faridkot, Punjab" },
      {
        property: "og:description",
        content:
          "Good Food. Beautiful Moments. Select your favorite items from our menu and place your order instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

/* -------------------------------------------------------------------------- */
/* Types & Interfaces                                                         */
/* -------------------------------------------------------------------------- */
export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderType = "Dine-In" | "Takeaway" | "Delivery";

export interface ConfirmedOrderDetails {
  orderId: string;
  orderType: OrderType;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  tableOrAddress: string;
  notes: string;
  items: CartItem[];
  total: number;
  time: string;
  paymentMethod?: string;
  paymentType?: "Postpaid" | "Prepaid";
}

export interface TableReservationDetails {
  reservationId: string;
  guestName: string;
  phone: string;
  email: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  seatingArea: string;
  occasion: string;
  specialRequests: string;
  timestamp: string;
}

/* -------------------------------------------------------------------------- */
/* Food Item Photo Mapper (High-Resolution Visual Showcase)                    */
/* -------------------------------------------------------------------------- */
function getItemPhoto(item: MenuItem): string {
  const name = item.name.toLowerCase();
  const desc = (item.description || "").toLowerCase();

  if (name.includes("burger") || desc.includes("patty") || desc.includes("bun")) {
    return heroFood;
  }
  if (
    name.includes("pizza") ||
    desc.includes("crust") ||
    desc.includes("mozzarella") ||
    name.includes("garlic bread")
  ) {
    return galleryPizza;
  }
  if (
    name.includes("sandwich") ||
    name.includes("wrap") ||
    name.includes("roll") ||
    desc.includes("bread") ||
    desc.includes("tortilla")
  ) {
    return sandwichImg;
  }
  if (
    name.includes("shake") ||
    name.includes("mojito") ||
    name.includes("soda") ||
    name.includes("cooler") ||
    desc.includes("frappe") ||
    desc.includes("blended")
  ) {
    return shakeImg;
  }
  if (
    name.includes("coffee") ||
    name.includes("cappuccino") ||
    name.includes("latte") ||
    name.includes("espresso") ||
    name.includes("chai") ||
    name.includes("hot chocolate")
  ) {
    return coffeeImg;
  }
  if (
    name.includes("brownie") ||
    name.includes("sundae") ||
    desc.includes("chocolate") ||
    desc.includes("ice cream") ||
    desc.includes("walnut")
  ) {
    return galleryBrownie;
  }
  if (
    name.includes("dosa") ||
    name.includes("idli") ||
    name.includes("uttapam") ||
    desc.includes("sambar") ||
    desc.includes("chutney")
  ) {
    return galleryDosa;
  }
  if (
    name.includes("fries") ||
    name.includes("chole") ||
    name.includes("kulcha") ||
    name.includes("pakora") ||
    name.includes("chaat") ||
    name.includes("tikki") ||
    name.includes("snack")
  ) {
    return snacksImg;
  }
  return heroFeast;
}

/* -------------------------------------------------------------------------- */
/* Custom Feature Line Icons Matching Reference Design                        */
/* -------------------------------------------------------------------------- */

// 1. Fresh Flavours Icon (Fork & Knife exactly matching media_1790752624732.png)
function FreshFlavoursIcon({ className = "h-8 w-8 text-[#008769]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Fork: 3 prongs with bottom curve and straight vertical handle */}
      <line x1="14" y1="12" x2="14" y2="18" />
      <line x1="17.5" y1="12" x2="17.5" y2="18" />
      <line x1="21" y1="12" x2="21" y2="18" />
      <path d="M14 18C14 21 21 21 21 18" />
      <line x1="17.5" y1="21" x2="17.5" y2="32" />

      {/* Knife: straight spine on right, curved blade belly on left */}
      <path d="M29.5 12C25.5 13.5 25 17 25 19.5C25 22 27 23 29.5 23" />
      <line x1="29.5" y1="12" x2="29.5" y2="32" />
    </svg>
  );
}

// 2. Coffee & Refreshments Icon (Clean line-art mug with steam)
function CoffeeCupIcon({ className = "h-8 w-8 text-[#008769]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Steam trails */}
      <path d="M16 11C16 9.5 17.5 8.5 17.5 7" />
      <path d="M22 12C22 10.5 23.5 9.5 23.5 8" />
      <path d="M28 11C28 9.5 29.5 8.5 29.5 7" />
      {/* Cup Body */}
      <path d="M12 15H31V24C31 28 27.5 31 21.5 31C15.5 31 12 28 12 24V15Z" />
      {/* Mug Handle */}
      <path d="M31 18H33.5C35.5 18 37 19.5 37 21.5C37 23.5 35.5 25 33.5 25H31" />
      {/* Saucer */}
      <line x1="11" y1="35" x2="32" y2="35" />
    </svg>
  );
}

// 3. A Place to Connect Icon (Clean line-art cheerful people gathering)
function ConnectUsersIcon({ className = "h-8 w-8 text-[#008769]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Left person */}
      <circle cx="16" cy="15" r="4.5" />
      <path d="M9 31C9 26 12.5 23 16 23C19.5 23 23 26 23 31" />
      {/* Right person */}
      <circle cx="28" cy="15" r="4.5" />
      <path d="M21 31C21 26 24.5 23 28 23C31.5 23 35 26 35 31" />
      {/* Sparkle of connection above */}
      <path d="M22 8L22 11" />
      <path d="M20.5 9.5L23.5 9.5" />
    </svg>
  );
}

// 4. Comfortable & Welcoming Icon (Clean line-art cozy cafe armchair)
function ComfortHomeIcon({ className = "h-8 w-8 text-[#008769]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Chair Back */}
      <path d="M15 12C15 10 17 9 22 9C27 9 29 10 29 12V24H15V12Z" />
      {/* Armrests */}
      <path d="M11 20H15V26C15 28 13.5 29 12 29C10.5 29 9 27.5 9 25V22C9 20.9 9.9 20 11 20Z" />
      <path d="M33 20H29V26C29 28 30.5 29 32 29C33.5 29 35 27.5 35 25V22C35 20.9 34.1 20 33 20Z" />
      {/* Cushion */}
      <path d="M13 25H31V29C31 30.5 29.5 32 28 32H16C14.5 32 13 30.5 13 29V25Z" />
      {/* Legs */}
      <line x1="14" y1="32" x2="12" y2="36" />
      <line x1="30" y1="32" x2="32" y2="36" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Botanical Leaf SVG Accents                                                 */
/* -------------------------------------------------------------------------- */
function BotanicalBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none text-emerald-800/18 transition-all duration-700 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M15 105C30 85 55 55 105 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M45 75C40 65 30 65 25 70C20 75 25 85 35 85C42 85 45 80 45 75Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M60 60C62 50 56 42 48 44C40 46 42 56 50 60C56 63 60 60 60 60Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M75 45C70 35 60 35 55 40C50 45 55 55 65 55C72 55 75 50 75 45Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M90 30C92 20 86 12 78 14C70 16 72 26 80 30C86 33 90 30 90 30Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M105 15C100 8 90 8 85 14C80 20 88 28 98 25C104 23 105 18 105 15Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Danial's Seal & Logo                                                       */
/* -------------------------------------------------------------------------- */
function DanialsLogo({ isLight = false }: { isLight?: boolean }) {
  return (
    <div className="group/logo flex items-center gap-3 cursor-pointer">
      <div
        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 p-1 transition-transform duration-500 group-hover/logo:rotate-12 group-hover/logo:scale-105 ${
          isLight
            ? "border-emerald-300/40 bg-white/10 text-white shadow-xs"
            : "border-white/90 bg-white text-[#083e35] shadow-xs"
        }`}
      >
        <div
          className={`flex h-full w-full flex-col items-center justify-center rounded-full border transition-colors duration-300 ${
            isLight
              ? "border-emerald-200/30 group-hover/logo:border-white"
              : "border-[#083e35]/30 group-hover/logo:border-[#083e35]"
          }`}
        >
          <span
            className={`font-display text-[13px] font-bold leading-none italic ${
              isLight ? "text-white" : "text-[#083e35]"
            }`}
          >
            Danial's
          </span>
          <span
            className={`text-[5px] uppercase tracking-[0.2em] font-medium ${
              isLight ? "text-emerald-100" : "text-[#083e35]/80"
            }`}
          >
            Cafe & Bistro
          </span>
        </div>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-display text-2xl font-normal tracking-tight transition-colors duration-300 ${
            isLight ? "text-white" : "text-white group-hover/logo:text-emerald-100"
          }`}
        >
          Danial's
        </span>
        <span
          className={`text-[8.5px] uppercase tracking-[0.28em] font-medium mt-0.5 ${
            isLight ? "text-emerald-200/90" : "text-emerald-200"
          }`}
        >
          Cafe &amp; Bistro
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Smooth Scroll & Navigation Controller with Sticky Header Offset             */
/* -------------------------------------------------------------------------- */
export function scrollToSection(sectionId: string) {
  if (typeof window === "undefined") return;
  const id = sectionId.replace(/^#/, "");

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.history.pushState) {
      window.history.pushState(null, "", window.location.pathname);
    }
    return;
  }

  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 110;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });
    if (window.history.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }
  } else {
    window.location.href = `/#${id}`;
  }
}

/* -------------------------------------------------------------------------- */
/* Header Navigation with Live Cart Count & Social Links                      */
/* -------------------------------------------------------------------------- */
interface HeaderProps {
  totalCartCount: number;
  onOpenOrderDrawer: () => void;
  onOpenReserveModal: () => void;
  onOpenEmailModal: (subject?: string) => void;
}

function Header({
  totalCartCount,
  onOpenOrderDrawer,
  onOpenReserveModal,
  onOpenEmailModal,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "menu", "story", "gallery", "faq", "visit"];
      const scrollY = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#083e35] text-white shadow-md backdrop-blur-md transition-all duration-300">
      {/* Top Quick Contact & Info Strip with Click-to-Call and Click-to-Email */}
      <div className="border-b border-emerald-900/80 bg-[#052923] text-xs text-emerald-100/90 py-1.5 px-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar py-0.5">
            {/* Clickable Phone Link */}
            <a
              href={cafe.phoneHref}
              className="group/top-phone flex items-center gap-1.5 hover:text-white transition-colors shrink-0"
              title="Click to call Danial's Cafe & Bistro (078145 00305)"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[#5cdbb5] group-hover/top-phone:bg-[#00a884] group-hover/top-phone:text-white transition-all">
                <Phone className="h-3 w-3" />
              </div>
              <span className="text-[11px] font-semibold text-emerald-200 group-hover/top-phone:text-white">
                Call: {cafe.phone}
              </span>
            </a>

            <span className="text-emerald-800 hidden sm:inline">•</span>

            {/* Clickable Email Button (Triggers Email Modal + 1-Click Webmail) */}
            <button
              type="button"
              onClick={() => onOpenEmailModal("General Cafe & Bistro Inquiry")}
              className="group/top-mail flex items-center gap-1.5 hover:text-white transition-colors shrink-0 cursor-pointer"
              title="Click to send email to Danial's Cafe & Bistro"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[#5cdbb5] group-hover/top-mail:bg-[#00a884] group-hover/top-mail:text-white transition-all">
                <Mail className="h-3 w-3" />
              </div>
              <span className="text-[11px] font-semibold text-emerald-200 group-hover/top-mail:text-white">
                Email: {cafe.email}
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-emerald-200/80 shrink-0">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#5cdbb5]" />
              <span>10:00 AM – 10:30 PM (Daily)</span>
            </span>
            <span className="text-emerald-800">•</span>
            <a
              href={cafe.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <MapPin className="h-3 w-3 text-[#5cdbb5]" />
              <span>Faridkot, Punjab</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand Logo with Smooth Scroll to Top */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top");
          }}
          className="flex items-center cursor-pointer"
          title="Danial's Cafe & Bistro — Return to Top"
        >
          <DanialsLogo />
        </a>

        {/* Center Animated Nav Links */}
        <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("top");
            }}
            className={`nav-link-anim text-sm font-medium transition-colors cursor-pointer ${
              activeSection === "top" ? "active text-white" : "text-emerald-100/80 hover:text-white"
            }`}
          >
            Home
          </a>
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("menu");
            }}
            className={`nav-link-anim text-sm font-medium transition-colors cursor-pointer ${
              activeSection === "menu" ? "active text-white" : "text-emerald-100/80 hover:text-white"
            }`}
          >
            Menu
          </a>
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("story");
            }}
            className={`nav-link-anim text-sm font-medium transition-colors cursor-pointer ${
              activeSection === "story" ? "active text-white" : "text-emerald-100/80 hover:text-white"
            }`}
          >
            Our Story
          </a>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("gallery");
            }}
            className={`nav-link-anim text-sm font-medium transition-colors cursor-pointer ${
              activeSection === "gallery" ? "active text-white" : "text-emerald-100/80 hover:text-white"
            }`}
          >
            Gallery
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("faq");
            }}
            className={`nav-link-anim text-sm font-medium transition-colors cursor-pointer ${
              activeSection === "faq" ? "active text-white" : "text-emerald-100/80 hover:text-white"
            }`}
          >
            FAQ
          </a>
          <a
            href="#visit"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("visit");
            }}
            className={`nav-link-anim text-sm font-medium transition-colors cursor-pointer ${
              activeSection === "visit" ? "active text-white" : "text-emerald-100/80 hover:text-white"
            }`}
          >
            Contact
          </a>
          <a
            href={cafe.facebookHref}
            target="_blank"
            rel="noreferrer"
            className="nav-link-anim flex items-center gap-1.5 text-sm font-medium text-emerald-100/80 hover:text-white transition-colors"
            title="Follow Danial's Cafe & Bistro on Facebook"
          >
            <Facebook className="h-4 w-4 text-[#5cdbb5]" />
            <span>Facebook</span>
          </a>
          <a
            href={cafe.instagramHref}
            target="_blank"
            rel="noreferrer"
            className="nav-link-anim flex items-center gap-1.5 text-sm font-medium text-emerald-100/80 hover:text-white transition-colors"
            title="Follow Danial's Cafe on Instagram (@danials_cafeandbistro)"
          >
            <Instagram className="h-4 w-4 text-[#5cdbb5]" />
            <span>Instagram</span>
          </a>
        </nav>

        {/* Right Animated Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Facebook Button */}
          <a
            href={cafe.facebookHref}
            target="_blank"
            rel="noreferrer"
            className="group/fb btn-spring inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-400/25 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-blue-400/60 hover:bg-[#1877f2] hover:shadow-md active:scale-95"
            title="Follow Danial's Cafe & Bistro on Facebook"
          >
            <Facebook className="h-4 w-4 transition-transform duration-200 group-hover/fb:rotate-12 group-hover/fb:scale-110 text-blue-300" />
            <span className="hidden xl:inline">Facebook</span>
          </a>

          {/* Instagram Button */}
          <a
            href={cafe.instagramHref}
            target="_blank"
            rel="noreferrer"
            className="group/insta btn-spring inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-400/25 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-pink-400/50 hover:bg-gradient-to-r hover:from-purple-600/85 hover:via-pink-600/85 hover:to-amber-500/85 hover:shadow-md active:scale-95"
            title="Follow @danials_cafeandbistro on Instagram"
          >
            <Instagram className="h-4 w-4 transition-transform duration-200 group-hover/insta:rotate-12 group-hover/insta:scale-110 text-pink-300" />
            <span className="hidden xl:inline">Instagram</span>
          </a>

          {/* Animated Reserve Table Button */}
          <button
            onClick={onOpenReserveModal}
            className="group/res btn-spring btn-shimmer hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs backdrop-blur-xs transition-all hover:bg-[#00a884] hover:border-transparent hover:shadow-md active:scale-95 cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-[#5cdbb5] transition-transform duration-200 group-hover/res:scale-110 group-hover/res:rotate-6" />
            <span>Reserve Table</span>
          </button>

          {/* Order Online Button with Live Counter Badge */}
          <button
            onClick={onOpenOrderDrawer}
            className="group/btn btn-spring btn-shimmer btn-glow-teal btn-icon-slide relative inline-flex items-center gap-2 rounded-full bg-[#00a884] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#009273] hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="icon-slide h-4 w-4 transition-transform duration-200 group-hover/btn:rotate-12" />
            <span>Order Online</span>
            {totalCartCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#083e35] text-[11px] font-extrabold shadow-sm animate-badge-pop">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden hover:bg-white/10 active:scale-90 transition-all duration-200 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 rotate-90 transition-transform duration-200" />
            ) : (
              <MenuIcon className="h-6 w-6 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-emerald-900 bg-[#062f28] px-6 py-5 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                scrollToSection("top");
              }}
              className="text-base font-semibold text-white hover:text-emerald-200 transition-colors"
            >
              Home
            </a>
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                scrollToSection("menu");
              }}
              className="text-base font-medium text-emerald-100 hover:text-white transition-colors"
            >
              Menu
            </a>
            <a
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                scrollToSection("story");
              }}
              className="text-base font-medium text-emerald-100 hover:text-white transition-colors"
            >
              Our Story
            </a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                scrollToSection("gallery");
              }}
              className="text-base font-medium text-emerald-100 hover:text-white transition-colors"
            >
              Gallery
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                scrollToSection("faq");
              }}
              className="text-base font-medium text-emerald-100 hover:text-white transition-colors"
            >
              FAQ (Help Center)
            </a>
            <a
              href="#visit"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                scrollToSection("visit");
              }}
              className="text-base font-medium text-emerald-100 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a
              href={cafe.facebookHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 text-base font-medium text-emerald-100 hover:text-white transition-colors"
            >
              <Facebook className="h-5 w-5 text-blue-400" />
              <span>Facebook (Danial's Cafe &amp; Bistro)</span>
            </a>
            <a
              href={cafe.instagramHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 text-base font-medium text-emerald-100 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5 text-pink-400" />
              <span>Instagram (@danials_cafeandbistro)</span>
            </a>

            {/* Direct Mobile Tap-to-Call & Tap-to-Email */}
            <div className="pt-2 border-t border-emerald-800/80 grid grid-cols-2 gap-2">
              <a
                href={cafe.phoneHref}
                className="btn-spring flex items-center justify-center gap-2 rounded-xl bg-white/10 p-2.5 text-xs font-semibold text-white hover:bg-emerald-600/30 active:scale-95"
                title="Click to dial 078145 00305"
              >
                <Phone className="h-4 w-4 text-[#5cdbb5]" />
                <span>Call Phone</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEmailModal("Mobile Drawer Inquiry");
                }}
                className="btn-spring flex items-center justify-center gap-2 rounded-xl bg-white/10 p-2.5 text-xs font-semibold text-white hover:bg-emerald-600/30 active:scale-95 cursor-pointer"
                title="Send email to danialscafeandbistro@gmail.com"
              >
                <Mail className="h-4 w-4 text-[#5cdbb5]" />
                <span>Send Email</span>
              </button>
            </div>

            {/* Mobile Reserve Table Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserveModal();
              }}
              className="btn-spring btn-shimmer flex items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-white/10 py-3 text-center text-sm font-semibold text-white shadow-xs active:scale-95 cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-[#5cdbb5]" />
              <span>Reserve Your Table</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderDrawer();
              }}
              className="btn-spring btn-shimmer flex items-center justify-center gap-2 rounded-full bg-[#00a884] py-3 text-center text-sm font-semibold text-white shadow-sm active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Order &amp; View Tray ({totalCartCount})</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero Section                                                               */
/* -------------------------------------------------------------------------- */
interface HeroProps {
  onOpenOrderDrawer: () => void;
  onOpenReserveModal: () => void;
}

function Hero({ onOpenOrderDrawer, onOpenReserveModal }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-[#faf8f4] pt-12 pb-16 sm:pt-16 sm:pb-24">
      <BotanicalBranch className="absolute -top-6 -left-6 h-36 w-36 rotate-12 opacity-60 sm:h-48 sm:w-48" />
      <BotanicalBranch className="absolute bottom-4 -left-10 h-32 w-32 -rotate-45 opacity-50 sm:h-44 sm:w-44" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column Content */}
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6b8478] font-semibold">
              WELCOME TO DANIAL'S CAFE &amp; BISTRO
            </p>

            <h1 className="mt-5 font-display text-5xl font-medium tracking-tight text-[#083e35] sm:text-6xl lg:text-[4.25rem] leading-[1.08]">
              Good Food.
              <br />
              Beautiful Moments.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#4a5550] sm:text-lg">
              Discover Danial's Cafe &amp; Bistro in Faridkot — a welcoming place to enjoy
              delicious food, refreshing drinks and time well spent.
            </p>

            {/* Buttons Row with Professional Animations */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Reserve Your Table Button with Glow and Shimmer */}
              <button
                onClick={onOpenReserveModal}
                className="group btn-spring btn-shimmer btn-reserve-pulse btn-icon-slide inline-flex items-center justify-center gap-2.5 rounded-full bg-[#00a884] px-7 sm:px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#008f6f] hover:shadow-xl active:scale-95 transition-all duration-200"
              >
                <Calendar className="icon-slide h-4 w-4 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                <span>Reserve Your Table</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("menu")}
                className="group btn-spring btn-shimmer btn-icon-slide inline-flex items-center justify-center gap-2.5 rounded-full bg-[#083e35] px-7 sm:px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#052923] hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Menu</span>
                <ArrowRight className="icon-slide h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <a
                href={cafe.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="group btn-spring inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#083e35]/25 bg-white px-6 py-3.5 text-sm font-semibold text-[#083e35] shadow-xs hover:border-[#083e35] hover:bg-emerald-50/50 hover:shadow-md active:scale-95 transition-all duration-200"
              >
                <MapPin className="h-4 w-4 text-[#083e35] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Animated Order Online Link */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <button
                onClick={onOpenOrderDrawer}
                className="group inline-flex items-center gap-2 font-bold text-[#00a884] transition-all hover:text-[#008769]"
              >
                <span className="relative">
                  Order Online &amp; Select Items
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#00a884] origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-white p-2 shadow-[0_20px_50px_-20px_rgba(8,62,53,0.22)] ring-1 ring-emerald-950/5 transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={heroFeast}
                alt="Delicious burger, golden french fries and chocolate milkshake at Danial's Cafe"
                width={1200}
                height={900}
                className="aspect-4/3 w-full rounded-[1.75rem] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4 Feature Badges (Interactive Value Prop Buttons Matching Screenshot)      */
/* -------------------------------------------------------------------------- */
const featureDefinitions = [
  {
    id: "fresh-flavours",
    title: "Fresh Flavours",
    description: "Delicious food made for every mood.",
    tagline: "Farm-fresh ingredients & chef-crafted recipes",
    badge: "Food Delights",
    icon: FreshFlavoursIcon,
    categoryIds: ["burgers", "pizza", "sandwiches"],
  },
  {
    id: "coffee-refreshments",
    title: "Coffee & Refreshments",
    description: "From classic coffee to cool shakes.",
    tagline: "Handcrafted brews & thick cold delights",
    badge: "Beverages",
    icon: CoffeeCupIcon,
    categoryIds: ["coffee", "cold"],
  },
  {
    id: "place-to-connect",
    title: "A Place to Connect",
    description: "Good food brings people together.",
    tagline: "Sharing platters & Punjabi finger food",
    badge: "Sharing Combos",
    icon: ConnectUsersIcon,
    categoryIds: ["snacks", "burgers"],
  },
  {
    id: "comfortable-welcoming",
    title: "Comfortable & Welcoming",
    description: "A cozy space to relax, work or hang out.",
    tagline: "Comfort classics, Dosas & hot chocolate brownies",
    badge: "Cafe Specials",
    icon: ComfortHomeIcon,
    categoryIds: ["desserts", "south", "coffee"],
  },
];

interface FeaturesProps {
  onSelectFeature: (featureId: string) => void;
}

function Features({ onSelectFeature }: FeaturesProps) {
  return (
    <section className="relative bg-[#faf8f4] pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featureDefinitions.map((f) => {
            const Icon = f.icon;
            return (
              <button
                type="button"
                key={f.id}
                onClick={() => onSelectFeature(f.id)}
                className="feature-card-btn group relative flex flex-col items-center justify-between rounded-[2rem] border border-gray-100/90 bg-white p-8 sm:p-9 text-center shadow-[0_10px_30px_-10px_rgba(8,62,53,0.06)] hover:shadow-[0_22px_44px_-12px_rgba(0,135,105,0.18)] hover:border-[#008769]/35 cursor-pointer w-full transition-all duration-300 active:scale-[0.98]"
              >
                {/* Subtle corner arrow on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef8f4] text-[#008769] shadow-2xs">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                <div className="flex flex-col items-center w-full">
                  {/* Center Mint Circle Icon exactly matching media_1790752624732.png */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef8f4] text-[#008769] shadow-2xs transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#d8f2e7] group-hover:shadow-md">
                    <Icon className="h-9 w-9 text-[#008769] transition-transform duration-300 group-hover:scale-105" />
                  </div>

                  {/* Title exactly matching media_1790752624732.png */}
                  <h3 className="mt-6 font-sans text-xl sm:text-[22px] font-bold tracking-tight text-[#111827] group-hover:text-[#083e35] transition-colors">
                    {f.title}
                  </h3>

                  {/* Subtitle exactly matching media_1790752624732.png */}
                  <p className="mt-2.5 text-sm sm:text-[15px] font-normal text-[#52605a] leading-relaxed text-center">
                    {f.description}
                  </p>
                </div>

                {/* Animated Button Action Indicator */}
                <div className="mt-6 flex items-center justify-center">
                  <span className="btn-spring inline-flex items-center gap-1.5 rounded-full bg-[#f1f8f5] px-4 py-1.5 text-xs font-bold text-[#008769] transition-all duration-300 group-hover:bg-[#008769] group-hover:text-white group-hover:shadow-xs group-hover:scale-105">
                    <span>Show Items</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Feature Showcase Modal (Interactive Item Showcase with Images)             */
/* -------------------------------------------------------------------------- */
interface FeatureShowcaseModalProps {
  featureId: string | null;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onOpenOrderDrawer: () => void;
}

function FeatureShowcaseModal({
  featureId,
  onClose,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onOpenOrderDrawer,
}: FeatureShowcaseModalProps) {
  if (!featureId) return null;

  const feature =
    featureDefinitions.find((f) => f.id === featureId) ?? featureDefinitions[0];
  const Icon = feature.icon;

  const [activeFilter, setActiveFilter] = useState("all");

  const matchingCategories = menu.filter((cat) =>
    feature.categoryIds.includes(cat.id)
  );

  const displayedItems =
    activeFilter === "all"
      ? matchingCategories.flatMap((cat) => cat.items)
      : matchingCategories
          .filter((cat) => cat.id === activeFilter)
          .flatMap((cat) => cat.items);

  const getItemQuantity = (itemId: string) => {
    return cart.find((ci) => ci.item.id === itemId)?.quantity ?? 0;
  };

  const totalCartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, ci) => sum + ci.item.priceNumber * ci.quantity,
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative border-b border-gray-100 bg-gradient-to-b from-[#f4faf7] to-white p-6 sm:p-7">
          <button
            type="button"
            onClick={onClose}
            className="btn-spring absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-2xs hover:bg-gray-100 hover:text-gray-900 active:scale-90"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#eef8f4] text-[#008769] shadow-2xs">
              <Icon className="h-8 w-8 text-[#008769]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="rounded-full bg-[#eef8f4] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#008769]">
                  {feature.badge}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-semibold text-[#5e6d66]">
                  Danial's Cafe &amp; Bistro Menu
                </span>
              </div>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#083e35]">
                {feature.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5a6b63] max-w-xl">
                {feature.tagline}
              </p>
            </div>
          </div>

          {/* Filter Tabs if multiple categories */}
          {matchingCategories.length > 1 && (
            <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`btn-spring rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeFilter === "all"
                    ? "bg-[#008769] text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#008769]/40"
                }`}
              >
                All ({matchingCategories.flatMap((c) => c.items).length})
              </button>
              {matchingCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`btn-spring rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    activeFilter === cat.id
                      ? "bg-[#008769] text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[#008769]/40"
                  }`}
                >
                  {cat.label} ({cat.items.length})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Items Scrollable Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedItems.map((item) => {
              const qty = getItemQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className="card-hover-lift group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-[#fbf9f6] transition-all duration-300 hover:bg-white hover:border-[#00a884]/40 hover:shadow-md"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                    <img
                      src={getItemPhoto(item)}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item.isPopular && (
                      <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-amber-500/95 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </span>
                    )}
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-xs">
                      {item.price}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h4 className="font-sans text-sm font-bold text-[#1c2e28] group-hover:text-[#083e35] transition-colors">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#5e6d66] line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="font-display text-base font-bold text-[#083e35]">
                        {item.price}
                      </span>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => onAddToCart(item)}
                          className="btn-spring btn-shimmer inline-flex items-center gap-1.5 rounded-full bg-[#008769] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#007057] active:scale-95 transition-all"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full border border-[#008769] bg-emerald-50 px-2 py-0.5 shadow-2xs animate-scale-up">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="btn-spring flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#008769] hover:bg-[#008769] hover:text-white transition-colors shadow-2xs active:scale-90"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-extrabold text-[#083e35]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="btn-spring flex h-6 w-6 items-center justify-center rounded-full bg-[#008769] text-white hover:bg-[#007057] transition-colors shadow-2xs active:scale-90"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-[#faf8f4] p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs text-[#5e6d66]">
            <ShoppingBag className="h-4 w-4 text-[#008769]" />
            <span>
              Tray: <strong className="text-[#083e35]">{totalCartCount} items</strong> (₹{totalCartPrice})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="btn-spring rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 active:scale-95"
            >
              Continue Browsing
            </button>

            {totalCartCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOrderDrawer();
                }}
                className="btn-spring btn-shimmer btn-glow-teal inline-flex items-center gap-2 rounded-full bg-[#008769] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#007057] active:scale-95"
              >
                <span>Review &amp; Confirm Order</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/* Explore Our Delicious Menu Section with Item Selection & Cart Add          */
/* -------------------------------------------------------------------------- */
const menuCategories = [
  { id: "burgers", name: "Burgers", subtitle: "Classic & Crunchy", image: heroFood },
  { id: "pizza", name: "Pizza", subtitle: "Hot & Fresh", image: galleryPizza },
  { id: "sandwiches", name: "Sandwiches", subtitle: "Healthy & Tasty", image: sandwichImg },
  { id: "snacks", name: "Snacks", subtitle: "Perfect Bites", image: snacksImg },
  { id: "cold", name: "Shakes", subtitle: "Cool & Refreshing", image: shakeImg },
  { id: "coffee", name: "Coffee", subtitle: "Rich & Aromatic", image: coffeeImg },
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "burgers", label: "Burgers" },
  { id: "pizza", label: "Pizza" },
  { id: "sandwiches", label: "Sandwiches" },
  { id: "snacks", label: "Snacks" },
  { id: "cold", label: "Shakes" },
  { id: "coffee", label: "Coffee" },
];

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onOpenOrderDrawer: () => void;
}

function MenuSection({
  cart,
  onAddToCart,
  onUpdateQuantity,
  onOpenOrderDrawer,
}: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const displayedCategories =
    activeTab === "all"
      ? menuCategories
      : menuCategories.filter((cat) => cat.id === activeTab);

  const activeCategoryId =
    selectedCategory ?? (activeTab !== "all" ? activeTab : "burgers");
  const activeMenuCategoryData =
    menu.find((c) => c.id === activeCategoryId) ?? menu[0];

  const getItemQuantity = (itemId: string) => {
    return cart.find((ci) => ci.item.id === itemId)?.quantity ?? 0;
  };

  return (
    <section id="menu" className="relative bg-[#faf8f4] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#6b8478] font-semibold">
            OUR MENU
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#083e35] sm:text-5xl">
            Explore Our Delicious Menu
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5e6d66] sm:text-base">
            Select items to customize your order and confirm instantly.
          </p>

          {/* Animated Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== "all") setSelectedCategory(tab.id);
                  }}
                  className={`btn-spring rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "btn-shimmer bg-[#00a884] text-white shadow-md shadow-emerald-700/20 scale-105"
                      : "border border-gray-200 bg-white text-[#4a5550] hover:border-[#00a884]/40 hover:text-[#083e35] hover:shadow-xs"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 sm:gap-5">
          {displayedCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat.id)}
              className={`card-hover-lift group flex cursor-pointer flex-col rounded-2xl border bg-white p-3.5 shadow-xs transition-all duration-300 ${
                activeCategoryId === cat.id
                  ? "border-[#00a884] ring-2 ring-[#00a884]/25 shadow-md"
                  : "border-emerald-900/6"
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="mt-3.5 flex items-center justify-between px-1">
                <div>
                  <h4 className="font-sans text-sm font-semibold text-[#1c2e28] group-hover:text-[#083e35] transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-[#5e6d66] mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                    activeCategoryId === cat.id
                      ? "bg-[#00a884] text-white scale-110"
                      : "bg-[#f1f8f5] text-[#00a884] group-hover:bg-[#00a884] group-hover:text-white group-hover:scale-110 group-hover:translate-x-1"
                  }`}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Menu Items Grid with "+ Add" & Quantity Control */}
        {activeMenuCategoryData && (
          <div className="mt-14 rounded-3xl border border-emerald-900/8 bg-white p-6 sm:p-10 shadow-xs animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#00a884] font-semibold">
                  Select Items &amp; Add to Tray
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-[#083e35] mt-1">
                  {activeMenuCategoryData.label}
                </h3>
              </div>
              <button
                onClick={onOpenOrderDrawer}
                className="group btn-spring btn-shimmer btn-icon-slide inline-flex items-center gap-2 rounded-full bg-[#00a884] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#008f6f] active:scale-95"
              >
                <ShoppingBag className="icon-slide h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-12" />
                <span>Review &amp; Confirm Order ({cart.reduce((s, c) => s + c.quantity, 0)})</span>
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeMenuCategoryData.items.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className="card-hover-lift group flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-[#fbf9f6] transition-all duration-300 hover:bg-white hover:border-[#00a884]/40 hover:shadow-lg"
                  >
                    {/* Item Food Image with Hover Zoom */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                      <img
                        src={getItemPhoto(item)}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.isPopular && (
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-500/95 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                          <Sparkles className="h-3 w-3" />
                          Popular
                        </span>
                      )}
                      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-xs">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h4 className="font-sans text-base font-bold text-[#1c2e28] group-hover:text-[#083e35] transition-colors">
                          {item.name}
                        </h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#5e6d66] line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-200/60 pt-3.5">
                        <span className="font-display text-lg font-bold text-[#083e35]">
                          {item.price}
                        </span>

                        {/* Animated Add / Quantity Controller */}
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => onAddToCart(item)}
                            className="group/btn btn-spring btn-shimmer inline-flex items-center gap-1.5 rounded-full bg-[#00a884] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#008f6f] active:scale-95 transition-all"
                          >
                            <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:rotate-90" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 rounded-full border border-[#00a884] bg-emerald-50 px-2 py-1 shadow-2xs animate-scale-up">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="btn-spring flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#00a884] hover:bg-[#00a884] hover:text-white transition-colors shadow-2xs active:scale-90"
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-extrabold text-[#083e35]">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="btn-spring flex h-6 w-6 items-center justify-center rounded-full bg-[#00a884] text-white hover:bg-[#008f6f] transition-colors shadow-2xs active:scale-90"
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Banner / Special Treat Section                                             */
/* -------------------------------------------------------------------------- */
interface SpecialTreatBannerProps {
  onOpenOrderDrawer: () => void;
  onOpenReserveModal: () => void;
}

function SpecialTreatBanner({
  onOpenOrderDrawer,
  onOpenReserveModal,
}: SpecialTreatBannerProps) {
  return (
    <section id="story" className="relative bg-[#083e35] py-16 sm:py-20 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#5cdbb5] font-semibold">
              SPECIAL TREAT
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-[3.5rem] leading-[1.12]">
              The Perfect
              <br />
              Blend of Taste &amp; Vibes
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-emerald-100/80 sm:text-lg">
              Enjoy great food, refreshing drinks and a cozy atmosphere — all at Danial's Cafe
              &amp; Bistro.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Reserve Table Button */}
              <button
                onClick={onOpenReserveModal}
                className="group btn-spring btn-shimmer btn-reserve-pulse btn-icon-slide inline-flex items-center justify-center gap-2.5 rounded-full bg-[#00a884] px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#008f6f] active:scale-95 transition-all duration-200"
              >
                <Calendar className="icon-slide h-4 w-4 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                <span>Reserve Your Table</span>
              </button>

              <a
                href="#menu"
                className="group btn-spring btn-shimmer btn-icon-slide inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#083e35] shadow-lg hover:bg-emerald-50 hover:shadow-2xl active:scale-95 transition-all duration-200"
              >
                <span>View Menu</span>
                <ArrowRight className="icon-slide h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </a>

              <button
                onClick={onOpenOrderDrawer}
                className="group btn-spring inline-flex items-center justify-center gap-2.5 rounded-full border border-emerald-400/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition-all duration-200"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Order Online</span>
              </button>
            </div>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-6">
            <div className="absolute -top-7 right-4 z-10 hidden sm:flex flex-col items-center pointer-events-none select-none">
              <span className="font-script text-3xl md:text-4xl text-white tracking-wide rotate-6 drop-shadow-md">
                Good Food
              </span>
              <span className="font-script text-3xl md:text-4xl text-white tracking-wide rotate-6 drop-shadow-md -mt-2">
                Good Mood
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6 text-white rotate-12 -mt-1 drop-shadow-sm"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-emerald-900/40 p-2 border border-emerald-700/30 shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={heroFeast}
                alt="Delicious meal at Danial's Cafe & Bistro"
                width={1000}
                height={700}
                className="aspect-4/3 w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Moments at Danial's (Our Gallery)                                          */
/* -------------------------------------------------------------------------- */
const galleryList = [
  { src: interior, alt: "Inside Danial's Cafe & Bistro seating area" },
  { src: heroFood, alt: "Loaded double cheeseburger with crispy fries" },
  { src: shakeImg, alt: "Creamy chocolate shake topped with whipped cream" },
  { src: galleryCounter, alt: "Danial's cozy coffee counter and cafe wall" },
  { src: coffeeImg, alt: "Hot artisan latte with latte art" },
  { src: galleryPizza, alt: "Fresh baked artisan pizza" },
  { src: sandwichImg, alt: "Toasted club sandwich" },
  { src: galleryBrownie, alt: "Chocolate brownie with ice cream" },
];

function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-[#faf8f4] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#6b8478] font-semibold">
            OUR GALLERY
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#083e35] sm:text-5xl">
            Moments at Danial's
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5e6d66] sm:text-base">
            Take a peek at our cozy space, delicious food and good vibes.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
          {galleryList.slice(0, 5).map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(i)}
              className="card-hover-lift group relative aspect-4/5 cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-xs transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={img.src}
                alt={img.alt}
                width={600}
                height={750}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                <span className="text-xs font-semibold text-white tracking-wide flex items-center gap-1">
                  View photo
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setSelectedImage(0)}
            className="group btn-spring btn-shimmer btn-glow-teal btn-icon-slide inline-flex items-center justify-center gap-2.5 rounded-full bg-[#00a884] px-9 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#009172] hover:shadow-xl active:scale-95 transition-all duration-200"
          >
            <span>View More Photos</span>
            <ArrowRight className="icon-slide h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="btn-spring absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-90 transition-all"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <img
            src={galleryList[selectedImage].src}
            alt={galleryList[selectedImage].alt}
            className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */
const reviews = [
  {
    quote: "Excellent place to hangout with friends... lovely ambience and food was yum.",
    author: "Google Review",
  },
  {
    quote: "Veg burger nd butterscotch shake very tasty,nd delivery time to time",
    author: "Google Review",
  },
  {
    quote: "Beautiful cafe with great food, amazing atmosphere & best service.",
    author: "Google Review",
  },
];

function Testimonials() {
  return (
    <section className="relative bg-[#faf8f4] py-16 sm:py-24 overflow-hidden">
      <BotanicalBranch className="absolute -top-10 -right-8 h-40 w-40 rotate-45 opacity-40" />
      <BotanicalBranch className="absolute -bottom-8 -left-8 h-36 w-36 -rotate-12 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6b8478] font-semibold">
              WHAT OUR CUSTOMERS SAY
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#083e35] sm:text-5xl">
              Loved by Many
            </h2>
            <p className="mt-2 text-sm text-[#5e6d66]">Real people. Real experiences.</p>

            <div className="card-hover-lift mt-6 inline-flex flex-col rounded-2xl border border-emerald-900/6 bg-white p-5 shadow-xs transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-2xs border border-gray-100">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-[#1c2e28]">
                    {cafe.rating}/5
                  </span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 border-t border-gray-100 pt-3 text-xs text-[#5e6d66]">
                <span>({cafe.reviews} Reviews)</span>
                <a
                  href={cafe.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group font-bold text-[#00a884] hover:text-[#008769] transition-colors flex items-center gap-1"
                >
                  <span>View on Google</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="card-hover-lift flex flex-col justify-between rounded-2xl border border-emerald-900/6 bg-white p-6 shadow-xs transition-all duration-300"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-[#00a884] leading-none">
                    “
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-[#2c3d35]">
                    {r.quote}
                  </p>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="mt-1 block text-[11px] font-medium text-[#5e6d66]">
                    {r.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Frequently Asked Questions (FAQ) Section                                   */
/* -------------------------------------------------------------------------- */
interface FaqItem {
  id: string;
  category: "all" | "orders" | "booking" | "food" | "location";
  categoryLabel: string;
  question: string;
  subtitle: string;
  answer: string;
  quickNote: string;
  highlights?: string[];
  actionType?: "order" | "reserve" | "maps" | "call" | "whatsapp";
  actionLabel?: string;
  tags: string[];
}

const faqData: FaqItem[] = [
  {
    id: "faq-pure-veg",
    category: "food",
    categoryLabel: "Food & Pure Veg",
    question: "Is Danial's Cafe & Bistro 100% pure vegetarian?",
    subtitle: "Kitchen standards, ingredient purity, and Jain options",
    answer:
      "Yes, absolutely! Danial's Cafe & Bistro operates an exclusively 100% Pure Vegetarian kitchen. We use fresh dairy paneer, farm-fresh vegetables, and premium vegetable oils. No meat, poultry, fish, or egg products are prepared or stored in our facility. We strictly comply with FSSAI food safety and hygiene guidelines.",
    quickNote:
      "100% certified vegetarian kitchen with fresh dairy paneer, farm vegetables, and zero meat or egg products.",
    highlights: [
      "100% Pure Vegetarian Kitchen",
      "Fresh Amul Dairy & Farm Veggies",
      "Strict FSSAI Hygiene Standards",
      "Jain Food (No Onion / No Garlic) Available on Request",
    ],
    actionType: "order",
    actionLabel: "Explore Veg Menu",
    tags: ["veg", "pure veg", "vegetarian", "jain", "hygiene", "fssai", "food", "ingredients"],
  },
  {
    id: "faq-online-order",
    category: "orders",
    categoryLabel: "Orders & Delivery",
    question: "How can I order food online for home delivery or takeaway?",
    subtitle: "Step-by-step easy online ordering with doorstep delivery in Faridkot",
    answer:
      "Ordering online is fast and simple! Browse our interactive menu, click 'Select & Order' on your favorite burgers, pizzas, pastas, or beverages, customize your quantities, and tap 'Confirm Order'. Enter your Name, Phone Number, Email, and Faridkot delivery address. You can also order directly via WhatsApp or by calling our hotline.",
    quickNote:
      "Browse our live menu, add items to cart, enter your delivery address, and confirm instantly.",
    highlights: [
      "Instant menu selection & live cart",
      "Clear bill summary with ₹0 hidden charges",
      "Fast doorstep delivery across Faridkot",
      "Thermal insulated spill-proof packaging",
    ],
    actionType: "order",
    actionLabel: "Order Food Online Now",
    tags: ["order", "delivery", "home delivery", "takeaway", "packing", "online", "cart"],
  },
  {
    id: "faq-table-reservation",
    category: "booking",
    categoryLabel: "Table Booking",
    question: "Do I need to reserve a table in advance for birthdays, parties, or dates?",
    subtitle: "Advance reservations, walk-ins, and reserved seating arrangements",
    answer:
      "Walk-in guests are always warmly welcomed! However, to guarantee your preferred seating area (Indoor Lounge, Bistro Booth, or Family Section) and avoid waiting during peak hours (6:00 PM – 10:00 PM) or weekends, we strongly recommend reserving a table online through our website or by calling 078145 00305.",
    quickNote:
      "Walk-ins are always welcome, though advance online booking guarantees your favorite booth during peak dinner hours.",
    highlights: [
      "Instant online table confirmation",
      "Choose indoor lounge or family booth",
      "Complimentary celebration table setup",
      "SMS & Email confirmation receipt",
    ],
    actionType: "reserve",
    actionLabel: "Reserve Table Online",
    tags: ["reserve", "table", "booking", "birthday", "party", "date", "anniversary", "family"],
  },
  {
    id: "faq-location-timings",
    category: "location",
    categoryLabel: "Location & Timings",
    question: "Where is Danial's Cafe located in Faridkot and what are your opening hours?",
    subtitle: "Address landmark, visiting hours, and parking information",
    answer:
      "Danial's Cafe & Bistro is centrally located Opposite Gaushala, near MGM School, Faridkot, Punjab 151203. We are open 7 days a week, Monday through Sunday, from 10:00 AM to 10:30 PM. Ample convenient parking is available for 2-wheelers and 4-wheelers.",
    quickNote:
      "Centrally located opposite Gaushala, near MGM School, Faridkot. Open daily 10:00 AM – 10:30 PM with parking space.",
    highlights: [
      "Open Monday – Sunday: 10:00 AM – 10:30 PM",
      "Opposite Gaushala, near MGM School, Faridkot",
      "Dedicated two & four-wheeler parking space",
      "Fully air-conditioned ambient dining space",
    ],
    actionType: "maps",
    actionLabel: "Open Google Maps Directions",
    tags: ["location", "address", "timings", "hours", "faridkot", "parking", "mgm school", "gaushala", "open"],
  },
  {
    id: "faq-payment-methods",
    category: "orders",
    categoryLabel: "Orders & Delivery",
    question: "What payment methods are accepted at Danial's Cafe?",
    subtitle: "UPI, Google Pay, PhonePe, Paytm, Cards, and Cash accepted",
    answer:
      "We accept all major modern payment modes: UPI (Google Pay, PhonePe, Paytm, BHIM), Debit Cards, Credit Cards (Visa, MasterCard, RuPay), Net Banking, and Cash on Delivery / Dine-in cash payments. Dynamic UPI QR codes are available at the counter and on your delivery bill.",
    quickNote:
      "All major payment methods accepted: UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, and Cash on Delivery.",
    highlights: [
      "All UPI Apps (Google Pay, PhonePe, Paytm, BHIM)",
      "Credit & Debit Cards Accepted",
      "Cash on Delivery & Dine-In Cash",
      "Zero extra surcharge or convenience fees",
    ],
    tags: ["payment", "upi", "gpay", "phonepe", "paytm", "cards", "cash", "cod", "bill"],
  },
  {
    id: "faq-postpaid-payment",
    category: "orders",
    categoryLabel: "Orders & Delivery",
    question: "Is Postpaid Payment (Pay Later / Cash on Delivery) available?",
    subtitle: "100% Postpaid enabled: Pay ₹0 now, pay when your food arrives",
    answer:
      "Yes, absolutely! Postpaid Payment is enabled by default at Danial's Cafe & Bistro. You pay ₹0 at checkout when placing your order online. Once your hot fresh food arrives at your doorstep or table, inspect your items first, then pay easily via Cash or UPI QR (Google Pay, PhonePe, Paytm).",
    quickNote:
      "Postpaid Enabled: Pay ₹0 online now. Pay upon delivery or table service via Cash or UPI.",
    highlights: [
      "₹0 advance payment required",
      "Pay on Delivery / Counter via Cash or UPI",
      "Inspect your fresh meal before paying",
      "Zero hidden fees or extra charges",
    ],
    actionType: "order",
    actionLabel: "Order with Postpaid (Pay Later)",
    tags: ["postpaid", "pay later", "cod", "cash on delivery", "payment", "zero advance", "safe"],
  },
  {
    id: "faq-prep-delivery-time",
    category: "orders",
    categoryLabel: "Orders & Delivery",
    question: "What is the typical food preparation and home delivery time?",
    subtitle: "Fresh food prep speed and doorstep delivery estimates",
    answer:
      "Every order is prepared fresh on demand. For Dine-in and Takeaway, food is served hot within 15–20 minutes. For Home Delivery within Faridkot town limits, arrival time is usually 30–45 minutes. You can check order status anytime by calling our counter hotline.",
    quickNote:
      "Cooked fresh to order: 15–20 mins for dine-in / pickup and 30–45 mins for doorstep delivery across Faridkot.",
    highlights: [
      "15–20 min fresh prep for Dine-In & Takeaway",
      "30–45 min doorstep delivery across Faridkot",
      "Thermal packaging keeps food steaming hot",
    ],
    actionType: "order",
    actionLabel: "Place an Order",
    tags: ["time", "delivery time", "preparation", "fast", "hot", "tracking", "status"],
  },
  {
    id: "faq-custom-jain-spice",
    category: "food",
    categoryLabel: "Food & Pure Veg",
    question: "Can I customize spice levels, extra cheese, or request Jain (no onion/garlic) food?",
    subtitle: "Personalized spice preferences, extra toppings, and Jain dietary cooking",
    answer:
      "Yes, definitely! We believe in serving food just the way you love it. You can specify your spice preference (Mild, Medium, Extra Spicy), request extra cheese or sauces, and order Jain meals prepared strictly without onion or garlic. Just mention it in the 'Order Notes' during online checkout or tell our server.",
    quickNote:
      "Customizable spice levels and special Jain preparations (no onion, no garlic) available upon request.",
    highlights: [
      "Custom spice: Mild, Medium, Spicy",
      "Jain-friendly (No Onion, No Garlic) dishes",
      "Extra cheese & sauce options",
      "Notes field available on online checkout",
    ],
    actionType: "order",
    actionLabel: "Order with Custom Notes",
    tags: ["spice", "jain", "no onion", "no garlic", "custom", "cheese", "notes", "dietary"],
  },
  {
    id: "faq-parties-events",
    category: "booking",
    categoryLabel: "Table Booking",
    question: "Can I host birthday parties, anniversaries, kitty parties, or corporate meetings at the cafe?",
    subtitle: "Party packages, custom decorations, and group combo menus",
    answer:
      "Yes! Danial's Cafe & Bistro is a favorite venue in Faridkot for celebrating milestone moments. We offer party packages including custom balloon/table decor, music arrangements, dedicated seating sections, and special multi-course combo menus at customized group pricing. Call 078145 00305 to book your date.",
    quickNote:
      "Complete party setups for birthdays, anniversaries, and reunions with custom group menus and decor.",
    highlights: [
      "Custom birthday & anniversary setups",
      "Group discount combo menus",
      "Sound & cozy ambiance",
      "Advance booking recommended",
    ],
    actionType: "reserve",
    actionLabel: "Book Event Table",
    tags: ["party", "birthday", "anniversary", "kitty party", "celebration", "decor", "event"],
  },
  {
    id: "faq-modify-cancel",
    category: "orders",
    categoryLabel: "Orders & Delivery",
    question: "How do I cancel or modify an order, or get help with an existing order?",
    subtitle: "Order updates, instant phone helpline, and WhatsApp assistance",
    answer:
      "Since fresh food preparation begins immediately after an order is confirmed, please contact us within 5 minutes of placing your order. Call our helpline directly at 078145 00305 or message us on WhatsApp with your Order ID. Our customer support team will assist you promptly.",
    quickNote:
      "Call 078145 00305 or send your Order ID via WhatsApp within 5 minutes for quick support.",
    highlights: [
      "Call 078145 00305 for immediate changes",
      "WhatsApp support available 10 AM – 10:30 PM",
      "Quick response from cafe counter staff",
    ],
    actionType: "call",
    actionLabel: "Call Support Hotline",
    tags: ["cancel", "modify", "help", "support", "refund", "phone", "whatsapp", "customer care"],
  },
];

interface FaqSectionProps {
  onOpenOrderDrawer: () => void;
  onOpenReserveModal: () => void;
  onOpenEmailModal: (subject?: string) => void;
}

function FaqSection({
  onOpenOrderDrawer,
  onOpenReserveModal,
  onOpenEmailModal,
}: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openId, setOpenId] = useState<string | null>("faq-pure-veg");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "orders", label: "Orders & Delivery" },
    { id: "booking", label: "Table Booking" },
    { id: "food", label: "Food & Pure Veg" },
    { id: "location", label: "Location & Timings" },
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      item.question.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      item.quickNote.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative bg-[#faf8f4] py-20 sm:py-28 overflow-hidden border-t border-b border-stone-200/80">
      {/* Background Decorative Accents */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#083e35] shadow-xs">
            <HelpCircle className="h-3.5 w-3.5 text-[#00a884]" />
            <span>FAQ &amp; Help Desk • Customer Support &amp; Answers</span>
          </div>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#083e35] sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base font-medium text-emerald-900/80">
            Clear, instant answers to your questions — 100% Pure Veg dining, home delivery, and table reservations.
          </p>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about dining, online food ordering, 100% pure vegetarian preparation, advance table reservations, and timings at Danial's Cafe &amp; Bistro in Faridkot.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-10 space-y-4">
          {/* Live Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. pure veg, delivery, reservation, timings, upi, party)..."
              className="w-full rounded-2xl border border-stone-300 bg-white py-3.5 pl-11 pr-10 text-sm text-stone-900 placeholder:text-stone-400 shadow-xs focus:border-[#00a884] focus:outline-hidden focus:ring-2 focus:ring-[#00a884]/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 hover:text-stone-700"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? faqData.length
                  : faqData.filter((f) => f.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={`btn-spring group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#083e35] text-white shadow-md shadow-emerald-950/20"
                      : "bg-white text-stone-700 border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-stone-100 text-stone-600 group-hover:bg-emerald-100 group-hover:text-emerald-800"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-[#00a884]">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-[#083e35]">
                No matching questions found
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                We couldn't find any question matching "{searchQuery}". Try using different keywords or feel free to message our team directly.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors"
                >
                  Reset Search &amp; Filters
                </button>
                <a
                  href={cafe.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => recordWhatsAppClick("FAQ Search Fallback")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#25d366] px-4 py-2 text-xs font-semibold text-white hover:bg-[#20ba59] transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-emerald-500/60 bg-white shadow-md ring-1 ring-emerald-500/20"
                      : "border-stone-200/90 bg-white shadow-xs hover:border-emerald-300 hover:shadow-sm"
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start sm:items-center justify-between gap-4 transition-colors group cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-[#083e35]">
                          {faq.categoryLabel}
                        </span>
                        <span className="text-[11px] font-medium text-stone-400">
                          • Verified Details
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#083e35] transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-xs font-medium text-stone-500 sm:text-xs">
                        {faq.subtitle}
                      </p>
                    </div>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-emerald-300 bg-emerald-50 text-[#00a884] rotate-180"
                          : "border-stone-200 bg-stone-50 text-stone-400 group-hover:border-emerald-300 group-hover:text-emerald-700"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="border-t border-stone-100 bg-stone-50/50 px-5 sm:px-6 py-5 sm:py-6 space-y-4">
                      {/* English Answer */}
                      <p className="text-sm leading-relaxed text-stone-700">
                        {faq.answer}
                      </p>

                      {/* Quick Summary Note */}
                      <div className="rounded-xl bg-emerald-50/60 p-3.5 border border-emerald-100 text-xs sm:text-sm text-emerald-950 leading-relaxed">
                        <strong className="font-semibold text-[#083e35] block mb-0.5">
                          Quick Summary:
                        </strong>
                        {faq.quickNote}
                      </div>

                      {/* Key Highlights */}
                      {faq.highlights && faq.highlights.length > 0 && (
                        <div className="pt-1">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#083e35] mb-2">
                            Key Details &amp; Benefits:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {faq.highlights.map((hl, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 rounded-lg bg-white p-2 border border-stone-200/70 text-stone-700 font-medium"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#00a884] shrink-0" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contextual Action Button */}
                      {faq.actionType && (
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          {faq.actionType === "order" && (
                            <button
                              type="button"
                              onClick={onOpenOrderDrawer}
                              className="btn-spring btn-shimmer inline-flex items-center gap-2 rounded-full bg-[#00a884] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#008f6f] active:scale-95 transition-all"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" />
                              <span>{faq.actionLabel || "Order Online"}</span>
                            </button>
                          )}

                          {faq.actionType === "reserve" && (
                            <button
                              type="button"
                              onClick={onOpenReserveModal}
                              className="btn-spring btn-shimmer inline-flex items-center gap-2 rounded-full bg-[#083e35] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#062c25] active:scale-95 transition-all"
                            >
                              <Calendar className="h-3.5 w-3.5 text-[#5cdbb5]" />
                              <span>{faq.actionLabel || "Reserve Table"}</span>
                            </button>
                          )}

                          {faq.actionType === "maps" && (
                            <a
                              href={cafe.mapsLink}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-spring inline-flex items-center gap-2 rounded-full bg-[#083e35] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#062c25] active:scale-95 transition-all"
                            >
                              <MapPin className="h-3.5 w-3.5 text-[#5cdbb5]" />
                              <span>{faq.actionLabel || "View on Google Maps"}</span>
                            </a>
                          )}

                          {faq.actionType === "call" && (
                            <a
                              href={cafe.phoneHref}
                              className="btn-spring inline-flex items-center gap-2 rounded-full bg-[#00a884] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#008f6f] active:scale-95 transition-all"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              <span>{faq.actionLabel || `Call ${cafe.phone}`}</span>
                            </a>
                          )}

                          <a
                            href={cafe.whatsappHref}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => recordWhatsAppClick("FAQ Answer Action")}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 decoration-emerald-400"
                          >
                            <span>Chat with Counter Staff</span>
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom "Still Have Questions?" Contact Card */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-[#083e35] via-[#062c25] to-[#041d18] p-8 sm:p-10 text-white shadow-xl border border-emerald-700/40 relative">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#00a884]/20 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5cdbb5] border border-emerald-400/20">
                <Sparkles className="h-3 w-3" />
                <span>Need Personalized Assistance?</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                Still Have Questions? We're Here to Help!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Whether you need special dietary accommodations, custom birthday party arrangements, or bulk catering orders in Faridkot, our friendly team is just one touch away.
              </p>
              <p className="text-xs text-emerald-300 font-medium">
                Opening Hours: 10:00 AM to 10:30 PM (Open All 7 Days)
              </p>
            </div>

            {/* Direct Instant Action Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={cafe.whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => recordWhatsAppClick("FAQ Bottom Assistance Banner")}
                className="btn-spring btn-shimmer inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#20ba59] active:scale-95 transition-all"
                title="Chat with Danial's Cafe on WhatsApp"
              >
                <Send className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={cafe.phoneHref}
                className="btn-spring btn-shimmer inline-flex items-center gap-2 rounded-full bg-[#00a884] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#008f6f] active:scale-95 transition-all"
                title="Call 078145 00305"
              >
                <Phone className="h-4 w-4" />
                <span>Call {cafe.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenEmailModal("FAQ & Customer Support Inquiry")}
                className="btn-spring inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs backdrop-blur-xs hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                title="Email danialscafeandbistro@gmail.com"
              >
                <Mail className="h-4 w-4 text-[#5cdbb5]" />
                <span>Email Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Visit Us (Get In Touch) Section                                            */
/* -------------------------------------------------------------------------- */
function VisitUs({
  onOpenOrderDrawer,
  onOpenReserveModal,
  onOpenEmailModal,
}: {
  onOpenOrderDrawer: () => void;
  onOpenReserveModal: () => void;
  onOpenEmailModal: (subject?: string) => void;
}) {
  return (
    <section id="visit" className="relative bg-[#faf8f4] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-4">
            <div className="card-hover-lift h-full overflow-hidden rounded-2xl border border-emerald-900/8 bg-white p-2 shadow-xs transition-all duration-300">
              <img
                src={storefrontImg}
                alt="Front view of Danial's Cafe & Bistro in Faridkot"
                width={800}
                height={600}
                className="h-full w-full rounded-xl object-cover min-h-[280px] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-emerald-900/8 bg-white p-7 sm:p-9 shadow-xs lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6b8478] font-semibold">
              GET IN TOUCH
            </p>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-[#083e35]">
              Visit Us
            </h2>

            <div className="mt-6 space-y-3.5 text-xs sm:text-sm text-[#4a5550]">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#083e35] mt-0.5" />
                <span className="leading-relaxed">{cafe.address}</span>
              </div>

              {/* Direct Click-to-Call Phone */}
              <div className="flex items-center gap-3 group/phone">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef8f4] text-[#00a884] group-hover/phone:bg-[#00a884] group-hover/phone:text-white transition-all">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={cafe.phoneHref}
                    className="font-bold text-[#083e35] hover:text-[#00a884] hover:underline transition-colors"
                    title="Click to call Danial's Cafe (078145 00305)"
                  >
                    {cafe.phone}
                  </a>
                  <span className="rounded-full bg-emerald-100 text-[#008769] px-2 py-0.5 text-[10px] font-bold">
                    Click to Call
                  </span>
                </div>
              </div>

              {/* Direct Click-to-Email */}
              <div className="flex items-center gap-3 group/mail">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef8f4] text-[#00a884] group-hover/mail:bg-[#00a884] group-hover/mail:text-white transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenEmailModal("Visit Us & Cafe Location Inquiry")}
                    className="font-bold text-[#083e35] hover:text-[#00a884] hover:underline transition-colors break-all text-left cursor-pointer"
                    title="Click to email danialscafeandbistro@gmail.com"
                  >
                    {cafe.email}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenEmailModal("Visit Us & Cafe Location Inquiry")}
                    className="rounded-full bg-emerald-100 text-[#008769] hover:bg-emerald-200 px-2 py-0.5 text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    Click to Email
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {/* Reserve Table Button */}
              <button
                onClick={onOpenReserveModal}
                className="group btn-spring btn-shimmer btn-reserve-pulse inline-flex items-center justify-center gap-2 rounded-full bg-[#00a884] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#008f6f] active:scale-95 transition-all duration-200"
              >
                <Calendar className="h-4 w-4" />
                <span>Reserve Your Table</span>
              </button>

              <button
                onClick={onOpenOrderDrawer}
                className="group btn-spring btn-shimmer btn-glow-teal btn-icon-slide inline-flex items-center justify-center gap-2 rounded-full bg-[#083e35] py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#052923] active:scale-95 transition-all duration-200"
              >
                <ShoppingBag className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                <span>Order Online &amp; Confirm</span>
              </button>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={cafe.phoneHref}
                  className="group btn-spring inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-300 bg-white py-3 text-xs font-bold text-[#083e35] shadow-2xs hover:bg-[#eef8f4] hover:border-[#00a884] active:scale-95 transition-all duration-200"
                  title="Call Danial's Cafe & Bistro"
                >
                  <Phone className="h-3.5 w-3.5 text-[#00a884]" />
                  <span>Call</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenEmailModal("Visit & Cafe Support Inquiry")}
                  className="group btn-spring inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-300 bg-white py-3 text-xs font-bold text-[#083e35] shadow-2xs hover:bg-[#eef8f4] hover:border-[#00a884] active:scale-95 transition-all duration-200 cursor-pointer"
                  title="Email Danial's Cafe & Bistro"
                >
                  <Mail className="h-3.5 w-3.5 text-[#00a884]" />
                  <span>Email</span>
                </button>

                <a
                  href={cafe.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group btn-spring inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-300 bg-white py-3 text-xs font-bold text-[#083e35] shadow-2xs hover:bg-[#eef8f4] hover:border-[#00a884] active:scale-95 transition-all duration-200"
                  title="Directions on Google Maps"
                >
                  <Navigation className="h-3.5 w-3.5 text-[#00a884]" />
                  <span>Maps</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <a
              href={cafe.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="card-hover-lift group block h-full overflow-hidden rounded-2xl border border-emerald-900/8 bg-white p-2 shadow-xs transition-all duration-300"
              title="Click to open Danial's Cafe on Google Maps"
            >
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={mapCardImg}
                  alt="Map location of Danial's Cafe & Bistro near MGM School Faridkot"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent" />
                <div className="btn-spring absolute bottom-3 right-3 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-bold text-[#083e35] shadow-md flex items-center gap-1.5 transition-transform group-hover:scale-105">
                  <Navigation className="h-3.5 w-3.5 text-[#00a884]" />
                  <span>Open Maps</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Valid Legal & Operational Cafe Policies Data                               */
/* -------------------------------------------------------------------------- */
interface PolicySection {
  heading: string;
  points: string[];
}

interface PolicyData {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  lastUpdated: string;
  sections: PolicySection[];
}

const validPolicies: PolicyData[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    subtitle: "Customer Data Protection & Privacy",
    tagline:
      "How Danial's Cafe & Bistro collects, uses, and safeguards customer personal details and order information in accordance with Indian IT rules.",
    badge: "Data Protection & Privacy",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        points: [
          "Personal Identification: Customer name, phone number, and delivery address in Faridkot when placing an online order or booking a table.",
          "Order & Dining Details: Items selected, special food instructions, table preferences, and past orders.",
          "Communication Records: Customer support inquiries via WhatsApp, telephone, or website feedback.",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        points: [
          "To prepare, dispatch, and fulfill food takeaway and doorstep delivery orders.",
          "To allocate tables and send automated WhatsApp/SMS reservation confirmations.",
          "To provide fast customer support and resolve order inquiries.",
          "We never sell, rent, or trade customer contact numbers or personal records to any third-party marketing companies.",
        ],
      },
      {
        heading: "3. Data Security & Indian IT Compliance",
        points: [
          "All customer data is stored securely in compliance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices) Rules, 2011.",
          "Direct payments via UPI (GPay, PhonePe, Paytm) and Cards are processed via secure RBI-licensed banking gateways; no sensitive card CVVs or UPI PINs are ever stored by us.",
        ],
      },
      {
        heading: "4. Your Data Rights",
        points: [
          "You have the full right to request deletion or correction of your contact records by contacting us at danialscafeandbistro@gmail.com or calling 078145 00305.",
        ],
      },
    ],
  },
  {
    id: "terms-and-conditions",
    title: "Terms & Conditions",
    subtitle: "Terms of Dining & Online Service",
    tagline:
      "Terms of service governing food orders, dining, and website usage at Danial's Cafe & Bistro.",
    badge: "Terms of Service",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Agreement to Terms",
        points: [
          "By accessing our website, placing food orders, or reserving a table, you agree to comply with and be bound by these Terms and Conditions.",
        ],
      },
      {
        heading: "2. Menu Pricing & Billing",
        points: [
          "All prices are quoted in Indian National Rupees (INR ₹) and are inclusive of applicable GST taxes.",
          "Menu items and seasonal specialties are subject to daily kitchen ingredient availability.",
          "Prices are subject to revision without prior notice, but any active order placed will be honored at the confirmed checkout price.",
        ],
      },
      {
        heading: "3. Dine-In & Conduct Guidelines",
        points: [
          "Danial's Cafe & Bistro maintains a peaceful, welcoming, and family-friendly environment. Management reserves the right of admission.",
          "Outside food and commercial beverages are strictly prohibited inside the cafe premises, with the exception of celebratory birthday cakes upon prior notice.",
        ],
      },
      {
        heading: "4. Intellectual Property & Brand Ownership",
        points: [
          "The trade name 'Danial's Cafe & Bistro', brand logo, recipes, photographs, and website materials are protected intellectual property.",
          "Unauthorized commercial reproduction or misuse is prohibited under Indian copyright and trademark law.",
        ],
      },
      {
        heading: "5. Jurisdiction",
        points: [
          "Any legal disputes arising out of services provided by the cafe shall be subject to the exclusive jurisdiction of the competent courts in Faridkot, Punjab.",
        ],
      },
    ],
  },
  {
    id: "refund-and-cancellation",
    title: "Refund, Return & Cancellation Policy",
    subtitle: "Cancellations, Replacements & Refunds",
    tagline:
      "Clear and transparent terms regarding order cancellations, item returns, and refund processing.",
    badge: "Fair Refund Guarantee",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Order Cancellation Window",
        points: [
          "Food orders can be cancelled free of charge within 5 minutes of placing, before food preparation begins in our kitchen.",
          "Once kitchen cooking or baking has commenced, cancellations cannot be accepted as fresh food cannot be reused.",
        ],
      },
      {
        heading: "2. Incorrect, Damaged, or Quality Issues",
        points: [
          "In the unlikely event an incorrect dish is delivered or there is a genuine quality defect, please notify us within 30 minutes of receipt with a photo.",
          "Our management will immediately offer an instant fresh replacement or a 100% full refund.",
        ],
      },
      {
        heading: "3. Refund Method & Timelines",
        points: [
          "Approved online refunds will be credited back to your original payment method (UPI / Bank Account) within 2 to 5 business days.",
          "For Cash on Delivery orders, refunds are settled instantly via Google Pay, PhonePe, or Paytm UPI transfer.",
        ],
      },
      {
        heading: "4. Table Reservation Cancellations",
        points: [
          "Table bookings carry zero cancellation fees. If your plans change, we kindly request a 30-minute advance notice so we can release the table to other waiting guests.",
        ],
      },
    ],
  },
  {
    id: "delivery-and-takeaway",
    title: "Delivery & Takeaway Policy",
    subtitle: "Delivery Coverage & Counter Pickup",
    tagline:
      "Service areas, estimated delivery times, hygiene packaging, and pickup protocols in Faridkot.",
    badge: "Hot & Fresh Delivery",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Delivery Coverage Area in Faridkot",
        points: [
          "We offer doorstep delivery across Faridkot city limits, including Near MGM School, Gaushala Road, Model Town, Circular Road, Talwandi Road, and surrounding sectors.",
          "For locations beyond municipal limits, please call our order hotline at 078145 00305 to verify delivery availability.",
        ],
      },
      {
        heading: "2. Estimated Delivery Time (ETA)",
        points: [
          "Average delivery time is 25 to 45 minutes from order confirmation, depending on order size, kitchen queue, and traffic.",
          "During severe weather or peak rush hours, our staff will notify you of any revised preparation times.",
        ],
      },
      {
        heading: "3. Food Packaging & Temperature Retention",
        points: [
          "All burgers, artisan pizzas, sandwiches, and hot snacks are packed in food-grade, spill-proof, insulated paper boxes to maintain crispness and heat.",
          "Cold shakes and coolers are securely sealed to prevent leakage during transit.",
        ],
      },
      {
        heading: "4. Takeaway Counter Pickup",
        points: [
          "Self-pickup orders can be collected directly from the Danial's Cafe & Bistro service counter by providing your Order ID or customer phone number.",
        ],
      },
    ],
  },
  {
    id: "food-safety-and-allergens",
    title: "Food Safety, Hygiene & Allergen Disclaimer",
    subtitle: "FSSAI Food Safety & Allergen Disclaimer",
    tagline:
      "FSSAI compliance, ingredient purity standards, and allergen guidance for guest health.",
    badge: "FSSAI Food Hygiene Standards",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. FSSAI Compliance & Kitchen Hygiene",
        points: [
          "Danial's Cafe & Bistro operates in strict adherence to the Food Safety and Standards Authority of India (FSSAI) sanitary guidelines.",
          "Our kitchen undergoes daily sanitisation, pest control, and staff temperature and hygiene monitoring.",
        ],
      },
      {
        heading: "2. 100% Vegetarian & Pure Ingredients",
        points: [
          "We prepare 100% vegetarian food items using fresh dairy paneer, pure butter, premium cheeses, and daily farm-sourced vegetables.",
          "All cooking and beverages utilize commercial RO multi-stage purified drinking water.",
          "We strictly do not use artificial food coloring or harmful additives.",
        ],
      },
      {
        heading: "3. Allergen Advisory",
        points: [
          "Our kitchen prepares dishes containing wheat/gluten, milk/dairy products, tree nuts, peanuts, soy, and sesame seeds.",
          "While we take stringent care, cross-contact may occur in shared kitchen prep areas during busy hours.",
        ],
      },
      {
        heading: "4. Special Dietary Requests",
        points: [
          "Guests with acute allergies (such as celiac disease, nut allergies, or lactose intolerance) are strongly advised to inform our staff before ordering so our chefs can take special precautions.",
        ],
      },
    ],
  },
  {
    id: "table-reservation-policy",
    title: "Table Reservation & Dining Policy",
    subtitle: "Table Reservations & Dining Etiquette",
    tagline:
      "Guidelines on seating allocations, grace periods, and party hosting at Danial's Cafe.",
    badge: "Complimentary Table Booking",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Complimentary Booking & Grace Period",
        points: [
          "Table reservations are 100% free with zero booking fee.",
          "Reserved tables are held for a grace period of 15 minutes past the reserved booking time before being released to walk-in guests.",
          "If you are running late, a quick call to 078145 00305 will ensure your table is held.",
        ],
      },
      {
        heading: "2. Seating Allocations",
        points: [
          "We offer Cozy Indoor AC seating, Window Booths, Outdoor Courtyard, and Family Lounge seating.",
          "Specific table requests are accommodated on a first-come priority basis.",
        ],
      },
      {
        heading: "3. Large Gatherings & Birthday Parties",
        points: [
          "For group celebrations or parties of 8+ guests, advance reservation of at least 2 hours is recommended.",
          "Customized birthday party platters and special table decorations can be arranged upon request.",
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Interactive Policy Modal Component                                         */
/* -------------------------------------------------------------------------- */
interface PolicyModalProps {
  policyId: string | null;
  onClose: () => void;
  onOpenPolicy: (id: string) => void;
  onOpenEmailModal: (subject?: string) => void;
}

function PolicyModal({
  policyId,
  onClose,
  onOpenPolicy,
  onOpenEmailModal,
}: PolicyModalProps) {
  if (!policyId) return null;

  const currentPolicy =
    validPolicies.find((p) => p.id === policyId) ?? validPolicies[0];

  const renderClauseWithLinks = (text: string) => {
    const parts = text.split(/(danialscafeandbistro@gmail\.com|078145 00305)/g);
    return parts.map((part, i) => {
      if (part === "danialscafeandbistro@gmail.com") {
        return (
          <button
            key={i}
            type="button"
            onClick={() => onOpenEmailModal(`Policy Inquiry: ${currentPolicy.title}`)}
            className="font-bold text-[#008769] underline decoration-emerald-400 hover:text-[#083e35] transition-colors cursor-pointer"
            title="Click to email Danial's Cafe"
          >
            {part}
          </button>
        );
      }
      if (part === "078145 00305") {
        return (
          <a
            key={i}
            href={cafe.phoneHref}
            className="font-bold text-[#008769] underline decoration-emerald-400 hover:text-[#083e35] transition-colors"
            title="Click to dial 078145 00305"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white text-[#1c2e28] shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative border-b border-gray-100 bg-gradient-to-r from-[#083e35] via-[#09473d] to-[#083e35] p-6 sm:p-7 text-white">
          <button
            type="button"
            onClick={onClose}
            className="btn-spring absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-90"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-[#5cdbb5] shadow-xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                  {currentPolicy.badge}
                </span>
                <span className="text-xs text-emerald-200/60">•</span>
                <span className="text-xs text-emerald-200/80">
                  Last Updated: {currentPolicy.lastUpdated}
                </span>
              </div>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                {currentPolicy.title}
              </h2>
              <p className="text-xs text-emerald-100/75 mt-0.5">
                {currentPolicy.subtitle} • Danial's Cafe &amp; Bistro, Faridkot
              </p>
            </div>
          </div>

          {/* Quick Policy Switcher Tabs */}
          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-emerald-800/80 pt-4">
            {validPolicies.map((p) => {
              const isActive = p.id === currentPolicy.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onOpenPolicy(p.id)}
                  className={`btn-spring rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#00a884] text-white shadow-xs scale-105"
                      : "bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {p.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Policy Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <p className="text-xs sm:text-sm leading-relaxed text-[#5e6d66] bg-[#fbf9f6] p-4 rounded-2xl border border-gray-150">
            {currentPolicy.tagline}
          </p>

          <div className="space-y-6">
            {currentPolicy.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#083e35]">
                  {sec.heading}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#4a5550]">
                  {sec.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00a884]" />
                      <span>{renderClauseWithLinks(pt)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Support for Policy Inquiries */}
          <div className="rounded-2xl border border-emerald-900/10 bg-[#eef8f4] p-4 text-xs text-[#083e35] space-y-1.5">
            <strong className="block font-bold">Have questions regarding this policy?</strong>
            <p className="text-[#4a5550]">
              Reach out directly to Danial's Cafe &amp; Bistro management at Opposite Gaushala, near MGM School, Faridkot, Punjab (151203).
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <a
                href={cafe.phoneHref}
                className="inline-flex items-center gap-1.5 font-bold text-[#083e35] hover:text-[#00a884] hover:underline transition-colors"
                title="Click to dial 078145 00305"
              >
                <Phone className="h-3.5 w-3.5 text-[#00a884]" />
                <span>Call: {cafe.phone}</span>
              </a>
              <span className="text-gray-300">•</span>
              <a
                href={cafe.whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => recordWhatsAppClick("Policy Modal Contact Strip")}
                className="inline-flex items-center gap-1.5 font-bold text-[#083e35] hover:text-[#00a884] hover:underline transition-colors"
                title="Chat on WhatsApp"
              >
                <Send className="h-3.5 w-3.5 text-[#00a884]" />
                <span>WhatsApp: +91 78145 00305</span>
              </a>
              <span className="text-gray-300">•</span>
              <button
                type="button"
                onClick={() => onOpenEmailModal(`Policy Inquiry: ${currentPolicy.title}`)}
                className="inline-flex items-center gap-1.5 font-bold text-[#008769] hover:text-[#083e35] hover:underline transition-colors cursor-pointer"
                title="Click to email danialscafeandbistro@gmail.com"
              >
                <Mail className="h-3.5 w-3.5 text-[#00a884]" />
                <span>Email: {cafe.email}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-gray-100 bg-[#faf8f4] p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={cafe.whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => recordWhatsAppClick("Policy Modal Footer Action")}
              className="group btn-spring btn-shimmer inline-flex items-center gap-1.5 rounded-full bg-[#00a884] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#008f6f]"
              title="Chat on WhatsApp"
            >
              <Send className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={cafe.phoneHref}
              className="btn-spring inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-[#083e35] hover:bg-gray-50 active:scale-95"
              title="Call Hotline (078145 00305)"
            >
              <Phone className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Call Hotline</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenEmailModal(`Policy Inquiry: ${currentPolicy.title}`)}
              className="btn-spring inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-[#083e35] hover:bg-gray-50 active:scale-95 cursor-pointer"
              title="Send Email Inquiry"
            >
              <Mail className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Send Email</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-spring rounded-full border border-gray-300 bg-white px-5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Comprehensive Multi-Column Footer with Valid Legal Policies & Vital Info   */
/* -------------------------------------------------------------------------- */
interface FooterProps {
  onOpenOrderDrawer: () => void;
  onOpenReserveModal: () => void;
  onOpenPolicy: (policyId: string) => void;
  onOpenAdmin: () => void;
  onOpenEmailModal: (subject?: string) => void;
}

function Footer({
  onOpenOrderDrawer,
  onOpenReserveModal,
  onOpenPolicy,
  onOpenAdmin,
  onOpenEmailModal,
}: FooterProps) {
  return (
    <footer className="relative bg-[#062c25] text-white overflow-hidden">
      {/* Decorative top accent gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-[#5cdbb5] to-[#00a884]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-12">
        {/* Top Header Row: Brand, FSSAI Badge & Primary Actions */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-emerald-900/80 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a href="#top" className="inline-block">
              <DanialsLogo />
            </a>
            <div className="h-8 w-px bg-emerald-800/60 hidden sm:block" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 px-3 py-1 text-xs font-semibold text-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5 text-[#5cdbb5]" />
                <span>FSSAI Standards Compliant</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 px-3 py-1 text-xs font-semibold text-emerald-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>100% Fresh Vegetarian Kitchen</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReserveModal}
              className="group/res btn-spring btn-shimmer inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-white/10 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#00a884] hover:border-transparent active:scale-95 transition-all"
            >
              <Calendar className="h-3.5 w-3.5 text-[#5cdbb5]" />
              <span>Reserve Table</span>
            </button>

            <button
              onClick={onOpenOrderDrawer}
              className="group/btn btn-spring btn-shimmer btn-glow-teal inline-flex items-center gap-2 rounded-full bg-[#00a884] px-5 sm:px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#008f6f] active:scale-95 transition-all"
            >
              <ShoppingBag className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:rotate-12" />
              <span>Order Online &amp; Confirm</span>
            </button>
          </div>
        </div>

        {/* 5-Column Rich Navigation Grid */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-xs">
          {/* Col 1: About & Mission */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-white tracking-wide">
              Danial's Cafe &amp; Bistro
            </h4>
            <p className="leading-relaxed text-emerald-100/75">
              Faridkot's favorite everyday hangout spot — handcrafted gourmet burgers, artisan pizzas, creamy pasta, handcrafted espresso, and Belgian shakes.
            </p>
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-300">
                Connect With Us
              </p>
              <div className="mt-2.5 flex items-center gap-2.5">
                <a
                  href={cafe.facebookHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-spring flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#1877f2] hover:scale-110 active:scale-95"
                  title="Facebook: Danial's Cafe & Bistro"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a
                  href={cafe.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-spring flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-amber-500 hover:scale-110 active:scale-95"
                  title="Instagram: @danials_cafeandbistro"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </a>
                <a
                  href={cafe.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => recordWhatsAppClick("Footer Social Icon")}
                  className="btn-spring flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#25d366] hover:scale-110 active:scale-95"
                  title="WhatsApp: Danial's Cafe"
                >
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white tracking-wide uppercase text-emerald-300">
              Explore
            </h4>
            <ul className="space-y-2 text-emerald-100/80">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("top")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("menu")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Full Cafe Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("menu")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Burgers &amp; Crispy Fries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("menu")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Wood-fired Style Pizza
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("menu")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Coffee, Shakes &amp; Coolers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("story")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Story &amp; Ambiance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("gallery")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cafe Photo Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("faq")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("visit")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact &amp; Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Booking */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white tracking-wide uppercase text-emerald-300">
              Cafe Services
            </h4>
            <ul className="space-y-2 text-emerald-100/80">
              <li>
                <button
                  type="button"
                  onClick={onOpenOrderDrawer}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left"
                >
                  Online Food Ordering
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenReserveModal}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left"
                >
                  Reserve Your Table
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("table-reservation-policy")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left"
                >
                  Table Booking Policy
                </button>
              </li>
              <li>
                <a
                  href="#visit"
                  className="nav-link-anim py-0.5 hover:text-white transition-colors"
                >
                  Takeaway Counter Pickup
                </a>
              </li>
              <li>
                <a
                  href={cafe.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => recordWhatsAppClick("Footer Party Catering Link")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors"
                >
                  Party &amp; Birthday Catering
                </a>
              </li>
              <li>
                <a
                  href={cafe.phoneHref}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors"
                >
                  Customer Hotline Support
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Valid Legal Policies (Clickable Modal) */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white tracking-wide uppercase text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#5cdbb5]" />
              <span>Valid Policies</span>
            </h4>
            <ul className="space-y-2 text-emerald-100/80">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("privacy-policy")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <FileText className="h-3 w-3 text-[#5cdbb5]" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("terms-and-conditions")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <FileText className="h-3 w-3 text-[#5cdbb5]" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("refund-and-cancellation")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3 w-3 text-[#5cdbb5]" />
                  <span>Refund &amp; Cancellation</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("delivery-and-takeaway")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Truck className="h-3 w-3 text-[#5cdbb5]" />
                  <span>Delivery &amp; Takeaway</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("food-safety-and-allergens")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-3 w-3 text-[#5cdbb5]" />
                  <span>FSSAI Food Safety &amp; Allergens</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("table-reservation-policy")}
                  className="nav-link-anim py-0.5 hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Calendar className="h-3 w-3 text-[#5cdbb5]" />
                  <span>Table Dining Guidelines</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Timings */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white tracking-wide uppercase text-emerald-300 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#5cdbb5]" />
              <span>Timings &amp; Contact</span>
            </h4>
            <div className="space-y-2 text-emerald-100/80">
              <div>
                <strong className="text-white block font-semibold">Opening Hours:</strong>
                <span className="text-[11px]">Mon – Sun: 10:00 AM – 10:30 PM</span>
                <span className="text-[10px] text-emerald-300 block">Open All 7 Days (Kitchen closes 10:00 PM)</span>
              </div>

              <div className="pt-1">
                <strong className="text-white block font-semibold">Location in Faridkot:</strong>
                <span className="text-[11px] leading-relaxed block">
                  Opposite Gaushala, near MGM School, Faridkot, Punjab 151203
                </span>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={cafe.phoneHref}
                  className="group/foot-phone flex items-center justify-between gap-2 rounded-xl bg-white/5 border border-emerald-800/70 p-2.5 text-white hover:bg-white/10 hover:border-emerald-400/40 transition-all"
                  title="Click to dial 078145 00305"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-[#5cdbb5] group-hover/foot-phone:bg-[#00a884] group-hover/foot-phone:text-white transition-all">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-emerald-300/80 font-medium">Order Hotline</span>
                      <span className="text-xs font-bold">{cafe.phone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] rounded-md bg-emerald-400/15 text-emerald-200 px-2 py-0.5 font-bold group-hover/foot-phone:bg-[#00a884] group-hover/foot-phone:text-white transition-all">
                    Call
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenEmailModal("Website Footer Inquiry")}
                  className="group/foot-mail flex items-center justify-between gap-2 rounded-xl bg-white/5 border border-emerald-800/70 p-2.5 text-white hover:bg-white/10 hover:border-emerald-400/40 transition-all w-full cursor-pointer text-left"
                  title="Click to send email to danialscafeandbistro@gmail.com"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-[#5cdbb5] group-hover/foot-mail:bg-[#00a884] group-hover/foot-mail:text-white transition-all">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-[10px] text-emerald-300/80 font-medium">Email Inquiry</span>
                      <span className="text-xs font-bold truncate">{cafe.email}</span>
                    </div>
                  </div>
                  <span className="text-[10px] rounded-md bg-emerald-400/15 text-emerald-200 px-2 py-0.5 font-bold group-hover/foot-mail:bg-[#00a884] group-hover/foot-mail:text-white transition-all shrink-0">
                    Email
                  </span>
                </button>
              </div>

              <div className="pt-2">
                <a
                  href={cafe.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-spring inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-white/20 transition-all"
                >
                  <Navigation className="h-3 w-3 text-[#5cdbb5]" />
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods Bar */}
        <div className="mt-12 rounded-2xl border border-emerald-900 bg-[#08352d]/90 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#5cdbb5]">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Accepted Payment Methods
              </span>
              <span className="text-[11px] text-emerald-200/70">
                UPI (GPay, PhonePe, Paytm), Debit/Credit Cards &amp; Cash on Counter/Delivery
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
              UPI
            </span>
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
              Google Pay
            </span>
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
              PhonePe
            </span>
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
              Paytm
            </span>
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
              Visa / RuPay / Mastercard
            </span>
            <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-200 flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>100% Secure</span>
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Punjab Pride Bar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-emerald-900/80 pt-6 text-[11px] text-emerald-200/60">
          <div>
            © {new Date().getFullYear()} Danial's Cafe &amp; Bistro. All rights reserved.
            <span className="hidden sm:inline mx-2">•</span>
            <span className="block sm:inline mt-1 sm:mt-0">
              Opposite Gaushala, near MGM School, Faridkot, Punjab 151203
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenPolicy("privacy-policy")}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenPolicy("terms-and-conditions")}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenPolicy("refund-and-cancellation")}
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-[#00a884] text-white px-3 py-1 font-bold transition-all border border-emerald-400/30 active:scale-95"
              title="Staff & Admin Portal (Management Login)"
            >
              <Shield className="h-3 w-3 text-[#5cdbb5]" />
              <span>Staff &amp; Admin Portal</span>
            </button>
            <span>•</span>
            <span className="text-emerald-300 font-medium">
              Made with ❤️ in Punjab
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Floating Bottom Bar for Mobile                                             */
/* -------------------------------------------------------------------------- */
function MobileBar({
  totalCartCount,
  onOpenOrderDrawer,
  onOpenReserveModal,
  onOpenEmailModal,
}: {
  totalCartCount: number;
  onOpenOrderDrawer: () => void;
  onOpenReserveModal: () => void;
  onOpenEmailModal: (subject?: string) => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-emerald-900 bg-[#083e35] py-2 px-3 text-[11px] font-medium text-white shadow-lg md:hidden">
      <button
        onClick={onOpenReserveModal}
        className="flex flex-col items-center gap-1 text-[#5cdbb5] active:scale-90 transition-transform duration-150 cursor-pointer"
      >
        <Calendar className="h-4 w-4" />
        <span>Reserve</span>
      </button>

      <button
        onClick={onOpenOrderDrawer}
        className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform duration-150 cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="h-4 w-4" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#00a884] text-[9px] font-bold text-white shadow-xs">
              {totalCartCount}
            </span>
          )}
        </div>
        <span>Order</span>
      </button>

      <a
        href={cafe.phoneHref}
        className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform duration-150"
        title="Call Danial's Cafe & Bistro"
      >
        <Phone className="h-4 w-4 text-[#5cdbb5]" />
        <span>Call</span>
      </a>

      <button
        type="button"
        onClick={() => onOpenEmailModal("Mobile Bottom Bar Inquiry")}
        className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform duration-150 cursor-pointer"
        title="Email Danial's Cafe & Bistro"
      >
        <Mail className="h-4 w-4 text-[#5cdbb5]" />
        <span>Email</span>
      </button>

      <a
        href={cafe.mapsLink}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform duration-150"
        title="Directions to Cafe"
      >
        <Navigation className="h-4 w-4 text-[#5cdbb5]" />
        <span>Directions</span>
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Interactive Slide-out Order Drawer with Menu Review & Customer Details     */
/* -------------------------------------------------------------------------- */
interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onConfirmOrder: (order: ConfirmedOrderDetails) => void;
  isSiteOnline?: boolean;
}

function OrderDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmOrder,
  isSiteOnline = true,
}: OrderDrawerProps) {
  const [orderType, setOrderType] = useState<OrderType>("Dine-In");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tableOrAddress, setTableOrAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentOption, setPaymentOption] = useState<
    "postpaid_cash" | "postpaid_upi" | "prepaid_upi"
  >("postpaid_cash");
  const [touched, setTouched] = useState<{
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    tableOrAddress?: boolean;
  }>({});
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, ci) => sum + ci.item.priceNumber * ci.quantity,
    0
  );

  // Field validation rules
  const isNameValid = name.trim().length >= 2;
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, "").replace(/^0/, "").replace(/^91/, "");
  const isPhoneValid = /^[6-9]\d{9}$/.test(cleanPhone);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const isAddressRequired = orderType === "Delivery";
  const isAddressValid = !isAddressRequired || tableOrAddress.trim().length >= 5;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      email: true,
      tableOrAddress: true,
    });

    if (cart.length === 0) {
      setFormError("Please select at least one item from the menu!");
      return;
    }
    if (!isNameValid) {
      setFormError("Please enter your full name (minimum 2 letters).");
      return;
    }
    if (!isPhoneValid) {
      setFormError("Please enter a valid 10-digit mobile number (e.g. 98765 43210).");
      return;
    }
    if (!isEmailValid) {
      setFormError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }
    if (isAddressRequired && !isAddressValid) {
      setFormError("Please enter your complete delivery address in Faridkot.");
      return;
    }

    setFormError("");

    const orderId = `DCB-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedPhone = cleanPhone.length === 10
      ? `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
      : phone.trim();

    const paymentLabel =
      paymentOption === "postpaid_cash"
        ? orderType === "Delivery"
          ? "Postpaid — Cash on Delivery (COD)"
          : "Postpaid — Pay at Counter / Table (Cash)"
        : paymentOption === "postpaid_upi"
        ? "Postpaid — UPI QR on Arrival (GPay/PhonePe/Paytm)"
        : "Prepaid — Instant Online UPI";

    const paymentType = paymentOption === "prepaid_upi" ? "Prepaid" : "Postpaid";

    const newOrder: ConfirmedOrderDetails = {
      orderId,
      orderType,
      customerName: name.trim(),
      customerPhone: formattedPhone,
      customerEmail: email.trim().toLowerCase(),
      tableOrAddress: tableOrAddress.trim(),
      notes: notes.trim(),
      items: [...cart],
      total: totalAmount,
      time: timeString,
      paymentMethod: paymentLabel,
      paymentType,
    };

    onConfirmOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex h-full w-full max-w-lg flex-col bg-white text-[#1c2e28] shadow-2xl animate-slide-in-right z-10">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-[#083e35] px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#5cdbb5]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">Your Order Tray</h2>
              <p className="text-xs text-emerald-200/80">
                {totalItems} {totalItems === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-spring flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-90 transition-all"
            aria-label="Close tray"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Empty Tray State */}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[#00a884] mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#083e35]">
                Your tray is empty
              </h3>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#5e6d66]">
                Explore our menu and tap <strong>"+ Add"</strong> on your favorite burgers, shakes,
                and pizzas to start your order.
              </p>
              <a
                href="#menu"
                onClick={onClose}
                className="btn-spring btn-shimmer mt-6 inline-flex items-center gap-2 rounded-full bg-[#00a884] px-6 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <span>Browse Menu</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <>
              {/* Selected Items List */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#6b8478]">
                  Selected Menu Items
                </h3>
                <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-[#fbf9f6] p-2">
                  {cart.map((ci) => (
                    <div
                      key={ci.item.id}
                      className="flex items-center justify-between p-3 transition-colors hover:bg-white rounded-xl"
                    >
                      <div className="flex items-center gap-3 flex-1 pr-3">
                        <img
                          src={getItemPhoto(ci.item)}
                          alt={ci.item.name}
                          className="h-12 w-12 rounded-xl object-cover shrink-0 border border-gray-200/80 shadow-2xs"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-[#1c2e28]">
                            {ci.item.name}
                          </h4>
                          <span className="text-xs text-[#00a884] font-semibold">
                            {ci.item.price} each
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-0.5 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.item.id, -1)}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-[#083e35]">
                            {ci.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.item.id, 1)}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-gray-500 hover:text-[#00a884] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="w-14 text-right text-xs font-bold text-[#083e35]">
                          ₹{ci.item.priceNumber * ci.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(ci.item.id)}
                          className="flex h-7 w-7 items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Type Toggle (Dine-In, Takeaway, Delivery) */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-[#6b8478]">
                  Order Preference
                </label>
                <div className="grid grid-cols-3 gap-2 rounded-2xl bg-gray-100 p-1.5">
                  {(["Dine-In", "Takeaway", "Delivery"] as OrderType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`btn-spring rounded-xl py-2 text-xs font-bold transition-all duration-200 ${
                        orderType === type
                          ? "bg-[#083e35] text-white shadow-xs"
                          : "text-gray-600 hover:text-[#083e35]"
                      }`}
                    >
                      {type === "Dine-In" && "🍽️ "}
                      {type === "Takeaway" && "🥡 "}
                      {type === "Delivery" && "🛵 "}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Information Form with Validation */}
              <form id="order-form" onSubmit={handleConfirm} className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-[#6b8478]">
                    Your Contact &amp; Order Details
                  </h3>
                  <span className="text-[10px] text-gray-500 font-medium">
                    * Required fields
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-gray-700">
                        Full Name *
                      </label>
                      {touched.name && isNameValid && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (!touched.name) setTouched((prev) => ({ ...prev, name: true }));
                      }}
                      onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                      placeholder="e.g. Amanpreet Singh"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-gray-800 transition-all focus:outline-none ${
                        touched.name && !isNameValid
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : touched.name && isNameValid
                          ? "border-emerald-400 bg-emerald-50/15 focus:border-[#00a884] focus:ring-2 focus:ring-emerald-100"
                          : "border-gray-200 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
                      }`}
                    />
                    {touched.name && !isNameValid && (
                      <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600 animate-in fade-in">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        <span>Please enter your name (min 2 characters)</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-gray-700">
                        Phone Number (10 Digits) *
                      </label>
                      {touched.phone && isPhoneValid && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (!touched.phone) setTouched((prev) => ({ ...prev, phone: true }));
                      }}
                      onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                      placeholder="e.g. 98765 43210"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-gray-800 transition-all focus:outline-none ${
                        touched.phone && !isPhoneValid
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : touched.phone && isPhoneValid
                          ? "border-emerald-400 bg-emerald-50/15 focus:border-[#00a884] focus:ring-2 focus:ring-emerald-100"
                          : "border-gray-200 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
                      }`}
                    />
                    {touched.phone && !isPhoneValid && (
                      <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600 animate-in fade-in">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        <span>Enter a valid 10-digit mobile number</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-gray-700">
                      Email Address (for Order Receipt &amp; Updates) *
                    </label>
                    {touched.email && isEmailValid && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" /> Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (!touched.email) setTouched((prev) => ({ ...prev, email: true }));
                      }}
                      onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                      placeholder="e.g. yourname@gmail.com"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-gray-800 transition-all focus:outline-none ${
                        touched.email && !isEmailValid
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : touched.email && isEmailValid
                          ? "border-emerald-400 bg-emerald-50/15 focus:border-[#00a884] focus:ring-2 focus:ring-emerald-100"
                          : "border-gray-200 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
                      }`}
                    />
                  </div>
                  {touched.email && !isEmailValid ? (
                    <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600 animate-in fade-in">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span>Please enter a valid email address (e.g. name@gmail.com)</span>
                    </p>
                  ) : (
                    <p className="mt-1 text-[10px] text-gray-500">
                      We'll send your verified receipt and order preparation updates here.
                    </p>
                  )}
                </div>

                {/* Table Number or Delivery Address */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-gray-700">
                      {orderType === "Dine-In"
                        ? "Table Number (if already seated)"
                        : orderType === "Delivery"
                        ? "Delivery Address in Faridkot *"
                        : "Pickup Timing Instructions"}
                    </label>
                    {isAddressRequired && touched.tableOrAddress && isAddressValid && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required={isAddressRequired}
                    value={tableOrAddress}
                    onChange={(e) => {
                      setTableOrAddress(e.target.value);
                      if (!touched.tableOrAddress) setTouched((prev) => ({ ...prev, tableOrAddress: true }));
                    }}
                    onBlur={() => setTouched((prev) => ({ ...prev, tableOrAddress: true }))}
                    placeholder={
                      orderType === "Dine-In"
                        ? "e.g. Table 4 (or leave blank if ordering at counter)"
                        : orderType === "Delivery"
                        ? "e.g. House 14, Near Gaushala, Faridkot"
                        : "e.g. Ready for pickup in 20 mins"
                    }
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-gray-800 transition-all focus:outline-none ${
                      isAddressRequired && touched.tableOrAddress && !isAddressValid
                        ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : isAddressRequired && touched.tableOrAddress && isAddressValid
                        ? "border-emerald-400 bg-emerald-50/15 focus:border-[#00a884] focus:ring-2 focus:ring-emerald-100"
                        : "border-gray-200 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
                    }`}
                  />
                  {isAddressRequired && touched.tableOrAddress && !isAddressValid && (
                    <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600 animate-in fade-in">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span>Please enter your full delivery address in Faridkot</span>
                    </p>
                  )}
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Special Cooking / Serving Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra spicy, less ice in shake, extra ketchup"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 focus:border-[#00a884] focus:outline-none focus:ring-1 focus:ring-[#00a884]"
                  />
                </div>

                {/* Payment Method Selector — Postpaid Enabled */}
                <div className="space-y-2.5 pt-1 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs uppercase tracking-wider font-bold text-[#6b8478]">
                        Payment Mode
                      </label>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-[#008769]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00a884] animate-pulse" />
                        Postpaid Enabled
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Pay ₹0 Now
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {/* Option 1: Postpaid Cash */}
                    <button
                      type="button"
                      onClick={() => setPaymentOption("postpaid_cash")}
                      className={`relative flex flex-col justify-between rounded-2xl border p-3 text-left transition-all duration-200 ${
                        paymentOption === "postpaid_cash"
                          ? "border-[#00a884] bg-emerald-50/50 ring-2 ring-[#00a884]/30 shadow-xs"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                            paymentOption === "postpaid_cash"
                              ? "bg-[#00a884] text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Banknote className="h-4 w-4" />
                        </div>
                        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-800">
                          Recommended
                        </span>
                      </div>

                      <div className="mt-2.5">
                        <div className="font-bold text-xs text-[#083e35]">
                          Postpaid Cash
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                          {orderType === "Delivery"
                            ? "Cash on Delivery"
                            : "Pay Cash at Table / Counter"}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px]">
                        <span className="text-gray-400">Due Now</span>
                        <span className="font-extrabold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                          ₹0
                        </span>
                      </div>
                    </button>

                    {/* Option 2: Postpaid UPI QR on Arrival */}
                    <button
                      type="button"
                      onClick={() => setPaymentOption("postpaid_upi")}
                      className={`relative flex flex-col justify-between rounded-2xl border p-3 text-left transition-all duration-200 ${
                        paymentOption === "postpaid_upi"
                          ? "border-[#00a884] bg-emerald-50/50 ring-2 ring-[#00a884]/30 shadow-xs"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                            paymentOption === "postpaid_upi"
                              ? "bg-[#00a884] text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <QrCode className="h-4 w-4" />
                        </div>
                        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                          Postpaid
                        </span>
                      </div>

                      <div className="mt-2.5">
                        <div className="font-bold text-xs text-[#083e35]">
                          Postpaid UPI QR
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                          Scan GPay / PhonePe / Paytm upon arrival
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px]">
                        <span className="text-gray-400">Due Now</span>
                        <span className="font-extrabold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                          ₹0
                        </span>
                      </div>
                    </button>

                    {/* Option 3: Prepaid UPI */}
                    <button
                      type="button"
                      onClick={() => setPaymentOption("prepaid_upi")}
                      className={`relative flex flex-col justify-between rounded-2xl border p-3 text-left transition-all duration-200 ${
                        paymentOption === "prepaid_upi"
                          ? "border-[#00a884] bg-emerald-50/50 ring-2 ring-[#00a884]/30 shadow-xs"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                            paymentOption === "prepaid_upi"
                              ? "bg-[#00a884] text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Wallet className="h-4 w-4" />
                        </div>
                        <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-[9px] font-medium text-stone-600">
                          Prepaid
                        </span>
                      </div>

                      <div className="mt-2.5">
                        <div className="font-bold text-xs text-[#083e35]">
                          Instant UPI
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                          Pay online via UPI prior to food dispatch
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px]">
                        <span className="text-gray-400">Due Now</span>
                        <span className="font-extrabold text-stone-800">
                          ₹{totalAmount}
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Postpaid Guarantee Banner */}
                  <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0 shadow-xs">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <strong className="text-emerald-950 font-bold text-[11px]">
                            Danial's 100% Postpaid Customer Guarantee
                          </strong>
                          <span className="rounded bg-emerald-200/80 px-1 py-0.2 text-[9px] font-bold text-emerald-900">
                            Zero Advance Risk
                          </span>
                        </div>
                        <p className="text-[10px] text-emerald-800/90 leading-relaxed">
                          {paymentOption !== "prepaid_upi" ? (
                            <>
                              You pay <strong>₹0 right now</strong>. When our team delivers your piping hot meal, inspect your items first, then pay easily via <strong>Cash</strong> or <strong>any UPI app</strong>.
                            </>
                          ) : (
                            <>
                              Your online payment is safeguarded. If any dish is unavailable, an immediate refund will be processed to your account.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live validation summary status badge */}
                <div
                  className={`rounded-xl p-2.5 text-xs flex items-center gap-2 transition-all ${
                    isNameValid && isPhoneValid && isEmailValid && isAddressValid
                      ? "bg-emerald-50 text-[#008769] border border-emerald-200"
                      : "bg-amber-50/70 text-amber-800 border border-amber-200"
                  }`}
                >
                  {isNameValid && isPhoneValid && isEmailValid && isAddressValid ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-[#00a884] shrink-0" />
                      <span className="font-semibold text-[11px]">
                        All customer details verified &amp; ready to place order!
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                      <span className="text-[11px]">
                        Please enter valid name, 10-digit phone, and email to proceed.
                      </span>
                    </>
                  )}
                </div>

                {formError && (
                  <p className="rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-red-600 border border-red-200 animate-in fade-in flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </p>
                )}
              </form>

              {/* Bill Breakdown Summary */}
              <div className="rounded-2xl border border-gray-100 bg-[#fbf9f6] p-4 text-xs space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes &amp; Packaging</span>
                  <span className="text-[#00a884] font-semibold">Included</span>
                </div>

                {paymentOption !== "prepaid_upi" ? (
                  <>
                    <div className="flex justify-between items-center text-gray-700 border-t border-gray-200/80 pt-2 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span>Due Right Now:</span>
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                          Postpaid Active
                        </span>
                      </div>
                      <span className="font-extrabold text-[#00a884] text-sm">₹0</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-dashed border-gray-300 pt-2 font-extrabold text-sm text-[#083e35]">
                      <span>
                        Pay on Arrival ({paymentOption === "postpaid_cash" ? "Cash" : "UPI QR"}):
                      </span>
                      <span className="text-base text-[#083e35]">₹{totalAmount}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-sm text-[#083e35]">
                    <span>Total Amount (Prepaid):</span>
                    <span>₹{totalAmount}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer CTA */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 bg-white p-5 shadow-lg">
            {!isSiteOnline ? (
              <div className="space-y-2.5">
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 text-center font-bold space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-rose-700">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>Store Currently Closed (Offline)</span>
                  </div>
                  <p className="text-[11px] font-normal text-rose-600">
                    Online ordering is paused by management. Please call our hotline to place an order directly.
                  </p>
                </div>
                <a
                  href={cafe.phoneHref}
                  className="btn-spring btn-shimmer flex w-full items-center justify-center gap-2 rounded-full bg-[#083e35] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#052923] active:scale-95 transition-all"
                >
                  <Phone className="h-4 w-4 text-[#5cdbb5]" />
                  <span>Call {cafe.phoneDisplay} to Order</span>
                </a>
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  form="order-form"
                  className="group btn-spring btn-shimmer btn-glow-teal btn-icon-slide flex w-full items-center justify-between rounded-full bg-[#00a884] px-6 py-4 text-sm font-bold text-white shadow-lg hover:bg-[#009273] active:scale-95 transition-all"
                >
                  <div className="flex flex-col text-left">
                    <span>
                      {paymentOption !== "prepaid_upi"
                        ? "Confirm Postpaid Order"
                        : "Confirm & Place Order"}
                    </span>
                    <span className="text-[10px] font-normal text-emerald-100">
                      {paymentOption !== "prepaid_upi"
                        ? `Pay ₹0 now • ₹${totalAmount} on arrival`
                        : "Pay instantly via UPI"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base">
                      {paymentOption !== "prepaid_upi" ? `₹0 Now` : `₹${totalAmount}`}
                    </span>
                    <ArrowRight className="icon-slide h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </button>
                <p className="mt-2 text-center text-[10px] text-gray-500">
                  {paymentOption !== "prepaid_upi"
                    ? "Postpaid order: Pay ₹0 now. Pay via Cash or UPI when food arrives."
                    : "Orders are sent directly to Danial's Cafe & Bistro kitchen in Faridkot"}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Celebratory Confirmation Screen (Order Confirmed Modal)                    */
/* -------------------------------------------------------------------------- */
interface ConfirmedModalProps {
  order: ConfirmedOrderDetails | null;
  onClose: () => void;
  onStartNewOrder: () => void;
  onOpenEmailModal: (subject?: string) => void;
}

function ConfirmedOrderModal({
  order,
  onClose,
  onStartNewOrder,
  onOpenEmailModal,
}: ConfirmedModalProps) {
  if (!order) return null;

  const isPostpaid = order.paymentType === "Postpaid" || !order.paymentType;
  const paymentMethodLabel = order.paymentMethod || "Postpaid — Cash on Delivery";

  const buildWhatsAppMessage = () => {
    const itemsText = order.items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.item.name} (₹${i.item.priceNumber * i.quantity})`
      )
      .join("\n");

    const paymentLine = `*Payment Mode:* ${paymentMethodLabel}\n*Payment Status:* ${
      isPostpaid
        ? `Postpaid — Pay ₹${order.total} on Arrival / Service (₹0 paid online)`
        : `Prepaid — ₹${order.total} Paid Online`
    }\n`;

    return encodeURIComponent(
      `*ORDER PLACED - Danial's Cafe & Bistro*\n` +
        `Order ID: ${order.orderId}\n` +
        `Time: ${order.time}\n` +
        `Order Type: ${order.orderType}\n` +
        `Customer: ${order.customerName}\n` +
        `Phone: ${order.customerPhone}\n` +
        `Email: ${order.customerEmail}\n` +
        (order.tableOrAddress
          ? `Table/Address: ${order.tableOrAddress}\n`
          : "") +
        (order.notes ? `Special Notes: ${order.notes}\n` : "") +
        `\n${paymentLine}\n` +
        `*ITEMS ORDERED:*\n${itemsText}\n\n` +
        `*TOTAL BILL: ₹${order.total}* ${isPostpaid ? "(Payable on Delivery / Counter)" : ""}\n\n` +
        `Please confirm my order and estimated prep time. Thank you!`
    );
  };

  const whatsAppHref = `https://wa.me/917814500305?text=${buildWhatsAppMessage()}`;

  const emailReceiptHref = `mailto:${order.customerEmail}?subject=${encodeURIComponent(
    `Order Receipt ${order.orderId} - Danial's Cafe & Bistro`
  )}&body=${encodeURIComponent(
    `Hello ${order.customerName},\n\nThank you for ordering with Danial's Cafe & Bistro in Faridkot!\n\nORDER SUMMARY:\nOrder ID: ${order.orderId}\nOrder Type: ${order.orderType}\nPayment Mode: ${paymentMethodLabel}\nPayment Status: ${
      isPostpaid
        ? `Postpaid — ₹0 Paid Now, ₹${order.total} Due upon Arrival / Delivery`
        : `Prepaid — ₹${order.total} Paid Online`
    }\nOrder Time: ${order.time}\nPhone: ${order.customerPhone}\n${order.tableOrAddress ? `Address/Table: ${order.tableOrAddress}\n` : ""}\nITEMS:\n${order.items.map((i) => `• ${i.quantity}x ${i.item.name} (₹${i.item.priceNumber * i.quantity})`).join("\n")}\n\nGrand Total: ₹${order.total}\n\nYour fresh food is being prepared right now.\nFor any questions or changes, call us directly at 078145 00305.\n\nWarm regards,\nDanial's Cafe & Bistro\nOpposite Gaushala, near MGM School, Faridkot, Punjab 151203`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-[#1c2e28] shadow-2xl animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-spring absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 active:scale-90"
          aria-label="Close confirmation"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#00a884] shadow-md animate-bounce-subtle">
            <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
          </div>

          <span className="mt-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-[#00a884]">
            ORDER CONFIRMED
          </span>

          <h2 className="mt-2 font-display text-3xl font-bold text-[#083e35]">
            Thank You, {order.customerName}!
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Order Reference: <strong className="text-gray-800">{order.orderId}</strong> • Placed at {order.time}
          </p>
        </div>

        {/* Customer Verified Details Strip */}
        <div className="mt-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 p-3 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Customer:</span>
            <strong className="text-[#083e35]">{order.customerName}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Contact Phone:</span>
            <strong className="text-[#083e35]">{order.customerPhone}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Receipt Email:</span>
            <strong className="text-[#008769] font-bold truncate max-w-[200px]">
              {order.customerEmail}
            </strong>
          </div>
        </div>

        {/* Postpaid Payment Status Callout Banner */}
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 p-3.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs shrink-0">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-[#083e35]">
                <span>{paymentMethodLabel}</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                {isPostpaid
                  ? `Please keep ₹${order.total} ready in Cash or UPI when your food arrives (₹0 paid online)`
                  : `Amount ₹${order.total} prepaid online`}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[10px] px-2.5 py-1 uppercase tracking-wider shrink-0">
            {isPostpaid ? "Postpaid Active" : "Prepaid"}
          </span>
        </div>

        {/* Order Details Ticket Box */}
        <div className="mt-4 rounded-2xl border border-gray-100 bg-[#fbf9f6] p-5 text-xs">
          <div className="flex items-center justify-between border-b border-gray-200/70 pb-3">
            <div className="flex items-center gap-2 font-semibold text-[#083e35]">
              <Receipt className="h-4 w-4 text-[#00a884]" />
              <span>{order.orderType} Order</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 font-medium">
              <Clock className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Est. 15–20 Mins</span>
            </div>
          </div>

          {/* Items List */}
          <div className="my-3 max-h-40 overflow-y-auto space-y-2 pr-1">
            {order.items.map((ci) => (
              <div key={ci.item.id} className="flex justify-between text-gray-700">
                <span>
                  {ci.quantity} × {ci.item.name}
                </span>
                <span className="font-semibold text-[#083e35]">
                  ₹{ci.item.priceNumber * ci.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Table/Address if provided */}
          {order.tableOrAddress && (
            <div className="border-t border-gray-200/60 pt-2 text-[11px] text-gray-600">
              <strong>Location/Address:</strong> {order.tableOrAddress}
            </div>
          )}

          {/* Payment Method Line */}
          <div className="border-t border-gray-200/60 pt-2 flex justify-between text-[11px] text-gray-600">
            <span>Payment Mode:</span>
            <span className="font-semibold text-[#083e35]">{paymentMethodLabel}</span>
          </div>

          {/* Total */}
          <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-sm font-extrabold text-[#083e35]">
            <span>{isPostpaid ? "Total Due on Arrival" : "Total Bill"}</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5">
          {/* Send to WhatsApp button */}
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => recordWhatsAppClick("Order Confirmation Screen")}
            className="group btn-spring btn-shimmer btn-glow-teal flex items-center justify-center gap-2 rounded-full bg-[#00a884] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#008f6f] active:scale-95"
          >
            <Send className="h-4 w-4" />
            <span>Send Order Copy to Cafe WhatsApp</span>
          </a>

          {/* Send/Open Email Receipt with 1-Click Webmail & Copy */}
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#083e35] flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#00a884]" />
                <span>Order Receipt Options</span>
              </span>
              <span className="text-[11px] text-stone-500 font-mono truncate max-w-[170px]">
                {order.customerEmail}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Open in Gmail Web */}
              <button
                type="button"
                onClick={() => {
                  const su = encodeURIComponent(`Order Receipt #${order.orderId} - Danial's Cafe & Bistro`);
                  const body = encodeURIComponent(
                    `Hello ${order.customerName},\n\nOrder Receipt #${order.orderId}\nTotal Bill: ₹${order.total}\nPhone: ${order.customerPhone}\n\nDanial's Cafe & Bistro, Faridkot`
                  );
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      order.customerEmail
                    )}&su=${su}&body=${body}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                  toast.success("Opening receipt in Gmail Web...");
                }}
                className="btn-spring flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 py-2.5 px-2 text-red-700 font-bold active:scale-95 cursor-pointer"
                title="Send receipt copy via Gmail Web"
              >
                <Mail className="h-3.5 w-3.5 text-red-600" />
                <span>Gmail Web</span>
              </button>

              {/* Copy Receipt to Clipboard */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    const text = `DANIAL'S CAFE & BISTRO — ORDER RECEIPT\nOrder ID: ${order.orderId}\nCustomer: ${order.customerName}\nPhone: ${order.customerPhone}\nTotal: ₹${order.total}\nTime: ${order.time}\nAddress/Table: ${order.tableOrAddress || "Counter Pickup"}\nFaridkot, Punjab`;
                    await navigator.clipboard.writeText(text);
                    toast.success("Receipt details copied to clipboard!");
                  } catch {
                    toast.info(`Order ID: ${order.orderId}`);
                  }
                }}
                className="btn-spring flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 py-2.5 px-2 text-[#083e35] font-bold active:scale-95 cursor-pointer"
                title="Copy receipt summary to clipboard"
              >
                <Copy className="h-3.5 w-3.5 text-[#00a884]" />
                <span>Copy Receipt</span>
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={cafe.phoneHref}
              className="btn-spring flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-300 py-3 text-xs font-semibold text-[#083e35] hover:bg-gray-50 active:scale-95"
              title="Call Danial's Cafe"
            >
              <Phone className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Call Cafe</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenEmailModal(`Order Inquiry: ${order.orderId}`)}
              className="btn-spring flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-300 py-3 text-xs font-semibold text-[#083e35] hover:bg-gray-50 active:scale-95 cursor-pointer"
              title="Email Danial's Cafe"
            >
              <Mail className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Email Cafe</span>
            </button>

            <button
              onClick={onStartNewOrder}
              className="btn-spring flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-300 py-3 text-xs font-semibold text-[#083e35] hover:bg-gray-50 active:scale-95 cursor-pointer"
            >
              <span>New Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Interactive Table Reservation Modal with Multi-step Selection & Animations */
/* -------------------------------------------------------------------------- */
interface ReserveTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReservation: (details: TableReservationDetails) => void;
  isSiteOnline?: boolean;
}

function ReserveTableModal({
  isOpen,
  onClose,
  onConfirmReservation,
  isSiteOnline = true,
}: ReserveTableModalProps) {
  if (!isOpen) return null;

  const [guestsCount, setGuestsCount] = useState(2);
  const [date, setDate] = useState("Today");
  const [customDate, setCustomDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timeSlot, setTimeSlot] = useState("7:30 PM");
  const [seatingArea, setSeatingArea] = useState("Cozy Indoor (AC)");
  const [occasion, setOccasion] = useState("Casual Hangout");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [touched, setTouched] = useState<{
    name?: boolean;
    phone?: boolean;
    email?: boolean;
  }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const guestOptions = [1, 2, 3, 4, 5, 6, 8, 10];
  const dateOptions = ["Today", "Tomorrow", "Pick Date"];
  const timeSlots = [
    { period: "Lunch", times: ["12:30 PM", "1:30 PM", "2:30 PM"] },
    { period: "Evening", times: ["4:30 PM", "5:30 PM", "6:30 PM"] },
    { period: "Dinner", times: ["7:30 PM", "8:30 PM", "9:30 PM", "10:00 PM"] },
  ];
  const seatingOptions = [
    { id: "Cozy Indoor (AC)", label: "Cozy Indoor (AC)", desc: "Cool climate & soft lighting" },
    { id: "Window View Booth", label: "Window Booth", desc: "Aesthetic natural light & view" },
    { id: "Outdoor Courtyard", label: "Outdoor Garden", desc: "Open sky & breezy cafe vibes" },
    { id: "Family Lounge", label: "Family Lounge", desc: "Spacious sofa seating for groups" },
  ];
  const occasions = [
    "Casual Hangout",
    "Birthday Party 🎉",
    "Romantic Date ☕",
    "Family Feast 🍽️",
    "Business / Work 💻",
  ];

  const isNameValid = name.trim().length >= 2;
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, "").replace(/^0/, "").replace(/^91/, "");
  const isPhoneValid = /^[6-9]\d{9}$/.test(cleanPhone);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, phone: true, email: true });

    if (!isNameValid) {
      setFormError("Please enter your full name (minimum 2 letters).");
      return;
    }
    if (!isPhoneValid) {
      setFormError("Please enter a valid 10-digit mobile number (e.g. 98765 43210).");
      return;
    }
    if (!isEmailValid) {
      setFormError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    const finalDate = date === "Pick Date" ? customDate : date;
    const reservationId = `#RES-${Math.floor(1000 + Math.random() * 9000)}`;

    const formattedPhone = cleanPhone.length === 10
      ? `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
      : phone.trim();

    onConfirmReservation({
      reservationId,
      guestName: name.trim(),
      phone: formattedPhone,
      email: email.trim().toLowerCase(),
      guestsCount,
      date: finalDate,
      timeSlot,
      seatingArea,
      occasion,
      specialRequests: specialRequests.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative border-b border-gray-100 bg-gradient-to-r from-[#083e35] via-[#09473d] to-[#083e35] p-6 sm:p-7 text-white">
          <button
            type="button"
            onClick={onClose}
            className="btn-spring absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-90"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-[#5cdbb5] shadow-xs backdrop-blur-xs">
              <Calendar className="h-7 w-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                <Sparkles className="h-3 w-3" />
                <span>Instant Table Booking</span>
              </div>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                Reserve Your Table
              </h2>
              <p className="mt-0.5 text-xs text-emerald-100/80">
                Danial's Cafe &amp; Bistro — Opposite Gaushala, Faridkot
              </p>
            </div>
          </div>
        </div>

        {/* Modal Form Scrollable Body */}
        <form
          id="reservation-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-[#1c2e28]"
        >
          {/* 1. Guests Count */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#6b8478] mb-2.5">
              <span>1. How many guests?</span>
              <span className="text-[#083e35] font-extrabold normal-case text-sm">
                {guestsCount} {guestsCount === 1 ? "Person" : "People"}
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {guestOptions.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuestsCount(num)}
                  className={`select-spring flex h-10 w-12 items-center justify-center rounded-2xl text-xs font-bold transition-all ${
                    guestsCount === num
                      ? "bg-[#083e35] text-white shadow-md scale-105"
                      : "bg-[#f4faf7] text-gray-700 hover:bg-[#e6f5ef]"
                  }`}
                >
                  {num}
                  {num === 10 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Date Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6b8478] mb-2.5">
              2. Select Date
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {dateOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDate(opt)}
                  className={`select-spring rounded-2xl px-5 py-2.5 text-xs font-bold transition-all ${
                    date === opt
                      ? "bg-[#00a884] text-white shadow-md scale-105"
                      : "bg-[#f4faf7] text-gray-700 hover:bg-[#e6f5ef]"
                  }`}
                >
                  {opt}
                </button>
              ))}

              {date === "Pick Date" && (
                <input
                  type="date"
                  value={customDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 focus:border-[#00a884] focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* 3. Time Slot */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#6b8478] mb-2.5">
              <span>3. Preferred Time Slot</span>
              <span className="text-[#00a884] font-extrabold normal-case text-sm">
                {timeSlot}
              </span>
            </label>
            <div className="space-y-2.5">
              {timeSlots.map((group) => (
                <div key={group.period} className="flex flex-wrap items-center gap-2">
                  <span className="w-16 text-[11px] font-semibold text-gray-400">
                    {group.period}:
                  </span>
                  {group.times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTimeSlot(t)}
                      className={`select-spring rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                        timeSlot === t
                          ? "bg-[#083e35] text-white shadow-xs scale-105"
                          : "border border-gray-200 bg-white text-gray-700 hover:border-[#00a884]/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Seating Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6b8478] mb-2.5">
              4. Seating Preference
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {seatingOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSeatingArea(opt.id)}
                  className={`select-spring flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all ${
                    seatingArea === opt.id
                      ? "border-[#00a884] bg-emerald-50/60 ring-2 ring-[#00a884]/20 shadow-xs"
                      : "border-gray-150 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1c2e28]">{opt.label}</span>
                  <span className="mt-0.5 text-[11px] text-[#5e6d66]">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Occasion */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6b8478] mb-2.5">
              5. Occasion (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setOccasion(occ)}
                  className={`select-spring rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    occasion === occ
                      ? "bg-[#00a884] text-white shadow-xs font-semibold"
                      : "bg-[#f4faf7] text-gray-600 hover:bg-[#e6f5ef]"
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Guest Details with Validation */}
          <div className="border-t border-gray-100 pt-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6b8478]">
                6. Your Contact &amp; Guest Details
              </h3>
              <span className="text-[10px] text-gray-500 font-medium">
                * Required
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-semibold text-gray-700">
                    Full Name *
                  </label>
                  {touched.name && isNameValid && (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" /> Valid
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!touched.name) setTouched((prev) => ({ ...prev, name: true }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  placeholder="e.g. Jasmeet Kaur"
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-gray-800 transition-all focus:outline-none ${
                    touched.name && !isNameValid
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : touched.name && isNameValid
                      ? "border-emerald-400 bg-emerald-50/15 focus:border-[#00a884] focus:ring-2 focus:ring-emerald-100"
                      : "border-gray-200 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
                  }`}
                />
                {touched.name && !isNameValid && (
                  <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600 animate-in fade-in">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>Please enter your name (min 2 characters)</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-semibold text-gray-700">
                    Phone Number (10 Digits) *
                  </label>
                  {touched.phone && isPhoneValid && (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" /> Valid
                    </span>
                  )}
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (!touched.phone) setTouched((prev) => ({ ...prev, phone: true }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                  placeholder="e.g. 98765 43210"
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-gray-800 transition-all focus:outline-none ${
                    touched.phone && !isPhoneValid
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : touched.phone && isPhoneValid
                      ? "border-emerald-400 bg-emerald-50/15 focus:border-[#00a884] focus:ring-2 focus:ring-emerald-100"
                      : "border-gray-200 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
                  }`}
                />
                {touched.phone && !isPhoneValid && (
                  <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600 animate-in fade-in">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>Enter a valid 10-digit mobile number</span>
                  </p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-gray-700">
                  Email Address (for Table Confirmation Receipt) *
                </label>
                {touched.email && isEmailValid && (
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                    <CheckCircle2 className="h-3 w-3" /> Valid
                  </span>
                )}
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!touched.email) setTouched((prev) => ({ ...prev, email: true }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                placeholder="e.g. yourname@gmail.com"
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-gray-800 transition-all focus:outline-none ${
                  touched.email && !isEmailValid
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : touched.email && isEmailValid
                    ? "border-emerald-400 bg-emerald-50/15 focus:border-[#00a884] focus:ring-2 focus:ring-emerald-100"
                    : "border-gray-200 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
                }`}
              />
              {touched.email && !isEmailValid && (
                <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600 animate-in fade-in">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>Please enter a valid email address (e.g. name@gmail.com)</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Special Requests or Notes (Optional)
              </label>
              <input
                type="text"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Need high chair, quiet corner, birthday cake arrangement"
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 focus:border-[#00a884] focus:outline-none focus:ring-1 focus:ring-[#00a884]"
              />
            </div>

            {/* Live validation summary status badge */}
            <div
              className={`rounded-xl p-2.5 text-xs flex items-center gap-2 transition-all ${
                isNameValid && isPhoneValid && isEmailValid
                  ? "bg-emerald-50 text-[#008769] border border-emerald-200"
                  : "bg-amber-50/70 text-amber-800 border border-amber-200"
              }`}
            >
              {isNameValid && isPhoneValid && isEmailValid ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-[#00a884] shrink-0" />
                  <span className="font-semibold text-[11px]">
                    All guest details verified &amp; ready to reserve table!
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="text-[11px]">
                    Please enter valid name, 10-digit phone, and email to complete reservation.
                  </span>
                </>
              )}
            </div>

            {formError && (
              <p className="rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-red-600 border border-red-200 animate-in fade-in flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </p>
            )}
          </div>
        </form>

        {/* Modal Footer Actions */}
        <div className="border-t border-gray-100 bg-[#faf8f4] p-4 sm:p-5">
          {!isSiteOnline ? (
            <div className="space-y-2.5">
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 text-center font-bold space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-rose-700">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Table Reservations Paused (Store Offline)</span>
                </div>
                <p className="text-[11px] font-normal text-rose-600">
                  Online reservations are temporarily paused by management. Please call us to check table availability.
                </p>
              </div>
              <a
                href={cafe.phoneHref}
                className="btn-spring btn-shimmer flex w-full items-center justify-center gap-2 rounded-full bg-[#083e35] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#052923] active:scale-95 transition-all"
              >
                <Phone className="h-4 w-4 text-[#5cdbb5]" />
                <span>Call {cafe.phoneDisplay} to Reserve</span>
              </a>
            </div>
          ) : (
            <>
              <button
                type="submit"
                form="reservation-form"
                className="group btn-spring btn-shimmer btn-glow-teal btn-icon-slide flex w-full items-center justify-between rounded-full bg-[#00a884] px-6 py-4 text-sm font-bold text-white shadow-lg hover:bg-[#008f6f] active:scale-95 transition-all"
              >
                <span>Confirm &amp; Book Table ({guestsCount} Guests)</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-100 font-semibold">
                    {date === "Pick Date" ? customDate : date} • {timeSlot}
                  </span>
                  <ArrowRight className="icon-slide h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>
              <p className="mt-2 text-center text-[10px] text-gray-500">
                No booking fee • Free table reservation at Danial's Cafe &amp; Bistro Faridkot
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Celebratory Confirmed Table Reservation Modal                              */
/* -------------------------------------------------------------------------- */
interface ConfirmedReservationModalProps {
  reservation: TableReservationDetails | null;
  onClose: () => void;
}

function ConfirmedReservationModal({
  reservation,
  onClose,
}: ConfirmedReservationModalProps) {
  if (!reservation) return null;

  const buildWhatsAppMessage = () => {
    return encodeURIComponent(
      `*TABLE RESERVATION - Danial's Cafe & Bistro*\n` +
        `Reservation ID: ${reservation.reservationId}\n` +
        `Guest: ${reservation.guestName}\n` +
        `Phone: ${reservation.phone}\n` +
        `Email: ${reservation.email}\n` +
        `Guests: ${reservation.guestsCount} People\n` +
        `Date: ${reservation.date}\n` +
        `Time Slot: ${reservation.timeSlot}\n` +
        `Seating Area: ${reservation.seatingArea}\n` +
        `Occasion: ${reservation.occasion}\n` +
        (reservation.specialRequests
          ? `Special Request: ${reservation.specialRequests}\n`
          : "") +
        `\nPlease confirm our table reservation. Looking forward to our visit! Thank you.`
    );
  };

  const whatsAppHref = `https://wa.me/917814500305?text=${buildWhatsAppMessage()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-[#1c2e28] shadow-2xl animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-spring absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 active:scale-90"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebration Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef8f4] text-[#00a884] shadow-md animate-badge-pop">
            <CheckCircle2 className="h-10 w-10 text-[#00a884]" />
          </div>

          <span className="mt-4 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-[#083e35]">
            {reservation.reservationId}
          </span>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#083e35]">
            Table Reserved!
          </h2>
          <p className="mt-1 text-xs text-[#5e6d66] max-w-sm">
            We are delighted to welcome you to Danial's Cafe &amp; Bistro in Faridkot.
          </p>
        </div>

        {/* Reservation Card Details */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-[#fbf9f6] p-4 text-xs space-y-2.5">
          <div className="flex justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-500">Guest Name:</span>
            <strong className="text-[#1c2e28]">{reservation.guestName}</strong>
          </div>
          <div className="flex justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-500">Contact Phone:</span>
            <strong className="text-[#1c2e28]">{reservation.phone}</strong>
          </div>
          <div className="flex justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-500">Confirmation Email:</span>
            <strong className="text-[#008769] font-bold">{reservation.email}</strong>
          </div>
          <div className="flex justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-500">Date &amp; Time:</span>
            <strong className="text-[#00a884] font-bold">
              {reservation.date} at {reservation.timeSlot}
            </strong>
          </div>
          <div className="flex justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-500">Party Size:</span>
            <strong className="text-[#1c2e28]">
              {reservation.guestsCount} {reservation.guestsCount === 1 ? "Guest" : "Guests"}
            </strong>
          </div>
          <div className="flex justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-500">Seating Area:</span>
            <strong className="text-[#1c2e28]">{reservation.seatingArea}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Occasion:</span>
            <strong className="text-[#1c2e28]">{reservation.occasion}</strong>
          </div>
          {reservation.specialRequests && (
            <div className="border-t border-gray-200/60 pt-2 text-[11px] text-gray-600">
              <strong>Notes:</strong> {reservation.specialRequests}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => recordWhatsAppClick("Table Booking Confirmation")}
            className="group btn-spring btn-shimmer btn-glow-teal flex items-center justify-center gap-2 rounded-full bg-[#00a884] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#008f6f] active:scale-95"
          >
            <Send className="h-4 w-4" />
            <span>Send Confirmation to Cafe on WhatsApp</span>
          </a>

          <div className="flex gap-2">
            <a
              href={cafe.phoneHref}
              className="btn-spring flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-300 py-3 text-xs font-semibold text-[#083e35] hover:bg-gray-50 active:scale-95"
              title="Call Danial's Cafe"
            >
              <Phone className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Call Cafe</span>
            </a>

            <a
              href={cafe.emailHref}
              className="btn-spring flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-300 py-3 text-xs font-semibold text-[#083e35] hover:bg-gray-50 active:scale-95"
              title="Email Danial's Cafe"
            >
              <Mail className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Email Cafe</span>
            </a>

            <button
              onClick={onClose}
              className="btn-spring flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-300 py-3 text-xs font-semibold text-[#083e35] hover:bg-gray-50 active:scale-95"
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Website Offline / Maintenance Screen (Displayed when Admin turns site OFF) */
/* -------------------------------------------------------------------------- */
interface WebsiteOfflineScreenProps {
  siteStatus: SiteStatusConfig;
  onOpenAdmin: () => void;
  onBypass: () => void;
}

function WebsiteOfflineScreen({
  siteStatus,
  onOpenAdmin,
  onBypass,
}: WebsiteOfflineScreenProps) {
  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#1c2e28] flex flex-col justify-between relative overflow-hidden selection:bg-[#00a884] selection:text-white">
      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />

      {/* Top Header Minimal Strip */}
      <header className="relative z-10 border-b border-stone-200/70 bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#083e35] text-[#5cdbb5] shadow-md shadow-emerald-950/20">
              <Coffee className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl font-extrabold text-[#083e35]">
                Danial's Cafe &amp; Bistro
              </h1>
              <p className="text-[11px] font-medium text-stone-500">
                Opposite Gaushala, Faridkot, Punjab 151203
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="btn-spring inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-[#083e35] hover:bg-stone-50 active:scale-95 shadow-xs transition-all cursor-pointer"
            title="Open Management Portal"
          >
            <Shield className="h-3.5 w-3.5 text-[#00a884]" />
            <span>Staff Login</span>
          </button>
        </div>
      </header>

      {/* Main Hero Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-5 py-12 sm:py-16">
        <div className="w-full max-w-2xl rounded-3xl border border-stone-200/80 bg-white/95 p-7 sm:p-10 shadow-2xl backdrop-blur-md text-center space-y-6 animate-scale-up">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/70 bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-800 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Store Temporarily Closed • Maintenance Mode</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#083e35]">
              We'll Be Right Back!
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg mx-auto">
              {siteStatus.offlineMessage ||
                "Our online ordering and table reservations are currently paused by cafe management for kitchen preparation and maintenance. We will be back online shortly!"}
            </p>
          </div>

          {/* Direct Contact & Assistance Strip */}
          <div className="rounded-2xl border border-stone-200 bg-[#fbf9f5] p-5 text-left space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#083e35] flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Need Urgent Help or Have an Inquiry?</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href={cafe.phoneHref}
                className="btn-spring flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white p-3 hover:border-emerald-300 hover:shadow-xs transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#00a884] shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-[#083e35]">Call Cafe Counter</div>
                  <div className="text-[11px] text-stone-500 font-medium">{cafe.phoneDisplay}</div>
                </div>
              </a>

              <a
                href={cafe.whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => recordWhatsAppClick("Maintenance Page Inquiry")}
                className="btn-spring flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white p-3 hover:border-emerald-300 hover:shadow-xs transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25d366]/15 text-[#25d366] shrink-0">
                  <Send className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-[#083e35]">WhatsApp Message</div>
                  <div className="text-[11px] text-stone-500 font-medium">Quick WhatsApp Reply</div>
                </div>
              </a>
            </div>

            <div className="pt-2 border-t border-stone-200/60 flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-2">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#00a884]" />
                <span>Daily Operating Hours: 10:00 AM – 10:30 PM</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#00a884]" />
                <span>Opp. Gaushala, near MGM School, Faridkot</span>
              </span>
            </div>
          </div>

          {/* Action Buttons for Staff / Visitors */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="btn-spring btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#083e35] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#052923] active:scale-95 transition-all cursor-pointer"
            >
              <Power className="h-4 w-4 text-[#5cdbb5]" />
              <span>Staff &amp; Admin Login (Turn Site Back ON)</span>
            </button>

            <button
              type="button"
              onClick={onBypass}
              className="btn-spring w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
              title="Browse website in preview mode"
            >
              <span>Staff Preview Mode</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="relative z-10 border-t border-stone-200/70 bg-white/60 py-4 text-center text-xs text-stone-500">
        <p>Danial's Cafe &amp; Bistro • Faridkot, Punjab • Pure Vegetarian Kitchen</p>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Home Page Component                                                        */
/* -------------------------------------------------------------------------- */
function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] =
    useState<ConfirmedOrderDetails | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  // Reservation States
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [confirmedReservation, setConfirmedReservation] =
    useState<TableReservationDetails | null>(null);

  // Legal & Operational Policy Modal State
  const [activePolicyId, setActivePolicyId] = useState<string | null>(null);

  // Staff & Admin Portal State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Email Inquiry Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalSubject, setEmailModalSubject] = useState("General Cafe Inquiry");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScrollListener = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScrollListener, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollListener);
  }, []);

  const handleOpenEmailModal = (subject = "General Cafe Inquiry") => {
    setEmailModalSubject(subject);
    setIsEmailModalOpen(true);
  };

  // Master Website Online / Offline Operational State
  const [siteStatus, setSiteStatusState] = useState<SiteStatusConfig>(() => getSiteStatus());
  const [bypassMaintenance, setBypassMaintenance] = useState(false);

  // Track Pageview and check for #admin in URL
  useEffect(() => {
    recordPageView();

    const handleHash = () => {
      if (window.location.hash === "#admin") {
        setIsAdminModalOpen(true);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Sync site status via custom event
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

  const totalCartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, ci) => sum + ci.item.priceNumber * ci.quantity,
    0
  );

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleConfirmOrder = (order: ConfirmedOrderDetails) => {
    saveNewOrder(order);
    setIsOrderDrawerOpen(false);
    setConfirmedOrder(order);
    setCart([]);
  };

  const handleStartNewOrder = () => {
    setConfirmedOrder(null);
    setCart([]);
  };

  // If Website is turned OFF and not in preview mode, render full-screen Offline Screen
  if (!siteStatus.isOnline && !bypassMaintenance) {
    return (
      <div className="min-h-screen bg-[#faf8f4]">
        <WebsiteOfflineScreen
          siteStatus={siteStatus}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          onBypass={() => setBypassMaintenance(true)}
        />

        {/* Complete Admin & Management Command Center Modal */}
        <AdminPanelModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#1c2e28] selection:bg-[#00a884] selection:text-white">
      {/* Maintenance Bypass Notice Banner */}
      {!siteStatus.isOnline && (
        <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-rose-800 bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 px-4 py-2 text-xs font-semibold text-white shadow-lg sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-white animate-ping" />
            <AlertTriangle className="h-4 w-4 text-amber-200 shrink-0" />
            <span>
              <strong>STORE OFFLINE NOTICE:</strong> Public ordering is paused. You are viewing in Staff Preview Mode.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBypassMaintenance(false)}
              className="rounded-full bg-black/25 hover:bg-black/40 px-3 py-1 text-[11px] font-bold text-rose-100 transition-colors cursor-pointer"
            >
              Exit Preview
            </button>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="rounded-full bg-white text-rose-900 hover:bg-rose-50 px-3.5 py-1 text-[11px] font-extrabold shadow-xs transition-colors cursor-pointer"
            >
              Admin Controls
            </button>
          </div>
        </div>
      )}

      <Header
        totalCartCount={totalCartCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        onOpenReserveModal={() => setIsReserveModalOpen(true)}
        onOpenEmailModal={handleOpenEmailModal}
      />

      <main className="pb-16 md:pb-0">
        <Hero
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onOpenReserveModal={() => setIsReserveModalOpen(true)}
        />
        <Features onSelectFeature={setSelectedFeature} />
        <MenuSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        />
        <SpecialTreatBanner
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onOpenReserveModal={() => setIsReserveModalOpen(true)}
        />
        <GallerySection />
        <Testimonials />
        <FaqSection
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onOpenReserveModal={() => setIsReserveModalOpen(true)}
          onOpenEmailModal={handleOpenEmailModal}
        />
        <VisitUs
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onOpenReserveModal={() => setIsReserveModalOpen(true)}
          onOpenEmailModal={handleOpenEmailModal}
        />
      </main>

      {/* Interactive Feature Showcase Modal with Food Photos & Add to Order */}
      <FeatureShowcaseModal
        featureId={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
      />

      {/* Interactive Table Reservation Modal with Multi-step Selection */}
      <ReserveTableModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        onConfirmReservation={(details) => {
          saveNewReservation(details);
          setIsReserveModalOpen(false);
          setConfirmedReservation(details);
        }}
        isSiteOnline={siteStatus.isOnline}
      />

      {/* Confirmed Table Reservation Celebration Modal */}
      <ConfirmedReservationModal
        reservation={confirmedReservation}
        onClose={() => setConfirmedReservation(null)}
      />

      <Footer
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        onOpenReserveModal={() => setIsReserveModalOpen(true)}
        onOpenPolicy={(id) => setActivePolicyId(id)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenEmailModal={handleOpenEmailModal}
      />

      {/* Interactive Valid Legal Policies Modal */}
      <PolicyModal
        policyId={activePolicyId}
        onClose={() => setActivePolicyId(null)}
        onOpenPolicy={(id) => setActivePolicyId(id)}
        onOpenEmailModal={handleOpenEmailModal}
      />

      {/* Floating Discreet Staff & Admin Portal Quick Access Button */}
      <button
        type="button"
        onClick={() => setIsAdminModalOpen(true)}
        className="fixed bottom-6 left-5 z-40 flex items-center gap-2 rounded-full bg-[#083e35]/95 hover:bg-[#062c25] text-white px-3.5 py-2 text-xs font-bold shadow-2xl border border-emerald-400/35 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        title="Open Staff & Admin Portal (Management Login)"
      >
        <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[#5cdbb5] group-hover:bg-[#00a884] group-hover:text-white transition-colors">
          <Shield className="h-3 w-3" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="hidden sm:inline">Admin Portal</span>
      </button>

      {/* Floating Scroll-To-Top Button with Smooth Navigation */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => scrollToSection("top")}
          className="fixed bottom-20 md:bottom-20 left-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#083e35] text-white shadow-xl border border-emerald-400/40 hover:bg-[#00a884] active:scale-90 transition-all cursor-pointer group animate-in fade-in zoom-in duration-200"
          title="Scroll to Top of Page"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

      {/* Floating Quick Email / Contact Pill for Desktop */}
      <button
        type="button"
        onClick={() => handleOpenEmailModal("Floating Quick Contact")}
        className="fixed bottom-6 right-5 z-40 hidden md:flex items-center gap-2 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white px-4 py-2.5 text-xs font-bold shadow-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Send Email or Inquiry to Danial's Cafe"
      >
        <Mail className="h-4 w-4" />
        <span>Email Us</span>
      </button>

      {/* Complete Admin & Management Command Center Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <MobileBar
        totalCartCount={totalCartCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        onOpenReserveModal={() => setIsReserveModalOpen(true)}
        onOpenEmailModal={handleOpenEmailModal}
      />

      {/* Interactive Email & Inquiry Modal */}
      <EmailInquiryModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        initialSubject={emailModalSubject}
      />

      {/* Floating Bottom-Right Quick Order Pill (when items selected) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-20 right-5 z-40 animate-scale-up">
          <button
            onClick={() => setIsOrderDrawerOpen(true)}
            className="group btn-spring btn-shimmer btn-glow-teal flex items-center gap-3.5 rounded-full bg-[#083e35] px-6 py-3.5 text-white shadow-2xl border border-emerald-400/30 hover:bg-[#052923] active:scale-95 transition-all"
            title="View Order Tray & Confirm"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-[#5cdbb5]" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#00a884] text-[10px] font-extrabold text-white shadow-xs animate-badge-pop">
                {totalCartCount}
              </span>
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-200">
                Your Tray
              </span>
              <span className="text-sm font-extrabold text-white mt-0.5">
                ₹{totalCartPrice}
              </span>
            </div>
            <div className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Order Selection & Review Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onConfirmOrder={handleConfirmOrder}
        isSiteOnline={siteStatus.isOnline}
      />

      {/* Confirmed Order Celebration Modal */}
      <ConfirmedOrderModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onStartNewOrder={handleStartNewOrder}
        onOpenEmailModal={handleOpenEmailModal}
      />
    </div>
  );
}
