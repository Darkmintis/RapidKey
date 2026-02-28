import AnimatedModal from "../utils/animated-modal";
import * as Notifications from "../elements/notifications";
import { setMediaQueryDebugLevel } from "../ui";
import * as Loader from "../elements/loader";
import { toggleUserFakeChartData } from "../test/result";
import { toggleCaretDebug } from "../utils/caret";

let mediaQueryDebugLevel = 0;

export function show(): void {
  void modal.show();
}

async function setup(modalEl: HTMLElement): Promise<void> {
  modalEl
    .querySelector(".showTestNotifications")
    ?.addEventListener("click", () => {
      Notifications.add("This is a test", 1, { duration: 0 });
      Notifications.add("This is a test", 0, { duration: 0 });
      Notifications.add("This is a test", -1, { duration: 0 });
      void modal.hide();
    });
  modalEl
    .querySelector(".toggleMediaQueryDebug")
    ?.addEventListener("click", () => {
      mediaQueryDebugLevel++;
      if (mediaQueryDebugLevel > 3) mediaQueryDebugLevel = 0;
      Notifications.add(
        `Setting media query debug level to ${mediaQueryDebugLevel}`,
        5
      );
      setMediaQueryDebugLevel(mediaQueryDebugLevel);
    });
  modalEl
    .querySelector(".showRealWordsInput")
    ?.addEventListener("click", () => {
      $("#wordsInput").css("opacity", "1");
      void modal.hide();
    });
  modalEl
    .querySelector(".toggleFakeChartData")
    ?.addEventListener("click", () => {
      toggleUserFakeChartData();
    });
  modalEl.querySelector(".toggleCaretDebug")?.addEventListener("click", () => {
    toggleCaretDebug();
  });

  void Loader; // suppress unused warning
}

const modal = new AnimatedModal({
  dialogId: "devOptionsModal",
  setup,
});

export function appendButton(): void {
  $(`<div id="devButtons">
      <button class='button showDevOptionsModal' aria-label="Dev options" data-balloon-pos="right"><i class="fas fa-fw fa-flask"></i></button>
    </div>`).prependTo("body");
  document
    .querySelector("#devButtons .button.showDevOptionsModal")
    ?.addEventListener("click", () => {
      show();
    });
}
