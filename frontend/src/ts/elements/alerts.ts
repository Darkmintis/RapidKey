import * as NotificationEvent from "../observables/notification-event";
import * as Notifications from "../elements/notifications";
import { escapeHTML } from "../utils/misc";
import AnimatedModal from "../utils/animated-modal";

type State = {
  notifications: { message: string; level: number; customTitle?: string }[];
  psas: { message: string; level: number }[];
};

const state: State = {
  notifications: [],
  psas: [],
};

function hide(): void {
  setNotificationBubbleVisible(false);
  void modal.hide({
    afterAnimation: async () => {
      $("#alertsPopup .notificationHistory .list").empty();
      $("#alertsPopup .psas .list").empty();
    },
  });
}

async function show(): Promise<void> {
  void modal.show({
    beforeAnimation: async () => {
      fillNotifications();
      fillPSAs();
    },
  });
}

export function addPSA(message: string, level: number): void {
  state.psas.push({ message, level });
}

function fillPSAs(): void {
  if (state.psas.length === 0) {
    $("#alertsPopup .psas .list").html(
      `<div class="nothing">Nothing to show</div>`
    );
  } else {
    $("#alertsPopup .psas .list").empty();
    for (const p of state.psas) {
      const { message, level } = p;
      let levelClass = "";
      if (level === -1) levelClass = "error";
      else if (level === 1) levelClass = "main";
      else if (level === 0) levelClass = "sub";
      $("#alertsPopup .psas .list").prepend(`
        <div class="item">
          <div class="indicator ${levelClass}"></div>
          <div class="body">${escapeHTML(message)}</div>
        </div>
      `);
    }
  }
}

function fillNotifications(): void {
  if (state.notifications.length === 0) {
    $("#alertsPopup .notificationHistory .list").html(
      `<div class="nothing">Nothing to show</div>`
    );
  } else {
    $("#alertsPopup .notificationHistory .list").empty();
    for (const n of state.notifications) {
      const { message, level, customTitle } = n;
      let title = "Notice";
      let levelClass = "sub";
      if (level === -1) { levelClass = "error"; title = "Error"; }
      else if (level === 1) { levelClass = "main"; title = "Success"; }
      if (customTitle !== undefined) title = customTitle;
      $("#alertsPopup .notificationHistory .list").prepend(`
        <div class="item">
          <div class="indicator ${levelClass}"></div>
          <div class="title">${title}</div>
          <div class="body">${escapeHTML(message)}</div>
        </div>
      `);
    }
  }
}

export function setNotificationBubbleVisible(tf: boolean): void {
  if (tf) {
    $("header nav .showAlerts .notificationBubble").removeClass("hidden");
  } else {
    $("header nav .showAlerts .notificationBubble").addClass("hidden");
  }
}

$("header nav .showAlerts").on("click", () => {
  void show();
});

NotificationEvent.subscribe((message, level, customTitle) => {
  state.notifications.push({ message, level, customTitle });
  if (state.notifications.length > 25) state.notifications.shift();
});

const modal = new AnimatedModal({
  dialogId: "alertsPopup",
  customAnimations: {
    show: { modal: { from: { marginRight: "-10rem" }, to: { marginRight: "0" }, easing: "easeOutCirc" } },
    hide: { modal: { from: { marginRight: "0" }, to: { marginRight: "-10rem" }, easing: "easeInCirc" } },
  },
  customEscapeHandler: (): void => { hide(); },
  customWrapperClickHandler: (): void => { hide(); },
  setup: async (): Promise<void> => {
    $("#alertsPopup .mobileClose").on("click", () => { hide(); });
  },
});