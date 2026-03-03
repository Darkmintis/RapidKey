import { KnownFontName } from "@rapidkey/schemas/fonts";

export type FontConfig = {
  display?: string;
  weight?: number;
} & (
  | {
      systemFont: true;
      fileName?: never;
    }
  | {
      systemFont?: never;
      fileName: string;
    }
);

export const Fonts: Record<KnownFontName, FontConfig> = {
  Roboto_Mono: {
    fileName: "RobotoMono-Regular.woff2",
  },
  Source_Code_Pro: {
    fileName: "SourceCodePro-Regular.woff2",
  },
  IBM_Plex_Sans: {
    fileName: "IBMPlexSans-SemiBold.woff2",
    weight: 600,
  },
  Inconsolata: {
    fileName: "Inconsolata-Regular.woff2",
  },
  Fira_Code: {
    fileName: "FiraCode-Regular.woff2",
  },
  JetBrains_Mono: {
    fileName: "JetBrainsMono-Regular.woff2",
  },
  Roboto: {
    fileName: "Roboto-Regular.woff2",
  },
  Montserrat: {
    fileName: "Montserrat-Regular.woff2",
  },
  Titillium_Web: {
    fileName: "TitilliumWeb-Regular.woff2",
  },
  Lexend_Deca: {
    fileName: "LexendDeca-Regular.woff2",
  },
  Oxygen: {
    fileName: "Oxygen-Regular.woff2",
  },
  Nunito: {
    fileName: "Nunito-Bold.woff2",
    weight: 700,
  },
  Atkinson_Hyperlegible: {
    fileName: "AtkinsonHyperlegible-Regular.woff2",
  },
  Lato: {
    fileName: "Lato-Regular.woff2",
  },
  Open_Dyslexic: {
    fileName: "OpenDyslexic-Regular.woff2",
  },
  Ubuntu: {
    fileName: "Ubuntu-Regular.woff2",
  },
  Ubuntu_Mono: {
    fileName: "UbuntuMono-Regular.woff2",
  },
  Cascadia_Mono: {
    fileName: "CascadiaMono-Regular.woff2",
  },
  IBM_Plex_Mono: {
    fileName: "IBMPlexMono-Regular.woff2",
  },
  Geist: {
    fileName: "Geist-Medium.woff2",
  },
  Geist_Mono: {
    fileName: "GeistMono-Medium.woff2",
  },
  Iosevka: {
    fileName: "Iosevka-Regular.woff2",
  },
};
