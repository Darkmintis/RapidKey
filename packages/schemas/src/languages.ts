import { z } from "zod";
import { customEnumErrorHandler } from "./util";

export const LanguageSchema = z.enum(
  [
    "english",
    "spanish",
    "french", 
    "german",
    "portuguese",
    "chinese_simplified",
    "japanese_romaji",
  ],
  {
    errorMap: customEnumErrorHandler("Must be a supported language"),
  }
);

export type Language = z.infer<typeof LanguageSchema>;

export const LanguageObjectSchema = z
  .object({
    name: LanguageSchema,
    rightToLeft: z.boolean().optional(),
    noLazyMode: z.boolean().optional(),
    ligatures: z.boolean().optional(),
    orderedByFrequency: z.boolean().optional(),
    words: z.array(z.string()).min(1),
    additionalAccents: z
      .array(z.tuple([z.string().min(1), z.string().min(1)]))
      .optional(),
    bcp47: z.string().optional(),
    originalPunctuation: z.boolean().optional(),
  })
  .strict();
export type LanguageObject = z.infer<typeof LanguageObjectSchema>;
