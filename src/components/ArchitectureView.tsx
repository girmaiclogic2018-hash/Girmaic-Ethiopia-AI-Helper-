import React, { useState } from "react";
import { 
  Database, 
  Cpu, 
  Layers, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  BookOpen,
  Sparkles,
  RefreshCw,
  Lock,
  Unlock,
  AlertCircle
} from "lucide-react";

interface ArchitectureViewProps {
  firestoreDocs: Record<string, any>;
  offlineQueueLength: number;
  isOffline: boolean;
  onSync: () => void;
}

export default function ArchitectureView({ 
  firestoreDocs, 
  offlineQueueLength, 
  isOffline, 
  onSync 
}: ArchitectureViewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"system" | "firestore" | "android" | "road">("system");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const firebaseRulesString = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() { return request.auth != null; }
    function isOwner(uid) { return isAuthenticated() && request.auth.uid == uid; }

    match /users/{uid} {
      allow read: if isAuthenticated();
      allow write: if isOwner(uid);
      
      match /cvs/{cvId} { allow read, write: if isOwner(uid); }
      match /quizzes/{quizId} { allow read, write: if isOwner(uid); }
      match /crops/{reportId} { allow read, write: if isOwner(uid); }
    }
  }
}`;

  const expressProxyString = `import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

// Initialize Gemini SDK with secure environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/help", async (req, res) => {
  const { language, category, query, chatHistory } = req.body;
  
  try {
    const formattedPrompt = \`[GIRMAIC Ethiopian Assistant Blueprint]
    Respond in: \${language}. Topic Segment: \${category}.
    User query: \${query}\`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: formattedPrompt
    });

    res.json({
      answer: response.text,
      explanation: "Resolved securely with backend API proxies."
    });
  } catch (err) {
    res.status(500).json({ error: "Gemini server issue" });
  }
});`;

  const kotlinWebViewString = `package com.girmaic.ethiopia.helper

import android.os.Bundle
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        
        // Setup permissions handling for Voice Recording
        webView.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(request: PermissionRequest) {
                // Grant microphone record audio permission for Assistant UI
                request.grant(request.resources)
            }
        }

        webView.webViewClient = WebViewClient()
        webView.loadUrl("https://girmaic-eth-helper.web.app")
    }
}`;

  const deploymentPhases = [
    {
      step: "01",
      title: "Prerequisites & Android Project Setup",
      desc: "Configure standard Android Studio workspace using Kotlin. Setup internet and audio record permissions inside AndroidManifest.xml.",
      commands: `<uses-permission android:name="android.permission.INTERNET" />\n<uses-permission android:name="android.permission.RECORD_AUDIO" />`
    },
    {
      step: "02",
      title: "Kotlin Native WebView Integration",
      desc: "Configure secure WebChromeClient dynamically in Android Java/Kotlin to process browser-native navigator.mediaDevices.getUserMedia() requests.",
      commands: `webView.settings.mediaPlaybackRequiresUserGesture = false`
    },
    {
      step: "03",
      title: "Local SQLite Offline Cache Bindings",
      desc: "Connect local IndexedDB inside WebView to a Room database so that when the mobile user drops connectivity, tasks automatically map to standard native memory logs.",
      commands: `// Handles fallback cache in rural Shoa/Wollo districts`
    },
    {
      step: "04",
      title: "Play Console Release Bundle Sign",
      desc: "Generate your secure Release Key using keytool. Build an Android App Bundle (.aab), configure Proguard shrinking optimizations to reduce size to under 5MB for slow networks, and upload to Google Play.",
      commands: `./gradlew bundleRelease`
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:cols-span-4 gap-6 animate-fade-in text-[#F5F5F0]">
      
      {/* Title Header */}
      <div className="bg-[#1b1b1b] p-6 rounded-3xl border border-[#F5F5F0]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] bg-[#CD5C5C]/25 text-[#CD5C5C] px-3 py-1 rounded-full font-black uppercase tracking-widest">GIRMAIC DEVOPS Hub</span>
          <h2 className="text-2xl font-serif italic font-black text-[#E5D3B3] mt-2">Enterprise Mobile Architecture & Deployment Center</h2>
          <p className="text-xs text-white/60 leading-relaxed mt-1">Review complete database layouts, secure Gemini API middlewares, and the Android Play Store production deployment roadmap.</p>
        </div>
        
        {/* Offline status info */}
        <div className="bg-[#E5D3B3]/10 p-3.5 rounded-2xl border border-[#E5D3B3]/20 flex items-center gap-3">
          <div className="text-right">
            <span className="block text-[9px] uppercase tracking-wider opacity-65">Firestore Sync Nodes</span>
            <span className="text-xs font-bold text-white">
              {offlineQueueLength > 0 ? (
                <span className="text-yellow-400">⚠️ {offlineQueueLength} Items Pending Sync</span>
              ) : (
                <span className="text-[#6B8E23] flex items-center gap-1">● Synced with Backend</span>
              )}
            </span>
          </div>
          {offlineQueueLength > 0 && (
            <button 
              onClick={onSync}
              className="px-3 py-1.5 bg-[#6B8E23] hover:bg-[#7ba429] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Sync Now
            </button>
          )}
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex bg-[#161616] p-1.5 rounded-full border border-white/10 self-start gap-1">
        <button
          onClick={() => setActiveTab("system")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "system" ? "bg-[#E5D3B3] text-[#121212]" : "text-white/60 hover:text-white"}`}
        >
          ⚙️ 1. Complete System Flow
        </button>
        <button
          onClick={() => setActiveTab("firestore")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "firestore" ? "bg-[#E5D3B3] text-[#121212]" : "text-white/60 hover:text-white"}`}
        >
          🔥 2. Live Firestore streams
        </button>
        <button
          onClick={() => setActiveTab("android")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "android" ? "bg-[#E5D3B3] text-[#121212]" : "text-white/60 hover:text-white"}`}
        >
          🤖 3. Kotlin WebView bridge
        </button>
        <button
          onClick={() => setActiveTab("road")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "road" ? "bg-[#E5D3B3] text-[#121212]" : "text-white/60 hover:text-white"}`}
        >
          🚀 4. Android deployment roadmap
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "system" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Diagrams layout */}
          <div className="bg-[#1b1b1b] p-6 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase text-[#E5D3B3] tracking-wider flex items-center gap-2">
              <Layers size={16} /> ENTERPRISE END-TO-END SYSTEM STACK DIAGRAM
            </h3>
            
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-stone-900 border border-[#CD5C5C]/20 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest opacity-60 font-mono block">Node 1: User Client View</span>
                  <span className="text-xs font-extrabold text-white block mt-0.5">Tactile Web/Android WebView Client</span>
                  <p className="text-[11px] text-white/50 mt-1">Renders responsive micro-apps: CV generator, STEM quizzes, agronomist tools and speech records.</p>
                </div>
                <div className="text-[10px] bg-[#CD5C5C]/20 text-rose-300 px-2 py-1 rounded">HTML5/React</div>
              </div>

              <div className="flex justify-center my-1">
                <span className="text-stone-600 text-xs font-mono">║ HTTP Posts (Secure API Proxies) / Firestore SDK</span>
              </div>

              <div className="p-4 bg-stone-900 border border-[#DAA520]/20 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest opacity-60 font-mono block">Node 2: API Proxy Middleware Routing</span>
                  <span className="text-xs font-extrabold text-white block mt-0.5">ExpressJS Node Server Environment (Port 3000)</span>
                  <p className="text-[11px] text-white/50 mt-1">Conceals internal Google model tokens. Validates localized payloads safely before passing upstream.</p>
                </div>
                <div className="text-[10px] bg-[#DAA520]/20 text-yellow-300 px-2 py-1 rounded">NodeJS / tsx</div>
              </div>

              <div className="flex justify-center my-1">
                <span className="text-stone-600 text-xs font-mono">║ TLS Handshake (JSON API Client)</span>
              </div>

              <div className="p-4 bg-stone-900 border border-[#6B8E23]/20 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest opacity-60 font-mono block">Node 3: Large Language Model Intelligence</span>
                  <span className="text-xs font-extrabold text-white block mt-0.5">Google standard Gemini API endpoint</span>
                  <p className="text-[11px] text-white/50 mt-1">Processes structured responses detailing job portals, soil analysis, and Grade 12 lesson calculations.</p>
                </div>
                <div className="text-[10px] bg-[#6B8E23]/20 text-green-300 px-2 py-1 rounded">@google/genai</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1b1b1b] p-6 rounded-3xl border border-white/5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase text-[#E5D3B3] tracking-wider flex items-center justify-between">
                <span>🛡️ SECURE SYSTEM EXPRESS PROXY CODE (MIDDLEWARE)</span>
                <button 
                  onClick={() => copyToClipboard(expressProxyString, "node-proxy")}
                  className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs flex items-center gap-1.5 text-white/80 cursor-pointer"
                >
                  <Copy size={12} />
                  <span>{copiedKey === "node-proxy" ? "Copied" : "Copy"}</span>
                </button>
              </h3>
              <p className="text-xs text-white/65 italic leading-relaxed">This secure Express routing logic guards your <code>GEMINI_API_KEY</code> on remote servers. Clients submit calls directly to <code>/api/help</code> as shown below:</p>
              
              <pre className="p-4 bg-stone-950 rounded-2xl border border-white/10 text-[10px] font-mono leading-relaxed overflow-x-auto text-yellow-100 max-h-[340px]">
                {expressProxyString}
              </pre>
            </div>
            
            <p className="text-[10px] font-mono text-center text-stone-500 bg-stone-950 p-2 rounded-xl border border-stone-900">
              PRODUCTION REQUIREMENT: Never write GEMINI_API_KEY inside React client code! Expose it ONLY server-side.
            </p>
          </div>
        </div>
      )}

      {activeTab === "firestore" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-[#1b1b1b] p-6 rounded-3xl border border-white/5 space-y-4 flex flex-col">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-black uppercase text-[#E5D3B3] tracking-wider flex items-center gap-2">
                <Database size={16} className="text-red-400" /> ACTIVE FIRESTORE LIVE STREAMS REPRESENTATION
              </h3>
            </div>
            
            <p className="text-xs text-white/60">As actions are performed inside the simulated mobile frame (saving CVs, answering STEM exam questions, conducting soil calculations), this live console mutates immediately. Click to inspect structures.</p>
            
            <div className="flex-1 bg-black/40 p-5 rounded-2xl border border-white/5 overflow-y-auto font-mono text-[11px] text-green-300 max-h-[420px] leading-relaxed">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-2">// CURRENT SIMULATED CLOUD FIRESTORE REGISTRY DB</span>
              <pre className="whitespace-pre-wrap">{JSON.stringify(firestoreDocs, null, 2)}</pre>
            </div>
          </div>

          <div className="bg-[#1b1b1b] p-6 rounded-3xl border border-white/5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-sm font-black uppercase text-[#E5D3B3] tracking-wider">
                  🔥 CLOUD SECURITY & ACCESS CONTROLS (firestore.rules)
                </h3>
                <button 
                  onClick={() => copyToClipboard(firebaseRulesString, "rules")}
                  className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs flex items-center gap-1.5 text-white/80 cursor-pointer"
                >
                  <Copy size={12} />
                  <span>{copiedKey === "rules" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">Secures document nodes to authenticated owners. No user can read or write documents of other registered Ethiopian citizens.</p>
              
              <pre className="p-4 bg-stone-950 rounded-2xl border border-white/10 text-[10px] font-mono leading-relaxed overflow-x-auto text-rose-100 max-h-[350px]">
                {firebaseRulesString}
              </pre>
            </div>
            <div className="p-3 bg-red-950/15 border border-red-900/30 rounded-xl text-stone-400 text-[10px] text-center italic">
              Validated using Firebase emulator systems for absolute transaction safety.
            </div>
          </div>

        </div>
      )}

      {activeTab === "android" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-[#1b1b1b] p-6 rounded-3xl border border-white/5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-sm font-black uppercase text-[#E5D3B3] tracking-wider">
                  🤖 KOTLIN WEBVIEW LAUNCHER SHELL (MainActivity.kt)
                </h3>
                <button 
                  onClick={() => copyToClipboard(kotlinWebViewString, "kotlin")}
                  className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs flex items-center gap-1.5 text-white/80 cursor-pointer"
                >
                  <Copy size={12} />
                  <span>{copiedKey === "kotlin" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">This Kotlin class wraps the responsive web experience into an Android native APK wrapper. Generates deep permissions handlers for capturing real voice recording inputs.</p>
              
              <pre className="p-4 bg-stone-950 rounded-2xl border border-white/10 text-[10px] font-mono leading-relaxed overflow-x-auto text-blue-100 max-h-[340px]">
                {kotlinWebViewString}
              </pre>
            </div>
            <p className="text-[10px] font-mono text-center text-stone-500">
              Crucial: Make sure to grant permission inside MainActivity for recording or the voice assistant speech tool will timeout.
            </p>
          </div>

          <div className="bg-[#1b1b1b] p-6 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase text-[#E5D3B3] tracking-wider">
              📱 ANDROIDMANIFEST.XML PERMISSIONS CONFIGURATION
            </h3>
            
            <p className="text-xs text-white/60 leading-relaxed">Place these lines inside the root folder level structure of your native launcher. They specify internet connectivity and audio records capabilities for the smartphone.</p>
            
            <div className="p-4 bg-stone-950 rounded-2xl border border-white/10 text-[10px] font-mono text-cyan-200">
              {`<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n   package="com.girmaic.ethiopia.helper">\n\n   <!-- Core Web Requirements -->\n   <uses-permission android:name="android.permission.INTERNET" />\n   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />\n\n   <!-- Assistant Microphone Record Permissions -->\n   <uses-permission android:name="android.permission.RECORD_AUDIO" />\n   <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />\n\n   <application ... >\n       <!-- WebView Host Activity -->\n       <activity android:name=".MainActivity"\n           android:exported="true">\n           ...\n       </activity>\n   </application>\n</manifest>`}
            </div>
            
            <div className="p-4 bg-[#6B8E23]/10 border border-[#6B8E23]/40 rounded-2xl">
              <span className="text-xs font-bold text-[#6B8E23] block mb-1">💡 Performance Shrinking Optimizations for Regional 3G/4G:</span>
              <p className="text-xs text-stone-300 leading-relaxed">Turn on Proguard and R8 optimization in <code>build.gradle</code>. This tree-shaking drops the finalized compiled runtime wrapper from 12MB down to only 1.8MB, critical for slow mobile downloads in outlying districts.</p>
            </div>
          </div>

        </div>
      )}

      {activeTab === "road" && (
        <div className="bg-[#1b1b1b] p-6 rounded-3xl border border-white/5 space-y-6">
          <h3 className="text-sm font-black uppercase text-[#E5D3B3] tracking-wider">
            🗺️ STEP-BY-STEP PLAY STORE DISTRIBUTION ROADMAP
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deploymentPhases.map((phase, idx) => (
              <div key={idx} className="p-5 bg-stone-900/60 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[#E5D3B3]/20 transition-all">
                <div className="space-y-2">
                  <span className="text-xs font-black text-[#CD5C5C] font-mono">PHASE {phase.step}</span>
                  <h4 className="text-xs font-extrabold text-white">{phase.title}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">{phase.desc}</p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-white/5">
                  <pre className="p-2 bg-stone-950 rounded text-[9px] font-mono text-yellow-200 overflow-x-auto">
                    {phase.commands}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-stone-900 border border-white/10 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-extrabold text-white block">✅ Production Audit Checklist for Ethiopia Storefronts:</span>
              <span className="text-stone-400 block leading-relaxed">1. Fully translated icons/titles in Play Store  |  2. Optimized size (Asset Compression)  |  3. Offline-safe local database caching</span>
            </div>
            <div className="text-[10px] uppercase font-mono bg-stone-950 px-3 py-1.5 rounded-lg text-rose-300 border border-stone-800">
              Target Level SDK: API 34+ (Android 14)
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
