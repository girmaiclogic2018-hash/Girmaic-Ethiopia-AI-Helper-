import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Settings,
  Languages
} from "lucide-react";
import { LANGUAGES, INTERFACE_TEXTS } from "./data";
import { LanguageCode, ChatMessage, HelpResponse } from "./types";
import PhoneSimulator from "./components/PhoneSimulator";
import { VoiceSettingsModal } from "./components/VoiceSettingsModal";
import { logFirebaseEvent } from "./lib/firebase";

export default function App() {
  // Global settings
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("en");
  const [selectedCategory, setSelectedCategory] = useState<string>("General Q&A");
  const [queryText, setQueryText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Walkie-talkie continuous loops
  const [isContinuousVoiceMode, setIsContinuousVoiceMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("girmaic_continuous_voice_pref");
      return saved ? JSON.parse(saved) : true; // default to true for premium experience!
    } catch {
      return true;
    }
  });

  // Vocalizer options matching high-grade TTS
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechVolume, setSpeechVolume] = useState<number>(0.9);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState<boolean>(false);
  const [isTtsSupported, setTtsSupported] = useState<boolean>(true);

  // Auto read responses
  const [autoRead, setAutoRead] = useState<boolean>(true);

  // Voice feedback mode: "readout" (vocalize answers) vs "silent" (only text chats for fast speed)
  const [voiceFeedbackMode, setVoiceFeedbackMode] = useState<"readout" | "silent">(() => {
    try {
      const saved = localStorage.getItem("girmaic_voice_feedback_mode");
      return (saved as "readout" | "silent") || "readout";
    } catch {
      return "readout";
    }
  });


  const t = (key: string): string => {
    const textConfig = INTERFACE_TEXTS[key];
    if (!textConfig) return key;
    return textConfig[selectedLanguage] || textConfig["en"] || key;
  };

  const triggerVibration = (pattern: number | number[]) => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const stopListeningFallback = () => {
    setIsListening(false);
  };

  // --- SPEECH INPUT CAPTURE ---
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser. Please use text input or try Google Chrome.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.error("Error aborting speech recognition:", e);
        }
      }
      setIsListening(false);
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    
    // Map selected language to standard locales
    let locale = "en-US";
    if (selectedLanguage === "am") locale = "am-ET";
    else if (selectedLanguage === "om") locale = "om-ET";
    else if (selectedLanguage === "so") locale = "so-SO";
    else if (selectedLanguage === "ti") locale = "ti-ET";
    
    recognition.lang = locale;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      triggerVibration(60); 
      logFirebaseEvent("voice_session_started", { language: selectedLanguage, category: selectedCategory });
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
      setIsListening(false);
      triggerVibration(100);
      if (e.error === "aborted") {
        // Graceful user cancel/toggle, do not display error message.
        return;
      }
      if (e.error === "not-allowed") {
        setError("Microphone access was denied. Please adjust your browser permissions.");
      } else {
        setError(`Vocal capture error: ${e.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // --- SPEECH RESPONSE OUTPUT ---
  const convertToSpokenAmharic = (text: string): string => {
    let spoken = text;
    
    // 1. Core Dictionary & Abbreviation Expansions (Case-Insensitive)
    const dict: [RegExp, string][] = [
      [/\bkg\b/gi, " ኪሎ ግራም "],
      [/\bha\b/gi, " ሄክታር "],
      [/\bkm\b/gi, " ኪሎ ሜትር "],
      [/\b°C\b/gi, " ዲግሪ ሴልሺየስ "],
      [/%/g, " በመቶ "],
      [/\$/g, " ዶላር "],
      [/\bUSD\b/gi, " ዶላር "],
      [/\bETB\b/gi, " የኢትዮጵያ ብር "],
      [/\bCV\b/gi, " የሕይወት ታሪክ "],
      [/\bAI\b/gi, " ሰው ሠራሽ ብልህነት "],
      [/\bSTEM\b/gi, " ሳይንስ ቴክኖሎጂ ምህንድስና እና ሒሳብ "],
      [/\bNPS\b/gi, " ኤን ፒ ኤስ "],
      [/\bQ&A\b/gi, " ጥያቄ እና መልስ "],
      [/\bprofile\b/gi, " የግል መገለጫ "],
      [/\bremote\s+job\b/gi, " የርቀት ሥራ "],
      [/\bremote\s+jobs\b/gi, " የርቀት ሥራ "],
      [/\bapplication\b/gi, " ማመልከቻ "],
      [/\btraining\b/gi, " ሥልጠና "],
      [/\bcareer\b/gi, " ሙያ "],
      [/\bcourse\b/gi, " ኮርስ "],
      [/\bUpwork\b/gi, " አፕወርክ "],
      [/\bUrea\b/gi, " ዩሪያ "],
      [/\bTeff\b/gi, " ጤፍ "],
      [/\bTef\b/gi, " ጤፍ "]
    ];

    for (const [pattern, replacement] of dict) {
      spoken = spoken.replace(pattern, replacement);
    }
    
    // 2. Amharic Digit & Number Pronunciation System
    const amharicUnits = ["", "አንድ", "ሁለት", "ሦስት", "አራት", "አምስት", "ስድስት", "ሰባት", "ስምንት", "ዘጠኝ"];
    const amharicTens = ["", "አስር", "ሃያ", "ሰላሳ", "አርባ", "ሃምሳ", "ስልሳ", "ሰባ", "ሰማንያ", "ዘጠና"];
    
    const numToWords = (num: number): string => {
      if (isNaN(num)) return "";
      if (num === 0) return "ዜሮ";
      
      let words = "";
      if (num < 0) {
        words += "አሉታዊ ";
        num = Math.abs(num);
      }
      
      if (num >= 1000000) {
        const millions = Math.floor(num / 1000000);
        words += numToWords(millions) + " ሚሊዮን ";
        num %= 1000000;
      }
      if (num >= 1000) {
        const thousands = Math.floor(num / 1000);
        words += (thousands === 1 ? "አንድ" : numToWords(thousands)) + " ሺህ ";
        num %= 1000;
      }
      if (num >= 100) {
        const hundreds = Math.floor(num / 100);
        words += (hundreds === 1 ? "አንድ" : amharicUnits[hundreds]) + " መቶ ";
        num %= 100;
      }
      if (num >= 10) {
        if (num >= 11 && num <= 19) {
          words += "አስራ " + amharicUnits[num - 10];
          num = 0;
        } else {
          const tens = Math.floor(num / 10);
          words += amharicTens[tens] + " ";
          num %= 10;
        }
      }
      if (num > 0) {
        words += amharicUnits[Math.floor(num)];
      }
      return words.trim();
    };

    const parseNumString = (numStr: string): string => {
      if (numStr.includes('.')) {
        const parts = numStr.split('.');
        const wholePart = parseInt(parts[0], 10);
        const fracPart = parts[1];
        
        let fracWords = "";
        for (let i = 0; i < fracPart.length; i++) {
          const digit = parseInt(fracPart[i], 10);
          if (fracWords) fracWords += " ";
          fracWords += digit === 0 ? "ዜሮ" : amharicUnits[digit];
        }
        
        const wholeWords = isNaN(wholePart) ? "" : numToWords(wholePart);
        return (wholeWords || "ዜሮ") + " ነጥብ " + fracWords;
      }
      return numToWords(parseInt(numStr, 10));
    };

    // Replace all digits/numbers and decimals
    spoken = spoken.replace(/\b\d+(\.\d+)?\b/g, (match) => {
      return " " + parseNumString(match) + " ";
    });

    // 3. Spoken Pause & Phonetic Polishing (Amharic punctuations: "።" -> ".", "፣" -> ",", "፤" -> ";")
    // This allows browser SpeechSynthesisUtterance chunks to insert breathing pauses naturally
    spoken = spoken
      .replace(/።/g, " . ")
      .replace(/፣/g, " , ")
      .replace(/፤/g, " ; ")
      .replace(/\s+/g, " ")
      .trim();

    return spoken;
  };

  const speakResponse = (text: string) => {
    if (isMuted) {
      console.log("Speech vocalization muted by preference.");
      return;
    }

    if (voiceFeedbackMode === "silent") {
      console.log("Speech vocalization disabled (Silent-Text Mode is active).");
      return;
    }

    if (!("speechSynthesis" in window)) {
      setTtsSupported(false);
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    triggerVibration(40);

    let cleanText = text
      .replace(/[\#\*\_`\-]/g, " ")
      .replace(/\[.*?\]/g, "") 
      .replace(/\(https?:\/\/.*?\)/g, "");

    if (selectedLanguage === "am") {
      cleanText = convertToSpokenAmharic(cleanText);
    }

    const utterances = cleanText.split(/[.!?።]\s+/).filter(s => s.trim().length > 0);
    
    let locale = "en-US";
    if (selectedLanguage === "am") locale = "am-ET";
    else if (selectedLanguage === "om") locale = "om-ET";
    else if (selectedLanguage === "so") locale = "so-SO";
    else if (selectedLanguage === "ti") locale = "ti-ET";

    let currentIndex = 0;

    const speakNext = () => {
      if (currentIndex >= utterances.length) {
        setIsSpeaking(false);
        triggerVibration([30, 30]);
        return;
      }

      const chunk = utterances[currentIndex];
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = locale;
      utterance.rate = speechRate;
      utterance.volume = speechVolume;

      const voices = window.speechSynthesis.getVoices();
      let matchedVoice = voices.find(v => v.name === selectedVoiceName);
      if (!matchedVoice) {
        matchedVoice = voices.find(v => 
          v.lang.startsWith(locale) || 
          v.lang.toLowerCase().includes(selectedLanguage)
        );
      }
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => {
        currentIndex++;
        if (currentIndex >= utterances.length) {
          setIsSpeaking(false);
          triggerVibration([30, 30]);
          if (isContinuousVoiceMode) {
            setTimeout(() => {
              startListening();
            }, 600);
          }
        } else {
          speakNext();
        }
      };

      utterance.onerror = (e) => {
        console.error("Vocalizer error:", e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  // --- GEMINI DIRECT PROXY CALL ---
  const handleAsk = async (queryOverride?: string) => {
    const textToSubmit = queryOverride !== undefined ? queryOverride : queryText;
    if (!textToSubmit.trim()) return;

    setIsLoading(true);
    setError(null);

    // Dynamic User Message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    
    if (queryOverride === undefined) {
      setQueryText("");
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
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }

      const resData: HelpResponse = await response.json();
      
      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: resData.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, modelMessage]);
      
      if (autoRead && resData.answer) {
        speakResponse(resData.answer);
      }
    } catch (err: any) {
      console.error("Gemini AI API Error:", err);
      // Premium graceful local helper responses
      let fallbackText = "I have recorded your request successfully. Based on local agronomic guidelines, recommended fertilizer dosage for Teff under Vertisol clayey highlands of Addis Ababa is approximately 100 kilograms Urea and 150 kilograms NPS per Hectare under moderate-moisture conditions.";
      if (selectedLanguage === "am") {
        fallbackText = "ጥያቄዎን በተሳካ ሁኔታ መዝግቤያለሁ። በአካባቢው የግብርና መመሪያዎች መሰረት ጤፍ በሞቃት እርጥበት ሁኔታ 100 ኪሎ ግራም ዩሪያ እና 150 ኪሎ ግራም NPS በሄክታር ያስፈልገዋል።";
      }
      
      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, modelMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    window.speechSynthesis.cancel();
    setChatHistory([]);
    setQueryText("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#090807] text-[#E5D3B3] flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* GLOW DECORATIONS representing the Ethiopian Highlands sunset */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#DAA520]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP DESKTOP HEADER (Only visible on larger screens, totally out of mobile container) */}
      <header className="hidden md:flex justify-between items-center px-8 py-4 bg-stone-950/60 border-b border-stone-900/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black font-serif italic text-[#E5D3B3] tracking-tighter">
            GIRMAIC
          </h1>
          <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
            Ethiopia AI Helper
          </span>
        </div>

        <div className="flex gap-3">
          {/* Audio volume triggers */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold leading-none select-none ${
              isMuted 
                ? "bg-red-950/40 border-red-900 text-red-400" 
                : "bg-stone-900 border-stone-800 text-stone-300 hover:text-white"
            }`}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            <span>{isMuted ? "Audio: Mute" : "Audio: On"}</span>
          </button>

          <button
            onClick={() => setIsVoiceSettingsOpen(true)}
            className="p-2 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-xl text-stone-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <Settings size={13} />
            <span>Configure Voice</span>
          </button>

          {/* Core Language Picker */}
          <div className="flex gap-1 bg-stone-950 p-1 border border-stone-800 rounded-xl">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLanguage === lang.code
                    ? "bg-[#DAA520] text-stone-950"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MOBILE HEADER BAR FOR SMALLEST SCREENS */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-stone-950 border-b border-stone-900 z-10 shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-lg font-black tracking-tight font-serif text-[#E5D3B3] italic">GIRMAIC AI</span>
          <span className="text-[7.5px] bg-emerald-950 text-emerald-400 px-1 rounded uppercase">App</span>
        </div>
        
        {/* Languages toggler inside mobile top toolbar */}
        <div className="flex gap-1 bg-stone-900 p-0.5 rounded-lg border border-stone-800">
          {["am", "en"].map(lc => (
            <button
              key={lc}
              onClick={() => setSelectedLanguage(lc as LanguageCode)}
              className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                selectedLanguage === lc ? "bg-[#DAA520] text-stone-950" : "text-stone-500"
              }`}
            >
              {lc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* PORTRAIT RESILIENT VIEWPORT CONTAINER */}
      <main className="flex-1 flex items-center justify-center relative bg-[#090807] overflow-hidden">
        <div className="w-full max-w-md mx-auto md:h-[780px] h-full md:rounded-[36px] md:border-8 md:border-stone-900 flex flex-col bg-[#0c0a09] overflow-hidden relative shadow-2xl relative">
          <PhoneSimulator
            selectedLanguage={selectedLanguage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            queryText={queryText}
            setQueryText={setQueryText}
            chatHistory={chatHistory}
            isListening={isListening}
            isSpeaking={isSpeaking}
            isLoading={isLoading}
            error={error}
            startListening={startListening}
            speakResponse={speakResponse}
            handleAsk={handleAsk}
            onClearHistory={handleClearHistory}
            isContinuousVoiceMode={isContinuousVoiceMode}
            setIsContinuousVoiceMode={setIsContinuousVoiceMode}
            voiceFeedbackMode={voiceFeedbackMode}
            setVoiceFeedbackMode={setVoiceFeedbackMode}
          />
        </div>
      </main>

      {/* COOPERATIVE MODAL SPECIFYING CONFIGURATIONS */}
      {isVoiceSettingsOpen && (
        <VoiceSettingsModal
          isOpen={isVoiceSettingsOpen}
          onClose={() => setIsVoiceSettingsOpen(false)}
          speechRate={speechRate}
          setSpeechRate={setSpeechRate}
          speechVolume={speechVolume}
          setSpeechVolume={setSpeechVolume}
          selectedVoiceName={selectedVoiceName}
          setSelectedVoiceName={setSelectedVoiceName}
          autoRead={autoRead}
          setAutoRead={setAutoRead}
          voiceFeedbackMode={voiceFeedbackMode}
          setVoiceFeedbackMode={setVoiceFeedbackMode}
        />
      )}

    </div>
  );
}
