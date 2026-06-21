import { LanguageCode } from "../types";

// Firestore-mirrored entities matching firebase-blueprint JSON declarations

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone?: string;
  language: LanguageCode;
  preferredWoreda?: string;
  createdAt: string;
}

export interface ChatQuestion {
  id: string;
  uid: string;
  category: string;
  query: string;
  answer: string;
  timestamp: string;
  language: LanguageCode;
}

export interface CvDraft {
  id: string;
  uid: string;
  fullName: string;
  professionalTitle: string;
  phone: string;
  email: string;
  education: string;
  skills: string;
  experience: string;
  aiOptimizedCopy: string;
  createdAt: string;
}

export interface QuizProgress {
  id: string;
  uid: string;
  lessonTopic: string;
  score: number;
  totalQuestions: number;
  completed: boolean;
  updatedAt: string;
}

export interface CropReport {
  id: string;
  uid: string;
  cropType: "Teff" | "Wheat" | "Maize" | "Barley";
  areaHectares: number;
  soilType: string;
  calculatedUreaKg: number;
  calculatedNpsKg: number;
  pestsAdvice?: string;
  createdAt: string;
}

// Keys matching agents.md specification or standard structured persistent streams
const KEYS = {
  USER_SESSION: "girmaic_user_session",
  TEAM_MEMBERS: "girmaic_team_members",
  SAVED_QUESTIONS: "girmaic_saved_questions",
  CV_DRAFTS: "girmaic_saved_cv_drafts",
  QUIZ_PROGRESSList: "girmaic_quiz_progress_list",
  CROP_REPORTS: "girmaic_crop_reports",
};

// Simple mock logger and helper to communicate database feedback
const dbLog = (action: string, success: boolean, details?: any) => {
  console.log(`[GIRMAIC Database Log] ${action}: ${success ? "SUCCESS" : "FAILED"}`, details || "");
};

