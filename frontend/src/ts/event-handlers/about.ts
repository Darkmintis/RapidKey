import * as ContactModal from "../modals/contact";

document
  .querySelector("#pageAbout #contactPopupButton2")
  ?.addEventListener("click", () => {
    ContactModal.show();
  });
