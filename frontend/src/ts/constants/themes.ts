import { ThemeName } from "@rapidkey/schemas/configs";
import { hexToHSL } from "../utils/colors";

export type Theme = {
  name: ThemeName;
  bgColor: string;
  mainColor: string;
  subColor: string;
  textColor: string;
};

export const themes: Record<ThemeName, Omit<Theme, "name">> = {
  catppuccin: {
    bgColor: "#1e1e2e",
    mainColor: "#cba6f7",
    subColor: "#7f849c",
    textColor: "#cdd6f4",
  },
  dark: {
    bgColor: "#111",
    mainColor: "#eee",
    subColor: "#444",
    textColor: "#eee",
  },
  dracula: {
    bgColor: "#282a36",
    mainColor: "#bd93f9",
    subColor: "#6272a4",
    textColor: "#f8f8f2",
  },
  gruvbox_dark: {
    bgColor: "#282828",
    mainColor: "#d79921",
    subColor: "#665c54",
    textColor: "#ebdbb2",
  },
  midnight: {
    bgColor: "#0b0e13",
    mainColor: "#60759f",
    subColor: "#394760",
    textColor: "#9fadc6",
  },
  monokai: {
    bgColor: "#272822",
    mainColor: "#a6e22e",
    subColor: "#e6db74",
    textColor: "#e2e2dc",
  },
  nord: {
    bgColor: "#242933",
    mainColor: "#88C0D0",
    subColor: "#2E3440",
    textColor: "#88C0D0",
  },
  serika: {
    bgColor: "#e1e1e3",
    mainColor: "#e2b714",
    subColor: "#aaaeb3",
    textColor: "#323437",
  },
  serika_dark: {
    bgColor: "#323437",
    mainColor: "#e2b714",
    subColor: "#646669",
    textColor: "#d1d0c5",
  },
  solarized_dark: {
    bgColor: "#002b36",
    mainColor: "#859900",
    subColor: "#2aa198",
    textColor: "#268bd2",
  },
  solarized_light: {
    bgColor: "#fdf6e3",
    mainColor: "#859900",
    subColor: "#2aa198",
    textColor: "#181819",
  },
  terminal: {
    bgColor: "#191a1b",
    mainColor: "#79a617",
    subColor: "#48494b",
    textColor: "#e7eae0",
  },
};

export const ThemesList: Theme[] = Object.keys(themes)
  .sort()
  .map(
    (it) =>
      ({
        ...themes[it as ThemeName],
        name: it,
      } as Theme)
  );

export const ThemesListSorted = [
  ...ThemesList.sort((a, b) => {
    const b1 = hexToHSL(a.bgColor);
    const b2 = hexToHSL(b.bgColor);
    return b2.lgt - b1.lgt;
  }),
];