export const database = {
  // --- USER PROFILE & SESSION ---
  getCurrentUser(): UserProfile {
    try {
      const saved = localStorage.getItem(KEYS.USER_SESSION);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      dbLog("readUserSession", false, e);
    }
    // High-quality default session representing on-ground tester under Kebele gates
    const defaultUser: UserProfile = {
      uid: "eth-usr-94821",
      fullName: "Kidus Abebe",
      email: "kidus.abebe@gmail.com",
      phone: "+251911405021",
      language: "am",
      preferredWoreda: "Bole District, Addis Ababa",
      createdAt: new Date().toISOString()
    };
    this.saveUserSession(defaultUser);
    return defaultUser;
  },

  saveUserSession(user: UserProfile): void {
    try {
      localStorage.setItem(KEYS.USER_SESSION, JSON.stringify(user));
      dbLog("saveUserSession", true);
    } catch (e) {
      dbLog("saveUserSession", false, e);
    }
  },

  // --- QUESTIONS HISTORY ---
  getSavedQuestions(uid: string): ChatQuestion[] {
    try {
      const raw = localStorage.getItem(KEYS.SAVED_QUESTIONS);
      if (raw) {
        const list: ChatQuestion[] = JSON.parse(raw);
        return list.filter(q => q.uid === uid);
      }
    } catch (e) {
      dbLog("getSavedQuestions", false, e);
    }
    return [];
  },

  saveQuestion(uid: string, category: string, query: string, answer: string, language: LanguageCode): ChatQuestion {
    const newQuestion: ChatQuestion = {
      id: "question-" + Math.floor(Math.random() * 90000 + 10000),
      uid,
      category,
      query,
      answer,
      timestamp: new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
      language
    };

    try {
      const raw = localStorage.getItem(KEYS.SAVED_QUESTIONS);
      const list: ChatQuestion[] = raw ? JSON.parse(raw) : [];
      list.unshift(newQuestion); // Newest first
      localStorage.setItem(KEYS.SAVED_QUESTIONS, JSON.stringify(list));
      dbLog("saveQuestion", true, newQuestion);
    } catch (e) {
      dbLog("saveQuestion", false, e);
    }

    return newQuestion;
  },

  deleteQuestion(id: string): void {
    try {
      const raw = localStorage.getItem(KEYS.SAVED_QUESTIONS);
      if (raw) {
        const list: ChatQuestion[] = JSON.parse(raw);
        const filtered = list.filter(q => q.id !== id);
        localStorage.setItem(KEYS.SAVED_QUESTIONS, JSON.stringify(filtered));
        dbLog("deleteQuestion", true, id);
      }
    } catch (e) {
      dbLog("deleteQuestion", false, e);
    }
  },

  // --- CV DRAFTS COLLECTION ---
  getCvDrafts(uid: string): CvDraft[] {
    try {
      const raw = localStorage.getItem(KEYS.CV_DRAFTS);
      if (raw) {
        const list: CvDraft[] = JSON.parse(raw);
        return list.filter(cv => cv.uid === uid);
      }
    } catch (e) {
      dbLog("getCvDrafts", false, e);
    }
    return [];
  },

  saveCvDraft(draft: Omit<CvDraft, "id" | "createdAt">): CvDraft {
    const newDraft: CvDraft = {
      ...draft,
      id: "cv-draft-" + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    try {
      const raw = localStorage.getItem(KEYS.CV_DRAFTS);
      const list: CvDraft[] = raw ? JSON.parse(raw) : [];
      list.unshift(newDraft);
      localStorage.setItem(KEYS.CV_DRAFTS, JSON.stringify(list));
      dbLog("saveCvDraft", true, newDraft);
    } catch (e) {
      dbLog("saveCvDraft", false, e);
    }
    return newDraft;
  },

  deleteCvDraft(id: string): void {
    try {
      const raw = localStorage.getItem(KEYS.CV_DRAFTS);
      if (raw) {
        const list: CvDraft[] = JSON.parse(raw);
        const filtered = list.filter(cv => cv.id !== id);
        localStorage.setItem(KEYS.CV_DRAFTS, JSON.stringify(filtered));
        dbLog("deleteCvDraft", true, id);
      }
    } catch (e) {
      dbLog("deleteCvDraft", false, e);
    }
  },

  // --- QUIZ HISTORY PROGRESS ---
  getQuizProgress(uid: string): QuizProgress[] {
    try {
      const raw = localStorage.getItem(KEYS.QUIZ_PROGRESSList);
      if (raw) {
        const list: QuizProgress[] = JSON.parse(raw);
        return list.filter(q => q.uid === uid);
      }
    } catch (e) {
      dbLog("getQuizProgress", false, e);
    }
    return [];
  },

  saveQuizAttempt(uid: string, lessonTopic: string, score: number, totalQuestions: number): QuizProgress {
    const newProgress: QuizProgress = {
      id: "quiz-attempt-" + Math.floor(Math.random() * 90000 + 10000),
      uid,
      lessonTopic,
      score,
      totalQuestions,
      completed: true,
      updatedAt: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" })
    };

    try {
      const raw = localStorage.getItem(KEYS.QUIZ_PROGRESSList);
      const list: QuizProgress[] = raw ? JSON.parse(raw) : [];
      list.unshift(newProgress);
      localStorage.setItem(KEYS.QUIZ_PROGRESSList, JSON.stringify(list));
      dbLog("saveQuizAttempt", true, newProgress);
    } catch (e) {
      dbLog("saveQuizAttempt", false, e);
    }
    return newProgress;
  },

  // --- SOIL CALCULATIONS & CROP REPORTS ---
  getCropReports(uid: string): CropReport[] {
    try {
      const raw = localStorage.getItem(KEYS.CROP_REPORTS);
      if (raw) {
        const list: CropReport[] = JSON.parse(raw);
        return list.filter(rep => rep.uid === uid);
      }
    } catch (e) {
      dbLog("getCropReports", false, e);
    }
    return [];
  },

  saveCropReport(report: Omit<CropReport, "id" | "createdAt">): CropReport {
    const newReport: CropReport = {
      ...report,
      id: "crop-report-" + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" })
    };

    try {
      const raw = localStorage.getItem(KEYS.CROP_REPORTS);
      const list: CropReport[] = raw ? JSON.parse(raw) : [];
      list.unshift(newReport);
      localStorage.setItem(KEYS.CROP_REPORTS, JSON.stringify(list));
      dbLog("saveCropReport", true, newReport);
    } catch (e) {
      dbLog("saveCropReport", false, e);
    }
    return newReport;
  },

  deleteCropReport(id: string): void {
    try {
      const raw = localStorage.getItem(KEYS.CROP_REPORTS);
      if (raw) {
        const list: CropReport[] = JSON.parse(raw);
        const filtered = list.filter(rep => rep.id !== id);
        localStorage.setItem(KEYS.CROP_REPORTS, JSON.stringify(filtered));
        dbLog("deleteCropReport", true, id);
      }
    } catch (e) {
      dbLog("deleteCropReport", false, e);
    }
  }
};
