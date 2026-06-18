export type LanguageCode = "am" | "om" | "so" | "ti" | "en";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export interface Category {
  id: string;
  icon: string;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
}

export interface GuidePreset {
  id: string;
  categoryId: string;
  title: Record<LanguageCode, string>;
  question: Record<LanguageCode, string>;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface HelpRequest {
  language: LanguageCode;
  category: string;
  query: string;
  chatHistory: ChatMessage[];
}

export interface ServiceBreakdown {
  explanation: string;
  steps: string[];
  documents: string[];
  nextActions: string[];
  alternatives: string[];
}

export interface HelpResponse {
  answer: string;
  breakdown?: ServiceBreakdown;
  suggestedFollowUps?: string[];
}
