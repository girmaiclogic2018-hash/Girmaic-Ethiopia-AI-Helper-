import React from "react";
import { 
  Briefcase, 
  Sprout, 
  GraduationCap, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  User, 
  Smartphone, 
  Check, 
  Send,
  RefreshCw,
  Clock,
  ChevronRight,
  Database,
  ArrowRight,
  Sparkles,
  Award,
  Lock,
  Unlock,
  Bell,
  BellRing,
  CheckCheck,
  X,
  Trash2,
  Shield,
  CreditCard,
  Star
} from "lucide-react";
import EthiopianPortal from "./EthiopianPortal";

interface PhoneSimulatorProps {
  selectedLanguage: "am" | "om" | "so" | "ti" | "en";
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  queryText: string;
  setQueryText: (text: string) => void;
  chatHistory: any[];
  isListening: boolean;
  isSpeaking: boolean;
  autoRead: boolean;
  setAutoRead: (read: boolean) => void;
  speechRate: number;
  setSpeechRate: (r: number) => void;
  ttsSupported: boolean;
  startListening: () => void;
  stopSpeaking: () => void;
  speakResponse: (t: string) => void;
  handleAsk: (q?: string) => void;
  isLoading: boolean;
  
  // Offline Simulation
  isOffline: boolean;
  setIsOffline: (off: boolean) => void;
  offlineQueue: any[];
  
  // CV Builder States
  cvFullName: string;
  setCvFullName: (v: string) => void;
  cvProfession: string;
  setCvProfession: (v: string) => void;
  cvEmailAddr: string;
  setCvEmailAddr: (v: string) => void;
  cvPhoneNum: string;
  setCvPhoneNum: (v: string) => void;
  cvEducation: string;
  setCvEducation: (v: string) => void;
  cvSkillsTag: string;
  setCvSkillsTag: (v: string) => void;
  cvExperience: string;
  setCvExperience: (v: string) => void;
  cvAiSummary: string;
  isCvOptimative: boolean;
  onOptimizeCv: () => void;

  // STEM Quiz States
  EXAM_PREP_QUIZZES: any[];
  currentQuizIndex: number;
  selectedQuizAnswer: number | null;
  quizScore: number;
  onQuizAnswer: (idx: number) => void;
  quizFeedback: string;
  isQuizChecked: boolean;
  onNextQuestion: () => void;

  // Agri States
  cropType: "Teff" | "Wheat" | "Maize";
  setCropType: (v: "Teff" | "Wheat" | "Maize") => void;
  acreageVal: number;
  setAcreageVal: (v: number) => void;
  soilType: "Vertisol" | "Nitosol";
  setSoilType: (v: "Vertisol" | "Nitosol") => void;
  calculatedUrea: number;
  calculatedNps: number;
  fertilizerReport: string;
  onCalculateSoil: () => void;

  // Portal States
  userSession: any;
  setUserSession: React.Dispatch<React.SetStateAction<any>>;
  onAddOfflineAction: (type: string, label: string, payload: any) => void;
}

