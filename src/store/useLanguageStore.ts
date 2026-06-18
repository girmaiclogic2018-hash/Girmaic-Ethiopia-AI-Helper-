import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguageCode } from "../types";

export interface LanguageState {
  selectedLanguage: LanguageCode | null;
  setSelectedLanguage: (lang: LanguageCode | null) => void;
  clearStorage: () => Promise<void>;
}

// Durable cross-platform storage adapter
// Directs storage operations to @react-native-async-storage/async-storage in React Native / Expo setting
// and cascades elegantly to standard web localStorage when executed within standard browsers.
const crossPlatformStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        return window.localStorage.getItem(name);
      }
      return await AsyncStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        window.localStorage.setItem(name, value);
        return;
      }
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      console.error("Storage write error:", e);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        window.localStorage.removeItem(name);
        return;
      }
      await AsyncStorage.removeItem(name);
    } catch {}
  },
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      // Synchronous initial value lookup for zero-flash Web rendering (returns null if unselected)
      selectedLanguage: (() => {
        try {
          if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
            const raw = window.localStorage.getItem("girmaic-language-state");
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed?.state?.selectedLanguage) {
                return parsed.state.selectedLanguage;
              }
            }
          }
        } catch {
          // Fallback to default null
        }
        return null;
      })(),
      setSelectedLanguage: (lang: LanguageCode | null) => set({ selectedLanguage: lang }),
      clearStorage: async () => {
        try {
          if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
            window.localStorage.removeItem("girmaic-language-state");
            window.localStorage.removeItem("girmaic_user_session");
          }
          await AsyncStorage.removeItem("girmaic-language-state");
          await AsyncStorage.removeItem("girmaic_user_session");
        } catch (e) {
          console.error("Failed to clear storage keys:", e);
        }
        set({ selectedLanguage: null });
      },
    }),
    {
      name: "girmaic-language-state",
      storage: createJSONStorage(() => crossPlatformStorage),
    }
  )
);
