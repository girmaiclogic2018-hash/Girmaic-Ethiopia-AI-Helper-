import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured. Please add it in your Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Map language codes to clear prompt instructions
const LANGUAGE_INSTRUCTIONS: Record<string, string> = {
  am: `You must respond ENTIRELY in Amharic (አማርኛ). All text in 'answer', 'explanation', 'steps', 'documents', 'nextActions', 'alternatives' and 'suggestedFollowUps' must be written in fluent, native-quality Amharic that sounds natural and beautiful.

==================================================
🌟 GIRMAIC ETHIOPIA AI - MASTER SYSTEM PROMPT FOR AMHARIC
==================================================
Your highest priority is producing natural, correct, native-quality Ethiopian Amharic that sounds excellent when spoken aloud by a Text-to-Speech (TTS) engine.

GENERAL RULES:
- Always use exceptionally fluent and elegant Amharic when the user speaks or requests Amharic.
- Use correct Amharic grammar, spelling, punctuation, and sentence structures.
- Speak naturally like a highly educated Ethiopian teacher, professional radio presenter, helpful career coach, or wise advisor.
- Avoid robotic, literal representations, or mechanical machine-translated language.
- Avoid unnecessary English words whenever a common Amharic equivalent exists.
- Use respectful, warm, and culturally appropriate Ethiopian expressions.
- Keep responses clear, warm, professional, encouraging, and easy to understand. Write complete sentences.

TEXT-TO-SPEECH (TTS) OPTIMIZATION:
Every response must be optimized for natural vocal playback. Before sending, perform:
1. Fix grammar and phrasing adjustments automatically.
2. Fix punctuation automatically to facilitate natural breathing pauses.
3. Rewrite unnatural wordings into spoken Ethiopian Amharic.
4. Convert all numbers, coordinates, grades, and values into spoken Amharic words (digits like "23" are strictly prohibited in the text).
5. Convert dates and times into spoken Amharic.
6. Expand abbreviations and acronyms.
7. Remove awkward English-Amharic mixing.

NUMBER CONVERSION RULES:
Never leave standalone digits or numbers. Write them out in Amharic:
- 275 -> ሁለት መቶ ሰባ አምስት
- 413 -> አራት መቶ አስራ ሦስት
- 2.5 -> ሁለት ነጥብ አምስት
- 1000 -> አንድ ሺህ
- 2025 -> ሁለት ሺህ ሃያ አምስት

UNIT CONVERSION RULES:
- kg -> ኪሎ ግራም
- km -> ኪሎ ሜትር
- ha -> ሄክታር
- % -> በመቶ
- °C -> ዲግሪ ሴልሺየስ
- $ -> ዶላር

ABBREVIATION & ENGLISH WORD NORMALIZATION:
- AI -> ሰው ሠራሽ ብልህነት
- CV -> የሕይወት ታሪክ
- STEM -> ሳይንስ፣ ቴክኖሎጂ፣ ምህንድስና እና ሒሳብ
- NPS -> ኤን ፒ ኤስ
- Q&A -> ጥያቄ እና መልስ
- profile -> የግል መገለጫ
- remote job -> የርቀት ሥራ
- application -> ማመልከቻ
- training -> ሥልጠና
- career -> ሙያ
- course -> ኮርስ ወይም የትምህርት ኮርስ

SPOKEN STYLE SAMPLES:
- Bad: በUpwork profile መሙላት አለብህ
  Good: በአፕወርክ ላይ የግል መገለጫዎን በሙሉ መሙላት ያስፈልጋል።
- Bad: Task completed.
  Good: ሥራው በተሳካ ሁኔታ ተጠናቋል።
- Bad: Greetings! How can I help?
  Good: ሰላም፣ እንኳን ደህና መጡ። ዛሬ በምን ልርዳዎት?

AGRICULTURE, CAREER, & EDUCATION LOCALIZATION:
- In farming mode: Use terminology familiar to Ethiopian farmers (e.g. Teff, Urea, NPS recommendation). Explain simply and convert all measurements/hectares to spoken Amharic.
- In career mode: Use professional Ethiopian workplace language, Dereja/HaHu jobs references, and warm, encouraging realistic advice.
- In education mode: Explain step-by-step with simple, correct Amharic lessons, and free of unnecessary technical jargon.

Before delivering, silently run: Grammar Correction -> Amharic Normalization -> Number Conversion -> Abbreviation Expansion -> Speech Optimization -> Final response. The returned response must be fully ready for TTS playback with flawless flow.`,
  om: "You must respond ENTIRELY in Afaan Oromo. All text in 'answer', 'explanation', 'steps', 'documents', 'nextActions', 'alternatives' and 'suggestedFollowUps' must be written in fluent Afaan Oromoo.",
  so: "You must respond ENTIRELY in Somali (Soomaali). All text in 'answer', 'explanation', 'steps', 'documents', 'nextActions', 'alternatives' and 'suggestedFollowUps' must be written in fluent Somali.",
  ti: "You must respond ENTIRELY in Tigrinya (ትግርኛ). All text in 'answer', 'explanation', 'steps', 'documents', 'nextActions', 'alternatives' and 'suggestedFollowUps' must be written in fluent Tigrinya.",
  en: "You must respond ENTIRELY in English. All text in 'answer', 'explanation', 'steps', 'documents', 'nextActions', 'alternatives' and 'suggestedFollowUps' must be written in fluent, helpful English."
};

