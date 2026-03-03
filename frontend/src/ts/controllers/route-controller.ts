import * as PageController from "./page-controller";
import * as TestUI from "../test/test-ui";
import * as PageTransition from "../states/page-transition";
import * as TestState from "../test/test-state";
import { LoadingOptions } from "../pages/page";


// Vite base path e.g. "/RapidKey/" in production, "/" in dev
const base = import.meta.env.BASE_URL;

/** Strip the base prefix from location.pathname so routes match "/", "/about" etc. */
function stripBase(pathname: string): string {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  if (b === "" || !pathname.startsWith(b)) return pathname || "/";
  return pathname.slice(b.length) || "/";
}

/** Convert an internal route path ("/about") to its base-prefixed form ("/RapidKey/about"). */
function withBase(path: string): string {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  if (path === "/") return base;
  return b + path;
}

type NavigateOptions = {
  force?: boolean;
  empty?: boolean;
  data?: unknown;
  loadingOptions?: LoadingOptions;
};

function pathToRegex(path: string): RegExp {
  return new RegExp(
    "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
  );
}

function getParams(match: {
  route: Route;
  result: RegExpMatchArray;
}): Record<string, string> {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  const a = keys.map((key, index) => [key, values[index]]);
  return Object.fromEntries(a) as Record<string, string>;
}

type Route = {
  path: string;
  load: (
    params: Record<string, string>,
    navigateOptions: NavigateOptions
  ) => Promise<void>;
};

const route404: Route = {
  path: "404",
  load: async () => {
    await PageController.change("404");
  },
};

const routes: Route[] = [
  {
    path: "/",
    load: async (_params, options) => {
      await PageController.change("test", options);
    },
  },
  {
    path: "/about",
    load: async (_params, options) => {
      await PageController.change("about", options);
    },
  },
  {
    path: "/settings",
    load: async (_params, options) => {
      await PageController.change("settings", options);
    },
  },
];

export async function navigate(
  url = window.location.pathname +
    window.location.search +
    window.location.hash,
  options = {} as NavigateOptions
): Promise<void> {
  if (
    !options.force &&
    (TestState.testRestarting ||
      TestUI.resultCalculating ||
      PageTransition.get())
  ) {
    console.debug(
      `navigate: ${url} ignored, page is busy (testRestarting: ${
        TestState.testRestarting
      }, resultCalculating: ${
        TestUI.resultCalculating
      }, pageTransition: ${PageTransition.get()})`
    );
    return;
  }

  // For absolute URLs (from [router-link] clicks), use as-is.
  // For internal paths like "/about", prepend the Vite base.
  let pushUrl: string;
  if (url.startsWith("http") || url.startsWith("//")) {
    pushUrl = url;
  } else {
    const stripped = stripBase(url.replace(/\/$/, "") || "/");
    pushUrl = withBase(stripped);
  }

  const currentUrl = new URL(window.location.href);
  const targetUrl = new URL(pushUrl, window.location.origin);

  if (
    currentUrl.pathname + currentUrl.search + currentUrl.hash !==
    targetUrl.pathname + targetUrl.search + targetUrl.hash
  ) {
    history.pushState(null, "", pushUrl);
  }

  await router(options);
}

async function router(options = {} as NavigateOptions): Promise<void> {
  // Strip the Vite base prefix before matching routes
  const relativePath = stripBase(location.pathname);

  const matches = routes.map((r) => {
    return {
      route: r,
      result: relativePath.match(pathToRegex(r.path)),
    };
  });

  const match = matches.find((m) => m.result !== null) as {
    route: Route;
    result: RegExpMatchArray;
  };

  if (match === undefined) {
    await route404.load({}, {});
    return;
  }

  await match.route.load(getParams(match), options);
}

window.addEventListener("popstate", () => {
  void router();
});

// Modules are deferred — DOMContentLoaded may have already fired by the time
// this code runs, so guard against both cases.
function setupRouterLinks(): void {
  document.body.addEventListener("click", (e) => {
    const anchor = (e.target as Element).closest<HTMLAnchorElement>("[router-link]");
    if (anchor?.href) {
      e.preventDefault();
      void navigate(anchor.href);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupRouterLinks);
} else {
  setupRouterLinks();
}

// Trigger the initial page render on first load.
void router();
