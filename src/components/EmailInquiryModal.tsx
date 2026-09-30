import { useState, useEffect } from "react";
import {
  Mail,
  X,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Phone,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { cafe } from "@/data/cafe";
import { saveCustomerMessage } from "@/lib/adminStore";

interface EmailInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export function EmailInquiryModal({
  isOpen,
  onClose,
  initialSubject = "General Cafe Inquiry",
}: EmailInquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubject(initialSubject);
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen, initialSubject]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(cafe.email);
      setCopiedEmail(true);
      toast.success("Email address copied to clipboard!", {
        description: cafe.email,
      });
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      toast.info(`Danial's Cafe Email: ${cafe.email}`);
    }
  };

  const openGmailWeb = () => {
    const su = encodeURIComponent(subject || "Inquiry - Danial's Cafe & Bistro");
    const bodyText = encodeURIComponent(
      `Hello Danial's Cafe & Bistro Team,\n\n${
        message ? `${message}\n\n` : "I would like to inquire about your menu and services.\n\n"
      }From: ${name || "A Customer"}\nPhone: ${phone || "Not specified"}\nEmail: ${email || ""}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${cafe.email}&su=${su}&body=${bodyText}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    toast.success("Opening Gmail Web composer in a new tab...");
  };

  const openOutlookWeb = () => {
    const su = encodeURIComponent(subject || "Inquiry - Danial's Cafe & Bistro");
    const bodyText = encodeURIComponent(
      `Hello Danial's Cafe Team,\n\n${
        message ? `${message}\n\n` : "I would like to inquire about your menu and services.\n\n"
      }From: ${name || "A Customer"}\nPhone: ${phone || "Not specified"}\nEmail: ${email || ""}`
    );
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${cafe.email}&subject=${su}&body=${bodyText}`;
    window.open(outlookUrl, "_blank", "noopener,noreferrer");
    toast.success("Opening Outlook Web composer in a new tab...");
  };

  const openDefaultMailClient = () => {
    const su = encodeURIComponent(subject || "Inquiry - Danial's Cafe & Bistro");
    const bodyText = encodeURIComponent(
      `Hello Danial's Cafe Team,\n\n${
        message ? `${message}\n\n` : "I would like to inquire about your menu and services.\n\n"
      }From: ${name || "A Customer"}\nPhone: ${phone || "Not specified"}`
    );
    window.location.href = `mailto:${cafe.email}?subject=${su}&body=${bodyText}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      toast.error("Please write a short message (at least 5 characters).");
      return;
    }

    setIsSubmitting(true);

    try {
      saveCustomerMessage({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        subject: subject.trim(),
        message: message.trim(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Email Inquiry Sent Successfully!", {
        description: "Our Faridkot team will reply to your email shortly.",
      });
    } catch {
      setIsSubmitting(false);
      toast.error("Failed to send message. Please try copying our email or calling us.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-5 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-[#faf8f4] text-[#1c2e28] shadow-2xl border border-emerald-900/10 overflow-hidden my-auto animate-scale-up">
        {/* Top Header Banner */}
        <div className="bg-[#083e35] px-6 py-5 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-emerald-100 hover:bg-white/20 active:scale-90 transition-all cursor-pointer"
            aria-label="Close Email Dialog"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00a884] text-white shadow-md">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5cdbb5]">
                  Official Contact &amp; Support
                </span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-200">
                  <Sparkles className="h-2.5 w-2.5 text-[#5cdbb5]" />
                  Active 10 AM – 10:30 PM
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mt-0.5 leading-tight">
                Send Us an Email
              </h2>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Danial's Cafe &amp; Bistro — Faridkot, Punjab
              </p>
            </div>
          </div>
        </div>

        {/* Quick 1-Click Launch Options Strip */}
        <div className="border-b border-stone-200/80 bg-white px-5 py-3 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
            Instant 1-Click Email Options:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Copy Email Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-spring flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-800 transition-all cursor-pointer active:scale-95"
              title="Copy email to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-stone-600" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            {/* Open in Gmail Web */}
            <button
              type="button"
              onClick={openGmailWeb}
              className="btn-spring flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100/80 px-3 py-2 text-xs font-semibold text-red-700 transition-all cursor-pointer active:scale-95"
              title="Compose directly in Gmail Web"
            >
              <ExternalLink className="h-3.5 w-3.5 text-red-600" />
              <span>Gmail Web</span>
            </button>

            {/* Open in Outlook Web */}
            <button
              type="button"
              onClick={openOutlookWeb}
              className="btn-spring flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/80 px-3 py-2 text-xs font-semibold text-blue-700 transition-all cursor-pointer active:scale-95"
              title="Compose in Outlook Web"
            >
              <ExternalLink className="h-3.5 w-3.5 text-blue-600" />
              <span>Outlook Web</span>
            </button>

            {/* Default Mail App */}
            <button
              type="button"
              onClick={openDefaultMailClient}
              className="btn-spring flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80 px-3 py-2 text-xs font-semibold text-[#083e35] transition-all cursor-pointer active:scale-95"
              title="Open Windows Mail / Outlook app"
            >
              <Mail className="h-3.5 w-3.5 text-[#00a884]" />
              <span>Mail App</span>
            </button>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500">
            <span className="truncate">
              Direct Address: <strong className="text-stone-800 font-mono">{cafe.email}</strong>
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="text-[#00a884] font-bold hover:underline shrink-0 ml-2 cursor-pointer"
            >
              {copiedEmail ? "✓ Copied" : "Click to Copy"}
            </button>
          </div>
        </div>

        {/* Modal Body: Either Success Screen or Direct Send Form */}
        <div className="p-5 sm:p-6 max-h-[68vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#00a884] shadow-md animate-bounce-subtle">
                <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
              </div>
              <div>
                <span className="rounded-full bg-emerald-100 text-[#008769] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Message Dispatched
                </span>
                <h3 className="font-display text-2xl font-bold text-[#083e35] mt-2">
                  Thank You, {name}!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Your message regarding <strong>"{subject}"</strong> has been delivered to
                  Danial's Cafe &amp; Bistro management. We typically respond within 1–2 hours
                  during business hours.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-stone-200 p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-500">Sender:</span>
                  <span className="font-bold text-stone-800">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Email:</span>
                  <span className="font-bold text-stone-800">{email}</span>
                </div>
                {phone && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Phone:</span>
                    <span className="font-bold text-stone-800">{phone}</span>
                  </div>
                )}
                <div className="border-t border-stone-100 pt-2 text-stone-600 italic">
                  "{message}"
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={openGmailWeb}
                  className="btn-spring rounded-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-bold shadow-xs cursor-pointer"
                >
                  Also Send via Gmail Web
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setMessage("");
                  }}
                  className="btn-spring rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 px-4 py-2 text-xs font-bold cursor-pointer"
                >
                  Send Another Message
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-spring rounded-full bg-[#083e35] hover:bg-[#062c25] text-white px-5 py-2 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-xl bg-emerald-50/80 border border-emerald-200/70 p-3 text-xs text-[#083e35] flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 text-[#00a884] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Fill out the form below to message Danial's Cafe directly, or use the 1-click
                  buttons above to open in your favorite email app.
                </span>
              </div>

              {/* Name & Phone in 2 Cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jasmeet Singh"
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 shadow-2xs focus:border-[#00a884] focus:outline-hidden focus:ring-2 focus:ring-[#00a884]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 098145 00000"
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 shadow-2xs focus:border-[#00a884] focus:outline-hidden focus:ring-2 focus:ring-[#00a884]/20 transition-all"
                  />
                </div>
              </div>

              {/* Email Address & Subject Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jasmeet@gmail.com"
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 shadow-2xs focus:border-[#00a884] focus:outline-hidden focus:ring-2 focus:ring-[#00a884]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Inquiry Topic / Reason <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 shadow-2xs focus:border-[#00a884] focus:outline-hidden focus:ring-2 focus:ring-[#00a884]/20 transition-all"
                  >
                    <option value="General Cafe Inquiry">General Cafe Inquiry &amp; Timings</option>
                    <option value="Table & Seating Reservation">Table &amp; Seating Reservation</option>
                    <option value="Birthday & Celebration Party">Birthday &amp; Celebration Party</option>
                    <option value="Bulk Food Catering (Events/Schools)">Bulk Food Catering (Events/Schools)</option>
                    <option value="Food Menu & Custom Diet">Food Menu &amp; Custom Diet Details</option>
                    <option value="Customer Feedback & Praise">Customer Feedback &amp; Suggestion</option>
                  </select>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Message / Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Danial's Cafe team, I would like to ask about..."
                  className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 shadow-2xs focus:border-[#00a884] focus:outline-hidden focus:ring-2 focus:ring-[#00a884]/20 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-spring btn-shimmer w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#00a884] hover:bg-[#008f6f] px-6 py-3.5 text-xs font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Email Message"}</span>
                </button>

                <button
                  type="button"
                  onClick={openGmailWeb}
                  className="btn-spring w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 px-5 py-3.5 text-xs font-semibold text-stone-700 active:scale-95 transition-all cursor-pointer"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-stone-500" />
                  <span>Open in Gmail</span>
                </button>
              </div>
            </form>
          )}

          {/* Quick Alternate Contacts Strip */}
          <div className="mt-6 border-t border-stone-200/80 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#00a884]" />
              <span>Need immediate assistance?</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={cafe.phoneHref}
                className="font-bold text-[#083e35] hover:text-[#00a884] hover:underline"
              >
                Call: {cafe.phone}
              </a>
              <span>•</span>
              <a
                href={cafe.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#00a884] hover:underline flex items-center gap-1"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
