import Page from "./page";
import * as Skeleton from "../utils/skeleton";

export const page = new Page({
  id: "about",
  element: $(".page.pageAbout"),
  path: "/about",
  afterHide: async (): Promise<void> => {
    Skeleton.remove("pageAbout");
  },
  beforeShow: async (): Promise<void> => {
    Skeleton.append("pageAbout", "main");
  },
});

$(() => {
  Skeleton.save("pageAbout");
});
