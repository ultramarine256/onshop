import { Component } from "@angular/core";

@Component({
  selector: "app-home-page",
  styleUrls: ["./home-page.component.scss"],
  templateUrl: "./home-page.component.html",
})
export class HomePageComponent {
  public scrollTrigger() {
    window.scrollTo({ left: 0, top: 800, behavior: "smooth" });
  }
}
