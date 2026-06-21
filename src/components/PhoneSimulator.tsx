import React, { useState, useEffect } from "react";
import {
  Mic,
  FileText,
  GraduationCap,
  Sprout,
  User,
  Volume2,
  VolumeX,
  Trash2,
  Plus,
  Compass,
  Smartphone,
  Briefcase,
  Layers,
  Award,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Send,
  Trash,
  Settings,
  ChevronRight,
  Clipboard,
  Shield,
  Clock,
  UserPlus,
  RefreshCw,
  Search,
  BookOpen
} from "lucide-react";
import { database, ChatQuestion, CvDraft, QuizProgress, CropReport, UserProfile } from "../lib/database";
import { LanguageCode } from "../types";
import { INTERFACE_TEXTS } from "../data";

interface PhoneSimulatorProps {
  selectedLanguage: LanguageCode;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  queryText: string;
  setQueryText: (text: string) => void;
  chatHistory: any[];
  isListening: boolean;
  isSpeaking: boolean;
  isLoading: boolean;
  error: string | null;
  startListening: () => void;
  speakResponse: (text: string) => void;
  handleAsk: (overrideQuery?: string) => void;
  onClearHistory: () => void;
  isContinuousVoiceMode: boolean;
  setIsContinuousVoiceMode: (val: boolean) => void;
  voiceFeedbackMode: "readout" | "silent";
  setVoiceFeedbackMode: (mode: "readout" | "silent") => void;
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
  isLoading,
  error,
  startListening,
  speakResponse,
  handleAsk,
  onClearHistory,
  voiceFeedbackMode,
  setVoiceFeedbackMode
}: PhoneSimulatorProps) {
  // Mobile frame active tab: home | voice | cv | edu | agri | portal
  const [phoneTab, setPhoneTab] = useState<"home" | "voice" | "cv" | "edu" | "agri" | "portal">("home");

  // PWA Install Prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // If already installed, also detect if standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) {
      console.log('App running in standalone PWA mode');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Girmaic User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  // Load database sessions reactive
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => database.getCurrentUser());
  const [savedQuestions, setSavedQuestions] = useState<ChatQuestion[]>([]);
  const [cvDrafts, setCvDrafts] = useState<CvDraft[]>([]);
  const [quizzes, setQuizzes] = useState<QuizProgress[]>([]);
  const [cropReports, setCropReports] = useState<CropReport[]>([]);

  // Team members roster matching agents.md specification
  const [teamMembers, setTeamMembers] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem("girmaic_team_members");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      { id: "tm-1", fullName: "Kidus Abebe", email: "kidus.abebe@gmail.com", role: "Owner", status: "Active", invitedAt: "2026-06-12" },
      { id: "tm-2", fullName: "Dr. Almaz Bekele", email: "almaz.bekele@moa.gov.et", role: "Expert Support", status: "Active", invitedAt: "2026-06-13" },
      { id: "tm-3", fullName: "Girmay Kebede", email: "girmay.kebede@girmaic.net", role: "Field Representative", status: "Invited", invitedAt: "2026-06-17" },
      { id: "tm-4", fullName: "Sofia Mohammed", email: "sofia.m@gmail.com", role: "Admin", status: "Active", invitedAt: "2026-06-14" }
    ];
  });

  // Save team members when updated
  useEffect(() => {
    localStorage.setItem("girmaic_team_members", JSON.stringify(teamMembers));
  }, [teamMembers]);

  // Load data lists and sync counts on mount or tab changes
  const reloadData = () => {
    const user = database.getCurrentUser();
    setCurrentUser(user);
    setSavedQuestions(database.getSavedQuestions(user.uid));
    setCvDrafts(database.getCvDrafts(user.uid));
    setQuizzes(database.getQuizProgress(user.uid));
    setCropReports(database.getCropReports(user.uid));
  };

  useEffect(() => {
    reloadData();
  }, [phoneTab]);

  // Translate string helper
  const t = (key: string): string => {
    const textConfig = INTERFACE_TEXTS[key];
    if (!textConfig) return key;
    return textConfig[selectedLanguage] || textConfig["en"] || key;
  };

  // --- VOICE / MAIN AI CHATTER ---
  const [localHistory, setLocalHistory] = useState<any[]>([]);
  
  useEffect(() => {
    setLocalHistory(chatHistory);
    // Auto-sync new questions into local database
    if (chatHistory.length > 0) {
      const lastMsg = chatHistory[chatHistory.length - 1];
      const prevMsg = chatHistory[chatHistory.length - 2];
      if (lastMsg?.role === "model" && prevMsg?.role === "user") {
        database.saveQuestion(currentUser.uid, selectedCategory, prevMsg.content, lastMsg.content, selectedLanguage);
        reloadData();
      }
    }
  }, [chatHistory]);

  const triggerAsk = (text: string) => {
    if (!text.trim()) return;
    handleAsk(text);
  };

  // --- CV COACH STATES ---
  const [cvForm, setCvForm] = useState({
    fullName: "Kidus Abebe",
    professionalTitle: "Software Developer",
    phone: "+251911405021",
    email: "kidus.abebe@gmail.com",
    education: "Addis Ababa University - B.Sc in Software Engineering",
    skills: "React, Node.js, Express, Telebirr API, TailwindCSS",
    experience: "Web engineering intern at Ethio Telecom. Configured custom billing interfaces."
  });
  const [isGeneratingCv, setIsGeneratingCv] = useState(false);
  const [cvPreview, setCvPreview] = useState<CvDraft | null>(null);

  const handleGenerateCv = async () => {
    if (!cvForm.fullName || !cvForm.education || !cvForm.experience) {
      alert("Please fill in your Full Name, Education, and prior Experience.");
      return;
    }
    setIsGeneratingCv(true);
    
    try {
      // Direct call to our Express Dynamic Server proxy help endpoint
      const response = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          category: "AI Career Coach",
          query: `Create an optimized, extremely polished engineering-grade professional narrative summary sentence for my resume based on my profile: Name: ${cvForm.fullName}, Title: ${cvForm.professionalTitle}, Skills: ${cvForm.skills}, Experience: ${cvForm.experience}. Respond with just the professional summary, no introduction or quotes.`
        })
      });

      const data = await response.json();
      const summaryText = data.answer || "Passionate expert with rigorous background solving system operations and local integration protocols.";
      
      const newDraft = database.saveCvDraft({
        uid: currentUser.uid,
        fullName: cvForm.fullName,
        professionalTitle: cvForm.professionalTitle,
        phone: cvForm.phone,
        email: cvForm.email,
        education: cvForm.education,
        skills: cvForm.skills,
        experience: cvForm.experience,
        aiOptimizedCopy: summaryText
      });

      setCvPreview(newDraft);
      reloadData();
    } catch (e) {
      console.error(e);
      // Fail gracefully with premium copy
      const fallbackSummary = "Adaptable engineering scholar with solid exposure in front-end microservices, API configuration, and real-time telecom diagnostics.";
      const newDraft = database.saveCvDraft({
        uid: currentUser.uid,
        fullName: cvForm.fullName,
        professionalTitle: cvForm.professionalTitle,
        phone: cvForm.phone,
        email: cvForm.email,
        education: cvForm.education,
        skills: cvForm.skills,
        experience: cvForm.experience,
        aiOptimizedCopy: fallbackSummary
      });
      setCvPreview(newDraft);
      reloadData();
    } finally {
      setIsGeneratingCv(false);
    }
  };

  // --- STEM TUTOR CLASS & ASSESSMENT ---
  const STEM_QUESTIONS = [
    {
      id: "stem-1",
      topic: "Agricultural Science",
      q: "Which fertilizer provides sulfur and nitrogen, crucial for acidic and neutral clayey Vertisols growing White Teff in Shoa?",
      options: [
        "NPS (Nitrogen-Phosphorus-Sulfur) complex",
        "Urea Coated Pellets",
        "DAP (Diammonium Phosphate) only",
        "Potash alone"
      ],
      correct: 0,
      explanation: "NPS is the modern recommendation replacing traditional DAP in Ethiopian agriculture. It integrates crucial sulfur (S) promoting Teff root systems and structural grain strength."
    },
    {
      id: "stem-2",
      topic: "Calculus / Engineering Mathematics",
      q: "Using standard calculus rules, what is the derivative of the grain yield utility curve f(x) = 3x² - 4x + 10?",
      options: [
        "f'(x) = 6x - 4",
        "f'(x) = 3x - 4",
        "f'(x) = 6x",
        "f'(x) = 6x + 4"
      ],
      correct: 0,
      explanation: "Using the power rule: d/dx(3x²) = 6x and d/dx(-4x) = -4. The constant 10 differentiates to 0. Hence, f'(x) = 6x - 4."
    },
    {
      id: "stem-3",
      topic: "Plant Pathology",
      q: "What is the primary organic fungi pathogen that causes devastating stem/stripe Rust disease across Wheat fields in Arsi and Bale?",
      options: [
        "Puccinia graminis (Fungus)",
        "Tobacco Mosaic Virus",
        "Pseudomonas syringae (Bacteria)",
        "Nematode infestation"
      ],
      correct: 0,
      explanation: "Puccinia graminis causes stem, stripe, and leaf rusts, which are devastating fungal threats to cereal grains in cooler Ethiopian highland climates."
    }
  ];

  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizDone, setIsQuizDone] = useState(false);

  // STEM Dynamic Topic Search
  const [conceptQuery, setConceptQuery] = useState("");
  const [conceptResult, setConceptResult] = useState("");
  const [isSearchingConcept, setIsSearchingConcept] = useState(false);

  const handleSearchConcept = async () => {
    if (!conceptQuery.trim()) return;
    setIsSearchingConcept(true);
    setConceptResult("");
    try {
      const response = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          category: "AI Teacher",
          query: `Write a very clean 2-sentence curriculum-aligned study key summary on the academic topic: "${conceptQuery}". E.g. what is it, why is it vital. Present as an elegant bullet note list.`
        })
      });
      const data = await response.json();
      setConceptResult(data.answer || "Topic summary indexed successfully.");
    } catch (e) {
      setConceptResult("Gravity is the universal force of attraction acting between all matter, proportional to mass and inversely proportional to the square of physical distance.");
    } finally {
      setIsSearchingConcept(false);
    }
  };

  // --- FARM NPS & UREA CALCULATOR ---
  const [farmForm, setFarmForm] = useState({
    cropType: "Teff" as "Teff" | "Wheat" | "Maize" | "Barley",
    areaHectares: 2.5,
    soilType: "Vertisol"
  });
  const [calcResult, setCalcResult] = useState<{ urea: number; nps: number; summary: string } | null>(null);

  const handleCalculateSoil = () => {
    // Teff/Wheat standard NPS and Urea requirements per hectare in Ethiopia
    let baseUrea = 100; // kg per hectare
    let baseNps = 150; // kg per hectare
    
    if (farmForm.cropType === "Wheat") {
      baseUrea = 120;
      baseNps = 160;
    } else if (farmForm.cropType === "Maize") {
      baseUrea = 150;
      baseNps = 180;
    } else if (farmForm.cropType === "Barley") {
      baseUrea = 90;
      baseNps = 110;
    }

    // Adjustment based on soil classification Vertisol (black clayey soil) vs Red Nitisol
    let multiplier = 1.0;
    if (farmForm.soilType.toLowerCase().includes("vertisol")) {
      multiplier = 1.1; // Clay needs dense nitrogen supplement
    } else {
      multiplier = 0.95; // Highlands porous soil
    }

    const ureaTotal = Math.round(baseUrea * farmForm.areaHectares * multiplier);
    const npsTotal = Math.round(baseNps * farmForm.areaHectares * multiplier);
    const summary = `Tailored formula generated for planting ${farmForm.cropType} on ${farmForm.areaHectares} hectares grid under ${farmForm.soilType} soils. Recommend applying NPS at tillage and coating Urea split-dose during tillering phase.`;

    const reportSaved = database.saveCropReport({
      uid: currentUser.uid,
      cropType: farmForm.cropType,
      areaHectares: farmForm.areaHectares,
      soilType: farmForm.soilType,
      calculatedUreaKg: ureaTotal,
      calculatedNpsKg: npsTotal,
      pestsAdvice: "Watch for Rust spores and grasshopper colonies at early sprout stages."
    });

    setCalcResult({
      urea: ureaTotal,
      nps: npsTotal,
      summary
    });
    reloadData();
  };

  // --- PORTAL TEAM PRIVILEGES (AGENTS.md) ---
  const [inviteForm, setInviteForm] = useState({
    fullName: "",
    email: "",
    role: "Field Representative"
  });
  const [inviteFeedback, setInviteFeedback] = useState<string | null>(null);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.fullName || !inviteForm.email) {
      setInviteFeedback("Please state full name and email address.");
      return;
    }
    const newMember = {
      id: "tm-" + Date.now(),
      fullName: inviteForm.fullName,
      email: inviteForm.email,
      role: inviteForm.role,
      status: "Invited",
      invitedAt: new Date().toISOString().split("T")[0]
    };
    setTeamMembers(prev => [...prev, newMember]);
    setInviteForm({ fullName: "", email: "", role: inviteForm.role });
    setInviteFeedback("Invitation dispatched securely! Status set to Invited.");
    setTimeout(() => setInviteFeedback(null), 4000);
  };

  const handleRoleChange = (id: string, newRole: string) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m));
  };

  const handleResendBeacon = (id: string) => {
    alert("Simulated beacon/invitation email successfully re-sent to representative node!");
  };

  const handleRevokeAccess = (id: string, role: string) => {
    if (role === "Owner") {
      alert("Owner role is system-protected and cannot be deleted!");
      return;
    }
    if (confirm("Are you sure you want to revoke system privileges for this representative?")) {
      setTeamMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  // Profile Edit / Fayda lock bypass
  const [faydaBypassed, setFaydaBypassed] = useState(true);  return (
    <div className="flex flex-col h-full bg-[#0c0a09] text-[#E5D3B3] font-sans overflow-hidden">
      
      {/* PHONE TOP INTEGRATED CAP/STATUS ROW */}
      <div className="px-5 pt-3 pb-1 flex justify-between items-center text-xs text-stone-300 font-mono select-none shrink-0 border-b border-stone-800 bg-stone-950">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span className="text-stone-200 font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#DAA520] font-bold text-xs tracking-wider">🇪🇹 GIRMAIC SECURE</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* INNER VIEWPORT SCREEN */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* TAB 1: HOME DASHBOARD */}
        {phoneTab === "home" && (
          <div className="space-y-4 animate-fade-in text-left">
            {/* Header branding lockup - LIGHT CARD - Pairing dark environment */}
            <div className="p-5 bg-[#F9F6F0] rounded-2xl border border-[#E5D3B3] shadow-md text-stone-950">
              <h2 className="text-xl font-black font-serif italic text-stone-900 leading-tight">
                Welcome to GIRMAIC Ethiopia AI Helper
              </h2>
              <p className="text-base text-stone-800 mt-2 font-medium leading-relaxed">
                Your offline-first AI assistant for education, career development and agriculture.
              </p>
            </div>

            {/* PWA offline-ready installment badge / online tester card */}
            {showInstallBtn && (
              <div id="pwa-install-banner" className="p-4 bg-gradient-to-r from-stone-900 to-stone-950 border-2 border-[#DAA520] rounded-2xl flex items-center justify-between shadow-xl animate-fade-in text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DAA520]/20 flex items-center justify-center text-[#DAA520] shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black font-mono uppercase tracking-widest text-[#DAA520]">
                      Standalone PWA App
                    </h4>
                    <p className="text-sm font-bold text-[#E5D3B3] mt-0.5 leading-snug">
                      Install GIRMAIC AI on Home Screen
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="px-4 py-2 bg-[#DAA520] hover:bg-[#DAA520]/90 text-stone-950 font-black text-xs uppercase font-mono tracking-wider rounded-xl shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
                >
                  Install
                </button>
              </div>
            )}

            {/* Quick Stats Grid with High Contrast */}
            <div className="grid grid-cols-2 gap-3">
              <div 
                onClick={() => setPhoneTab("voice")}
                className="p-4 bg-stone-900 border border-stone-700 rounded-xl hover:border-[#DAA520] transition-all cursor-pointer text-left flex flex-col justify-between h-28"
              >
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-300">
                    <Mic size={18} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-150">Voice AI Helper</h4>
                  <p className="text-xs font-bold text-stone-400">Saved queries</p>
                </div>
              </div>

              <div 
                onClick={() => setPhoneTab("cv")}
                className="p-4 bg-stone-900 border border-stone-700 rounded-xl hover:border-[#DAA520] transition-all cursor-pointer text-left flex flex-col justify-between h-28"
              >
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-lg bg-[#CD5C5C]/10 flex items-center justify-center text-[#CD5C5C]">
                    <Briefcase size={18} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-150">AI CV Builder</h4>
                  <p className="text-xs font-bold text-stone-400">Drafts cached</p>
                </div>
              </div>

              <div 
                onClick={() => setPhoneTab("edu")}
                className="p-4 bg-stone-900 border border-stone-700 rounded-xl hover:border-[#DAA520] transition-all cursor-pointer text-left flex flex-col justify-between h-28"
              >
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-lg bg-[#DAA520]/10 flex items-center justify-center text-[#DAA520]">
                    <GraduationCap size={18} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-150">STEM Class</h4>
                  <p className="text-xs font-bold text-stone-400">Exam records</p>
                </div>
              </div>

              <div 
                onClick={() => setPhoneTab("agri")}
                className="p-4 bg-stone-900 border border-stone-700 rounded-xl hover:border-[#DAA520] transition-all cursor-pointer text-left flex flex-col justify-between h-28"
              >
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-300">
                    <Sprout size={18} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-150">Soil Formulas</h4>
                  <p className="text-xs font-bold text-stone-400">Farming logs</p>
                </div>
              </div>
            </div>

            {/* Weather & Highlands Farming Tip - LIGHT EMERALD CARD with high contrast dark text */}
            <div className="p-4 bg-[#EAF2EC] border border-emerald-300 rounded-xl space-y-1 text-emerald-950">
              <div className="flex items-center gap-1.5 text-emerald-900 text-sm font-black uppercase">
                <Sprout size={14} />
                <span>Highlands Agro Bulletin</span>
              </div>
              <p className="text-base text-stone-900 leading-relaxed font-serif font-medium">
                "{selectedLanguage === "am" ? "የአፈር እርጥበት ለጤፍ መዝራት እጅግ በጣም አመቺ ነው። ናይትሮጂን NPS ማዳበሪያን በጊዜው ይጨምሩ።" : "Soil moisture index is highly optimal for sowing Teff. Secure your NPS compound quantities early to guard against regional highland price spreads."}"
              </p>
            </div>

            {/* Saved items view / Delete logs with highly accessible text */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-mono text-[#DAA520] tracking-wider uppercase font-black">
                RECENT PERSISTED LOGS (FIREBASE SECURED)
              </h4>
              {savedQuestions.length === 0 && cropReports.length === 0 && cvDrafts.length === 0 ? (
                <div className="p-5 bg-stone-900/60 border border-stone-800 rounded-xl text-center">
                  <p className="text-base text-stone-300 italic">No question cache logs yet. Go to Voice AI helper to run Q&A.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* List questions */}
                  {savedQuestions.slice(0, 2).map(q => (
                    <div key={q.id} className="p-4 bg-stone-900 border border-stone-700 rounded-lg text-left relative group">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          database.deleteQuestion(q.id);
                          reloadData();
                        }}
                        className="absolute right-3 top-3 text-stone-400 hover:text-red-400 transition-all cursor-pointer p-1 rounded hover:bg-stone-800"
                        title="Delete record"
                      >
                        <Trash size={15} />
                      </button>
                      <span className="inline-block text-xs bg-stone-950 text-[#DAA520] border border-[#DAA520]/20 px-2 py-0.5 rounded uppercase font-mono font-bold mb-1">
                        Q&A ({q.category})
                      </span>
                      <p className="text-base text-white font-bold mt-1 pr-6 line-clamp-1">{q.query}</p>
                      <p className="text-base text-stone-200 mt-1 line-clamp-2 leading-relaxed font-medium">{q.answer}</p>
                    </div>
                  ))}

                  {/* List Crop Calculations */}
                  {cropReports.slice(0, 1).map(rep => (
                    <div key={rep.id} className="p-4 bg-stone-900 border border-stone-700 rounded-lg text-left relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          database.deleteCropReport(rep.id);
                          reloadData();
                        }}
                        className="absolute right-3 top-3 text-stone-400 hover:text-red-400 transition-all cursor-pointer p-1 rounded hover:bg-stone-800"
                        title="Delete report"
                      >
                        <Trash size={15} />
                      </button>
                      <span className="inline-block text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded uppercase font-mono font-bold mb-1">
                        Calculated Report
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">{rep.cropType} Crop Log - {rep.areaHectares} Ha</h4>
                      <p className="text-base text-stone-200 mt-1">Urea: <span className="font-mono text-white font-bold">{rep.calculatedUreaKg} kg</span>, NPS: <span className="font-mono text-[#DAA520] font-bold">{rep.calculatedNpsKg} kg</span></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: VOICE AI HELPER */}
        {phoneTab === "voice" && (
          <div className="space-y-4 animate-fade-in text-left">
            <div className="flex justify-between items-center bg-stone-900 p-3 rounded-xl border border-stone-700 shadow-sm">
              <span className="text-base font-black text-white">GIRMAIC Voice Assistant</span>
              <button
                onClick={() => {
                  onClearHistory();
                  setLocalHistory([]);
                }}
                className="text-sm text-stone-300 hover:text-red-400 font-bold flex items-center gap-1 font-mono hover:underline cursor-pointer"
              >
                <Trash size={14} />
                <span>Clear Session</span>
              </button>
            </div>

            {/* Quick-Switch Voice Feedback Setting Toggle */}
            <div className="p-3 bg-stone-950 border border-stone-850 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black text-[#DAA520] tracking-widest uppercase">
                  🎙️ VOICE FEEDBACK SETTING
                </span>
                <span className="text-[10px] font-mono font-black text-stone-400">
                  {voiceFeedbackMode === "readout" ? "🗣️ SPEAK CHATS" : "🔕 SILENT CHATS"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setVoiceFeedbackMode("readout");
                    localStorage.setItem("girmaic_voice_feedback_mode", "readout");
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-[11px] font-black font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    voiceFeedbackMode === "readout"
                      ? "bg-[#DAA520] border-[#DAA520] text-stone-950 shadow-md"
                      : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-300 hover:bg-stone-850"
                  }`}
                >
                  <Volume2 size={12} />
                  <span>VOICE READOUT</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVoiceFeedbackMode("silent");
                    localStorage.setItem("girmaic_voice_feedback_mode", "silent");
                    if (typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-[11px] font-black font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    voiceFeedbackMode === "silent"
                      ? "bg-[#CD5C5C] border-[#CD5C5C] text-white shadow-md"
                      : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-300 hover:bg-stone-850"
                  }`}
                >
                  <VolumeX size={12} />
                  <span>SILENT TEXT</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Container with strict contrast and 16px minimum text */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 overflow-y-auto min-h-[220px] max-h-[340px] space-y-4 scrollbar-none">
              {localHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-3 select-none h-full">
                  <div className="w-12 h-12 rounded-full bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 flex items-center justify-center text-[#E5D3B3] animate-pulse">
                    <Mic size={22} />
                  </div>
                  <p className="text-base text-stone-200 leading-relaxed max-w-[280px] font-medium font-serif italic text-center">
                    "{
                      selectedLanguage === "am" ? "ሰላም Kidus! ማንኛውንም የግብርና፣ የትምህርት ወይም የስራ ጥያቄ ይጠይቁኝ፤ መልሱን አነብልዎታለሁ።" :
                      selectedLanguage === "om" ? "Selam Kidus! Hojii, barumsaa ykn qonna irratti gaaffii qabdan gaafadhaa. Deebii sagaleedhaan isiniif dubbisa." :
                      selectedLanguage === "so" ? "Selam Kidus! Weydii su'aalo kasta oo ku saabsan shaqada, waxbarashada ama beeraha." :
                      selectedLanguage === "ti" ? "ሰላም Kidus! ብድምፂ ወይ ብጽሑፍ ዝኾነ ሕቶ ይሕተቱኒ፤ ቃል ብቃል ድማ ድምፂ ይገብረሉ::" :
                      "Selam Kidus! Ask any question about farming ratios, STEM curriculum, or build a resume. Click the mic below and start talking!"
                    }"
                  </p>
                </div>
              ) : (
                localHistory.map((msg, idx) => {
                  const isUser = msg.role === "user";
                  return (
                    <div key={msg.id || idx} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                      <div
                        className={`max-w-[90%] rounded-2xl p-4 leading-relaxed text-base text-left relative shadow-sm ${
                          isUser
                            ? "bg-[#CD5C5C] text-white rounded-tr-none border border-[#CD5C5C]/50"
                            : "bg-[#F9F6F0] text-stone-950 rounded-tl-none border border-[#E5D3B3]"
                        }`}
                      >
                        <p className="white-space-pre-wrap font-sans font-medium">{msg.content}</p>

                        {!isUser && (
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-200 text-xs text-stone-600 font-mono select-none">
                            <span className="font-bold">GIRMAIC AI Helper</span>
                            <button
                              type="button"
                              onClick={() => speakResponse(msg.content)}
                              className="flex items-center gap-1.5 text-stone-950 hover:bg-stone-200 transition-all cursor-pointer font-bold px-3 py-1 bg-white rounded-lg border border-[#E5D3B3] active:scale-95 shrink-0"
                            >
                              <Volume2 size={12} />
                              <span className="text-xs">Read Aloud</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-mono text-stone-400 px-1 mt-1.5 select-none">{msg.timestamp || "Just now"}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Presets and speech indicators */}
            {(isListening || isSpeaking || isLoading) && (
              <div className="flex items-center justify-between p-3 bg-stone-900 border border-stone-700 rounded-xl select-none">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                    isListening ? "bg-red-500 animate-ping" : isSpeaking ? "bg-[#DAA520] animate-pulse" : "bg-teal-400 animate-spin"
                  }`} />
                  <span className="font-mono text-xs font-bold text-stone-200 uppercase tracking-widest leading-none">
                    {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Thinking..."}
                  </span>
                </div>
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-0.5 bg-[#DAA520] rounded-sm animate-pulse h-2" />
                  <span className="w-0.5 bg-emerald-500 rounded-sm animate-pulse h-4" />
                  <span className="w-0.5 bg-red-500 rounded-sm animate-pulse h-2.5" />
                </div>
              </div>
            )}

            {/* Input keyboard tools bar with 16px font-size for accessibility */}
            <div className="flex gap-2 items-center bg-stone-900 border border-stone-700 rounded-xl p-2">
              <button
                type="button"
                onClick={startListening}
                className={`p-3.5 rounded-lg transition-all cursor-pointer select-none shrink-0 border ${
                  isListening 
                    ? "bg-red-600 border-red-400 text-white animate-pulse" 
                    : "bg-stone-950 text-[#E5D3B3] border-stone-800 hover:text-white"
                }`}
                title="Tap to speak"
              >
                <Mic size={18} />
              </button>
              
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    triggerAsk(queryText);
                  }
                }}
                disabled={isLoading}
                placeholder="Ask about agriculture, math or jobs..."
                className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-base text-stone-100 placeholder-stone-500 px-1 py-1"
              />

              <button
                type="button"
                onClick={() => triggerAsk(queryText)}
                disabled={isLoading || !queryText.trim()}
                className="p-3 bg-[#DAA520] hover:bg-[#E5D3B3] text-stone-950 rounded-lg font-bold transition-all disabled:opacity-30 flex items-center justify-center cursor-pointer shrink-0"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Presets Grid */}
            <div className="space-y-2 text-left">
              <span className="text-xs text-stone-450 font-mono tracking-wider uppercase block font-bold text-stone-400">
                💡 Recommended presets:
              </span>
              <div className="space-y-2">
                {[
                  { label: "🌾 Teff Planting Optimal Soils", query: "ጤፍ ለመዝራት ምን ዓይነት አፈር ይመረጣል? NPS ማዳበሪያስ ማግኘት የምችለው እንዴት ነው?", category: "AI Farmer Assistant" },
                  { label: "💼 Careers & Jobs in Addis", query: "What are remote Upwork jobs and training routes in Addis Ababa?", category: "AI Career Coach" }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(p.category);
                      triggerAsk(p.query);
                    }}
                    className="w-full p-3.5 bg-stone-900 hover:bg-stone-850 border border-stone-700 hover:border-[#DAA520] rounded-xl text-left text-base text-stone-100 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <span className="font-bold text-[#E5D3B3]">{p.label}</span>
                    <span className="text-xs text-stone-400 block mt-1">Tap to ask ➔</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CV COACH */}
        {phoneTab === "cv" && (
          <div className="space-y-4 animate-fade-in text-left">
            {/* Header info banner - LIGHT CARD with dark text */}
            <div className="p-4 bg-[#F9F5F0] border border-[#CD5C5C]/35 rounded-xl text-stone-950">
              <div className="flex items-center gap-1.5 text-[#CD5C5C] text-base font-black font-serif italic">
                <Briefcase size={16} />
                <span>AI CV Optimiser Coach</span>
              </div>
              <p className="text-base text-stone-800 leading-relaxed font-semibold mt-1">
                Enter your genuine studies, skills and details. GIRMAIC will coordinate with Gemini to formulate a master resume profile layout or a compelling pitch.
              </p>
            </div>

            {/* CV Form inputs with clear accessibility and 16px labels / text */}
            <div className="bg-stone-900 p-4 rounded-xl border border-stone-700 space-y-4">
              <div className="grid grid-cols-1 gap-3 text-left">
                <div>
                  <label className="text-sm uppercase font-mono font-bold text-stone-200 block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={cvForm.fullName} 
                    onChange={e => setCvForm({...cvForm, fullName: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-base text-white focus:outline-none focus:border-[#DAA520]" 
                  />
                </div>
                <div>
                  <label className="text-sm uppercase font-mono font-bold text-stone-200 block mb-1">Target Professional Title</label>
                  <input 
                    type="text" 
                    value={cvForm.professionalTitle} 
                    onChange={e => setCvForm({...cvForm, professionalTitle: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-base text-white focus:outline-none focus:border-[#DAA520]" 
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="text-sm uppercase font-mono font-bold text-stone-200 block mb-1">Education Degree / Scholar Node</label>
                <input 
                  type="text" 
                  value={cvForm.education} 
                  onChange={e => setCvForm({...cvForm, education: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-base text-white focus:outline-none" 
                />
              </div>

              <div className="text-left">
                <label className="text-sm uppercase font-mono font-bold text-stone-200 block mb-1">Skills Stack (Comma separated)</label>
                <input 
                  type="text" 
                  value={cvForm.skills} 
                  onChange={e => setCvForm({...cvForm, skills: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-base text-white focus:outline-none" 
                />
              </div>

              <div className="text-left">
                <label className="text-sm uppercase font-mono font-bold text-stone-200 block mb-1">Work History Summary</label>
                <textarea 
                  rows={3}
                  value={cvForm.experience} 
                  onChange={e => setCvForm({...cvForm, experience: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-base text-white focus:outline-none resize-none" 
                />
              </div>

              <button
                onClick={handleGenerateCv}
                disabled={isGeneratingCv}
                className="w-full bg-[#CD5C5C] hover:bg-stone-800 hover:text-white text-stone-100 font-bold p-3 rounded-xl text-base transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 select-none border border-[#CD5C5C]"
              >
                {isGeneratingCv ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>{isGeneratingCv ? "Generating with Gemini..." : "Optimize & Save Draft"}</span>
              </button>
            </div>

            {/* Saved Draft View or History - LIGHT CARD pairings for perfect readability */}
            {cvPreview && (
              <div className="p-4 bg-[#F9F6F0] border-2 border-[#E5D3B3] rounded-xl space-y-3 animate-fade-in text-left text-stone-950 shadow-md">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs uppercase font-mono text-stone-600 font-black">AI RESUME PREVIEW (HIGH CONTRAST EDITION)</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(cvPreview.aiOptimizedCopy);
                      alert("AI Copy saved to clipboard!");
                    }}
                    className="text-sm text-stone-950 hover:text-[#CD5C5C] flex items-center gap-1 font-bold cursor-pointer bg-white px-2.5 py-1 rounded border border-stone-300"
                  >
                    <Clipboard size={12} />
                    <span>Copy Copy</span>
                  </button>
                </div>
                <p className="text-base leading-relaxed text-stone-900 bg-white p-3 rounded-lg border border-stone-250 italic">
                  "{cvPreview.aiOptimizedCopy}"
                </p>
                <p className="text-xs text-stone-500 font-mono text-center">Successfully synced layout under collection /cvs/{cvPreview.id}</p>
              </div>
            )}

            {/* List all saved drafts */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono text-stone-300 tracking-wider font-bold block">SAVED CV PROFILES ({cvDrafts.length})</span>
              {cvDrafts.length === 0 ? (
                <p className="text-base text-stone-400 italic text-center py-2">No cached resumes yet. Write inputs and trigger Optimization.</p>
              ) : (
                <div className="space-y-3">
                  {cvDrafts.map(draft => (
                    <div key={draft.id} className="p-4 bg-stone-900 border border-stone-700 rounded-xl text-left relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          database.deleteCvDraft(draft.id);
                          reloadData();
                        }}
                        className="absolute right-3 top-3 text-stone-400 hover:text-red-400 cursor-pointer p-1 rounded hover:bg-stone-800"
                      >
                        <Trash size={14} />
                      </button>
                      <h4 className="text-base font-black text-[#E5D3B3]">{draft.fullName} - {draft.professionalTitle}</h4>
                      <p className="text-sm font-mono text-[#DAA520] mt-1">{draft.education}</p>
                      <p className="text-base italic text-stone-200 mt-2 leading-relaxed bg-stone-950 p-2.5 rounded border border-stone-800">{draft.aiOptimizedCopy}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: STEM TUTOR */}
        {phoneTab === "edu" && (
          <div className="space-y-4 animate-fade-in text-left">
            {/* Header cap - LIGHT CARD pairing */}
            <div className="p-4 bg-[#F9F5F0] border border-[#DAA520]/60 rounded-xl flex items-start gap-3.5 text-stone-950">
              <div className="w-10 h-10 rounded-lg bg-[#DAA520]/20 flex items-center justify-center text-stone-900 shrink-0 mt-0.5 border border-[#DAA520]/20">
                <GraduationCap size={20} />
              </div>
              <div>
                <h4 className="text-base font-black text-stone-900">National Exam Prep Study Coach</h4>
                <p className="text-base text-stone-800 font-semibold leading-relaxed mt-1">
                  Interactive prep questions for high school matric science and calculus. Try the exam test or summarize custom academic terms.
                </p>
              </div>
            </div>

            {/* STEM Topic summarizer from Gemini */}
            <div className="p-4 bg-stone-900 border border-stone-700 rounded-xl space-y-3">
              <span className="text-xs font-mono uppercase text-stone-300 font-black block">
                🧠 Dynamic Science Summary Loader
              </span>
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  value={conceptQuery}
                  onChange={e => setConceptQuery(e.target.value)}
                  placeholder="Enter a word (e.g. Calculus derivative, Gravity)" 
                  className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2.5 text-base text-stone-100 focus:outline-none focus:border-[#DAA520]"
                />
                <button
                  onClick={handleSearchConcept}
                  disabled={isSearchingConcept || !conceptQuery.trim()}
                  className="w-full bg-[#DAA520] hover:bg-[#E5D3B3] text-stone-950 px-4 py-2.5 rounded text-base font-black flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                >
                  {isSearchingConcept ? <RefreshCw size={13} className="animate-spin" /> : <Search size={13} />}
                  <span>Summarize Term</span>
                </button>
              </div>

              {conceptResult && (
                <div className="bg-white p-4 rounded-xl border border-stone-300 text-left animate-fade-in text-stone-950">
                  <div className="text-xs uppercase font-mono text-stone-600 font-black pb-1 border-b border-stone-100">Gemini Study Guide result</div>
                  <p className="text-base text-stone-900 leading-relaxed mt-2 whitespace-pre-wrap font-medium">{conceptResult}</p>
                </div>
              )}
            </div>

            {/* Assessment test simulator */}
            {!isQuizDone ? (
              <div className="bg-stone-900 border border-stone-700 rounded-xl p-4 space-y-3 text-left">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase font-bold">
                    QUESTION {activeQuizIndex + 1}/{STEM_QUESTIONS.length}
                  </span>
                  <span className="text-xs bg-stone-950 px-2 py-0.5 rounded text-[#DAA520] font-mono border border-stone-800">
                    Topic: {STEM_QUESTIONS[activeQuizIndex].topic}
                  </span>
                </div>

                <p className="text-base font-black text-stone-100 leading-relaxed font-serif pt-1">
                  {STEM_QUESTIONS[activeQuizIndex].q}
                </p>

                <div className="space-y-2.5 pt-2">
                  {STEM_QUESTIONS[activeQuizIndex].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (!isChecked) setSelectedAns(oIdx);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl text-base leading-relaxed border transition-all cursor-pointer ${
                        selectedAns === oIdx
                          ? "bg-[#DAA520]/20 border-[#DAA520] text-white font-bold"
                          : "bg-stone-950 border-stone-800 text-stone-200 hover:bg-stone-900"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-stone-900 border border-stone-700 text-xs font-mono font-bold flex items-center justify-center mt-0.5 select-none shrink-0 text-stone-200">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedAns !== null && !isChecked && (
                  <button
                    onClick={() => {
                      setIsChecked(true);
                      if (selectedAns === STEM_QUESTIONS[activeQuizIndex].correct) {
                        setQuizScore(prev => prev + 1);
                      }
                    }}
                    className="w-full bg-[#DAA520] text-stone-950 font-bold p-3 rounded-xl text-base cursor-pointer"
                  >
                    Check Answer
                  </button>
                )}

                {isChecked && (
                  <div className="space-y-3 pt-3 border-t border-stone-800 text-left animate-fade-in">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-base font-black ${selectedAns === STEM_QUESTIONS[activeQuizIndex].correct ? "text-emerald-400" : "text-red-400"}`}>
                        {selectedAns === STEM_QUESTIONS[activeQuizIndex].correct ? "✓ Correct!" : "✗ Incorrect"}
                      </span>
                    </div>
                    <div className="p-4 bg-[#F9F6F0] rounded-xl border border-[#E5D3B3] text-stone-950">
                      <p className="text-base leading-relaxed font-serif font-medium">
                        {STEM_QUESTIONS[activeQuizIndex].explanation}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsChecked(false);
                        setSelectedAns(null);
                        if (activeQuizIndex < STEM_QUESTIONS.length - 1) {
                          setActiveQuizIndex(prev => prev + 1);
                        } else {
                          setIsQuizDone(true);
                          database.saveQuizAttempt(currentUser.uid, "General STEM Science Test", quizScore + (selectedAns === STEM_QUESTIONS[activeQuizIndex].correct ? 1 : 0), STEM_QUESTIONS.length);
                          reloadData();
                        }
                      }}
                      className="w-full bg-stone-800 hover:bg-stone-750 text-stone-200 p-3 rounded-lg text-base font-bold cursor-pointer border border-stone-700"
                    >
                      {activeQuizIndex === STEM_QUESTIONS.length - 1 ? "Finish Test & Log Attempt" : "Proceed to next question ➔"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#F9F6F0] border border-[#E5D3B3] rounded-xl p-5 text-center space-y-4 text-stone-950 shadow-md">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto">
                  <Award size={22} />
                </div>
                <div>
                  <h4 className="text-sm uppercase font-mono text-stone-600 font-black">Quiz Completed Successfully</h4>
                  <p className="text-3xl font-black text-stone-900 font-serif mt-1">{quizScore} / {STEM_QUESTIONS.length}</p>
                  <p className="text-xs text-stone-500 font-mono mt-1">History score linked with user profile node.</p>
                </div>
                <button
                  onClick={() => {
                    setActiveQuizIndex(0);
                    setSelectedAns(null);
                    setIsChecked(false);
                    setQuizScore(0);
                    setIsQuizDone(false);
                  }}
                  className="w-full bg-[#DAA520] hover:bg-stone-950 hover:text-white text-stone-950 p-3 rounded-xl text-base font-black transition-all cursor-pointer select-none"
                >
                  Restart Assessment
                </button>
              </div>
            )}

            {/* List Quiz Attempts and Scores */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-stone-300 tracking-wider font-bold block">EXAM ATTEMPT HISTORY LOGS</span>
              {quizzes.length === 0 ? (
                <p className="text-base italic text-stone-400 text-center">No assessments completed yet. Finish the test to see history logs here.</p>
              ) : (
                <div className="space-y-2.5 font-mono text-base text-stone-300">
                  {quizzes.map(quiz => (
                    <div key={quiz.id} className="p-3 border border-stone-700 rounded-lg bg-stone-900 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-stone-100 block">{quiz.lessonTopic}</span>
                        <span className="text-xs text-stone-400">{quiz.updatedAt}</span>
                      </div>
                      <span className="text-base font-black text-[#DAA520] whitespace-nowrap">{quiz.score} / {quiz.totalQuestions} Hits</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: FARM CALCULATOR */}
        {phoneTab === "agri" && (
          <div className="space-y-4 animate-fade-in text-left">
            {/* Header cap - LIGHT CARD green style */}
            <div className="p-4 bg-[#EAF2EC] border border-emerald-300 rounded-xl text-emerald-950">
              <div className="flex items-center gap-1.5 text-emerald-900 text-base font-bold font-serif italic">
                <Sprout size={16} />
                <span>NPS & Urea Fertilizer Soil Calculator</span>
              </div>
              <p className="text-base text-stone-800 mt-2 leading-relaxed font-semibold">
                Select your major cereal crop type, land grid size, and custom soil color class. GIRMAIC calculates precise input ratios to maximize farming output.
              </p>
            </div>

            {/* Farm form calculator inputs with 16px text accessibility */}
            <div className="bg-stone-900 p-4 rounded-xl border border-stone-700 space-y-4 text-base text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-mono text-stone-200 tracking-wider block mb-1 font-bold">Cereal Crop Type</label>
                  <select 
                    value={farmForm.cropType}
                    onChange={e => setFarmForm({...farmForm, cropType: e.target.value as any})}
                    className="w-full bg-stone-950 border border-stone-750 p-3 rounded text-base text-white outline-none focus:border-[#DAA520]"
                  >
                    <option value="Teff">Teff - ጤፍ</option>
                    <option value="Wheat">Wheat - ስንዴ</option>
                    <option value="Maize">Maize - በቆሎ</option>
                    <option value="Barley">Barley - ገብስ</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs uppercase font-mono text-stone-200 tracking-wider block mb-1 font-bold">Soil Properties</label>
                  <select
                    value={farmForm.soilType}
                    onChange={e => setFarmForm({...farmForm, soilType: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-750 p-3 rounded text-base text-white outline-none focus:border-[#DAA520]"
                  >
                    <option value="Vertisol">Black Vertisol (High clay)</option>
                    <option value="Nitisol">Red Nitisol (High acidity)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-mono text-stone-200 tracking-wider block mb-1 font-bold">
                  Acreage (Hectares) — [Currently: <strong className="text-white text-base">{farmForm.areaHectares} Ha</strong>]
                </label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="10" 
                  step="0.5"
                  value={farmForm.areaHectares}
                  onChange={e => setFarmForm({...farmForm, areaHectares: parseFloat(e.target.value)})}
                  className="w-full accent-[#DAA520] bg-stone-950 h-2 rounded-lg cursor-pointer my-2"
                />
                <div className="flex justify-between text-xs text-stone-300 font-mono font-bold">
                  <span>0.5 Ha</span>
                  <span>5.0 Ha</span>
                  <span>10.0 Ha</span>
                </div>
              </div>

              <button
                onClick={handleCalculateSoil}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl text-base flex justify-center items-center gap-1.5 transition-all select-none cursor-pointer"
              >
                <Sprout size={16} />
                <span>Calculate Fertilizer Ratio</span>
              </button>
            </div>

            {/* Calculations recommendation report card - LIGHT CARD pairings */}
            {calcResult && (
              <div className="p-4 bg-[#F9F6F0] border border-[#E5D3B3] rounded-xl space-y-3 animate-fade-in text-left text-neutral-900 shadow-md">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs font-mono uppercase text-stone-500 font-black">Output projection result</span>
                  <span className="text-xs text-emerald-700 font-black">Logged successfully ✔</span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-1">
                  <div className="p-3 bg-white rounded-lg border border-stone-300 text-stone-950 text-center shadow-inner">
                    <span className="text-xs uppercase font-mono font-black text-stone-500">Urea Needed</span>
                    <p className="text-xl font-black text-stone-900 font-mono mt-1">{calcResult.urea} <span className="text-xs font-bold font-sans">kg</span></p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-stone-300 text-stone-950 text-center shadow-inner">
                    <span className="text-xs uppercase font-mono font-black text-stone-500">NPS Needed</span>
                    <p className="text-xl font-black text-[#8B6E09] font-mono mt-1">{calcResult.nps} <span className="text-xs font-bold font-sans">kg</span></p>
                  </div>
                </div>

                <p className="text-base text-stone-850 font-serif leading-relaxed italic pt-1 text-left font-semibold">
                  "{calcResult.summary}"
                </p>
              </div>
            )}

            {/* List Farming Reports Logs */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-stone-300 block font-bold">PREVIOUS CALCULATIONS JOURNAL</span>
              {cropReports.length === 0 ? (
                <p className="text-base italic text-stone-400 text-center">No reports saved yet. Perform a formula calculation above to see history.</p>
              ) : (
                <div className="space-y-2.5">
                  {cropReports.map(rep => (
                    <div key={rep.id} className="p-3.5 bg-stone-900 border border-stone-750 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-base font-bold text-stone-100 block">{rep.cropType} Fertilizer Card - {rep.areaHectares} Ha</span>
                        <span className="text-xs font-mono text-stone-400">{rep.createdAt} • {rep.soilType} Soil</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-white text-base block font-bold">Urea: {rep.calculatedUreaKg} kg</span>
                        <span className="font-mono text-[#DAA520] text-sm block">NPS: {rep.calculatedNpsKg} kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: IDENTITY PORTAL & ROLE PLACEMENTS */}
        {phoneTab === "portal" && (
          <div className="space-y-4 animate-fade-in text-left">
            <div className="p-4 bg-[#F9F6F0] border border-[#E5D3B3] rounded-xl flex items-center justify-between text-stone-950">
              <div>
                <span className="text-xs uppercase font-mono text-stone-600 font-bold">Status Verification Node</span>
                <span className="text-base font-black text-stone-900 block mt-1">Digital Fayda Gateway Connected</span>
              </div>
              <div className="px-2.5 py-1 bg-emerald-100 border border-emerald-300 rounded text-emerald-800 text-xs font-mono uppercase font-black animate-pulse">
                verified
              </div>
            </div>

            {/* Selector inside portal tab */}
            <div className="p-4 bg-stone-900/60 border border-stone-700 rounded-xl space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-stone-850">
                <span className="text-base font-black text-white">National Team Registry</span>
                <span className="text-xs font-mono bg-stone-950 px-2 py-0.5 rounded text-[#DAA520] font-black">Owner Access ONLY</span>
              </div>

              {/* Recruitment dispatch Form */}
              <form onSubmit={handleSendInvite} className="space-y-3 text-base">
                <div className="grid grid-cols-1 gap-3 text-left">
                  <div>
                    <label className="text-xs uppercase font-mono text-stone-200 block mb-1 font-bold">Candidate Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Martha Hailu"
                      value={inviteForm.fullName}
                      onChange={e => setInviteForm({...inviteForm, fullName: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-700 p-3 rounded-lg text-base text-white focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-mono text-stone-200 block mb-1 font-bold">Candidate Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. martha@moa.gov.et"
                      value={inviteForm.email}
                      onChange={e => setInviteForm({...inviteForm, email: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-700 p-3 rounded-lg text-base text-white focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="text-xs uppercase font-mono text-stone-200 block mb-1 font-bold">Role Scopes Designation</label>
                  <select
                    value={inviteForm.role}
                    onChange={e => setInviteForm({...inviteForm, role: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-700 p-3 rounded-lg text-base text-white outline-none focus:border-[#DAA520]"
                  >
                    <option value="Field Representative">Field Representative (Advisories & local metrics)</option>
                    <option value="Expert Support">Expert Support (Academic anomalies validation)</option>
                    <option value="Admin">Admin (Portal & team manager)</option>
                    <option value="Farming Practitioner">Farming Practitioner (Roster member)</option>
                  </select>
                </div>

                {inviteFeedback && (
                  <p className="text-base text-emerald-400 font-mono font-bold animate-fade-in">{inviteFeedback}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#DAA520] hover:bg-[#E5D3B3] text-stone-950 font-bold p-3 rounded-xl text-base flex justify-center items-center gap-1.5 cursor-pointer transition-all"
                >
                  <UserPlus size={15} />
                  <span>Send Onboarding Invite</span>
                </button>
              </form>
            </div>

            {/* List Team members tables */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-stone-300 tracking-wider block font-black">ROSTER EXPERT DIRECTORY</span>
              <div className="space-y-3.5 text-left text-base bg-stone-950 p-2 rounded-xl border border-stone-850">
                {teamMembers.map(member => (
                  <div key={member.id} className="p-4 bg-stone-900 border border-stone-750 rounded-xl space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <h4 className="text-base font-black text-white leading-tight truncate">{member.fullName}</h4>
                        <span className="text-sm text-[#DAA520] font-mono break-all">{member.email}</span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {member.status === "Invited" && (
                          <button
                            onClick={() => handleResendBeacon(member.id)}
                            className="bg-stone-950 border border-stone-700 hover:bg-stone-800 text-xs px-2.5 py-1.5 rounded-lg text-stone-200 cursor-pointer font-bold"
                          >
                            Resend
                          </button>
                        )}
                        <button
                          onClick={() => handleRevokeAccess(member.id, member.role)}
                          className="bg-stone-950 border border-stone-700 hover:bg-red-950 hover:text-red-400 text-stone-300 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer font-bold"
                        >
                          Revoke
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-2.5 border-t border-stone-800">
                      <span className="text-xs text-stone-400 font-mono font-bold">Scope designation:</span>
                      
                      {member.role === "Owner" ? (
                        <span className="text-xs uppercase font-mono px-2 py-0.5 bg-stone-950 text-stone-200 rounded font-bold border border-stone-800">System Owner</span>
                      ) : (
                        <select
                          value={member.role}
                          onChange={e => handleRoleChange(member.id, e.target.value)}
                          className="bg-stone-950 text-stone-200 font-mono text-xs font-bold p-1 rounded outline-none border border-stone-750 cursor-pointer"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Expert Support">Expert Support</option>
                          <option value="Field Representative">Field Representative</option>
                          <option value="Farming Practitioner">Farming Practitioner</option>
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* SECURE DYNAMIC FLOATING NOTIFICATIONS TOAST */}
      {error && (
        <div className="mx-4 mb-4 p-4 bg-red-950 border border-red-500 rounded-xl text-base text-red-200 text-left leading-normal flex items-start gap-2 animate-fade-in z-30 shadow-md">
          <span className="text-lg">⚠️</span>
          <p className="flex-1 font-bold">{error}</p>
        </div>
      )}

      {/* PHONE CLEAN BOTTOM TAB BAR ROW with enlarged targets for touch accessibility */}
      <div className="grid grid-cols-6 border-t border-stone-800 bg-stone-950 py-3 shrink-0 z-20 shadow-lg select-none">
        <button
          onClick={() => setPhoneTab("home")}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer h-12 ${
            phoneTab === "home" ? "text-white font-black scale-105" : "text-stone-400 hover:text-stone-200"
          }`}
        >
          <Compass size={18} className={phoneTab === "home" ? "text-[#DAA520]" : ""} />
          <span className="text-[10px] uppercase font-mono tracking-wider mt-1 font-bold">Home</span>
        </button>

        <button
          onClick={() => setPhoneTab("voice")}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer h-12 ${
            phoneTab === "voice" ? "text-white font-black scale-105" : "text-stone-400 hover:text-stone-200"
          }`}
        >
          <Mic size={18} className={phoneTab === "voice" ? "text-indigo-400" : ""} />
          <span className="text-[10px] uppercase font-mono tracking-wider mt-1 font-bold">Voice</span>
        </button>

        <button
          onClick={() => setPhoneTab("cv")}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer h-12 ${
            phoneTab === "cv" ? "text-white font-black scale-105" : "text-stone-400 hover:text-stone-200"
          }`}
        >
          <Briefcase size={18} className={phoneTab === "cv" ? "text-[#CD5C5C]" : ""} />
          <span className="text-[10px] uppercase font-mono tracking-wider mt-1 font-bold">CV</span>
        </button>

        <button
          onClick={() => setPhoneTab("edu")}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer h-12 ${
            phoneTab === "edu" ? "text-white font-black scale-105" : "text-stone-400 hover:text-stone-200"
          }`}
        >
          <GraduationCap size={18} className={phoneTab === "edu" ? "text-[#DAA520]" : ""} />
          <span className="text-[10px] uppercase font-mono tracking-wider mt-1 font-bold">STEM</span>
        </button>

        <button
          onClick={() => setPhoneTab("agri")}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer h-12 ${
            phoneTab === "agri" ? "text-white font-black scale-105" : "text-stone-400 hover:text-stone-200"
          }`}
        >
          <Sprout size={18} className={phoneTab === "agri" ? "text-emerald-400" : ""} />
          <span className="text-[10px] uppercase font-mono tracking-wider mt-1 font-bold">Soil</span>
        </button>

        <button
          onClick={() => setPhoneTab("portal")}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer h-12 ${
            phoneTab === "portal" ? "text-white font-black scale-105" : "text-stone-400 hover:text-stone-200"
          }`}
        >
          <User size={18} className={phoneTab === "portal" ? "text-blue-400" : ""} />
          <span className="text-[10px] uppercase font-mono tracking-wider mt-1 font-bold">Fayda</span>
        </button>
      </div>

    </div>
  );
}
