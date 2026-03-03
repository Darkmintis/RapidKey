import { z } from "zod";
import { customEnumErrorHandler } from "./util";

const KnownFontNameSchema = z.enum(
  [
    "Roboto_Mono",
    "Source_Code_Pro",
    "IBM_Plex_Sans",
    "Inconsolata",
    "Fira_Code",
    "JetBrains_Mono",
    "Roboto",
    "Montserrat",
    "Titillium_Web",
    "Lexend_Deca",
    "Oxygen",
    "Nunito",
    "Atkinson_Hyperlegible",
    "Lato",
    "Open_Dyslexic",
    "Ubuntu",
    "Ubuntu_Mono",
    "Cascadia_Mono",
    "IBM_Plex_Mono",
    "Geist",
    "Geist_Mono",
    "Iosevka",
  ],
  {
    errorMap: customEnumErrorHandler("Must be a known font family"),
  }
);
export type KnownFontName = z.infer<typeof KnownFontNameSchema>;

export const FontNameSchema = KnownFontNameSchema.or(
  z
    .string()
    .max(50)
    .regex(/^[a-zA-Z0-9_\-+.]+$/)
);
export type FontName = z.infer<typeof FontNameSchema>;
