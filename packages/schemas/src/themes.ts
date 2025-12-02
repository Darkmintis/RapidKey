import { z } from "zod";
import { customEnumErrorHandler } from "./util";

export const ThemeNameSchema = z.enum(
  [
    "catppuccin",
    "dark",
    "dracula",
    "gruvbox_dark",
    "midnight",
    "monokai",
    "nord",
    "serika",
    "serika_dark",
    "solarized_dark",
    "solarized_light",
    "terminal",
  ],
  {
    errorMap: customEnumErrorHandler("Must be a known theme"),
  }
);
