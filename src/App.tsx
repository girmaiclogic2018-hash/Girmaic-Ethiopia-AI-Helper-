import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  Store, 
  Sprout, 
  FileText, 
  GraduationCap, 
  Cpu, 
  Send, 
  RefreshCw, 
  ChevronRight, 
  Check, 
  HelpCircle, 
  Layers, 
  FileCheck,
  MapPin,
  Clock,
  ExternalLink,
  MessageSquare,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  UserCheck,
  TrendingUp,
  Rocket,
  Compass,
  Languages,
  Lightbulb,
  BookOpen,
  Globe,
  Sparkles,
  Database,
  Wifi,
  WifiOff,
  User,
  Trash2,
  Plus,
  Share2,
  CheckCircle2,
  Smartphone,
  Settings,
  Lock,
  Unlock,
  AlertCircle
} from "lucide-react";
import { LANGUAGES, CATEGORIES, GUIDE_PRESETS, INTERFACE_TEXTS } from "./data";
import { LanguageCode, ChatMessage, HelpResponse } from "./types";
import PhoneSimulator from "./components/PhoneSimulator";
import ArchitectureView from "./components/ArchitectureView";
import UserActivityWidget from "./components/UserActivityWidget";
import { useLanguageStore } from "./store/useLanguageStore";

const CATEGORY_COLORS: Record<string, { dot: string; border: string; bg: string; text: string }> = {
  jobs: { dot: "bg-[#CD5C5C]", border: "border-[#CD5C5C]", bg: "bg-[#CD5C5C]/10", text: "text-[#CD5C5C]" },
  small_business: { dot: "bg-[#6B8E23]", border: "border-[#6B8E23]", bg: "bg-[#6B8E23]/10", text: "text-[#6B8E23]" },
  agriculture: { dot: "bg-[#DAA520]", border: "border-[#DAA520]", bg: "bg-[#DAA520]/10", text: "text-[#DAA520]" },
  government: { dot: "bg-[#3b82f6]", border: "border-[#3b82f6]", bg: "bg-[#3b82f6]/10", text: "text-blue-400" },
  education: { dot: "bg-[#a855f7]", border: "border-[#a855f7]", bg: "bg-[#a855f7]/10", text: "text-purple-400" },
  technology: { dot: "bg-[#14b8a6]", border: "border-[#14b8a6]", bg: "bg-[#14b8a6]/10", text: "text-teal-400" },
};

const EXAM_PREP_QUIZZES = [
  {
    q: "Which fertilizer provides nitrogen and sulfur, crucial for acidic and neutral soils growing Teff in Shoa highlands?",
    options: [
      "NPS (Nitrogen-Phosphorus-Sulfur) complex",
      "Urea Coated Pellets",
      "DAP (Diammonium Phosphate) only",
      "Potash alone"
    ],
    correct: 0,
    explanation: "NPS is the modern recommendation replacing DAP in Ethiopia. It integrates crucial sulfur (S) promoting Teff root systems and structural grain strength."
  },
  {
    q: "In calculus, what is the derivative of f(x) = Teff yield (3x² - 4x + 10)?",
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
    q: "What is the primary organic crop pathogen that causes standard Wheat rust disease across Arsi and Bale zones?",
    options: [
      "Puccinia graminis (Fungus)",
      "Tobacco Mosaic Virus",
      "Pseudomonas syringae (Bacteria)",
      "Nematode infestation"
    ],
    correct: 0,
    explanation: "Puccinia graminis causes stem, stripe, and leaf rusts, which are devastating fungal threats to cereal grains in cooler Ethiopian highland zones."
  }
];