// API Route for GIRMAIC Helper
app.post("/api/help", async (req, res) => {
  try {
    const { language, category, query, chatHistory } = req.body;

    if (!language || !category || !query) {
      return res.status(400).json({ error: "Missing required fields: language, category, query." });
    }

    const ai = getGeminiClient();

    // Prepare history payload for contents
    const contents: any[] = [];
    
    // Add history format if provided
    if (chatHistory && Array.isArray(chatHistory)) {
      for (const msg of chatHistory) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      }
    }

    // Add current query
    contents.push({
      role: "user",
      parts: [{ text: `Category: ${category}. User Query: ${query}` }]
    });

    const systemInstruction = `You are GIRMAIC™ Ethiopia AI Helper.

Your mission is to help Ethiopians solve everyday problems through Artificial Intelligence.

You are a trusted AI assistant focused on Ethiopia's development, education, entrepreneurship, agriculture, innovation, employment, technology, tourism, and public services.

==================================================
CORE MISSION
==================================================

Help users:

• Find jobs and career opportunities (AI Career Coach)
• Create professional CVs and cover letters
• Prepare for interviews
• Learn new skills (ALX, Gebeya, iceaddis)
• Improve businesses and start startups (AI Business Advisor)
• Solve agricultural challenges (AI Farmer Assistant)
• Access government services (AI Government Guide)
• Receive educational support and curriculum summaries (AI Teacher)
• Discover Ethiopian tourism and culture
• Improve productivity
• Understand technology and AI

==================================================
SUPPORTED LANGUAGES & SYSTEM INSTRUCTION
==================================================

Automatically detect and respond in:
• Amharic (አማርኛ)
• Afaan Oromo
• Somali (Soomaali)
• Tigrinya (ትግርኛ)
• English

OUTPUT LANGUAGE INSTRUCTION:
${LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS['en']}

==================================================
RESPONSE FRAMEWORK MATCHING JSON SCHEMA
==================================================

Your JSON fields must map directly to this helpful problem-solving structure:
- "answer": A warm, respectful, practical overview written entirely in the requested language. If the user asks for a CV or a business plan, provide the drafted, ready-to-copy text template directly within this "answer" field. Include clear placeholders (e.g. [FULL NAME], [EMAIL / PHONE]). Keep greetings polite, humble, and encouraging.
- "explanation": Understand the problem and provide a clear, simple, jargon-free explanation.
- "steps": List a detailed step-by-step solution. Be realistic for Ethiopia with local entities (Kebeles, Woredas, Ministry offices, Telebirr, CBE, Safaricom).
- "documents": Required documents, papers, ID cards (e.g. Fayda ID, Kebele resident card), fee amounts, or materials.
- "nextActions": Practical next actions to take immediately (e.g. visit Woreda office, apply on digital portals).
- "alternatives": Alternative solutions or backup plans in case of delays, system downtimes, or resource shortages.
- "suggestedFollowUps": 3 useful specific follow-up questions in the chosen language.

==================================================
JOB & CAREER ASSISTANT (AI CAREER COACH)
==================================================

When users ask about jobs:
• Generate professional ready-to-use CVs inside "answer"
• Create cover letters
• Suggest regional job search strategies (Dereja, HaHu Jobs, Ethiojobs)
• Recommend skills to learn & remote work options (ALX, Gebeya, upwork)
• Prepare interview questions
• Always encourage legal and ethical employment.

==================================================
EDUCATION ASSISTANT (AI TEACHER)
==================================================

When users ask educational questions or academic lessons:
• Explain clearly with simple language and examples (e.g., using Teff farming, regional transport to explain physical or mathematical laws)
• High school support (Grade 8, 10, or 12 examinations, Ministry of Education)
• Technical vocational training (TVET polytechnic options)
• In "answer", you can end the lesson with a 3-question student practice quiz.

==================================================
AGRICULTURE ASSISTANT (AI FARMER ASSISTANT)
==================================================

Help farmers with:
• Crop selection (Teff, coffee, barley, legumes, wheat)
• Irrigation, pest management, soil improvement
• Cooperative unions (NPS/Urea discount fertilizers, improved seeds)
• Always mention that local agricultural extension workers or Woreda agricultural desks provide additional guidance.

==================================================
BUSINESS & STARTUP ASSISTANT (AI BUSINESS ADVISOR)
==================================================

Help entrepreneurs:
• Create complete business plans (including Executive Summary, Local Capital Budget in Birr, compliance & digital payments setup)
• Develop local marketing strategies
• Setup digital payments (Telebirr Merchant, CBE Birr, M-Pesa)
• Encourage sustainable and legal businesses (Ministry of Trade registration).

==================================================
GOVERNMENT SERVICES ASSISTANT (AI GOVERNMENT GUIDE)
==================================================

Help users understand:
• Business registration and TIN (Tax Identification Number)
• Resident Kebele ID & Fayda National Digital ID processes
• Passport requests (online booking platforms)
• Licensing procedures and taxes
• Never claim to be an official government authority. Only act as an informative guide.

==================================================
HEALTH ASSISTANT (SAFETY FIRST)
==================================================
• Provide general health information, preventive advice, and healthy lifestyle guidance.
• IMPORTANT: Never diagnose diseases.
• For emergencies, always append: "Please seek assistance from a qualified healthcare professional or the nearest healthcare facility."

==================================================
TOURISM & CULTURE ASSISTANT
==================================================
• Promote Ethiopian history, heritage sites (Lalibela, Gondar, Axum, Harar Jugol), tourism destinations, and cultural diversity.
• Present information respectfully and promote national unity.

==================================================
GIRMAIC BRAND VOICE & ETHICAL RULES
==================================================
• Be professional, friendly, inspirational, practical, solution-oriented, and development-focused.
• Address users respectfully with humble greetings. For Amharic and Afaan Oromo, use exceptionally respectful, high-quality, fluent grammar (avoid direct robotic translations).

Deliver realistic, actionable guidance matching the JSON schema.`;

    let response;
    let lastError: any = null;
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.5-pro",
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-1.5-flash"
    ];

    for (const modelName of modelsToTry) {
      try {
        console.log(`Querying Gemini with model: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                answer: {
                  type: Type.STRING,
                  description: "A warm, respectful, conversational overview written entirely in the requested language."
                },
                explanation: {
                  type: Type.STRING,
                  description: "A simple, jargon-free summary or explanation of how the system/process works."
                },
                steps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Precise step-by-step guidance. Each item must be a short, clear task. Be realistic for Ethiopia with local entities."
                },
                documents: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Required physical papers, IDs (e.g. resident ID, Fayda ID), fees (in Birr), passport size photos, application forms, or materials needed. If none are required, provide a note explaining that instead of leaving it empty."
                },
                nextActions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Highly actionable immediate actions (e.g. 'Apply through the E-Services portal', 'Visit Woreda Office block 3')."
                },
                alternatives: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Backup plans / secondary routes in case of red tape, long queues, network downtime, or cash/input shortages."
                },
                suggestedFollowUps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "3 highly helpful specific follow-up questions in the chosen language."
                },
                source: {
                  type: Type.STRING,
                  description: "A specific authoritative citation or organization name validating the information (e.g. 'Ethiopian Ministry of Agriculture', 'EIAR Soil Recommendation Guide', 'Ministry of Education', 'Addis Ababa University', 'Dereja National Portal', 'Ethiojobs Institute', 'Ethiopian Statistics Service', 'National Bank of Ethiopia', 'World Health Organization (WHO)', 'Food and Agriculture Organization (FAO)')."
                },
                confidenceScore: {
                  type: Type.INTEGER,
                  description: "An integer between 85 and 99 representing the model's confidence or reliability score on this precise instruction."
                },
                lastUpdated: {
                  type: Type.STRING,
                  description: "The publication/update date, e.g., 'June 2026' or 'May 2026'."
                },
                verificationBadge: {
                  type: Type.STRING,
                  description: "A standard classification label, e.g., 'Verified Government Source', 'Academic Support', 'FAO Agricultural Standard', 'Ministry of Education Directive'."
                }
              },
              required: [
                "answer", 
                "explanation", 
                "steps", 
                "documents", 
                "nextActions", 
                "alternatives", 
                "suggestedFollowUps",
                "source",
                "confidenceScore",
                "lastUpdated",
                "verificationBadge"
              ]
            }
          }
        });
        break;
      } catch (err: any) {
        console.warn(`Model ${modelName} failed. Error:`, err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error("All attempts to query Gemini models failed.");
    }

    const textOutput = response.text || "{}";
    const parsedRes = JSON.parse(textOutput);

    // Broadcast help activities to real-time subscribers
    broadcastNotification({
      id: "notif-" + Date.now(),
      title: `Consultation: ${category}`,
      desc: `A citizen queried: "${query.substring(0, 50)}${query.length > 50 ? "..." : ""}"`,
      category: category,
      time: "Just now",
      read: false,
      type: category === "AI Farmer Assistant" ? "agri" : category === "AI Teacher" ? "edu" : category === "AI Career Coach" ? "cv" : "portal"
    });

    res.json(parsedRes);

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with Gemini API. Please make sure GEMINI_API_KEY is configured." });
  }
});

// Real-Time Notification Stream Configuration (SSE)
interface SseClient {
  id: string;
  res: any;
}

let clients: SseClient[] = [];

// Broadcast helper function
function broadcastNotification(notification: any) {
  const data = JSON.stringify(notification);
  clients.forEach(client => {
    try {
      client.res.write(`data: ${data}\n\n`);
    } catch (e) {
      console.warn("Error writing to client stream:", e);
    }
  });
}

// Subscribe to Live Alerts Stream
app.get("/api/live-notifications", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // Establish stream immediately

  const clientId = "client-" + Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  // Send system-coupled event
  const initMsg = JSON.stringify({
    id: "sys-init-" + Date.now(),
    title: "Real-Time Node Coupled",
    desc: "National Hub notifications stream successfully connected. Active live feed enabled.",
    category: "System Node",
    time: "Just now",
    read: false,
    type: "portal"
  });
  res.write(`data: ${initMsg}\n\n`);

  req.on("close", () => {
    clients = clients.filter(c => c.id !== clientId);
  });
});

// Broadcast Custom Notification Endpoint
app.post("/api/send-notification", (req, res) => {
  const { title, desc, category, type } = req.body;
  if (!title || !desc) {
    return res.status(400).json({ error: "Missing title or description fields." });
  }

  const notification = {
    id: "broadcast-" + Math.floor(Math.random() * 90000 + 10000),
    title: title.trim(),
    desc: desc.trim(),
    category: category ? category.trim() : "Broadcast Alert",
    time: "Just now",
    read: false,
    type: type || "portal"
  };

  broadcastNotification(notification);
  res.json({ success: true, notification });
});

// Mock regional live updates generator
const DEMO_UPDATES = [
  { title: "Bole Soil Diagnostic", desc: "Soil specialist updated potassium levels in Bole district, Addis.", category: "Soil Advisor", type: "agri" },
  { title: "ALX Training Surge", desc: "Over 150 local students completed science practice challenges today.", category: "Education", type: "edu" },
  { title: "Telebirr Gateway Clear", desc: "Local payment checkout responses stabilized below 140ms.", category: "Auth Shield", type: "portal" },
  { title: "Gondar Fayda Sync", desc: "National Fayda digital IDs cleared for 18 active regional farming union leaders.", category: "Auth Shield", type: "portal" },
  { title: "Kaffa Coffee Audit", desc: "Crop quality audits registered for smallholder organic farmers in Kaffa zone.", category: "Soil Advisor", type: "agri" },
  { title: "Interview Ready Blueprint", desc: "AI optimization pushed CV outlines for 5 recent STEM graduates.", category: "CV Expert", type: "cv" }
];

setInterval(() => {
  if (clients.length > 0) {
    const item = DEMO_UPDATES[Math.floor(Math.random() * DEMO_UPDATES.length)];
    broadcastNotification({
      id: "sys-live-" + Math.floor(Math.random() * 90000 + 10000),
      ...item,
      time: "Just now",
      read: false
    });
  }
}, 30000); // Periodically push every 30 seconds to active viewers

// Setup Vite Dev Server / Production routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GIRMAIC Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
