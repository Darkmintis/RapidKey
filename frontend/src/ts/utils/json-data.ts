import { Language, LanguageObject } from "@rapidkey/schemas/languages";
import { Challenge } from "@rapidkey/schemas/challenges";
import { LayoutObject } from "@rapidkey/schemas/layouts";

//pin implementation
const fetch = window.fetch;

// Prepend Vite base URL for site-relative paths (e.g. /themes/x.css → /RapidKey/themes/x.css)
const basePath = import.meta.env.BASE_URL;
function withBase(url: string): string {
  return url.startsWith("/") ? basePath + url.slice(1) : url;
}

/**
 * Fetches JSON data from the specified URL using the fetch API.
 * @param url - The URL to fetch the JSON data from.
 * @returns A promise that resolves to the parsed JSON data.
 * @throws {Error} If the URL is not provided or if the fetch request fails.
 */
async function fetchJson<T>(url: string): Promise<T> {
  const resolvedUrl = withBase(url);
  try {
    if (!resolvedUrl) throw new Error("No URL");
    const res = await fetch(resolvedUrl);
    if (res.ok) {
      if (!res.headers.get("content-type")?.startsWith("application/json")) {
        throw new Error("Content is not JSON");
      }
      return (await res.json()) as T;
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  } catch (e) {
    console.error("Error fetching JSON: " + resolvedUrl, e);
    throw e;
  }
}

/**
 * Memoizes an asynchronous function.
 * @template P The type of the function's parameters.
 * @template T The type of the function.
 * @param {T} fn The asynchronous function to memoize.
 * @param {(...args: Parameters<T>) => P} [getKey] Optional function to generate cache keys based on function arguments.
 * @returns {T} The memoized function.
 */
export function memoizeAsync<P, T extends <B>(...args: P[]) => Promise<B>>(
  fn: T,
  getKey?: (...args: Parameters<T>) => P
): T {
  const cache = new Map<P, Promise<ReturnType<T>>>();

  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const key = getKey ? getKey.apply(args) : (args[0] as P);

    if (cache.has(key)) {
      const ret = await cache.get(key);
      if (ret !== undefined) {
        return ret as ReturnType<T>;
      }
    }

    // eslint-disable-next-line prefer-spread
    const result = fn.apply(null, args) as Promise<ReturnType<T>>;
    cache.set(key, result);

    return result;
  }) as T;
}

/**
 * Memoizes the fetchJson function to cache the results of fetch requests.
 * @param url - The URL used to fetch JSON data.
 * @returns A promise that resolves to the cached JSON data.
 */
export const cachedFetchJson = memoizeAsync<string, typeof fetchJson>(
  fetchJson
);

/**
 * Fetches a layout by name from the server.
 * @param layoutName The name of the layout to fetch.
 * @returns A promise that resolves to the layout object.
 * @throws {Error} If the layout list or layout doesn't exist.
 */
export async function getLayout(layoutName: string): Promise<LayoutObject> {
  return await cachedFetchJson<LayoutObject>(`/layouts/${layoutName}.json`);
}

// used for polyglot wordset language-specific properties
export type LanguageProperties = Pick<
  LanguageObject,
  "noLazyMode" | "ligatures" | "rightToLeft" | "additionalAccents"
>;

let currentLanguage: LanguageObject;

/**
 * Fetches the language object for a given language from the server.
 * @param lang The language code.
 * @returns A promise that resolves to the language object.
 */
export async function getLanguage(lang: Language): Promise<LanguageObject> {
  // try {
  if (currentLanguage === undefined || currentLanguage.name !== lang) {
    currentLanguage = await cachedFetchJson<LanguageObject>(
      `/languages/${lang}.json`
    );
  }
  return currentLanguage;
}

export async function checkIfLanguageSupportsZipf(
  language: Language
): Promise<"yes" | "no" | "unknown"> {
  const lang = await getLanguage(language);
  if (lang.orderedByFrequency === true) return "yes";
  if (lang.orderedByFrequency === false) return "no";
  return "unknown";
}

/**
 * Fetches the current language object.
 * @param languageName The name of the language.
 * @returns A promise that resolves to the current language object.
 */
export async function getCurrentLanguage(
  languageName: Language
): Promise<LanguageObject> {
  return await getLanguage(languageName);
}

export class Section {
  public title: string;
  public author: string;
  public words: string[];
  constructor(title: string, author: string, words: string[]) {
    this.title = title;
    this.author = author;
    this.words = words;
  }
}

export type FunboxWordOrder = "normal" | "reverse";

/**
 * Fetches the list of challenges from the server.
 * @returns A promise that resolves to the list of challenges.
 */
export async function getChallengeList(): Promise<Challenge[]> {
  const data = await cachedFetchJson<Challenge[]>("/challenges/_list.json");
  return data;
}

/**
 * Fetches the list of supporters from the server.
 * @returns A promise that resolves to the list of supporters.
 */
export async function getSupportersList(): Promise<string[]> {
  const data = await cachedFetchJson<string[]>("/about/supporters.json");
  return data;
}

/**
 * Fetches the list of contributors from the server.
 * @returns A promise that resolves to the list of contributors.
 */
export async function getContributorsList(): Promise<string[]> {
  const data = await cachedFetchJson<string[]>("/about/contributors.json");
  return data;
}

/**
 * Fetches the current version from the deployed version.json file.
 * @returns A promise that resolves to the version string.
 */
export async function getVersionJson(): Promise<string> {
  const data = await cachedFetchJson<{ version: string }>("/version.json");
  if (!data?.version) throw new Error("No version found in version.json");
  return data.version;
}
