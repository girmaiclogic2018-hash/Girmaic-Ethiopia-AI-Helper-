import React, { useEffect, useState } from "react";
import { X, Volume2, Volume1, VolumeX, Settings, Sparkles, CheckCircle2, HelpCircle, RefreshCw, FileText } from "lucide-react";

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  speechVolume: number;
  setSpeechVolume: (volume: number) => void;
  autoRead: boolean;
  setAutoRead: (enabled: boolean) => void;
  selectedVoiceName: string;
  setSelectedVoiceName: (voiceName: string) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  voiceFeedbackMode?: "readout" | "silent";
  setVoiceFeedbackMode?: (mode: "readout" | "silent") => void;
}

export function VoiceSettingsModal({
  isOpen,
  onClose,
  speechRate,
  setSpeechRate,
  speechVolume,
  setSpeechVolume,
  autoRead,
  setAutoRead,
  selectedVoiceName,
  setSelectedVoiceName,
  isMuted = false,
  onToggleMute,
  voiceFeedbackMode = "readout",
  setVoiceFeedbackMode
}: VoiceSettingsModalProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showHowTo, setShowHowTo] = useState<boolean>(false);

  // Load browser voice list dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices() || [];
      setVoices(allVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  // Language check helpers for the 5 languages
  const hasVoiceSupport = (langCode: string) => {
    if (langCode === "am") {
      return voices.some(v => v.lang.startsWith("am") || v.lang.toLowerCase().includes("amharic"));
    }
    if (langCode === "om") {
      return voices.some(v => v.lang.startsWith("om") || v.lang.toLowerCase().includes("oromo") || v.lang.toLowerCase().includes("afaan"));
    }
    if (langCode === "so") {
      return voices.some(v => v.lang.startsWith("so") || v.lang.toLowerCase().includes("somali"));
    }
    if (langCode === "ti") {
      return voices.some(v => v.lang.startsWith("ti") || v.lang.toLowerCase().includes("tigrinya") || v.lang.toLowerCase().includes("tigrigna"));
    }
    if (langCode === "en") {
      return voices.some(v => v.lang.startsWith("en") || v.lang.toLowerCase().includes("english") || v.lang.toLowerCase().includes("us-"));
    }
    return false;
  };

  // Enforce professional formal standards
  const applyFormalStandard = () => {
    setSpeechRate(0.90);
    setSpeechVolume(1.0);
    localStorage.setItem("girmaic_speech_rate_preference", "0.90");
    localStorage.setItem("girmaic_speech_volume_preference", "1.0");
    
    // Play test feedback if not muted
    if (!isMuted && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const testUtterance = new SpeechSynthesisUtterance("Formal standard applied. Speech rate normalized to clear zero point nine speed.");
      testUtterance.rate = 0.90;
      testUtterance.volume = 1.0;
      const match = window.speechSynthesis.getVoices().find(v => v.name === selectedVoiceName);
      if (match) {
        testUtterance.voice = match;
      }
      window.speechSynthesis.speak(testUtterance);
    }
  };

  return (
    <div
      id="voice-settings-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        id="voice-settings-dialog"
        className="w-full max-w-xl bg-stone-950 border border-stone-850 rounded-3xl p-6 shadow-2xl relative space-y-5 text-left max-h-[90vh] overflow-y-auto"
      >
        {/* Header decoration */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-[#DAA520]/10 text-[#DAA520] rounded-xl border border-[#DAA520]/20">
              <Settings size={20} />
            </div>
            <div>
              <p className="text-xs font-mono text-[#DAA520] tracking-widest uppercase font-black">
                GIRMAIC™ VOICE ENGINE
              </p>
              <h2 className="text-lg font-black text-white uppercase tracking-tight font-serif italic">
                Vocalizer Preferences & Languages
              </h2>
            </div>
          </div>
          <button
            id="close-voice-settings-btn"
            onClick={onClose}
            className="p-2 bg-stone-900 border border-stone-800 text-stone-250 hover:text-white rounded-lg transition-all cursor-pointer hover:border-red-500/20 active:scale-95 text-base flex items-center gap-1.5 font-bold"
          >
            <X size={16} />
            <span className="font-mono text-xs font-black">CLOSE</span>
          </button>
        </div>

        {/* Global Mute Status Notification */}
        {isMuted && (
          <div className="p-4 bg-[#CD5C5C]/15 border border-[#CD5C5C]/40 rounded-2xl flex items-start gap-3.5 text-left text-base text-stone-200">
            <VolumeX size={20} className="text-[#CD5C5C] shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1.5">
              <p className="text-sm font-black text-[#CD5C5C] uppercase tracking-wide">
                SYSTEM MUTED GLOBALLY
              </p>
              <p className="text-base text-stone-300 leading-relaxed font-semibold">
                vocalizations are disabled by preference. You will not hear automatic soil recommendations, study guides, or chatbot speakbacks.
              </p>
              {onToggleMute && (
                <button
                  type="button"
                  onClick={onToggleMute}
                  className="mt-2 text-xs font-black text-white bg-[#CD5C5C]/30 hover:bg-[#CD5C5C]/55 px-3 py-1.5 rounded-lg border border-[#CD5C5C]/40 font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Unmute Voice Engine 🔊
                </button>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Speech Synthesis Quality Matrix */}
        <div className="p-4 bg-stone-900/50 border border-stone-855 rounded-2xl space-y-3.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-1.5 font-serif italic">
              <CheckCircle2 size={15} className="text-[#DAA520]" />
              5-Language Voice Compatibility Matrix
            </h3>
            <span className="text-xs font-mono text-stone-300 bg-stone-950 border border-stone-800 px-2.5 py-1 rounded font-bold uppercase">
              {voices.length} System Voices Detected
            </span>
          </div>

          <p className="text-base text-stone-300 leading-relaxed font-sans font-medium">
            Diagnoses device compatibility to speak standard Amharic, Oromo, Somali, Tigrinya, and English without phonetic barriers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {[
              { code: "am", name: "Amharic (አማርኛ)", bcp: "am-ET" },
              { code: "om", name: "Afaan Oromoo", bcp: "om-ET" },
              { code: "so", name: "Somali (Soomaali)", bcp: "so-SO" },
              { code: "ti", name: "Tigrinya (ትግርኛ)", bcp: "ti-ET" },
              { code: "en", name: "English (US/UK)", bcp: "en-US" }
            ].map((lg) => {
              const nativeActive = hasVoiceSupport(lg.code);
              return (
                <div key={lg.code} className="p-3 bg-stone-950 border border-stone-850 rounded-xl flex items-center justify-between text-base">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white font-sans">{lg.name}</p>
                    <p className="text-xs font-mono text-stone-400">Locale Code: {lg.bcp}</p>
                  </div>
                  <div>
                    {nativeActive ? (
                      <span className="px-2.5 py-1 text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full uppercase tracking-wider">
                        Premium Native
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-mono font-black text-[#DAA520] bg-[#DAA520]/10 border border-[#DAA520]/20 rounded-full uppercase tracking-wider" title="Browser routes pronunciations seamlessly through active high-fidelity multilingual neural models.">
                        Multilingual Fallback
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => setShowHowTo(!showHowTo)}
              className="text-sm font-black text-[#E5D3B3] hover:text-[#DAA520] transition-colors flex items-center gap-1 cursor-pointer select-none"
            >
              <HelpCircle size={14} />
              <span>{showHowTo ? "Hide Native Voice Guide" : "How to install premium local voice packs?"}</span>
            </button>
          </div>

          {showHowTo && (
            <div className="p-4 bg-stone-950 border border-stone-850 rounded-xl text-sm text-stone-300 space-y-2.5 leading-relaxed animate-fade-in font-mono">
              <p className="font-bold text-[#DAA520] uppercase font-sans">🔓 ENABLING NATURAL LOCAL VOICES ON YOUR DEVICE:</p>
              <ul className="list-disc pl-4 space-y-2 text-stone-400">
                <li><strong className="text-white">Android:</strong> Settings → Accessibility → Text-to-speech output → Tap Settings Gear next to Preferred Engine (usually Google TTS) → Install voice data → Select and download your desired language pack.</li>
                <li><strong className="text-white">Windows 11:</strong> Settings → Time & language → Speech → Under "Manage voices", click "Add voices" and look for Amharic or Somali.</li>
                <li><strong className="text-white">Apple iOS:</strong> Settings → Accessibility → Spoken Content → Voices → Choose your preferred language and download the High Quality enhanced edition.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Instant Formal Standards Preset Box */}
        <div className="p-4 bg-stone-900/50 border border-[#DAA520]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
          <div className="space-y-1.5">
            <h4 className="text-base font-black text-[#DAA520] uppercase tracking-wide flex items-center gap-1.5 font-serif italic">
              <FileText size={15} />
              Formal Oratory Standard Calibration
            </h4>
            <p className="text-base text-stone-200 font-medium">
              Universally forces the engine to use professional scientific diction values (Rate: <code className="text-white font-bold bg-stone-900 px-1 py-0.5 rounded">0.90x</code> speed, Volume: <code className="text-white font-bold bg-stone-900 px-1 py-0.5 rounded">100%</code>).
            </p>
          </div>
          <button
            type="button"
            onClick={applyFormalStandard}
            disabled={isMuted}
            className={`px-4 py-2.5 bg-[#DAA520] hover:bg-[#E5D3B3] text-stone-950 rounded-xl font-bold text-sm uppercase font-mono tracking-wider transition-all shadow-md shrink-0 flex items-center gap-1.5 ${
              isMuted ? "opacity-35 cursor-not-allowed" : "cursor-pointer active:scale-95"
            }`}
          >
            <RefreshCw size={14} />
            Apply Preset
          </button>
        </div>

        {/* Individual settings controls */}
        <div id="voice-settings-controls" className="space-y-4">

          {/* New Voice Feedback Mode Toggle Option */}
          <div id="setting-feedback-mode-box" className="p-4 bg-stone-900/40 border border-stone-800 rounded-2xl space-y-3 text-left">
            <div className="flex items-center justify-between">
              <label className="text-base font-black text-white uppercase tracking-wide flex items-center gap-1.5 font-serif italic">
                <Volume2 size={16} className="text-[#DAA520]" />
                Voice Feedback Delivery
              </label>
              <span className="text-xs font-mono font-bold text-[#DAA520] bg-stone-950 px-2.5 py-1 rounded border border-stone-800">
                {voiceFeedbackMode === "readout" ? "Vocal readout active" : "Silent-Text mode"}
              </span>
            </div>
            
            <p className="text-sm text-stone-300 font-sans leading-relaxed">
              Choose between active synthesis vocal feedback readouts and silent-text-only mode for super rapid session interactions.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (setVoiceFeedbackMode) {
                    setVoiceFeedbackMode("readout");
                    localStorage.setItem("girmaic_voice_feedback_mode", "readout");
                  }
                }}
                className={`py-2.5 px-3 rounded-xl border font-bold text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  voiceFeedbackMode === "readout"
                    ? "bg-[#DAA520] border-[#DAA520] text-stone-950 font-black shadow-lg"
                    : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 cursor-pointer"
                }`}
              >
                <Volume2 size={14} />
                <span>🗣️ Voice Readout</span>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (setVoiceFeedbackMode) {
                    setVoiceFeedbackMode("silent");
                    localStorage.setItem("girmaic_voice_feedback_mode", "silent");
                    if (typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }
                  }
                }}
                className={`py-2.5 px-3 rounded-xl border font-bold text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  voiceFeedbackMode === "silent"
                    ? "bg-[#CD5C5C] border-[#CD5C5C] text-white font-black shadow-lg"
                    : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 cursor-pointer"
                }`}
              >
                <VolumeX size={14} />
                <span>🔕 Silent Text</span>
              </button>
            </div>
          </div>
          
          {/* Autoplay Switch Wrapper */}
          <div id="setting-autoplay-box" className="p-4 bg-stone-900/40 border border-stone-800 rounded-2xl flex items-center justify-between">
            <div className="space-y-1.5 pr-4 text-left">
              <label htmlFor="voice-autoread-input" className="text-base font-black text-white uppercase tracking-wide flex items-center gap-1.5">
                <Volume2 size={16} className="text-[#E5D3B3]" />
                Auto-Read Response
              </label>
              <p className="text-base text-stone-400 font-medium font-sans">
                Automatically triggers speech translation readbacks when answers are generated.
              </p>
            </div>
            
            <button
              id="voice-autoread-input"
              type="button"
              disabled={isMuted}
              onClick={() => {
                const newVal = !autoRead;
                setAutoRead(newVal);
                localStorage.setItem("girmaic_auto_read_preference", JSON.stringify(newVal));
              }}
              className={`w-14 h-7 rounded-full p-1 transition-colors duration-200 focus:outline-none shrink-0 ${
                isMuted ? "opacity-45 cursor-not-allowed" : "cursor-pointer"
              } ${
                autoRead ? "bg-[#DAA520]" : "bg-stone-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-stone-950 transition-transform duration-200 transform ${
                  autoRead ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Speech Volume Gain Slider */}
          <div id="setting-volume-box" className="space-y-2.5 p-4 bg-stone-900/40 border border-stone-800 rounded-2xl text-left">
            <div className="flex items-center justify-between">
              <label htmlFor="voice-volume-slider" className="text-base font-black text-white uppercase tracking-wide flex items-center gap-1.5 select-none font-serif italic">
                {speechVolume === 0 ? (
                  <VolumeX size={15} className="text-[#CD5C5C]" />
                ) : speechVolume < 0.5 ? (
                  <Volume1 size={15} className="text-[#DAA520]" />
                ) : (
                  <Volume2 size={15} className="text-[#DAA520]" />
                )}
                <span>Vocalizer Volume Gain</span>
              </label>
              <span className="text-sm font-mono text-[#DAA520] bg-stone-950 px-2.5 py-0.5 rounded border border-stone-850 font-bold">
                {Math.round(speechVolume * 100)}%
              </span>
            </div>
            
            <div className="flex gap-4 items-center">
              <span className="text-xs font-mono text-stone-400 uppercase select-none font-bold">Mute</span>
              <input
                id="voice-volume-slider"
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={speechVolume}
                disabled={isMuted}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  setSpeechVolume(vol);
                  localStorage.setItem("girmaic_speech_volume_preference", vol.toString());
                }}
                className={`flex-1 accent-[#DAA520] h-2 bg-stone-800 rounded-lg ${
                  isMuted ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
                }`}
              />
              <span className="text-xs font-mono text-stone-400 uppercase select-none font-bold">Max</span>
            </div>

            <p className="text-xs text-stone-400 leading-normal font-medium">
              Adjusts Web Speech API output volume multiplier (0.0 to 1.0).
              <span className="text-[#DAA520] font-black block mt-1">
                🔊 Hardware Note: Physical device physical buttons override speech multipliers.
              </span>
            </p>
          </div>

          {/* Speech Rate Slider */}
          <div id="setting-rate-box" className="space-y-2.5 p-4 bg-stone-900/40 border border-stone-800 rounded-2xl text-left">
            <div className="flex items-center justify-between">
              <label htmlFor="voice-rate-slider" className="text-base font-black text-white uppercase tracking-wide font-serif italic">
                Speech Delivery Speed (Cadence)
              </label>
              <span className="text-sm font-mono text-[#DAA520] bg-stone-950 px-2.5 py-0.5 rounded border border-stone-800 font-bold">
                {speechRate.toFixed(2)}x
              </span>
            </div>
            
            <div className="flex gap-4 items-center">
              <span className="text-xs font-mono text-stone-400 uppercase select-none font-bold">Slow</span>
              <input
                id="voice-rate-slider"
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={speechRate}
                disabled={isMuted}
                onChange={(e) => {
                  const rate = parseFloat(e.target.value);
                  setSpeechRate(rate);
                  localStorage.setItem("girmaic_speech_rate_preference", rate.toString());
                }}
                className={`flex-1 accent-[#DAA520] h-2 bg-stone-800 rounded-lg ${
                  isMuted ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
                }`}
              />
              <span className="text-xs font-mono text-stone-400 uppercase select-none font-bold">Fast</span>
            </div>

            <p className="text-xs text-stone-400 leading-normal font-medium">
              Adjust how fast the virtual agronomist, counselor or teacher synthesizes sentences. 
              <span className="text-white/80 block mt-0.5">Formal standard is exactly 0.90x for perfect clarity.</span>
            </p>
          </div>

          {/* Synthesis Voice Dropdown */}
          <div id="setting-voice-box" className="space-y-2.5 p-4 bg-stone-900/40 border border-stone-800 rounded-2xl text-left">
            <label htmlFor="voice-selection-dropdown" className="text-base font-black text-white uppercase tracking-wide block font-serif italic">
              Global Synthesis Voice Override
            </label>
            
            {voices.length === 0 ? (
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-sm text-stone-400 italic text-center font-medium">
                Fetching browser vocal capabilities... Ensure speechSynthesis is enabled.
              </div>
            ) : (
              <select
                id="voice-selection-dropdown"
                value={selectedVoiceName}
                disabled={isMuted}
                onChange={(e) => {
                  setSelectedVoiceName(e.target.value);
                  localStorage.setItem("girmaic_voice_name_preference", e.target.value);
                }}
                className={`w-full bg-stone-950 border border-stone-800 text-stone-200 text-base rounded-xl p-3 outline-none focus:border-[#DAA520] font-mono leading-relaxed ${
                  isMuted ? "opacity-45 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <option value="">-- Autodetect Best Voice (Recommended for No Barriers) --</option>
                {voices.map((voice, idx) => (
                  <option key={idx} value={voice.name}>
                    {voice.name} ({voice.lang}) {voice.localService ? "[Local]" : ""}
                  </option>
                ))}
              </select>
            )}
            
            <p className="text-xs text-stone-400 leading-normal font-medium">
              The autodetect option automatically handles language shifts between English, Amharic, Oromo, Somali, and Tigrinya dynamically based on your translation.
            </p>
          </div>

        </div>

        {/* Footer info/Testing */}
        <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-sm text-stone-400">
          <div className="flex items-center gap-1.5 font-mono">
            <Sparkles size={13} className="text-[#DAA520]" />
            <span>Persistent config</span>
          </div>
          
          <button
            id="test-voice-btn"
            type="button"
            disabled={isMuted}
            onClick={() => {
              if (isMuted) return;
              if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
                const welcome = new SpeechSynthesisUtterance("Girmaic speech preferences updated successfully.");
                welcome.rate = speechRate;
                welcome.volume = speechVolume;
                const match = window.speechSynthesis.getVoices().find(v => v.name === selectedVoiceName);
                if (match) {
                  welcome.voice = match;
                }
                window.speechSynthesis.speak(welcome);
              }
            }}
            className={`text-sm font-black transition-all select-none underline ${
              isMuted 
                ? "text-stone-750 cursor-not-allowed line-through text-xs" 
                : "text-[#DAA520] hover:text-white cursor-pointer active:scale-95"
            }`}
          >
            {isMuted ? "Synth muted" : "Test speech config ➔"}
          </button>
        </div>

      </div>
    </div>
  );
}
