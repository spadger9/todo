import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  //Activated Route
  activeUsername = "";
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.activeUsername = this.route.snapshot.params["name"];
  }
}
