import * as TestStats from "../test/test-stats";
import * as ManualRestart from "../test/manual-restart-tracker";
import * as TestLogic from "../test/test-logic";
import Page from "./page";
import * as ModesNotice from "../elements/modes-notice";
import * as Keymap from "../elements/keymap";
import * as TestConfig from "../test/test-config";
import * as ScrollToTop from "../elements/scroll-to-top";

export const page = new Page({
  id: "test",
  element: $(".page.pageTest"),
  path: "/",
  beforeHide: async (): Promise<void> => {
    $("#wordsInput").trigger("focusout");
  },
  afterHide: async (): Promise<void> => {
    ManualRestart.set();
    TestLogic.restart({
      noAnim: true,
    });
    void ModesNotice.update();
  },
  beforeShow: async (): Promise<void> => {
    TestStats.resetIncomplete();
    ManualRestart.set();
    TestLogic.restart({
      noAnim: true,
    });
    void TestConfig.instantUpdate();
    void Keymap.refresh();
    ScrollToTop.hide();
  },
});