export default function PhoneSimulator({
  selectedLanguage,
  selectedCategory,
  setSelectedCategory,
  queryText,
  setQueryText,
  chatHistory,
  isListening,
  isSpeaking,
  autoRead,
  setAutoRead,
  speechRate,
  setSpeechRate,
  ttsSupported,
  startListening,
  stopSpeaking,
  speakResponse,
  handleAsk,
  isLoading,
  
  isOffline,
  setIsOffline,
  offlineQueue,
  
  cvFullName,
  setCvFullName,
  cvProfession,
  setCvProfession,
  cvEmailAddr,
  setCvEmailAddr,
  cvPhoneNum,
  setCvPhoneNum,
  cvEducation,
  setCvEducation,
  cvSkillsTag,
  setCvSkillsTag,
  cvExperience,
  setCvExperience,
  cvAiSummary,
  isCvOptimative,
  onOptimizeCv,

  EXAM_PREP_QUIZZES,
  currentQuizIndex,
  selectedQuizAnswer,
  quizScore,
  onQuizAnswer,
  quizFeedback,
  isQuizChecked,
  onNextQuestion,

  cropType,
  setCropType,
  acreageVal,
  setAcreageVal,
  soilType,
  setSoilType,
  calculatedUrea,
  calculatedNps,
  fertilizerReport,
  onCalculateSoil,

  // Portal States
  userSession,
  setUserSession,
  onAddOfflineAction
}: PhoneSimulatorProps) {
  
  const [phoneTab, setPhoneTab] = React.useState<"home" | "cv" | "edu" | "agri" | "portal" | "expo" | "pricing">("pricing");
  
  // High-fidelity reactive toast notifications for professional interactive UX
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Interactive Pricing and Upgrade Simulation state
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("monthly");
  const [selectedUpgradePlan, setSelectedUpgradePlan] = React.useState<any | null>(null);
  const [checkoutGateway, setCheckoutGateway] = React.useState<"telebirr" | "chapa" | "cbe" | "stripe" | "paypal" | null>(null);
  const [isCheckoutProcessing, setIsCheckoutProcessing] = React.useState<boolean>(false);
  const [checkoutStatusLog, setCheckoutStatusLog] = React.useState<string[]>([]);
  const [activePlan, setActivePlan] = React.useState<string>("Basic");

  // Onboard Dev console sidebar state
  const [devSidebarTab, setDevSidebarTab] = React.useState<"logs" | "clerk" | "files">("logs");
  const [selectedFileCode, setSelectedFileCode] = React.useState<"App.tsx" | "Onboarding.tsx" | "tailwind.config.js" | "babel.config.js">("App.tsx");

  // Expo Onboarding / Clerk Simulation States
  const [onboardStep, setOnboardStep] = React.useState<"welcome" | "register" | "mfa" | "perfect" | "camera_scan">("welcome");
  const [onboardName, setOnboardName] = React.useState("");
  const [onboardEmail, setOnboardEmail] = React.useState("");
  const [onboardFayda, setOnboardFayda] = React.useState("");
  const [onboardRole, setOnboardRole] = React.useState("Farming Practitioner");
  const [onboardMfaCode, setOnboardMfaCode] = React.useState("");
  const [expoTheme, setExpoTheme] = React.useState<"alabaster" | "terracotta" | "honey">("alabaster");
  const [nativewindCompilationLog, setNativewindCompilationLog] = React.useState<string[]>([
    "Nativewind: Engine init.",
    "Nativewind: Styles parsed - Inter, JetBrainsMono.",
    "Clerk: Provider initialized successfully."
  ]);

  const addExpoLog = (msg: string) => {
    setNativewindCompilationLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 10)]);
  };

  // Notifications State & Persistence
  const [notifications, setNotifications] = React.useState<any[]>(() => {
    try {
      const cached = localStorage.getItem("girmaic_notifications");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        id: "notif-1",
        title: "Soil Moisture Alert",
        desc: "Optimal Teff seeding moisture detected in Bole zone.",
        category: "Soil Advisor",
        time: "5m ago",
        read: false,
        type: "agri"
      },
      {
        id: "notif-2",
        title: "National Fayda Gateway Sync",
        desc: "Secure citizen profile verification query finished successfully.",
        category: "Auth Shield",
        time: "1h ago",
        read: false,
        type: "portal"
      },
      {
        id: "notif-3",
        title: "AI CV Optimization Finished",
        desc: "Dynamic cover letter generation successfully indexed onto cloud node.",
        category: "CV Builder",
        time: "Yesterday",
        read: true,
        type: "cv"
      },
      {
        id: "notif-4",
        title: "Daily Science Challenge Unlocked",
        desc: "Keep your preparation score streak high. Today's quiz is ready.",
        category: "Education",
        time: "2d ago",
        read: true,
        type: "edu"
      }
    ];
  });

  const [notifDropdownOpen, setNotifDropdownOpen] = React.useState(false);

  // Sync to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem("girmaic_notifications", JSON.stringify(notifications));
    } catch (e) {}
  }, [notifications]);

  // Subscribe to real-time alerts server-sent events (SSE) stream
  React.useEffect(() => {
    let eventSource: EventSource | null = null;
    let reconnectTimeout: any = null;

    const connectSse = () => {
      if (isOffline) {
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
        return;
      }

      eventSource = new EventSource("/api/live-notifications");

      eventSource.onmessage = (event) => {
        try {
          const freshNotif = JSON.parse(event.data);
          setNotifications(prev => {
            // Guard against duplicates (Idempotent update)
            if (prev.some(item => item.id === freshNotif.id)) {
              return prev;
            }
            return [freshNotif, ...prev];
          });
        } catch (e) {
          console.error("Error decoding SSE stream data:", e);
        }
      };

      eventSource.onerror = (err) => {
        console.warn("Realtime stream disconnected. Attempting automatic reconnection...");
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
        reconnectTimeout = setTimeout(() => {
          connectSse();
        }, 5000);
      };
    };

    connectSse();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [isOffline]);

  // Notification action handlers
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const handleDeleteNotif = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAddDemoNotification = (title: string, desc: string, category: string, type: "agri" | "portal" | "cv" | "edu") => {
    const newNotif = {
      id: "notif-" + Math.floor(Math.random() * 90000 + 10000),
      title,
      desc,
      category,
      time: "Just now",
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Broadcast custom notification to all clients via server SSE
  const handleSendCustomBroadcast = async (title: string, desc: string, category: string, type: "agri" | "portal" | "cv" | "edu") => {
    if (isOffline) {
      handleAddDemoNotification(title, desc, category, type);
      return;
    }

    try {
      const resp = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, category, type })
      });
      if (!resp.ok) {
        throw new Error("Transmitter rejected payload.");
      }
    } catch (err) {
      console.warn("Broadcast relay failed, committing locally:", err);
      handleAddDemoNotification(title, desc, category, type);
    }
  };

  // Local helper translations inside mock phone
  const translateMock = (key: string) => {
    const dict: Record<string, Record<string, string>> = {
      carrier: { am: "ኢትዮ ቴሌኮም", en: "Ethio Telecom", om: "Safaricom ET", so: "Hormuud-ET", ti: "ኩባንያ ቴሌኮም" },
      voiceIntro: { am: "ግርማዊክ ድምጽ ረዳት", en: "Girmaic Voice Engine", om: "Gargaaraa Segalee", so: "Kaaliyaha Codka", ti: "ናይ ድምጺ ሓጋዚ" },
      offlineBanner: { am: "ኢንተርኔት ተቋርጧል (Simulated Offline)", en: "Offline Simulator Active", om: "Sararri haphateera", so: "Khadka waad ka baxday", ti: "መስመር ተቋሪፁ" }
    };
    return dict[key]?.[selectedLanguage] || dict[key]?.["en"] || key;
  };

  const currentQuiz = EXAM_PREP_QUIZZES[currentQuizIndex];

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start w-full transition-all animate-fade-in">
      
      {/* 1. SMARTPHONE Frame Simulator */}
      <div id="phone-container" className="mx-auto xl:mx-0 w-full max-w-[390px] rounded-[52px] border-[12px] border-stone-800 bg-[#161616] shadow-3xl overflow-hidden relative flex flex-col h-[750px]">
        
        {/* Notch Camera */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-stone-800 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-stone-900 border border-stone-800" />
        </div>

        {/* Status Bar */}
        <div className="h-9 bg-stone-950/90 pt-1 px-7 flex justify-between items-center text-[10px] font-mono text-stone-300 z-40 select-none">
          <div className="flex items-center gap-1.5">
            <span>{translateMock("carrier")}</span>
            {isOffline ? <WifiOff size={11} className="text-red-500 animate-pulse" /> : <Wifi size={11} className="text-green-500" />}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] pr-1">11:20 AM</span>
            <div className="w-6 h-3 border border-stone-400 rounded-sm relative p-0.5">
              <div className="h-full bg-green-500 rounded-2xs w-full" />
              <div className="w-0.5 h-1 bg-stone-400 rounded-2xs absolute -right-1 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Cinematic Floating System Toast Notification */}
        {toastMessage && (
          <div className="absolute top-12 left-3 right-3 bg-stone-900 border border-[#DAA520]/40 p-3 rounded-2xl shadow-2xl z-50 flex items-start gap-2.5 animate-bounce select-none">
            <span className="text-sm shrink-0">✨</span>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold text-[#E5D3B3] tracking-wider uppercase font-mono">// PORTAL RECORD TRANSITION</p>
              <p className="text-[10px] text-stone-300 leading-normal mt-0.5 font-sans">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-stone-500 hover:text-white transition-all text-[11px] font-bold px-1 py-0.5">✕</button>
          </div>
        )}

        {/* simulated wifi outage warning flash */}
        {isOffline && (
          <div className="bg-red-950/95 text-red-200 text-[10px] py-1 text-center font-bold tracking-tight border-b border-red-900 animate-pulse flex items-center justify-center gap-1">
            <span>⚠️ {translateMock("offlineBanner")}</span>
          </div>
        )}

        {/* Micro-Screen Inner Body */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-[#0d0d0d] p-4 pb-16 relative">
          
          {/* Sub-app Header branding inside phone */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-3.5 select-none pt-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#CD5C5C] to-[#DAA520] flex items-center justify-center text-[11px] font-black italic text-stone-100">G</div>
              <div>
                <h4 className="text-[10px] font-black tracking-tight leading-none text-[#E5D3B3]">GIRMAIC MVP</h4>
                <p className="text-[8px] opacity-50 mt-0.5 uppercase tracking-widest">Version 1.0 Mobile</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Dynamic Notification Bell with Badge */}
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer relative flex items-center justify-center ${
                  notifDropdownOpen 
                    ? "bg-[#E5D3B3]/20 border-[#E5D3B3] text-[#E5D3B3]" 
                    : "bg-stone-900 border-white/5 text-stone-300 hover:border-stone-700 hover:text-white"
                }`}
                title="Girmaic Citizens Notification Hub"
              >
                {notifications.filter(n => !n.read).length > 0 ? (
                  <BellRing size={12} className="text-[#DAA520] animate-pulse" />
                ) : (
                  <Bell size={12} />
                )}
                
                {/* Dynamic unread count badge */}
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#CD5C5C] text-white text-[7px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0d0d0d] shadow-md animate-bounce">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {/* Quick Offline toggle */}
              <button 
                onClick={() => setIsOffline(!isOffline)}
                className={`p-1 px-2 rounded-lg text-[9px] font-bold flex items-center gap-1 border cursor-pointer select-none transition-all ${
                  isOffline ? "bg-red-950/50 border-red-500/50 text-red-200" : "bg-green-950/50 border-green-500/50 text-green-200"
                }`}
              >
                {isOffline ? <WifiOff size={9} /> : <Wifi size={9} />}
                <span>{isOffline ? "Offline" : "Online"}</span>
              </button>
            </div>
          </div>

          {/* Notifications Dropdown Overlay */}
          {notifDropdownOpen && (
            <div className="absolute top-[60px] left-3 right-3 bg-[#111111] border border-[#E5D3B3]/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.95)] z-[200] p-3 text-stone-200 animate-fade-in select-none">
              <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-2">
                <div className="flex items-center gap-1.5 text-stone-100">
                  <BellRing size={12} className="text-[#DAA520]" />
                  <span className="font-extrabold text-[9px] uppercase tracking-wider font-mono">Citizen Alerts</span>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="bg-[#CD5C5C] text-white text-[7px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                      {notifications.filter(n => !n.read).length} New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[8px] text-stone-400 hover:text-[#E5D3B3] transition-all cursor-pointer font-mono uppercase bg-transparent border-none outline-none py-0.5 px-1 bg-stone-900 rounded"
                  >
                    Read All
                  </button>
                  <button
                    onClick={() => setNotifDropdownOpen(false)}
                    className="p-1 rounded bg-stone-950/60 text-stone-400 hover:text-white hover:bg-stone-800 transition-all cursor-pointer border-none"
                  >
                    <X size={10} />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-stone-500 font-serif italic text-[9px]">
                    No active alerts registered.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleToggleRead(n.id)}
                      className={`p-2 rounded-xl transition-all border flex flex-col gap-1 cursor-pointer ${
                        n.read
                          ? "bg-stone-950/40 border-stone-900 text-stone-500 opacity-65"
                          : "bg-stone-950 border-white/5 text-stone-200 hover:bg-stone-900"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[7.5px] font-mono tracking-tighter uppercase px-1 rounded bg-stone-900 text-stone-300 border border-white/5">
                            {n.category}
                          </span>
                          {!n.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CD5C5C]" />
                          )}
                        </div>
                        <span className="text-[7.5px] text-stone-500 font-mono shrink-0">{n.time}</span>
                      </div>

                      <div className="space-y-0.5">
                        <h5 className={`text-[8.5px] font-bold ${!n.read ? "text-[#E5D3B3]" : "text-stone-400"}`}>
                          {n.title}
                        </h5>
                        <p className="text-[8px] text-stone-400 leading-normal">{n.desc}</p>
                      </div>

                      <div className="flex justify-between items-center select-none pt-1 mt-0.5 border-t border-white/5 text-[7px] text-stone-500 font-mono">
                        <span className="flex items-center gap-0.5">
                          {n.read ? "✓ Active Read" : "⚡ Click to toggle read"}
                        </span>
                        <button
                          onClick={(e) => handleDeleteNotif(e, n.id)}
                          className="p-1 hover:text-red-400 transition-all border-none bg-transparent shrink-0 outline-none cursor-pointer"
                          title="Dismiss notification"
                        >
                          <Trash2 size={8} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Simulated Trigger Actions for Demonstration */}
              <div className="mt-2 text-[7px] bg-[#0c0c0c] border border-white/5 rounded-xl p-1.5 space-y-1">
                <div className="text-[#DAA520] font-mono tracking-widest text-[6.5px] uppercase font-bold text-center border-b border-white/5 pb-1 select-none">
                  DEMO NOTIFICATION EMITTERS
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddDemoNotification(
                        "Soil Moisture Processed",
                        "Optimized urea formulas computed for Addis Ababa area.",
                        "Soil Advisor",
                        "agri"
                      );
                    }}
                    className="py-1 px-1 bg-stone-900 border border-white/5 hover:bg-stone-850 hover:text-white text-stone-300 rounded text-[7px] transition-all cursor-pointer font-mono truncate"
                  >
                    🌱 Emit Soil Alert
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddDemoNotification(
                        "Security Alert Issued",
                        "Fayda credential verification rejected. Session isolated.",
                        "Auth Shield",
                        "portal"
                      );
                    }}
                    className="py-1 px-1 bg-stone-900 border border-white/5 hover:bg-stone-850 hover:text-white text-stone-300 rounded text-[7px] transition-all cursor-pointer font-mono truncate"
                  >
                    🛡️ Emit Gateway Alert
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddDemoNotification(
                        "Cover Letter Complete",
                        "AI resume successfully optimized & ready to save.",
                        "CV Expert",
                        "cv"
                      );
                    }}
                    className="py-1 px-1 bg-stone-900 border border-white/5 hover:bg-stone-850 hover:text-white text-stone-300 rounded border border-white/5 text-[7px] transition-all cursor-pointer font-mono truncate"
                  >
                    📝 Emit CV Complete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddDemoNotification(
                        "New Quiz Quest",
                        "Answer correctly today to secure your daily active badge.",
                        "STEM Portal",
                        "edu"
                      );
                    }}
                    className="py-1 px-1 bg-stone-900 border border-white/5 hover:bg-stone-850 hover:text-white text-stone-300 rounded border border-white/5 text-[7px] transition-all cursor-pointer font-mono truncate"
                  >
                    🎓 Emit Quiz Quest
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE MICRO-APP LAYCOUTS */}
          {!userSession?.loggedIn && phoneTab !== "portal" && phoneTab !== "expo" ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-4 space-y-6 animate-fade-in my-auto min-h-[450px]">
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#CD5C5C] to-[#DAA520] opacity-35 blur animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-stone-950 border border-[#E5D3B3]/40 flex items-center justify-center text-[#E5D3B3]">
                  <Lock size={22} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] tracking-wider text-stone-300 font-bold uppercase font-mono">Girmaic Secure Gateway</h3>
                <p className="text-[10px] text-stone-400 font-serif leading-relaxed max-w-[220px] mx-auto italic">
                  To protect user progress history, soil logs, and custom AI resume drafts, an active citizens session is required.
                </p>
              </div>

              {/* Action options */}
              <div className="w-full space-y-2.5 pt-2 max-w-[220px] select-none">
                <button
                  type="button"
                  onClick={() => setPhoneTab("portal")}
                  className="w-full py-2.5 bg-[#E5D3B3] text-[#121212] rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-white active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <Unlock size={11} />
                  <span>Log In / Sign Up</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserSession({
                      uid: "eth-usr-94821",
                      fullName: "Kidus Abebe",
                      email: "kidus.abebe@gmail.com",
                      phone: "+251911234567",
                      language: "am",
                      preferredWoreda: "Bole Woreda 03, Addis Ababa",
                      loggedIn: true,
                      createdAt: new Date().toISOString()
                    });
                  }}
                  className="w-full py-2 bg-stone-900/60 hover:bg-stone-900 border border-white/5 rounded-xl text-[9px] text-stone-400 uppercase tracking-widest font-mono hover:text-stone-200 transition-all cursor-pointer"
                >
                  ⚡ Fast Bypass Demo Login
                </button>
              </div>
            </div>
          ) : (
            <>
              {phoneTab === "home" && (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              
              {/* Voice Assist Indicator banner */}
              <div className="text-center py-4 space-y-2">
                <span className="text-[9px] bg-[#E5D3B3]/10 text-[#E5D3B3] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  {translateMock("voiceIntro")}
                </span>
                
                <h3 className="text-md font-serif italic text-white font-black leading-snug">
                  {selectedLanguage === "am" ? "በድምጽዎ ያውሩኝ" : "Speak naturally to Girmaic"}
                </h3>
                
                <p className="text-[10px] text-stone-400 font-serif max-w-[220px] mx-auto italic">
                  {selectedLanguage === "am" ? "የስራ፣ የትምህርት ወይም የግብርና ጥያቄዎን ይጠይቁ" : "Ask real-time questions in English or Amharic now"}
                </p>
              </div>

              {/* Glowing Mic Node */}
              <div className="flex flex-col items-center justify-center space-y-3.5 pb-4">
                <div className="relative">
                  {isListening && (
                    <div className="absolute inset-0 w-24 h-24 rounded-full border border-red-500/50 animate-ping" />
                  )}
                  <button
                    onClick={startListening}
                    className={`w-20 h-20 rounded-full flex items-center justify-center border shadow-xl transition-all cursor-pointer ${
                      isListening ? "bg-red-600 border-red-400 text-white animate-pulse" : "bg-stone-900 border-white/10 text-[#E5D3B3] hover:text-white"
                    }`}
                  >
                    {isListening ? <MicOff size={28} /> : <Mic size={28} />}
                  </button>
                </div>
                
                <span className="text-[9px] font-mono tracking-widest text-[#E5D3B3] uppercase">
                  {isListening ? "RECORDING MIC SOUNDS..." : "TAB TO CONVERSE VIA SOUNDS"}
                </span>

                {isListening && (
                  <div className="flex items-end justify-center gap-1.5 h-6">
                    <span className="w-1 bg-[#6B8E23] rounded-sm animate-pulse h-2.5"></span>
                    <span className="w-1 bg-[#DAA520] rounded-sm animate-pulse h-5"></span>
                    <span className="w-1 bg-[#CD5C5C] rounded-sm animate-pulse h-4"></span>
                    <span className="w-1 bg-[#DAA520] rounded-sm animate-pulse h-1.5"></span>
                  </div>
                )}
              </div>

              {/* Speech Synthesizer Mini Box */}
              <div className="bg-stone-900/45 p-3.5 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[8px] uppercase tracking-wider opacity-50 block">Language Voice Output (TTS)</span>
                <div className="flex items-center justify-between text-xs text-white/90">
                  <div className="flex items-center gap-1.5">
                    {isSpeaking ? (
                      <button onClick={stopSpeaking} className="p-1 px-2 bg-red-950 border border-red-900 rounded text-[10px] text-red-300 flex items-center gap-1">
                        <VolumeX size={10} /> <span>Stop Speaking</span>
                      </button>
                    ) : (
                      <button onClick={() => speakResponse("Selam! GIRMAIC voice helper is tuned and deployed for Ethiopia.")} className="p-1 px-2 bg-[#E5D3B3] text-[#121212] rounded text-[10px] font-bold flex items-center gap-1">
                        <Volume2 size={10} /> <span>Simulate TTS Voice</span>
                      </button>
                    )}
                  </div>
                  
                  {/* auto read */}
                  <label className="flex items-center gap-1.5 text-[9px] opacity-75 cursor-pointer">
                    <input type="checkbox" checked={autoRead} onChange={(e) => setAutoRead(e.target.checked)} className="rounded cursor-pointer" />
                    <span>Auto Talk</span>
                  </label>
                </div>
              </div>

            </div>
          )}

          {phoneTab === "cv" && (
            <div className="flex-1 flex flex-col space-y-4">
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                  <Briefcase size={12} /> Local AI CV Builder (V1.0)
                </h3>
                <p className="text-[9px] opacity-60 leading-normal mt-0.5">Enter details to build matching resume profiles. Hits Gemini server API internally to formulate professional summaries.</p>
              </div>

              {/* Form inputs */}
              <div className="space-y-2.5 flex-1 select-none text-[11px]">
                <div className="space-y-1">
                  <label className="text-[9px] text-stone-400 uppercase tracking-widest block">Candidate Full Name</label>
                  <input type="text" value={cvFullName} onChange={(e) => setCvFullName(e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] text-stone-400 uppercase tracking-widest block">Professional Category Title</label>
                  <input type="text" value={cvProfession} onChange={(e) => setCvProfession(e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-stone-400 uppercase tracking-widest block">University & Honors</label>
                  <input type="text" value={cvEducation} onChange={(e) => setCvEducation(e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-stone-400 uppercase tracking-widest block">Skills Stack (Comma-separated)</label>
                  <input type="text" value={cvSkillsTag} onChange={(e) => setCvSkillsTag(e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-stone-400 uppercase tracking-widest block">Experience details</label>
                  <textarea rows={2} value={cvExperience} onChange={(e) => setCvExperience(e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400 resize-none" />
                </div>

                <button
                  onClick={onOptimizeCv}
                  disabled={isCvOptimative}
                  className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isCvOptimative ? (
                    <>
                      <RefreshCw size={11} className="animate-spin" />
                      <span>Optimizing with Gemini API...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={11} />
                      <span>AI Optimize & Save CV Resume</span>
                    </>
                  )}
                </button>
              </div>

              {/* CV Resume Outcome Display */}
              <div className={`p-3 bg-stone-900/60 rounded-xl border border-white/5 space-y-1 ${cvAiSummary ? "block animate-fade-in" : "hidden"}`}>
                <span className="text-[8px] bg-rose-950 text-rose-300 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider block w-max">AI Engineered Outcomes</span>
                <p className="text-[10px] text-stone-300 leading-normal italic">"{cvAiSummary}"</p>
              </div>

            </div>
          )}

          {phoneTab === "edu" && (
            <div className="flex-1 flex flex-col space-y-4">
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-xs font-black uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                  <GraduationCap size={14} /> National STEM Prep Coach
                </h3>
                <p className="text-[9px] opacity-60 leading-normal mt-0.5">Solve National STEM questions from prior matric tests. Answers log tracking metrics directly to secure user nodes.</p>
              </div>

              {/* Progress */}
              <div className="flex justify-between items-center text-[9px] text-stone-400 font-mono">
                <span>ACTIVE PATH: GRADE 12 PREP</span>
                <span className="text-purple-300 font-bold">Solved correct: {quizScore} total</span>
              </div>

              {/* Question container */}
              <div className="bg-stone-900/85 p-4 rounded-2xl border border-white/5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[8px] uppercase tracking-wider text-[#DAA520] block">Question 0{currentQuizIndex + 1}</span>
                  <p className="text-xs text-white font-extrabold font-serif italic leading-relaxed">
                    {currentQuiz.q}
                  </p>
                  
                  {/* Options list */}
                  <div className="space-y-2 pt-2">
                    {currentQuiz.options.map((opt: string, idx: number) => {
                      const isSelected = selectedQuizAnswer === idx;
                      const isOptionCorrect = idx === currentQuiz.correct;
                      let btnBorder = "border-white/10 hover:border-purple-500/35";
                      let btnBg = "bg-stone-950";
                      
                      if (isQuizChecked) {
                        if (isOptionCorrect) {
                          btnBorder = "border-green-500";
                          btnBg = "bg-green-950/25 text-green-200";
                        } else if (isSelected) {
                          btnBorder = "border-red-500";
                          btnBg = "bg-red-950/25 text-red-200";
                        }
                      } else if (isSelected) {
                        btnBorder = "border-purple-500";
                        btnBg = "bg-purple-950/20";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isQuizChecked}
                          onClick={() => onQuizAnswer(idx)}
                          className={`w-full p-2.5 rounded-xl border text-left text-[11px] transition-all cursor-pointer ${btnBorder} ${btnBg}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {isQuizChecked && isOptionCorrect && <Check size={11} className="text-green-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback or stepper button */}
                {isQuizChecked && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <p className="text-[10px] text-stone-300 leading-normal font-serif italic">{quizFeedback}</p>
                    <button
                      onClick={onNextQuestion}
                      className="w-full py-1.5 bg-purple-500 hover:bg-purple-600 text-white font-black text-[10px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
                    >
                      <span>Continue Prep</span>
                      <ArrowRight size={10} />
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {phoneTab === "agri" && (
            <div className="flex-1 flex flex-col space-y-4">
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-xs font-black uppercase text-yellow-500 tracking-wider flex items-center gap-1.5">
                  <Sprout size={14} /> Woreda Crop Fertilizer advisor
                </h3>
                <p className="text-[9px] opacity-60 leading-normal mt-0.5">Calculates recommended kilograms of NPS complex and Urea for Sheger / Gofa agricultural districts matching soil metrics.</p>
              </div>

              {/* Form elements */}
              <div className="space-y-3 text-[11px] flex-1 select-none">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[8px] text-stone-400 uppercase block">Harvest Crop</label>
                    <select value={cropType} onChange={(e: any) => setCropType(e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none">
                      <option value="Teff">White Teff</option>
                      <option value="Wheat">Highland Wheat</option>
                      <option value="Maize">Yellow Maize</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] text-stone-400 uppercase block font-mono">Soil Category</label>
                    <select value={soilType} onChange={(e: any) => setSoilType(e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none">
                      <option value="Vertisol">Vertisol (Clayey)</option>
                      <option value="Nitosol">Nitosol (Sandy Loam)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-stone-400 uppercase">Farm acreage size</span>
                    <span className="text-yellow-400 font-bold">{acreageVal} Hectares</span>
                  </div>
                  <input type="range" min="0.5" max="10.0" step="0.5" value={acreageVal} onChange={(e) => setAcreageVal(parseFloat(e.target.value))} className="w-full accent-yellow-500 h-1 bg-stone-800 rounded-lg cursor-pointer" />
                </div>

                <button
                  onClick={onCalculateSoil}
                  className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-stone-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw size={11} />
                  <span>Calculate Recommended Fertilizer Ratio</span>
                </button>

                {/* Agri outcome */}
                <div className="bg-stone-900/90 rounded-2xl p-4 border border-white/5 space-y-3 mt-1.5 leading-relaxed text-[11px]">
                  <span className="text-[8px] bg-yellow-950 text-yellow-300 font-bold px-1.5 py-0.5 rounded uppercase block w-max">Calculated ratios</span>
                  
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-stone-950 p-2 rounded-xl border border-white/5">
                      <span className="text-[9px] text-stone-400 block uppercase font-mono">NPS Complex</span>
                      <p className="text-sm font-black text-white">{calculatedNps} kg</p>
                    </div>
                    <div className="bg-stone-950 p-2 rounded-xl border border-white/5">
                      <span className="text-[9px] text-stone-400 block uppercase font-mono">Urea Coated</span>
                      <p className="text-sm font-black text-white">{calculatedUrea} kg</p>
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-300 font-serif leading-relaxed italic border-t border-white/5 pt-2">"{fertilizerReport}"</p>
                </div>
              </div>

            </div>
          )}
            </>
          )}

          {phoneTab === "expo" && (
            <div className="flex-1 flex flex-col space-y-3 pb-4">
              <div className="border-b border-white/5 pb-2 flex justify-between items-center select-none">
                <div>
                  <h3 className="text-[11px] font-black uppercase text-[#DAA520] tracking-wider flex items-center gap-1.5">
                    <Smartphone size={12} className="text-[#DAA520]" />
                    <span>Expo Core • Nativewind v4</span>
                  </h3>
                  <p className="text-[8px] text-stone-500 leading-normal font-mono">ONBOARDING SIMULATION NODE</p>
                </div>
                <div className="flex gap-1">
                  <span className="text-[7.5px] font-mono bg-stone-900 border border-white/5 text-stone-400 px-1.5 py-0.5 rounded uppercase">
                    iOS & SDK 51 ready
                  </span>
                </div>
              </div>

              {/* LIVE EXPO SIMULATOR VIEWPORT */}
              <div 
                className={`flex-1 rounded-2xl border p-4.5 space-y-4 flex flex-col justify-between transition-colors duration-450 ${
                  expoTheme === "alabaster" 
                    ? "bg-stone-950 border-[#E5D3B3]/20" 
                    : expoTheme === "terracotta"
                    ? "bg-stone-950 border-[#CD5C5C]/20"
                    : "bg-stone-950 border-[#DAA520]/20"
                }`}
              >
                {/* Simulated Content container depending on current step */}
                {onboardStep === "welcome" && (
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DAA520] animate-ping" />
                        <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest">
                          Clerk & Nativewind Sandbox
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                        Selam, Onboard with <span className="text-[#E5D3B3] font-serif italic text-lg">Girmaic AI</span>
                      </h4>

                      <p className="text-[9.5px] text-stone-400 font-serif leading-relaxed italic">
                        "Enabling on-ground agronomic wisdom, interactive scientific prep challenges, and direct regional talent translations."
                      </p>

                      {/* Nativewind Styling Verification Box */}
                      <div className="p-3 bg-stone-900/60 rounded-xl border border-white/5 space-y-1.5">
                        <div className="flex items-center gap-1">
                          <Check size={9} className="text-[#DAA520]" />
                          <span className="text-[8px] font-mono font-bold text-stone-300 uppercase tracking-wide">
                            Nativewind Styles Work
                          </span>
                        </div>
                        <p className="text-[8.5px] text-stone-500 leading-normal">
                          Verification compiles responsive grid states and pair custom typography classes correctly in real time.
                        </p>
                        
                        <div className="flex gap-1 pt-1.5">
                          <span 
                            className={`text-[7.5px] px-1.5 py-0.5 rounded font-mono font-bold uppercase transition-all ${
                              expoTheme === "alabaster" 
                                ? "bg-[#E5D3B3]/20 text-[#E5D3B3]" 
                                : expoTheme === "terracotta"
                                ? "bg-[#CD5C5C]/20 text-[#CD5C5C]"
                                : "bg-[#DAA520]/20 text-[#DAA520]"
                            }`}
                          >
                            theme-{expoTheme} active
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setOnboardStep("register");
                        addExpoLog("Clerk: Started registration workflow.");
                      }}
                      className="w-full py-2 bg-[#E5D3B3] hover:bg-white text-stone-950 font-black text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md select-none"
                    >
                      Begin Onboarding View
                    </button>
                  </div>
                )}

                {onboardStep === "register" && (
                  <div className="space-y-3.5 flex-1 flex flex-col justify-between animate-fade-in text-left">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-[#CD5C5C] uppercase tracking-widest font-black">
                          ✓ STEP 1: CLERK REGISTRATION
                        </span>
                        <span className="text-[8px] font-mono text-stone-500">2 of 4</span>
                      </div>
                      
                      {/* Integrated Fast track Scanner button banner */}
                      <div className="bg-stone-900 border border-[#DAA520]/25 rounded-xl p-2 md:p-2.5 flex items-center justify-between gap-1 select-none">
                        <div className="space-y-0.5">
                          <span className="text-[8.5px] font-bold text-[#E5D3B3] flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                            Fast Track Identity ID
                          </span>
                          <p className="text-[7.5px] text-stone-400 leading-normal max-w-[150px]">
                            Scan your government issued Fayda card QR code to prefill instantly.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setOnboardStep("camera_scan");
                            addExpoLog("System: Opening mock QR code viewfinder sensor viewport.");
                          }}
                          className="py-1 px-2.5 bg-[#DAA520] hover:bg-[#c49216] text-stone-950 font-black text-[8px] uppercase tracking-wider rounded-lg shrink-0 transition-all cursor-pointer"
                        >
                          📷 Scan
                        </button>
                      </div>

                      <h4 className="text-sm font-extrabold text-white tracking-tight">
                        Fayda National Identity
                      </h4>

                      <div className="space-y-2.5">
                        <div className="space-y-0.5">
                          <label className="text-[7.5px] text-stone-400 uppercase font-mono tracking-wider">
                            Full Name
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. Kidus Abebe"
                            value={onboardName}
                            onChange={(e) => setOnboardName(e.target.value)}
                            className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-[10px] text-white outline-none focus:border-[#DAA520]"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <label className="text-[7.5px] text-stone-400 uppercase font-mono tracking-wider">
                            Email Address (SSO)
                          </label>
                          <input 
                            type="email" 
                            placeholder="e.g. kidus@gmail.com"
                            value={onboardEmail}
                            onChange={(e) => setOnboardEmail(e.target.value)}
                            className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-[10px] text-white outline-none focus:border-[#DAA520]"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <label className="text-[7.5px] text-[#CD5C5C] uppercase font-mono tracking-widest font-black flex items-center gap-1">
                            <span>National Fayda ID</span>
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. ET-9942-8821"
                            value={onboardFayda}
                            onChange={(e) => setOnboardFayda(e.target.value)}
                            className="w-full bg-stone-900 border border-[#CD5C5C]/35 rounded-lg p-1.5 text-[10px] text-white outline-none focus:border-[#CD5C5C]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[7.5px] text-stone-400 uppercase font-mono tracking-wider">
                            System Node Role
                          </label>
                          <select 
                            value={onboardRole} 
                            onChange={(e) => setOnboardRole(e.target.value)}
                            className="w-full bg-stone-900 border border-white/10 rounded-lg p-1 text-[10px] text-white outline-none cursor-pointer"
                          >
                            <option value="Farming Practitioner">Farming Practitioner</option>
                            <option value="Field Representative">Field Representative</option>
                            <option value="Expert Support">Expert Support</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setOnboardStep("welcome");
                          addExpoLog("Clerk: Sign up cancelled.");
                        }}
                        className="py-1.5 px-2 bg-stone-900 border border-white/5 hover:bg-stone-850 text-stone-400 rounded-lg text-[9px] uppercase tracking-wider transition-all cursor-pointer select-none"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          if (!onboardName.trim() || !onboardEmail.trim() || !onboardFayda.trim()) {
                            triggerToast("Verify Name, Email and Fayda values are written.");
                            addExpoLog("⚠️ validation failed. Name, Email, and Fayda values are required.");
                            return;
                          }
                          setOnboardStep("mfa");
                          addExpoLog(`Clerk: Dispatched signUp request for "${onboardEmail}". OTP sent to code listeners.`);
                        }}
                        className="flex-1 py-1.5 bg-[#DAA520] hover:bg-[#c6951b] text-stone-950 font-black rounded-lg text-[9px] uppercase tracking-wider transition-all cursor-pointer select-none"
                      >
                        Generate Clerk OTP
                      </button>
                    </div>
                  </div>
                )}

                {onboardStep === "camera_scan" && (
                  <div className="space-y-3 flex-1 flex flex-col justify-between animate-fade-in text-left">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center select-none">
                        <span className="text-[8px] font-mono text-[#DAA520] uppercase tracking-widest font-black">
                          📷 QR VIEWFINDER SENSOR
                        </span>
                        <button
                          onClick={() => {
                            setOnboardStep("register");
                            addExpoLog("Scanner: Viewfinder sensor closed.");
                          }}
                          className="text-[9px] font-bold text-stone-400 hover:text-white font-mono"
                        >
                          Cancel ✕
                        </button>
                      </div>

                      <h4 className="text-sm font-extrabold text-white tracking-tight">Camera Feed Simulation</h4>
                      <p className="text-[8.5px] text-stone-400 leading-normal">
                        Fayda cards possess a localized high-density cryptographic QR matrix. Align your ID card boundary in the square focal window.
                      </p>

                      {/* Viewfinder Graphic Container */}
                      <div className="w-full aspect-[4/3] rounded-xl bg-stone-950 border border-white/5 relative overflow-hidden flex items-center justify-center p-3">
                        <div className="absolute inset-3.5 border border-[#DAA520]/20 rounded-lg flex items-center justify-center">
                          {/* Real-time corner ticks */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#DAA520]" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#DAA520]" />
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#DAA520]" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#DAA520]" />

                          {/* Scanner Laser Pulse */}
                          <div className="w-[90%] h-[1px] bg-[#CD5C5C]/80 shadow-[0_0_8px_#CD5C5C] absolute top-1/2 left-1/2 -translate-x-1/2 animate-bounce" />

                          <span className="text-[7px] font-mono text-stone-600 uppercase tracking-widest absolute bottom-2">
                            [ SCANNER ENGAGED ]
                          </span>
                        </div>

                        <div className="z-10 p-2.5 bg-stone-900/95 border border-white/5 rounded-xl max-w-[210px] text-center space-y-1">
                          <span className="text-[8.5px] font-mono font-black text-[#DAA520] flex items-center justify-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DAA520] animate-ping" />
                            ALIGN GOVERNMENT CODE
                          </span>
                          <p className="text-[7.5px] text-stone-400 leading-normal">
                            Click one of the official demo ID profiles below to scan a simulated physical card.
                          </p>
                        </div>
                      </div>

                      {/* Mock Profiles Selector */}
                      <div className="space-y-1.5">
                        <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest block font-bold">
                          TAP DIRECT PAYLOAD DECRYPTION:
                        </span>

                        <div className="grid grid-cols-1 gap-1">
                          {[
                            { name: "Kidus Abebe", email: "kidus.abebe@fayda.gov.et", id: "ET-2024-8842", role: "Field Representative" },
                            { name: "Martha Hailu", email: "martha.hailu@woreda.org", id: "ET-9104-1299", role: "Expert Support" },
                            { name: "Girmay Tekle", email: "girmay.tekle@girmaic.ai", id: "ET-7740-4100", role: "Farming Practitioner" }
                          ].map((citizen, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setOnboardName(citizen.name);
                                setOnboardEmail(citizen.email);
                                setOnboardFayda(citizen.id);
                                setOnboardRole(citizen.role);
                                setOnboardStep("register");
                                addExpoLog(`Scanner: Decoded QR card matrix belonging to ${citizen.name}.`);
                                addExpoLog(`System: Fast-track prefill succeeded for ${citizen.id}.`);
                              }}
                              className="p-2 bg-stone-900 hover:bg-stone-850 rounded-xl border border-white/5 flex justify-between items-center text-left transition-all cursor-pointer select-none"
                            >
                              <div>
                                <h5 className="text-[10px] font-extrabold text-white">{citizen.name}</h5>
                                <p className="text-[7.5px] font-mono text-stone-500">{citizen.id} • {citizen.role}</p>
                              </div>
                              <span className="text-[8.5px] font-bold text-[#DAA520] font-mono shrink-0">
                                SCAN ➔
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {onboardStep === "mfa" && (
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-[#DAA520] uppercase tracking-widest font-black">
                          🛡️ STEP 2: CLERK VALIDATION
                        </span>
                        <span className="text-[8px] font-mono text-stone-500">3 of 4</span>
                      </div>

                      <h4 className="text-sm font-extrabold text-white tracking-tight">
                        Check OTP Inbox
                      </h4>
                      <p className="text-[9px] text-stone-400 leading-normal italic font-serif">
                        Enter any mock 6-digit credential passcode to complete active session verification.
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <label className="text-[8px] text-stone-400 uppercase font-mono tracking-widest block text-center">
                          6-Digit OTP Key
                        </label>
                        <input 
                          type="text" 
                          maxLength={6}
                          placeholder="e.g. 748192"
                          value={onboardMfaCode}
                          onChange={(e) => setOnboardMfaCode(e.target.value)}
                          className="w-full bg-stone-900 border border-[#DAA520]/40 rounded-xl p-2.5 text-center text-white text-md font-mono tracking-widest outline-none focus:border-[#DAA520]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setOnboardStep("register");
                          addExpoLog("Clerk: OTP Challenge returned to edit.");
                        }}
                        className="py-1.5 px-2 bg-stone-900 border border-white/5 hover:bg-stone-850 text-stone-400 rounded-lg text-[9px] uppercase tracking-wider transition-all cursor-pointer select-none"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          if (onboardMfaCode.length < 4) {
                            triggerToast("OTP token code must be at least 4 digits.");
                            addExpoLog("⚠️ Validation failure: Clerk OTP code must be at least 4 digits.");
                            return;
                          }
                          setOnboardStep("perfect");
                          
                          // Write active logged in session as defined in AGENTS.md
                          setUserSession({
                            uid: "clerk-" + Math.floor(Math.random() * 90000 + 10000),
                            fullName: onboardName,
                            email: onboardEmail,
                            phone: "+251911234567",
                            language: selectedLanguage,
                            preferredWoreda: "Bole Woreda 03, Addis Ababa",
                            loggedIn: true,
                            createdAt: new Date().toISOString()
                          });

                          addExpoLog(`Clerk: session created successfully. ID: sess_active_${Date.now()}`);
                          addExpoLog(`System: girmay_user_session coaligned. Saved profile into secure cache.`);
                        }}
                        className="flex-1 py-1.5 bg-[#DAA520] hover:bg-[#c6951b] text-stone-950 font-black rounded-lg text-[9px] uppercase tracking-wider transition-all cursor-pointer select-none"
                      >
                        Confirm Code
                      </button>
                    </div>
                  </div>
                )}

                {onboardStep === "perfect" && (
                  <div className="space-y-4 flex-1 flex flex-col justify-between text-center select-none">
                    <div className="space-y-3.5 my-auto">
                      <div className="w-11 h-11 rounded-full bg-green-950 border border-green-500 flex items-center justify-center mx-auto text-green-400 font-extrabold text-md">
                        ✓
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-white">Expo Onboard Complete!</h4>
                        <p className="text-[9px] text-stone-400 leading-normal font-serif italic max-w-[210px] mx-auto">
                          "Profile has been successfully secured using Clerk and cross-checked with the National Fayda database."
                        </p>
                      </div>

                      <div className="p-2.5 bg-stone-900 border border-white/5 rounded-xl text-left text-[9px] space-y-1 font-mono">
                        <span className="text-[7.5px] text-[#DAA520] uppercase font-bold tracking-widest block">
                          Clerk Account Details:
                        </span>
                        <p className="truncate"><span className="text-stone-500">Name:</span> {onboardName}</p>
                        <p className="truncate"><span className="text-stone-500">Email:</span> {onboardEmail}</p>
                        <p className="truncate"><span className="text-stone-500">Fayda ID:</span> {onboardFayda}</p>
                        <p className="truncate"><span className="text-[#DAA520]">Role:</span> {onboardRole}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setOnboardStep("welcome");
                        setOnboardName("");
                        setOnboardEmail("");
                        setOnboardFayda("");
                        setOnboardMfaCode("");
                        addExpoLog("System: Onboard recycled. Swapping session nodes.");
                      }}
                      className="w-full py-1.5 bg-stone-900 hover:bg-stone-850 border border-white/5 text-stone-300 font-bold text-[9px] uppercase tracking-wider rounded-lg transition-all cursor-pointer select-none"
                    >
                      Reset Onboarding Cycle
                    </button>
                  </div>
                )}
              </div>

              {/* NATIVEWIND INTERACTIVE THEME COMPILER ACCENTER */}
              <div className="p-3 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[8px] font-mono text-[#E5D3B3] uppercase tracking-widest block select-none">
                  ⚡ Nativewind Accenting Compiler
                </span>
                
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => {
                      setExpoTheme("alabaster");
                      addExpoLog("Nativewind Compiler: Compiled warm-sand custom colors to Root style components.");
                    }}
                    className={`py-1 rounded text-[8px] font-mono font-bold transition-all cursor-pointer ${
                      expoTheme === "alabaster" 
                        ? "bg-[#E5D3B3] text-stone-950 font-black" 
                        : "bg-stone-900 text-stone-400 hover:text-white border border-white/5"
                    }`}
                  >
                    Sand Theme
                  </button>
                  <button
                    onClick={() => {
                      setExpoTheme("terracotta");
                      addExpoLog("Nativewind Compiler: Generated Indian Red (#CD5C5C) hex tokens.");
                    }}
                    className={`py-1 rounded text-[8px] font-mono font-bold transition-all cursor-pointer ${
                      expoTheme === "terracotta" 
                        ? "bg-[#CD5C5C] text-stone-950 font-black" 
                        : "bg-stone-900 text-stone-400 hover:text-white border border-white/5"
                    }`}
                  >
                    Terracotta
                  </button>
                  <button
                    onClick={() => {
                      setExpoTheme("honey");
                      addExpoLog("Nativewind Compiler: Pushed Honey yellow gradient mappings successfully.");
                    }}
                    className={`py-1 rounded text-[8px] font-mono font-bold transition-all cursor-pointer ${
                      expoTheme === "honey" 
                        ? "bg-[#DAA520] text-stone-950 font-black" 
                        : "bg-stone-900 text-stone-400 hover:text-white border border-white/5"
                    }`}
                  >
                    Honey Gold
                  </button>
                </div>
              </div>
            </div>
          )}

          {phoneTab === "portal" && (
            <EthiopianPortal
              userSession={userSession}
              setUserSession={setUserSession}
              offlineQueueLength={offlineQueue.length}
              quizzesCompleted={currentQuizIndex + (isQuizChecked ? 1 : 0)}
              quizScore={quizScore}
              soilCalculations={calculatedUrea !== 250 ? 5 : 1}
              chatCount={chatHistory.filter((m: any) => m.role === "user").length}
              onAddOfflineAction={onAddOfflineAction}
              isOffline={isOffline}
              notifications={notifications}
              onSendBroadcast={handleSendCustomBroadcast}
              onNavigateToPricing={() => setPhoneTab("pricing")}
            />
          )}

          {/* DYNAMIC SWISS-ETHIOPIAN PRICING & CHECKOUT SYSTEM */}
          {phoneTab === "pricing" && (
            <div className="flex-1 flex flex-col space-y-3.5 pb-16 overflow-y-auto max-h-[510px] pr-1 select-none text-left animate-fade-in relative">
              
              {/* Header block with elegant display typography */}
              <div className="border-b border-white/5 pb-2.5">
                <span className="text-[8px] font-mono text-[#DAA520] uppercase tracking-widest font-black block mb-0.5">
                  👑 PREMIUM SUITE PACKAGES
                </span>
                <h3 className="text-sm font-extrabold text-white tracking-tight leading-snug">
                  Agricultural & Academic Priority Tiers
                </h3>
                <p className="text-[10px] text-stone-400 font-serif italic leading-relaxed mt-1">
                  Secure localized agronomic stats, unlimited AI résumé iterations, and multi-lingual STEM test trackers.
                </p>
              </div>

              {/* MONTHLY / YEARLY BILLING TOGGLE */}
              <div className="bg-stone-900/60 p-2 rounded-xl border border-white/5 flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono text-stone-300 uppercase pl-1.5 font-bold">
                  Billing Cycle:
                </span>
                
                <div className="bg-stone-950 p-1 rounded-lg border border-white/5 flex gap-1 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setBillingCycle("monthly");
                      addExpoLog("Pricing Engine: Switched billing cycle to Monthly terms.");
                    }}
                    className={`py-1 px-2 text-[8px] uppercase font-bold rounded cursor-pointer transition-all ${
                      billingCycle === "monthly" 
                        ? "bg-[#E5D3B3] text-stone-950 font-black px-3" 
                        : "text-stone-500 hover:text-stone-300"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBillingCycle("yearly");
                      addExpoLog("Pricing Engine: Switched billing cycle to Annual terms (20% Save).");
                    }}
                    className={`py-1 px-2 text-[8px] uppercase font-bold rounded cursor-pointer transition-all flex items-center gap-1 ${
                      billingCycle === "yearly" 
                        ? "bg-[#DAA520] text-stone-950 font-black px-3" 
                        : "text-stone-500 hover:text-stone-300"
                    }`}
                  >
                    <span>Yearly</span>
                    <span className="bg-green-950 border border-green-500/30 text-green-400 text-[6px] px-1 rounded-full uppercase scale-90">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* CURRENT ACTIVE PLAN INDICATOR FOR CLERK IDENTITIES */}
              <div className="bg-stone-900 border border-white/5 p-2 px-2.5 rounded-xl flex items-center justify-between text-[9px]">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <Star size={10} className="text-[#DAA520]" />
                  <span>Logged Identity Tier: </span>
                  <span className="text-[#E5D3B3] font-bold font-mono uppercase bg-stone-950 px-1 py-0.2 rounded border border-white/5">
                    {activePlan === "Basic" ? "Birr Basic Tier (Free)" : activePlan === "Pro" ? "Fayda Pro Coach" : "Woreda Enterprise"}
                  </span>
                </div>
                {userSession?.loggedIn && (
                  <span className="text-[7.5px] text-green-400 font-mono tracking-wider">
                    ✓ SYNCHRONIZED
                  </span>
                )}
              </div>

              {/* THE 3 PLAN CARDS DISPLAY GRID */}
              <div className="space-y-3">
                
                {/* 1. BIRR BASIC PLAN */}
                <div className={`p-4 rounded-xl border transition-all relative overflow-hidden bg-stone-950 ${
                  activePlan === "Basic" ? "border-stone-800 opacity-90 shadow-inner" : "border-white/5"
                }`}>
                  {activePlan === "Basic" && (
                    <div className="absolute top-0 right-0 bg-stone-800 text-[#E5D3B3] px-2 py-0.5 text-[7px] font-mono uppercase font-black tracking-wider rounded-bl-lg select-none">
                      Active Plan
                    </div>
                  )}
                  
                  <span className="text-[7.5px] font-mono text-stone-500 uppercase tracking-widest font-black block">
                    Basic Homestead Farming
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5 font-sans">
                    Birr Basic
                  </h4>
                  
                  {/* Cost Display */}
                  <div className="my-1.5 flex items-baseline gap-1">
                    <span className="text-lg font-black text-[#E5D3B3] font-serif">0 ETB</span>
                    <span className="text-[8px] text-stone-500">/ free forever</span>
                  </div>

                  <p className="text-[8.5px] text-stone-400 leading-normal mb-3 font-serif italic">
                    Great for domestic homestead practitioners looking to cache on-ground guidelines and simple soil metrics.
                  </p>

                  <div className="space-y-1.5 mb-4 border-t border-white/5 pt-2.5 text-[8.5px] text-stone-300">
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>5 localized voice guidelines daily</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>Teff, Wheat, & Maize soil calculator</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>Saved soil reports offline local history</span>
                    </div>
                  </div>

                  <button
                    disabled
                    className="w-full py-1.5 bg-stone-900 text-stone-500 text-[8.5px] font-black uppercase tracking-wider rounded-lg border border-white/5"
                  >
                    {activePlan === "Basic" ? "Active Default Free" : "Downgrade Restricted"}
                  </button>
                </div>

                {/* 2. FAYDA PRO COACH PLAN */}
                <div className={`p-4 rounded-xl border transition-all relative overflow-hidden bg-stone-950 ${
                  activePlan === "Pro" 
                    ? "border-[#DAA520]/60 ring-1 ring-[#DAA520]/25 shadow-lg" 
                    : "border-white/5 hover:border-white/10"
                }`}>
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#CD5C5C] to-[#DAA520] text-stone-950 px-2 py-0.5 text-[7px] font-mono uppercase font-black tracking-wider rounded-bl-lg select-none flex items-center gap-1">
                    <Sparkles size={8} /> Popular Coach Choice
                  </div>
                  
                  <span className="text-[7.5px] font-mono text-[#DAA520] uppercase tracking-widest font-black block">
                    Dynamic STEM & Career Optimization
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5 font-sans">
                    Fayda Pro Coach
                  </h4>
                  
                  {/* Cost Display dependent on toggle */}
                  <div className="my-1.5 flex items-baseline gap-1">
                    <span className="text-lg font-black text-white font-sans">
                      {billingCycle === "monthly" ? "450 ETB" : "360 ETB"}
                    </span>
                    <span className="text-[8px] text-stone-500">
                      / month {billingCycle === "yearly" && "billed annually"}
                    </span>
                  </div>

                  <p className="text-[8.5px] text-stone-300 leading-normal mb-3 font-serif italic">
                    Unlocks advanced AI academic tutor challenges and instant national level CV optimizations with professional phrasing.
                  </p>

                  <div className="space-y-1.5 mb-4 border-t border-white/5 pt-2.5 text-[8.5px] text-stone-300">
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <strong className="text-yellow-400">Unlimited</strong>
                      <span> professional Gemini summaries in CV Coach</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>Unlimited STEM Tutor tests with checkmarks</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>Sound TTS response vocal synthesis playback</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>Identity prefill bypass via Fayda QR Scanning</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (activePlan === "Pro") return;
                      setSelectedUpgradePlan({
                        key: "Pro",
                        name: "Fayda Pro Coach",
                        cost: billingCycle === "monthly" ? 450 : 360 * 12,
                        costText: billingCycle === "monthly" ? "450 ETB / month" : "4,320 ETB / year",
                        billing: billingCycle
                      });
                      setCheckoutGateway(null);
                      setCheckoutStatusLog([]);
                      setIsCheckoutProcessing(false);
                      addExpoLog("Pricing Engine: Selected Fayda Pro Coach package upgrade.");
                    }}
                    className={`w-full py-1.5 text-stone-950 text-[8.5px] font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 cursor-pointer shadow-md ${
                      activePlan === "Pro"
                        ? "bg-stone-900 border border-[#DAA520]/45 text-yellow-400 pointer-events-none"
                        : "bg-[#DAA520] hover:bg-[#c8981c]"
                    }`}
                  >
                    {activePlan === "Pro" ? "✓ Currently App Premium Activated" : "Upgrade to Pro Coach"}
                  </button>
                </div>

                {/* 3. WOREDA ENTERPRISE PLAN */}
                <div className={`p-4 rounded-xl border transition-all relative overflow-hidden bg-stone-950 ${
                  activePlan === "Enterprise" 
                    ? "border-[#CD5C5C]/60 ring-1 ring-[#CD5C5C]/25 shadow-lg" 
                    : "border-white/5 hover:border-white/10"
                }`}>
                  <span className="text-[7.5px] font-mono text-[#CD5C5C] uppercase tracking-widest font-black block">
                    Consortium & Executive Cooperative Tools
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5 font-sans">
                    Woreda Enterprise
                  </h4>
                  
                  {/* Cost Display dependent on toggle */}
                  <div className="my-1.5 flex items-baseline gap-1">
                    <span className="text-lg font-black text-[#E5D3B3] font-sans">
                      {billingCycle === "monthly" ? "1,200 ETB" : "960 ETB"}
                    </span>
                    <span className="text-[8px] text-stone-500">
                      / month {billingCycle === "yearly" && "billed annually"}
                    </span>
                  </div>

                  <p className="text-[8.5px] text-stone-400 leading-normal mb-3 font-serif italic">
                    Full-access command tier perfect for regional coordinators, NGOs, soil advisory groups, and veterinary administrators.
                  </p>

                  <div className="space-y-1.5 mb-4 border-t border-white/5 pt-2.5 text-[8.5px] text-stone-300">
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <strong className="text-rose-400">Priority Broadcaster</strong>
                      <span> dispatch to transmit national alert notifications</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>Full rosters of experts & team role authorization</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>Real-time offline database sync controls</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="text-green-500 shrink-0" size={10} />
                      <span>Uncapped soil calculations PDF export logs</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (activePlan === "Enterprise") return;
                      setSelectedUpgradePlan({
                        key: "Enterprise",
                        name: "Woreda Enterprise",
                        cost: billingCycle === "monthly" ? 1200 : 960 * 12,
                        costText: billingCycle === "monthly" ? "1,200 ETB / month" : "11,520 ETB / year",
                        billing: billingCycle
                      });
                      setCheckoutGateway(null);
                      setCheckoutStatusLog([]);
                      setIsCheckoutProcessing(false);
                      addExpoLog("Pricing Engine: Selected Woreda Enterprise package upgrade.");
                    }}
                    className={`w-full py-1.5 text-stone-950 text-[8.5px] font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 cursor-pointer shadow-md ${
                      activePlan === "Enterprise"
                        ? "bg-stone-900 border border-[#CD5C5C]/45 text-[#CD5C5C] pointer-events-none"
                        : "bg-[#CD5C5C] hover:bg-[#b04b4b]"
                    }`}
                  >
                    {activePlan === "Enterprise" ? "✓ Active Woreda Executive" : "Choose Enterprise Access"}
                  </button>
                </div>

              </div>

              {/* OUT OF PHONEMODAL SECURE TRANSACTION POPUP VIEWER */}
              {selectedUpgradePlan && (
                <div className="absolute inset-0 bg-stone-950/95 z-55 flex flex-col p-4 space-y-4 animate-fade-in">
                  
                  {/* Target Plan cost summary card */}
                  <div className="bg-stone-900 p-3 rounded-2xl border border-white/5 flex items-center justify-between gap-1 select-none">
                    <div>
                      <span className="text-[7.5px] text-[#DAA520] font-mono tracking-wider block uppercase font-bold">
                        SECURE ENCRYPTED CLEARING
                      </span>
                      <h4 className="text-[11.5px] font-extrabold text-white truncate">
                        Upgrading to {selectedUpgradePlan.name}
                      </h4>
                      <p className="text-[8px] text-[#E5D3B3] font-mono font-bold">
                        RATE: {selectedUpgradePlan.costText}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedUpgradePlan(null);
                        setCheckoutGateway(null);
                        addExpoLog("Pricing Engine: Aborted upgrade transaction.");
                      }}
                      className="p-1.5 rounded bg-stone-950 border border-white/5 text-stone-400 hover:text-white transition-all cursor-pointer text-[8px]"
                    >
                      Exit ✕
                    </button>
                  </div>

                  {/* PREFERRED SECURE CHECKOUT METHOD MULTI-TABS DISPLAY */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[8px] text-stone-500 uppercase font-mono tracking-widest block select-none">
                          // SELECT PREFERABLE REGIONAL BILLING NODE:
                        </label>
                        
                        <div className="grid grid-cols-2 gap-1 px-0.5 select-none">
                          <button
                            type="button"
                            onClick={() => {
                              setCheckoutGateway("telebirr");
                              setCheckoutStatusLog([]);
                              addExpoLog("Checkout: Initiated Ethio-Telecom Telebirr settlement path.");
                            }}
                            className={`py-1.5 px-1 bg-stone-900 border text-[8px] font-bold rounded-lg text-center transition-all cursor-pointer ${
                              checkoutGateway === "telebirr" || checkoutGateway === "cbe" || checkoutGateway === "chapa"
                                ? "border-[#DAA520] text-[#DAA520] bg-[#DAA520]/5" 
                                : "border-white/5 text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            🇪🇹 National (Telebirr/Chapa)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCheckoutGateway("stripe");
                              setCheckoutStatusLog([]);
                              addExpoLog("Checkout: Initiated Stripe International card pipeline.");
                            }}
                            className={`py-1.5 px-1 bg-stone-900 border text-[8px] font-bold rounded-lg text-center transition-all cursor-pointer ${
                              checkoutGateway === "stripe" || checkoutGateway === "paypal"
                                ? "border-[#CD5C5C] text-[#CD5C5C] bg-[#CD5C5C]/5" 
                                : "border-white/5 text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            🌐 International (Stripe/PayPal)
                          </button>
                        </div>
                      </div>

                      {/* GATEWAYS LIST CONTAINER DEPENDENT ON SELECTED NODE */}
                      {(checkoutGateway === null) && (
                        <div className="py-6 text-center text-stone-500 italic text-[9px] border border-white/5 rounded-xl bg-stone-900/40 p-4">
                          <CreditCard size={20} className="mx-auto text-stone-600 mb-2" />
                          <p>
                            Verify if you are using Local Mobile Wallets (Telebirr, CBE Birr, Chapa) inside Ethiopia, or Global Cards (Stripe, Debit/Credit, PayPal) to choose your target node above.
                          </p>
                        </div>
                      )}

                      {/* A. NATIONAL CHANNELS CHOSEN */}
                      {(checkoutGateway === "telebirr" || checkoutGateway === "cbe" || checkoutGateway === "chapa") && (
                        <div className="space-y-3 animate-fade-in text-[10px]">
                          <div className="space-y-1">
                            <label className="text-[7.5px] text-stone-500 uppercase tracking-widest font-mono">Select Preferable Local Provider:</label>
                            
                            <div className="grid grid-cols-3 gap-1.5">
                              <button
                                onClick={() => {
                                  setCheckoutGateway("telebirr");
                                  addExpoLog("Gateway Dial: Telebirr node activated.");
                                }}
                                className={`py-1.5 px-1 text-[8.5px] font-bold rounded text-center cursor-pointer transition-all border ${
                                  checkoutGateway === "telebirr" 
                                    ? "bg-sky-950/20 border-sky-400 text-sky-300 font-extrabold" 
                                    : "bg-stone-900 text-stone-400 border-white/5"
                                }`}
                              >
                                Telebirr App
                              </button>
                              <button
                                onClick={() => {
                                  setCheckoutGateway("chapa");
                                  addExpoLog("Gateway Dial: Chapa secure API node activated.");
                                }}
                                className={`py-1.5 px-1 text-[8.5px] font-bold rounded text-center cursor-pointer transition-all border ${
                                  checkoutGateway === "chapa" 
                                    ? "bg-emerald-950/20 border-emerald-400 text-emerald-300 font-extrabold" 
                                    : "bg-stone-900 text-stone-400 border-white/5"
                                }`}
                              >
                                Chapa Birr
                              </button>
                              <button
                                onClick={() => {
                                  setCheckoutGateway("cbe");
                                  addExpoLog("Gateway Dial: Commercial Bank CBE Birr API node activated.");
                                }}
                                className={`py-1.5 px-1 text-[8.5px] font-bold rounded text-center cursor-pointer transition-all border ${
                                  checkoutGateway === "cbe" 
                                    ? "bg-purple-950/20 border-purple-400 text-purple-300 font-extrabold" 
                                    : "bg-stone-900 text-stone-400 border-white/5"
                                }`}
                              >
                                CBE Birr
                              </button>
                            </div>
                          </div>

                          {/* Inputs prefilled */}
                          <div className="space-y-2 pt-1 bg-stone-900/40 p-2.5 rounded-xl border border-white/5">
                            <span className="text-[7px] text-stone-500 font-mono tracking-widest uppercase block">
                              🔒 Merchant API Endpoint: {checkoutGateway.toUpperCase()}_PAY_V2
                            </span>
                            <div className="space-y-1">
                              <label className="text-[7.5px] text-stone-400 uppercase font-mono block">Registered Phone Token (+251):</label>
                              <input
                                type="text"
                                placeholder="+251 911 234 567"
                                defaultValue={userSession?.phone || "+251911234567"}
                                className="w-full bg-stone-950 border border-white/10 rounded px-1.5 py-1 text-[10px] text-white outline-none focus:border-[#DAA520]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* B. INTERNATIONAL CHANNELS CHOSEN */}
                      {(checkoutGateway === "stripe" || checkoutGateway === "paypal") && (
                        <div className="space-y-3 animate-fade-in text-[10px]">
                          <div className="space-y-1">
                            <label className="text-[7.5px] text-stone-500 uppercase tracking-widest font-mono">Select Secure Global Provider:</label>
                            
                            <div className="grid grid-cols-2 gap-1.5">
                              <button
                                onClick={() => {
                                  setCheckoutGateway("stripe");
                                  addExpoLog("Gateway Dial: Stripe multi-currency processing online.");
                                }}
                                className={`py-1.5 px-1 text-[8.5px] font-bold rounded text-center cursor-pointer transition-all border ${
                                  checkoutGateway === "stripe" 
                                    ? "bg-rose-950/20 border-rose-400 text-rose-300 font-extrabold" 
                                    : "bg-stone-900 text-stone-400 border-white/5"
                                }`}
                              >
                                Stripe Card
                              </button>
                              <button
                                onClick={() => {
                                  setCheckoutGateway("paypal");
                                  addExpoLog("Gateway Dial: PayPal express gateway online.");
                                }}
                                className={`py-1.5 px-1 text-[8.5px] font-bold rounded text-center cursor-pointer transition-all border ${
                                  checkoutGateway === "paypal" 
                                    ? "bg-yellow-950/20 border-yellow-400 text-yellow-300 font-extrabold" 
                                    : "bg-stone-900 text-stone-400 border-white/5"
                                }`}
                              >
                                PayPal Express
                              </button>
                            </div>
                          </div>

                          {/* Stripe inputs */}
                          <div className="space-y-2 pt-1 bg-stone-900/40 p-2.5 rounded-xl border border-[#CD5C5C]/20 text-[8.5px]">
                            <span className="text-[7px] text-[#CD5C5C] font-mono tracking-widest uppercase block font-bold">
                              🛡️ PCI-DSS COMPLIANT HANDSHAKE NODE
                            </span>
                            
                            <div className="space-y-1">
                              <label className="text-[7.2px] text-stone-400 uppercase font-mono block">Direct Cardholder Name:</label>
                              <input
                                type="text"
                                placeholder="e.g. Kidus Abebe"
                                defaultValue={userSession?.fullName || "Kidus Abebe"}
                                className="w-full bg-stone-950 border border-white/10 rounded px-1.5 py-0.5 text-white outline-none text-[9.5px]"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-1.5">
                              <div className="space-y-1">
                                <label className="text-[7.2px] text-stone-400 uppercase font-mono block">Demo Mock Credit Card #:</label>
                                <input
                                  type="text"
                                  maxLength={16}
                                  placeholder="4242 4242 4242 4242"
                                  className="w-full bg-stone-950 border border-white/10 rounded px-1.5 py-0.5 text-white outline-none font-mono text-[9.5px]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[7.2px] text-stone-400 uppercase font-mono block">CSV/Expiry Token:</label>
                                <input
                                  type="text"
                                  placeholder="12 / 29  (CVV 774)"
                                  className="w-full bg-stone-950 border border-white/10 rounded px-1.5 py-0.5 text-white outline-none font-mono text-[9.5px]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TRANSACTIONS TERMINAL OUTPUT LOGGER SIMULATOR */}
                      {checkoutGateway && (
                        <div className="space-y-1">
                          <span className="text-[7.5px] text-stone-500 font-mono tracking-wider uppercase block select-none">
                            💬 Settlement Web-Auditing Terminal
                          </span>
                          
                          <div className="bg-stone-950/90 border border-white/5 rounded-xl p-2.5 h-[82px] overflow-y-auto font-mono text-[8.5px] text-green-400 space-y-0.5">
                            {checkoutStatusLog.length === 0 ? (
                              <div className="text-stone-600 italic">
                                * Payer authorization pending. Hit "Settle Transaction" bottom key to run mock Settlement APIs.
                              </div>
                            ) : (
                              checkoutStatusLog.map((logLine, lineIdx) => (
                                <div key={lineIdx} className="leading-snug truncate">
                                  <span className="text-[#DAA520] font-bold">➔</span> {logLine}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* ACTIONS BOTTOM BOX FOR SETTLEMENT RESOLUTION */}
                    {checkoutGateway && (
                      <div className="space-y-1.5 select-none pt-2">
                        {isCheckoutProcessing ? (
                          <div className="w-full py-1.5 bg-stone-900 border border-white/5 text-stone-400 text-center rounded-xl font-mono text-[9px] flex items-center justify-center gap-1.5">
                            <RefreshCw size={11} className="animate-spin text-[#DAA520]" />
                            <span>PROCESSING CRYPTO SETTLEMENT...</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setIsCheckoutProcessing(true);
                              setCheckoutStatusLog([
                                "API_INBOUND: Pushed currency payload with intent to billing service...",
                              ]);
                              
                              // Trigger step-by-step transaction simulated execution
                              let count = 0;
                              const timerLines = [
                                `Gateway Node: Executing mock handshake to "${checkoutGateway.toUpperCase()}" server.`,
                                "Fayda Verification: Claiming secure user session token authorization...",
                                "PCI Security: Mock encryption key coaligned successfully. Token valid.",
                                `Clearing Node: Cleared ${selectedUpgradePlan.cost} ETB payout. Callback status: clearing...`,
                                "Clerk Auth: Pushed webhook premium_upgrade event call.",
                                `System Check: Upgraded "${userSession?.fullName || 'Demo User'}" role successfully to Pro Coach.`,
                                "SUCCESS: Active VIP premium tier registered! PDF invoice token saved."
                              ];

                              const interval = setInterval(() => {
                                if (count < timerLines.length) {
                                  setCheckoutStatusLog(prev => [...prev, timerLines[count]]);
                                  count++;
                                } else {
                                  clearInterval(interval);
                                  setIsCheckoutProcessing(false);
                                  
                                  // Update application wide active status
                                  setActivePlan(selectedUpgradePlan.key);
                                  
                                  // Update User session role properties globally as per AGENTS.md
                                  if (setUserSession) {
                                    setUserSession(prev => ({
                                      ...prev,
                                      isVIP: true,
                                      // Upgrade their system role
                                      role: selectedUpgradePlan.key === "Enterprise" ? "Expert Support" : "Field Representative"
                                    }));
                                  }

                                  addExpoLog(`Clerk Webhook: Completed payments of ${selectedUpgradePlan.name}. Premium unlocked!`);
                                  
                                  // Auto close after 2.5 seconds
                                  setTimeout(() => {
                                    setSelectedUpgradePlan(null);
                                    setCheckoutGateway(null);
                                    triggerToast(`🔔 SUCCESS! Your payment has cleared. You've been upgraded to ${selectedUpgradePlan.name}!`);
                                  }, 2200);
                                }
                              }, 350);
                            }}
                            className="w-full py-2 bg-[#DAA520] hover:bg-[#caa023] text-stone-950 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 cursor-pointer shadow-md text-center"
                          >
                            🚀 Authorize & Settle Upgrade
                          </button>
                        )}
                        
                        <div className="text-[7.5px] text-stone-500 font-mono leading-relaxed text-center italic">
                          "Integrate actual APIs using Node stripe.paymentIntents.create() server side or Chapa API direct payment redirect keys."
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* BOTTOM NAV TABS inside mobile frame */}
        <div className="absolute bottom-0 left-0 w-full h-[52px] bg-stone-950/95 border-t border-white/5 flex justify-around items-center px-2 pt-1 z-40 select-none">
          <button 
            type="button"
            onClick={() => setPhoneTab("home")} 
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${phoneTab === "home" ? "text-[#E5D3B3] scale-105 font-bold" : "text-stone-500 hover:text-stone-300"}`}
          >
            <Mic size={13} />
            <span className="text-[7px] uppercase tracking-wider mt-0.5 leading-none">Voice</span>
          </button>
          
          <button 
            type="button"
            onClick={() => setPhoneTab("cv")} 
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${phoneTab === "cv" ? "text-[#E5D3B3] scale-105 font-bold" : "text-stone-500 hover:text-stone-300"}`}
          >
            <Briefcase size={13} />
            <span className="text-[7px] uppercase tracking-wider mt-0.5 leading-none">CV Coach</span>
          </button>

          <button 
            type="button"
            onClick={() => setPhoneTab("edu")} 
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${phoneTab === "edu" ? "text-[#E5D3B3] scale-105 font-bold" : "text-stone-500 hover:text-stone-300"}`}
          >
            <GraduationCap size={13} />
            <span className="text-[7px] uppercase tracking-wider mt-0.5 leading-none">STEM Tutor</span>
          </button>

          <button 
            type="button"
            onClick={() => setPhoneTab("agri")} 
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${phoneTab === "agri" ? "text-[#E5D3B3] scale-105 font-bold" : "text-stone-500 hover:text-stone-300"}`}
          >
            <Sprout size={13} />
            <span className="text-[7px] uppercase tracking-wider mt-0.5 leading-none">Farm Calc</span>
          </button>

          <button 
            type="button"
            onClick={() => setPhoneTab("expo")} 
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${phoneTab === "expo" ? "text-[#E5D3B3] scale-105 font-bold" : "text-stone-500 hover:text-stone-300"}`}
          >
            <Smartphone size={13} className={phoneTab === "expo" ? "text-[#DAA520]" : ""} />
            <span className="text-[7px] uppercase tracking-wider mt-0.5 leading-none">Onboard</span>
          </button>

          <button 
            type="button"
            onClick={() => setPhoneTab("pricing")} 
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${phoneTab === "pricing" ? "text-yellow-400 scale-105 font-extrabold" : "text-stone-500 hover:text-stone-300"}`}
          >
            <CreditCard size={13} className={phoneTab === "pricing" ? "text-yellow-400" : ""} />
            <span className="text-[7px] uppercase tracking-wider mt-0.5 leading-none">Pricing</span>
          </button>

          <button 
            type="button"
            onClick={() => setPhoneTab("portal")} 
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${phoneTab === "portal" ? "text-[#E5D3B3] scale-105 font-bold" : "text-stone-500 hover:text-stone-300"}`}
          >
            <User size={13} />
            <span className="text-[7px] uppercase tracking-wider mt-0.5 leading-none">Portal</span>
          </button>
        </div>

      </div>

      {/* 2. REAL-TIME PLAYGROUND METRICS on the right of phone */}
      <div className="flex-1 w-full space-y-5">
        
        {/* Connection status card */}
        <div className="bg-[#1b1b1b] p-5 rounded-2xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h4 className="text-xs font-black uppercase text-[#E5D3B3] tracking-widest flex items-center gap-1.5">
              <Database size={14} /> REAL-TIME MOBILE SYNCHRONIZATION QUEUE
            </h4>
            <span className="text-[9px] font-mono text-stone-400 uppercase">ETHIOPIA CONTEXT</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-stone-900/60 rounded-xl space-y-1">
              <span className="text-[8px] uppercase tracking-widest opacity-60">Status Channel</span>
              <span className="font-bold flex items-center gap-1.5 text-white">
                {isOffline ? (
                  <>
                    <WifiOff size={13} className="text-red-500" /> Offline simulated
                  </>
                ) : (
                  <>
                    <Wifi size={13} className="text-green-500" /> Online sync channel active
                  </>
                )}
              </span>
              <p className="text-[10px] text-stone-500 leading-normal pt-1">Toggle the network state inside the smartphone to watch how queries are caught locally.</p>
            </div>

            <div className="p-4 bg-stone-900/60 rounded-xl space-y-1">
              <span className="text-[8px] uppercase tracking-widest opacity-60">Buffer Sync Actions</span>
              <span className="font-mono font-bold text-white block">
                {offlineQueue.length} Pending Actions in memory state
              </span>
              {offlineQueue.length > 0 && (
                <span className="text-[9px] text-[#CD5C5C] font-bold block animate-pulse">⚠️ Database cache requires synchronization.</span>
              )}
            </div>
          </div>

          {/* Table index representing matching queue items */}
          <div className="p-3.5 bg-stone-950 rounded-xl border border-white/5 space-y-2">
            <span className="text-[9px] uppercase tracking-widest opacity-50 block">// CURRENT TASK BUFFER QUEUE RECORDS</span>
            {offlineQueue.length === 0 ? (
              <p className="text-xs text-stone-500 italic">No tasks queued. Tasks are allocated when executing calculations or saving CV summaries under simulated Offline Mode.</p>
            ) : (
              <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                {offlineQueue.map((item, idx) => (
                  <div key={item.id} className="p-2 bg-[#121212] rounded border border-white/5 flex justify-between items-center text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      <span className="text-stone-400">[{item.type}]</span>
                      <span className="text-white truncate max-w-[150px]">{item.label}</span>
                    </div>
                    <span className="text-stone-500">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. PREMIUM INTEGRATED EXPO DEVELOPMENT BOARD & RUNTIME SHARDS */}
        <div className="bg-[#1b1b1b] p-5 rounded-2xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h4 className="text-xs font-black uppercase text-[#E5D3B3] tracking-widest flex items-center gap-1.5 animate-pulse">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
              EXPO SWISS-ETHIOPIA CORE RUNTIME
            </h4>
            <span className="text-[8px] font-mono bg-stone-900 px-2 py-0.5 rounded border border-white/5 text-stone-400">
              STABLE ONLINE PORT
            </span>
          </div>

          {/* Dev Sidebar Sub Tabs Selection Selector */}
          <div className="grid grid-cols-3 gap-1 select-none">
            <button
              onClick={() => setDevSidebarTab("logs")}
              className={`py-1.5 px-1 rounded-lg text-[9px] uppercase font-mono font-bold tracking-wider cursor-pointer border text-center transition-all ${
                devSidebarTab === "logs" 
                  ? "bg-[#DAA520]/20 border-[#DAA520] text-[#DAA520]" 
                  : "bg-stone-950 border-white/5 text-stone-500 hover:text-stone-300"
              }`}
            >
              ⌨️ Compiler Logs
            </button>
            <button
              onClick={() => setDevSidebarTab("clerk")}
              className={`py-1.5 px-1 rounded-lg text-[9px] uppercase font-mono font-bold tracking-wider cursor-pointer border text-center transition-all ${
                devSidebarTab === "clerk" 
                  ? "bg-[#CD5C5C]/20 border-[#CD5C5C] text-[#CD5C5C]" 
                  : "bg-stone-950 border-white/5 text-stone-500 hover:text-stone-300"
              }`}
            >
              🔐 Clerk Auth State
            </button>
            <button
              onClick={() => setDevSidebarTab("files")}
              className={`py-1.5 px-1 rounded-lg text-[9px] uppercase font-mono font-bold tracking-wider cursor-pointer border text-center transition-all ${
                devSidebarTab === "files" 
                  ? "bg-[#E5D3B3]/20 border-[#E5D3B3] text-[#E5D3B3]" 
                  : "bg-stone-950 border-white/5 text-stone-500 hover:text-stone-300"
              }`}
            >
              📁 Expo Setup Files
            </button>
          </div>

          {/* Tab Content Display */}
          {devSidebarTab === "logs" && (
            <div className="space-y-2.5 animate-fade-in font-mono">
              <span className="text-[8px] uppercase tracking-widest text-stone-500 block">
                // REAL-TIME NATIVEWIND & CORE METRO ENGINE LOGS
              </span>
              <div className="p-3 bg-stone-950 rounded-xl border border-white/5 h-[140px] overflow-y-auto pr-1 text-[9px] text-green-400 space-y-1">
                {nativewindCompilationLog.map((log, idx) => (
                  <div key={idx} className="leading-relaxed border-b border-white/5 pb-1">
                    <span className="text-stone-500 font-mono pr-1.5">✓</span>
                    {log}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-stone-400 leading-normal font-serif">
                Toggle themes mapped from Nativewind class modifiers inside the phone simulator above to view live compiler outputs executing.
              </p>
            </div>
          )}

          {devSidebarTab === "clerk" && (
            <div className="space-y-3 animate-fade-in text-xs leading-relaxed text-stone-300">
              <span className="text-[8px] font-mono uppercase tracking-widest text-stone-500 block">
                // CLERK ACTIVE JWT IDENTITY TOKEN HANDSHAKE
              </span>

              {userSession?.loggedIn ? (
                <div className="p-3 bg-stone-950 rounded-xl border border-[#CD5C5C]/25 space-y-2 font-mono text-[9.5px]">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-[#CD5C5C] font-bold">STATE:</span>
                    <span className="text-white">SESSION_ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">SSO Email:</span>
                    <span className="text-white truncate max-w-[170px]">{userSession.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Subject UID:</span>
                    <span className="text-yellow-400">{userSession.uid}</span>
                  </div>
                  <div className="pt-1.5 border-t border-white/5 space-y-1">
                    <span className="text-[7.5px] text-stone-500 uppercase tracking-widest block">SECURE TELEMETRY CLAIM:</span>
                    <div className="bg-[#CD5C5C]/5 p-2 rounded border border-[#CD5C5C]/20 text-[8px] text-[#CD5C5C] leading-normal break-all select-all font-mono">
                      clerk_token_jwt::{userSession.uid ? userSession.uid : "offline-session"}_fayda_sha256_claim
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-stone-950 rounded-xl border border-white/5 text-center text-stone-500 italic">
                  No active Clerk session. Navigate to the phone's <strong className="text-[#DAA520]">Onboard</strong> tab to initiate the Clerk secure OTP validation flow.
                </div>
              )}
            </div>
          )}

          {devSidebarTab === "files" && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex justify-between items-center bg-stone-950 p-1.5 rounded-lg border border-white/5 select-none">
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#E5D3B3] shrink-0 font-extrabold pr-2 pl-1">
                  Active Code:
                </span>
                
                <div className="flex gap-1 overflow-x-auto pr-1">
                  {["App.tsx", "Onboarding.tsx", "tailwind.config.js", "babel.config.js"].map((file) => (
                    <button
                      key={file}
                      onClick={() => setSelectedFileCode(file as any)}
                      className={`py-1 px-1.5 rounded text-[8.5px] font-mono cursor-pointer transition-all whitespace-nowrap ${
                        selectedFileCode === file 
                          ? "bg-stone-850 text-white font-bold" 
                          : "text-stone-500 hover:text-stone-300"
                      }`}
                    >
                      {file}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Panel Display */}
              <div className="p-3 bg-stone-950 rounded-xl border border-white/5 text-[9.5px] font-mono max-h-[140px] overflow-y-auto pr-1 text-teal-200">
                {selectedFileCode === "App.tsx" && (
                  <pre className="leading-snug">
{`import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Onboarding from "./Onboarding";

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_...">
      <SignedOut><Onboarding /></SignedOut>
      <SignedIn><Text>Selam, Verified!</Text></SignedIn>
    </ClerkProvider>
  );
}`}
                  </pre>
                )}
                {selectedFileCode === "Onboarding.tsx" && (
                  <pre className="leading-snug">
{`export default function Onboarding() {
  // Styled dynamically with Nativewind
  return (
    <View className="flex-1 bg-stone-950 p-6">
      <Text className="text-3xl font-extrabold text-white">
        Selam, Welcome
      </Text>
    </View>
  );
}`}
                  </pre>
                )}
                {selectedFileCode === "tailwind.config.js" && (
                  <pre className="leading-snug">
{`module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: { girmaic: { sand: "#E5D3B3" } }
    }
  }
}`}
                  </pre>
                )}
                {selectedFileCode === "babel.config.js" && (
                  <pre className="leading-snug">
{`module.exports = function (api) {
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"]
  };
}`}
                  </pre>
                )}
              </div>
              <span className="text-[8.5px] font-mono text-stone-500 block">
                * Note: Raw template scripts are committed directly inside the <code>/expo-setup/</code> path of our repository for direct copy access.
              </span>
            </div>
          )}
        </div>

        {/* Current prompt blueprints visual card */}
        <div className="bg-[#1b1b1b] p-5 rounded-2xl border border-white/5 space-y-3">
          <h4 className="text-xs font-black uppercase text-[#E5D3B3] tracking-widest flex items-center gap-1.5">
            <Award size={14} /> ETHIOPIAN PROMPT ENGINEERING SCHEMAS METRICS
          </h4>
          <p className="text-xs text-white/60 leading-relaxed">Each transaction includes structural parameters injected automatically depending on the selected user category:</p>
          
          <div className="p-3.5 bg-stone-950 rounded-xl border border-white/5 text-[10px] font-mono space-y-1 text-cyan-200">
            <span className="text-[#DAA520] block font-semibold">// Injected Regional Directives:</span>
            <p>"{`1. Standard formatting of CVs mapping Dereja/Ethiojobs portals.\n2. Apply localized Urea / NPS recommendations matching nitrogen-S agriculture advice.\n3. Calibrate STEM coaching lessons answering Grade 12 educational national exams questions.`}"</p>
          </div>
        </div>

      </div>

    </div>
  );
}
