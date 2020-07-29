import { Component } from "@angular/core";
import { SmoothScroll } from "../../extensions";
import { SCROLL_ANCHORS } from "../../constants";

@Component({
  selector: "app-header-component",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  public SCROLL_ANCHORS = SCROLL_ANCHORS;

  constructor() {}

  scrollTo(anchor: string) {
    SmoothScroll.doScrolling(`#${anchor}`, 1000);
  }
}
