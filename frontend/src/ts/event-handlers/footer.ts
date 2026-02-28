import Config, * as UpdateConfig from "../config";
import * as Notifications from "../elements/notifications";
import * as Commandline from "../commandline/commandline";
import * as ContactModal from "../modals/contact";
import { envConfig } from "../constants/env-config";

document
  .querySelector("footer #commandLineMobileButton")
  ?.addEventListener("click", async () => {
    Commandline.show({
      singleListOverride: false,
    });
  });

document
  .querySelector("footer #newVersionIndicator")
  ?.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelector("#newVersionIndicator")?.classList.add("hidden");
  });

document
  .querySelector("footer .currentVersion")
  ?.addEventListener("click", (e) => {
    const event = e as MouseEvent;
    if (event.shiftKey) {
      alert(JSON.stringify({ clientVersion: envConfig.clientVersion }, null, 2));
    }
  });

document
  .querySelector("footer .right .current-theme")
  ?.addEventListener("click", async (event) => {
    const e = event as MouseEvent;
    if (e.shiftKey) {
      if (Config.customTheme) {
        UpdateConfig.setCustomTheme(false);
        return;
      }
      Notifications.add("No custom themes!", 0);
      UpdateConfig.setCustomTheme(false);
    } else {
      const subgroup = Config.customTheme ? "customThemesList" : "themes";
      Commandline.show({
        subgroupOverride: subgroup,
      });
    }
  });

document
  .querySelector("footer #contactPopupButton")
  ?.addEventListener("click", () => {
    ContactModal.show();
  });
