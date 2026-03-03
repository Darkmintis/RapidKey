import * as Misc from "./utils/misc";
import * as MonkeyPower from "./elements/monkey-power";
import { loadPromise } from "./config";

$(async (): Promise<void> => {
  await loadPromise;

  //this line goes back to pretty much the beginning of the project and im pretty sure its here
  //to make sure the initial theme application doesnt animate the background color
  $("body").css("transition", "background .25s, transform .05s");

  $("#app")
    .css("opacity", "0")
    .removeClass("hidden")
    .stop(true, true)
    .animate({ opacity: 1 }, Misc.applyReducedMotion(250));

  MonkeyPower.init();

  if (Misc.isDevEnvironment()) {
    void navigator.serviceWorker
      .getRegistrations()
      .then(function (registrations) {
        for (const registration of registrations) {
          void registration.unregister();
        }
      });
  } else {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        const base = import.meta.env.BASE_URL;
        navigator.serviceWorker
          .register(`${base}sw.js`, { scope: base })
          .then((registration) => {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          })
          .catch((error: unknown) => {
            console.error("ServiceWorker registration failed: ", error);
          });
      });
    }
  }
});
