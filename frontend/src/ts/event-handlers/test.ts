import * as Commandline from "../commandline/commandline";
import * as CustomWordAmount from "../modals/custom-word-amount";
import Config from "../config";
import * as MobileTestConfigModal from "../modals/mobile-test-config";
import * as CustomTestDurationModal from "../modals/custom-test-duration";
import * as Notifications from "../elements/notifications";
import * as CustomTextModal from "../modals/custom-text";
import * as PractiseWordsModal from "../modals/practise-words";
import * as ShareTestSettingsPopup from "../modals/share-test-settings";

$(".pageTest").on("click", "#testModesNotice .textButton", async (event) => {
  const attr = $(event.currentTarget).attr("commands");
  if (attr === undefined) return;
  Commandline.show({ subgroupOverride: attr });
});

$(".pageTest").on("click", "#testModesNotice .textButton", async (event) => {
  const attr = $(event.currentTarget).attr("commandId");
  if (attr === undefined) return;
  Commandline.show({ commandOverride: attr });
});

$(".pageTest").on("click", "#testConfig .wordCount .textButton", (e) => {
  const wrd = $(e.currentTarget).attr("wordCount");
  if (wrd === "custom") {
    CustomWordAmount.show();
  }
});

$(".pageTest").on("click", "#testConfig .time .textButton", (e) => {
  const time = $(e.currentTarget).attr("timeconfig");
  if (time === "custom") {
    CustomTestDurationModal.show();
  }
});

$(".pageTest").on("click", "#testConfig .shareButton", (e) => {
  ShareTestSettingsPopup.show();
});

$(".pageTest").on("click", "#mobileTestConfigButton", () => {
  MobileTestConfigModal.show();
});

$(".pageTest").on("click", "#testConfig .customText .textButton", () => {
  CustomTextModal.show();
});

$(".pageTest").on("click", "#practiseWordsButton", () => {
  if (Config.mode === "zen") {
    Notifications.add("Practice words is unsupported in zen mode", 0);
    return;
  }
  PractiseWordsModal.show();
});