export default function App() {
  const { selectedLanguage, setSelectedLanguage } = useLanguageStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("jobs");
  const [queryText, setQueryText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastBreakdown, setLastBreakdown] = useState<HelpResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Voice Interface States
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [autoRead, setAutoRead] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [ttsSupported, setTtsSupported] = useState<boolean>(true);

  // Architecture & MVP Mode States
  const [viewMode, setViewMode] = useState<"app" | "architecture">("app");
  
  // Offline Simulation Mode States (Offline queue management)
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<Array<{
    id: string;
    type: string;
    label: string;
    timestamp: string;
    payload: any;
  }>>([]);

  // Live Firebase/Firestore Mock Database Sync Stream representation
  const [userSession, setUserSession] = useState(() => {
    try {
      const cached = localStorage.getItem("girmaic_user_session");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading cached session:", e);
    }
    return {
      uid: "eth-usr-94821",
      fullName: "Kidus Abebe",
      email: "kidus.abebe@gmail.com",
      phone: "+251911234567",
      language: "am",
      preferredWoreda: "Bole Woreda 03, Addis Ababa",
      loggedIn: true,
      createdAt: "2026-06-12T10:30:00Z"
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem("girmaic_user_session", JSON.stringify(userSession));
    } catch (e) {
      console.error("Error saving session:", e);
    }
  }, [userSession]);

  const [firestoreDocs, setFirestoreDocs] = useState<Record<string, any>>({
    "users/eth-usr-94821": {
      uid: "eth-usr-94821",
      fullName: "Kidus Abebe",
      email: "kidus.abebe@gmail.com",
      phone: "+251911234567",
      language: "am",
      preferredWoreda: "Bole Woreda 03, Addis Ababa",
      createdAt: "2026-06-12T10:30:00Z"
    },
    "users/eth-usr-94821/cvs/initial-cv": {
      id: "initial-cv",
      uid: "eth-usr-94821",
      fullName: "Kidus Abebe",
      professionalTitle: "Software Developer",
      phone: "+251911234567",
      email: "kidus.abebe@gmail.com",
      education: "Addis Ababa University - B.Sc in Software Engineering",
      skills: "React, Node.js, Express, Telebirr API, TailwindCSS",
      experience: "Junior Frontend Intern at Ethio Telecom. Configured custom billing interfaces.",
      aiOptimizedCopy: "Highly motivated Software Engineering graduate with deep experience in mobile telecom payment ecosystems.",
      createdAt: "2026-06-15T12:00:00Z"
    }
  });

  // CV Builder Sub-App States
  const [cvFullName, setCvFullName] = useState<string>("Kidus Abebe");
  const [cvProfession, setCvProfession] = useState<string>("Software Developer");
  const [cvEmailAddr, setCvEmailAddr] = useState<string>("kidus.abebe@gmail.com");
  const [cvPhoneNum, setCvPhoneNum] = useState<string>("+251 911 234567");
  const [cvEducation, setCvEducation] = useState<string>("Addis Ababa University - B.Sc Software Engineering");
  const [cvSkillsTag, setCvSkillsTag] = useState<string>("React, TypeScript, Express, Tailwind, Telebirr Webhooks");
  const [cvExperience, setCvExperience] = useState<string>("Built billing panels for regional small businesses as freelancer. Ethio Telecom web development internship (3 months).");
  const [cvAiSummary, setCvAiSummary] = useState<string>("Determined Software Developer looking to deploy secure full-stack applications and integrate local mobile payment APIs to drive Ethiopian business accessibility.");
  const [isCvOptimative, setIsCvOptimative] = useState<boolean>(false);

  // Education STEM Lesson & National Quiz States
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(1);
  const [quizAttempts, setQuizAttempts] = useState<number>(1);
  const [quizFeedback, setQuizFeedback] = useState<string>("");
  const [isQuizChecked, setIsQuizChecked] = useState<boolean>(false);

  // Agriculture Advisor parameters
  const [cropType, setCropType] = useState<"Teff" | "Wheat" | "Maize">("Teff");
  const [acreageVal, setAcreageVal] = useState<number>(2.5);
  const [soilType, setSoilType] = useState<"Vertisol" | "Nitosol">("Vertisol");
  const [calculatedUrea, setCalculatedUrea] = useState<number>(250); // kg
  const [calculatedNps, setCalculatedNps] = useState<number>(375); // kg
  const [fertilizerReport, setFertilizerReport] = useState<string>("Optimal ratio determined for classic Addis Ababa / Sheger regional black Vertisols.");
  const [soilCalculationsCount, setSoilCalculationsCount] = useState<number>(1);

  // Quick helper to fetch translation for UI elements
  const t = (key: string): string => {
    const textConfig = INTERFACE_TEXTS[key];
    if (!textConfig) return key;
    return textConfig[selectedLanguage] || textConfig["en"] || key;
  };

  // Speech input implementation (Speech-to-Text)
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(t("voiceUnsupported"));
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    
    // Map selected language to BCP 47 locales
    let bcp47 = "en-US";
    if (selectedLanguage === "am") bcp47 = "am-ET";
    else if (selectedLanguage === "om") bcp47 = "om-ET";
    else if (selectedLanguage === "so") bcp47 = "so-SO";
    else if (selectedLanguage === "ti") bcp47 = "ti-ET";
    
    recognition.lang = bcp47;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
      if (event.error === "not-allowed") {
        setError("Microphone permission was denied. Please allow microphone access in your browser settings.");
      } else {
        setError(`Speech input error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setQueryText(transcript);
        handleAsk(transcript);
      }
    };

    recognition.start();
  };

  // Speech output implementation (Text-to-Speech)
  const speakResponse = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setTtsSupported(false);
      return;
    }

    if (isListening) {
      stopListeningFallback();
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    const cleanText = text
      .replace(/[\#\*\_`\-]/g, " ")
      .replace(/\[.*?\]/g, "") 
      .replace(/\(https?:\/\/.*?\)/g, ""); 

    const utterances = cleanText.split(/[.!?።]\s+/).filter(s => s.trim().length > 0);
    
    let bcp47 = "en-US";
    if (selectedLanguage === "am") bcp47 = "am-ET";
    else if (selectedLanguage === "om") bcp47 = "om-ET";
    else if (selectedLanguage === "so") bcp47 = "so-SO";
    else if (selectedLanguage === "ti") bcp47 = "ti-ET";

    let currentUtteranceIndex = 0;

    const speakNext = () => {
      if (currentUtteranceIndex >= utterances.length) {
        setIsSpeaking(false);
        return;
      }

      const chunk = utterances[currentUtteranceIndex];
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = bcp47;
      utterance.rate = speechRate;

      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(v => 
        v.lang.startsWith(bcp47) || 
        v.lang.toLowerCase().includes(selectedLanguage)
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => {
        currentUtteranceIndex++;
        speakNext();
      };

      utterance.onerror = (e) => {
        console.error("Speech synthesis ended with code error:", e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    if (utterances.length > 0) {
      speakNext();
    } else {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const stopListeningFallback = () => {
    setIsListening(false);
  };

  // Offline Sync Management
  const handleOfflineAction = (type: string, label: string, payload: any) => {
    const newItem = {
      id: "off-act-" + Date.now(),
      type,
      label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      payload
    };
    setOfflineQueue(prev => [...prev, newItem]);
  };

  const synchronizeOfflineQueue = () => {
    if (isOffline) {
      setError("Cannot sync parameters while Offline Mode is simulated! Please toggle Network connection Online.");
      return;
    }
    
    const newDocs = { ...firestoreDocs };
    offlineQueue.forEach(item => {
      if (item.type === "CV_SAVE") {
        const cvId = "cv-" + Date.now();
        newDocs[`users/eth-usr-94821/cvs/${cvId}`] = {
          id: cvId,
          uid: "eth-usr-94821",
          ...item.payload,
          createdAt: new Date().toISOString()
        };
      } else if (item.type === "QUIZ_SCORE") {
        const quizId = "quiz-" + Date.now();
        newDocs[`users/eth-usr-94821/quizzes/${quizId}`] = {
          id: quizId,
          uid: "eth-usr-94821",
          ...item.payload,
          updatedAt: new Date().toISOString()
        };
      } else if (item.type === "CROP_REPORT") {
        const cropId = "crop-" + Date.now();
        newDocs[`users/eth-usr-94821/crops/${cropId}`] = {
          id: cropId,
          uid: "eth-usr-94821",
          ...item.payload,
          createdAt: new Date().toISOString()
        };
      }
    });

    setFirestoreDocs(newDocs);
    setOfflineQueue([]);
    setError(null);
    
    if (autoRead) {
      speakResponse("Offline queues synchronized successfully with Firebase Firestore databases.");
    }
  };

  // CV Optimization Logic with simulated/live Gemini API
  const handleAiOptimizeCv = async () => {
    setIsCvOptimative(true);
    setError(null);
    
    const prompt = `You are GIRMAIC AI, a premium Ethiopian Career Coach. Enhance this professional summary for a resume in Ethiopia. Name: ${cvFullName}; Profession: ${cvProfession}; Education: ${cvEducation}; Skills: ${cvSkillsTag}; Experience: ${cvExperience}. Keep it extremely professional and under 60 words.`;
    
    if (isOffline) {
      handleOfflineAction("CV_SAVE", `Resume draft for ${cvFullName}`, {
        fullName: cvFullName,
        professionalTitle: cvProfession,
        phone: cvPhoneNum,
        email: cvEmailAddr,
        education: cvEducation,
        skills: cvSkillsTag,
        experience: cvExperience,
        aiOptimizedCopy: "Offline cached resume summary: Skilled engineer based in central Addis Ababa."
      });
      setCvAiSummary("Notice: Simulated Offline Mode enabled. This generative optimization action was placed in the queue and will be executed when you go online.");
      setIsCvOptimative(false);
      return;
    }

    try {
      const response = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          category: "jobs",
          query: `OPTIMIZE_CV: ${prompt}`
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to contact optimization proxy service.`);
      }

      const res = await response.json();
      const optimizedSummary = res.answer || "Passionate engineer specialized in telecom APIs and regional transaction modules.";
      setCvAiSummary(optimizedSummary);
      
      const cvId = "cv-cvs-" + Date.now();
      setFirestoreDocs(prev => ({
        ...prev,
        [`users/eth-usr-94821/cvs/${cvId}`]: {
          id: cvId,
          uid: "eth-usr-94821",
          fullName: cvFullName,
          professionalTitle: cvProfession,
          phone: cvPhoneNum,
          email: cvEmailAddr,
          education: cvEducation,
          skills: cvSkillsTag,
          experience: cvExperience,
          aiOptimizedCopy: optimizedSummary,
          createdAt: new Date().toISOString()
        }
      }));
      
    } catch (err: any) {
      console.error("Gemini CV Optimization error:", err);
      const fallbackSummary = `Detail-oriented ${cvProfession} with academic credentials from ${cvEducation}. Possesses strong competence in ${cvSkillsTag} paired with professional dedication to resolving key infrastructure tasks in high-growth Ethiopian companies.`;
      setCvAiSummary(fallbackSummary);
      
      const cvId = "cv-cvs-" + Date.now();
      setFirestoreDocs(prev => ({
        ...prev,
        [`users/eth-usr-94821/cvs/${cvId}`]: {
          id: cvId,
          uid: "eth-usr-94821",
          fullName: cvFullName,
          professionalTitle: cvProfession,
          phone: cvPhoneNum,
          email: cvEmailAddr,
          education: cvEducation,
          skills: cvSkillsTag,
          experience: cvExperience,
          aiOptimizedCopy: fallbackSummary,
          createdAt: new Date().toISOString()
        }
      }));
    } finally {
      setIsCvOptimative(false);
    }
  };

  // STEM National Quiz Answers Handlers
  const handleQuizAnswer = (optionIdx: number) => {
    setSelectedQuizAnswer(optionIdx);
    const currentQuiz = EXAM_PREP_QUIZZES[currentQuizIndex];
    const isCorrect = optionIdx === currentQuiz.correct;
    
    setQuizAttempts(prev => prev + 1);

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      setQuizFeedback(`✅ Correct! ${currentQuiz.explanation}`);
    } else {
      setQuizFeedback(`❌ Incorrect. The correct answer was "${currentQuiz.options[currentQuiz.correct]}". ${currentQuiz.explanation}`);
    }
    
    setIsQuizChecked(true);

    if (isOffline) {
      handleOfflineAction("QUIZ_SCORE", `Logged Quiz Score: ${isCorrect ? 100 : 0}% on Math prep`, {
        lessonTopic: "Grade 12 National Prep Exam - Lesson " + (currentQuizIndex + 1),
        score: isCorrect ? 1 : 0,
        totalQuestions: 1,
        completed: true
      });
    } else {
      const quizProgressId = "quiz-" + Date.now();
      setFirestoreDocs(prev => ({
        ...prev,
        [`users/eth-usr-94821/quizzes/${quizProgressId}`]: {
          id: quizProgressId,
          uid: "eth-usr-94821",
          lessonTopic: "Grade 12 STEM prep Exam - Question " + (currentQuizIndex + 1),
          score: isCorrect ? 1 : 0,
          totalQuestions: 1,
          completed: true,
          updatedAt: new Date().toISOString()
        }
      }));
    }
  };

  const handleNextQuestion = () => {
    setSelectedQuizAnswer(null);
    setIsQuizChecked(false);
    setQuizFeedback("");
    setCurrentQuizIndex(prev => (prev + 1) % EXAM_PREP_QUIZZES.length);
  };

  // Soil Nitrogen & NPS Calculator
  const handleCalculateSoil = () => {
    let ureaPerHectare = 100;
    let npsPerHectare = 150;
    
    setSoilCalculationsCount(prev => prev + 1);

    if (cropType === "Teff") {
      ureaPerHectare = soilType === "Vertisol" ? 110 : 90;
      npsPerHectare = 140;
    } else if (cropType === "Wheat") {
      ureaPerHectare = soilType === "Vertisol" ? 150 : 130;
      npsPerHectare = 180;
    } else if (cropType === "Maize") {
      ureaPerHectare = soilType === "Vertisol" ? 200 : 170;
      npsPerHectare = 220;
    }

    const actualHectares = acreageVal;
    const totalUrea = Math.round(ureaPerHectare * actualHectares);
    const totalNps = Math.round(npsPerHectare * actualHectares);
    
    setCalculatedUrea(totalUrea);
    setCalculatedNps(totalNps);
    
    const report = `Recommendation generated: For ${acreageVal} Hectares of ${cropType} on ${soilType} soil: Apply ${totalNps} kg of NPS complex fertilizer during sowing, and top-dress with ${totalUrea} kg of Urea split split (at tillering and crop knee-high stages). Keep grain protected against rust stem threats.`;
    setFertilizerReport(report);

    if (isOffline) {
      handleOfflineAction("CROP_REPORT", `Soil recommendation report for ${cropType}`, {
        cropType,
        areaHectares: acreageVal,
        soilType,
        calculatedUreaKg: totalUrea,
        calculatedNpsKg: totalNps,
        pestsAdvice: "Maintain rust protection protocols"
      });
    } else {
      const cropReportId = "crop-" + Date.now();
      setFirestoreDocs(prev => ({
        ...prev,
        [`users/eth-usr-94821/crops/${cropReportId}`]: {
          id: cropReportId,
          uid: "eth-usr-94821",
          cropType,
          areaHectares: acreageVal,
          soilType,
          calculatedUreaKg: totalUrea,
          calculatedNpsKg: totalNps,
          pestsAdvice: "Standard split application specified",
          createdAt: new Date().toISOString()
        }
      }));
    }
  };

  // Handler for querying the AI backend
  const handleAsk = async (queryOverride?: string) => {
    const textToSubmit = queryOverride !== undefined ? queryOverride : queryText;
    if (!textToSubmit.trim()) return;

    setIsLoading(true);
    setError(null);

    // Track the new message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    
    // Clear query text if standard input was used
    if (queryOverride === undefined) {
      setQueryText("");
    }

    if (isOffline) {
      setTimeout(() => {
        const offlineReply = `[OFFLINE SIMULATION] You are currently offline. Your query has been logged to the Local queue and scheduled for server sync when connectivity returns. Stored response for: "${textToSubmit}"`;
        const modelMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: offlineReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const newItem = {
          id: "off-act-" + Date.now(),
          type: "QUERY",
          label: `Offline Consultation: ${textToSubmit.slice(0, 30)}...`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          payload: { query: textToSubmit, category: selectedCategory }
        };
        setOfflineQueue(prev => [...prev, newItem]);

        setChatHistory(prev => [...prev, modelMessage]);
        setLastBreakdown({
          answer: offlineReply,
          explanation: "Offline-First Sync Engine is isolating network requests to local memory to ensure stability under weak 3G/4G conditions.",
          steps: ["Check network signals", "Shed queries in queue", "Hit Synchronize when online status is restored"],
          documents: ["Offline cache buffer synchronized database"],
          nextActions: ["Sync database when online"],
          alternatives: ["Consult offline manuals"]
        });
        setIsLoading(false);
      }, 600);
      return;
    }

    try {
      const response = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          category: selectedCategory,
          query: textToSubmit,
          chatHistory: updatedHistory.slice(0, -1) 
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const resData: HelpResponse = await response.json();
      
      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: resData.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, modelMessage]);
      setLastBreakdown(resData);
      
      if (autoRead && resData.answer) {
        speakResponse(resData.answer);
      }
    } catch (err: any) {
      console.error("AI help endpoint error:", err);
      setError(err.message || "An error occurred with our Gemini model proxy endpoint. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset function
  const resetApp = () => {
    stopSpeaking();
    stopListeningFallback();
    setChatHistory([]);
    setLastBreakdown(null);
    setQueryText("");
    setError(null);
  };

  return (
    <div id="girmaic-app-container" className="min-h-screen bg-stone-950 bg-gradient-to-br from-[#121110] via-stone-950 to-[#181512] text-[#F5F5F0] font-sans flex flex-col selection:bg-[#E5D3B3] selection:text-[#121212] relative overflow-hidden">
      
      {/* Cinematic Ambient Glow Accents (Ethiopian Highlands sunset theme) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#DAA520]/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[700px] h-[700px] bg-[#CD5C5C]/5 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Modern High-contrast Ticker ribbon */}
      <div className="bg-stone-900 border-b border-white/5 py-1.5 px-6 flex justify-between items-center text-[9px] font-mono tracking-widest text-[#E5D3B3] select-none z-20">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-stone-400">NODE STATUS:</span>
          <span className="text-emerald-400 font-bold">SECURE ONLINE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-stone-500">
          <span>PORTAL VERIFICATION: ACTIVE FAYDA SHIELD</span>
          <span>•</span>
          <span>LATENCY: 14ms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-stone-400">TIME:</span>
          <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} UTC</span>
        </div>
      </div>
      
      {/* Upper Elegant Header */}
      <header id="main-header" className="flex flex-col md:flex-row justify-between items-start md:items-end p-6 md:p-8 border-b border-[#F5F5F0]/10 gap-6 shrink-0 bg-stone-900/40 backdrop-blur-md z-10">
        <div>
          <div className="flex items-center gap-3">
            <h1 id="brand-girmaic" className="text-4xl md:text-5xl font-black tracking-tighter leading-none text-[#E5D3B3] font-serif italic">
              GIRMAIC
            </h1>
            <span className="text-[10px] bg-[#6B8E23]/25 text-[#E5D3B3] border border-[#6B8E23]/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold font-mono">
              Ethiopia Helper
            </span>
          </div>
          <p id="app-tagline" className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mt-2.5 opacity-70">
            {t("headerTitle")} • {t("headerSubtitle")}
          </p>
        </div>
        
        {/* Languages and Location Info */}
        <div id="header-controls" className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Layout switches */}
          <div className="flex bg-stone-900 border border-white/5 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("app")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "app" ? "bg-[#E5D3B3] text-[#121212] shadow" : "text-stone-400 hover:text-white"
              }`}
            >
              📱 Interactive Mobile MVP
            </button>
            <button
              onClick={() => setViewMode("architecture")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "architecture" ? "bg-[#E5D3B3] text-[#121212] shadow" : "text-stone-400 hover:text-white"
              }`}
            >
              ⚙️ System Architecture Hub
            </button>
          </div>

          <div className="h-8 w-[1px] bg-[#F5F5F0]/20 hidden sm:block"></div>
          
          {/* Language Selector */}
          <div id="language-presets" className="flex flex-wrap gap-1.5">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                id={`lang-btn-${lang.code}`}
                onClick={() => {
                  stopSpeaking();
                  setSelectedLanguage(lang.code);
                  setError(null);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  selectedLanguage === lang.code
                    ? "bg-[#E5D3B3] text-[#121212] border-[#E5D3B3] shadow-md"
                    : "bg-[#F5F5F0]/5 text-[#F5F5F0]/70 border-[#F5F5F0]/15 hover:bg-[#F5F5F0]/10 hover:text-white"
                }`}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Grid Content Layout */}
      <main id="main-layout" className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* Main Error Alert */}
        {error && (
          <div id="error-alert" className="mb-6 p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-red-100 text-xs leading-relaxed flex items-center gap-3">
            <span className="text-sm">⚠️</span>
            <p className="flex-1 font-bold">{error}</p>
          </div>
        )}

        {viewMode === "app" ? (
          <>
            <UserActivityWidget
              questionsCount={chatHistory.filter(m => m.role === "user").length}
              quizzesCompleted={quizAttempts}
              quizzesScore={quizScore}
              soilCalculations={soilCalculationsCount}
              syncQueueCount={offlineQueue.length}
            />
            <PhoneSimulator
              selectedLanguage={selectedLanguage}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              queryText={queryText}
              setQueryText={setQueryText}
              chatHistory={chatHistory}
              isListening={isListening}
              isSpeaking={isSpeaking}
              autoRead={autoRead}
              setAutoRead={setAutoRead}
              speechRate={speechRate}
              setSpeechRate={setSpeechRate}
              ttsSupported={ttsSupported}
              startListening={startListening}
              stopSpeaking={stopSpeaking}
              speakResponse={speakResponse}
              handleAsk={handleAsk}
              isLoading={isLoading}
              
              isOffline={isOffline}
              setIsOffline={setIsOffline}
              offlineQueue={offlineQueue}

              userSession={userSession}
              setUserSession={setUserSession}
              onAddOfflineAction={handleOfflineAction}
              
              cvFullName={cvFullName}
              setCvFullName={setCvFullName}
              cvProfession={cvProfession}
              setCvProfession={setCvProfession}
              cvEmailAddr={cvEmailAddr}
              setCvEmailAddr={setCvEmailAddr}
              cvPhoneNum={cvPhoneNum}
              setCvPhoneNum={setCvPhoneNum}
              cvEducation={cvEducation}
              setCvEducation={setCvEducation}
              cvSkillsTag={cvSkillsTag}
              setCvSkillsTag={setCvSkillsTag}
              cvExperience={cvExperience}
              setCvExperience={setCvExperience}
              cvAiSummary={cvAiSummary}
              isCvOptimative={isCvOptimative}
              onOptimizeCv={handleAiOptimizeCv}

              EXAM_PREP_QUIZZES={EXAM_PREP_QUIZZES}
              currentQuizIndex={currentQuizIndex}
              selectedQuizAnswer={selectedQuizAnswer}
              quizScore={quizScore}
              onQuizAnswer={handleQuizAnswer}
              quizFeedback={quizFeedback}
              isQuizChecked={isQuizChecked}
              onNextQuestion={handleNextQuestion}

              cropType={cropType}
              setCropType={setCropType}
              acreageVal={acreageVal}
              setAcreageVal={setAcreageVal}
              soilType={soilType}
              setSoilType={setSoilType}
              calculatedUrea={calculatedUrea}
              calculatedNps={calculatedNps}
              fertilizerReport={fertilizerReport}
              onCalculateSoil={handleCalculateSoil}
            />
          </>
        ) : (
          <ArchitectureView
            firestoreDocs={firestoreDocs}
            offlineQueueLength={offlineQueue.length}
            isOffline={isOffline}
            onSync={synchronizeOfflineQueue}
          />
        )}
      </main>

      <footer className="p-4 bg-stone-950 border-t border-white/10 text-center text-[10px] text-stone-500">
        <p>© 2026 GIRMAIC Ethiopia • Built to power offline-resilient access portals for regional workers and students.</p>
      </footer>
    </div>
  );
}
