// this file should be concatenated at the top of the legacy ts files
import "jquery-color";
import "jquery.easing";

import "./event-handlers/global";
import "./event-handlers/footer";
import "./event-handlers/keymap";
import "./event-handlers/test";
import "./event-handlers/about";
import "./event-handlers/settings";

import Config, { loadFromLocalStorage } from "./config";
import * as TestStats from "./test/test-stats";
import * as TestTimer from "./test/test-timer";
import * as Result from "./test/result";
import { enable } from "./states/glarses-mode";
import "./test/caps-warning";
import "./controllers/input-controller";
import "./ready";
import "./controllers/route-controller";
import "./pages/about";
import "./elements/scroll-to-top";
import "./elements/no-css";
import "./elements/fps-counter";
import "./ui";
import { isDevEnvironment, addToGlobal } from "./utils/misc";
import * as VersionButton from "./elements/version-button";
import * as Focus from "./test/focus";
import { getDevOptionsModal } from "./utils/async-modules";
import * as Cookies from "./cookies";
import "./utils/url-handler";

// Lock Math.random
Object.defineProperty(Math, "random", {
  value: Math.random,
  writable: false,
  configurable: false,
  enumerable: true,
});

// Freeze Math object
Object.freeze(Math);

// Lock Math on window
Object.defineProperty(window, "Math", {
  value: Math,
  writable: false,
  configurable: false,
  enumerable: true,
});

void loadFromLocalStorage();
void VersionButton.update();
Focus.set(true, true);

const accepted = Cookies.getAcceptedCookies();
if (accepted === null) {
  // Auto-accept cookies since we removed all analytics/Firebase
  Cookies.setAcceptedCookies({ security: true, analytics: false });
}
Cookies.activateWhatsAccepted();

addToGlobal({
  config: Config,
  glarsesMode: enable,
  stats: TestStats.getStats,
  enableTimerDebug: TestTimer.enableTimerDebug,
  getTimerStats: TestTimer.getTimerStats,
  toggleSmoothedBurst: Result.toggleSmoothedBurst,
});

if (isDevEnvironment()) {
  void import("jquery").then((jq) => {
    addToGlobal({ $: jq.default });
  });
  void getDevOptionsModal().then((module) => {
    module.appendButton();
  });
}
