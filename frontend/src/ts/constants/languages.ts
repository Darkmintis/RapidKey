import { Language, LanguageSchema } from "@rapidkey/schemas/languages";

export const LanguageList: Language[] = LanguageSchema._def.values;

export const LanguageGroups: Record<string, Language[]> = {
  english: ["english"],
  spanish: ["spanish"],
  french: ["french"],
  german: ["german"],
  portuguese: ["portuguese"],
  chinese: ["chinese_simplified"],
  japanese: ["japanese_romaji"],
};

export type LanguageGroupName = keyof typeof LanguageGroups;
export const LanguageGroupNames: LanguageGroupName[] = Array.from(
  Object.keys(LanguageGroups)
);

/**
 * Fetches the language group for a given language.
 * @param language The language code.
 * @returns the language group.
 */
export function getGroupForLanguage(
  language: Language
): LanguageGroupName | undefined {
  return LanguageGroupNames.find((group) => group.includes(language));
}
