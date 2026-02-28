type Config = {
  isDevelopment: boolean;
  clientVersion: string;
};

// @ts-expect-error replaced by vite
const isDevelopment = IS_DEVELOPMENT;
// @ts-expect-error replaced by vite
const clientVersion = CLIENT_VERSION;

export const envConfig: Config = {
  isDevelopment,
  clientVersion,
};
