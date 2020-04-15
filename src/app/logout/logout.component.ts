import { BasicAuthenticationService } from "./../service/basic-authentication.service";
import { HardcodedAuthenticationService } from "./../service/hardcoded-authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"],
})
export class LogoutComponent implements OnInit {
  constructor(private basicAuth: BasicAuthenticationService) {}

  ngOnInit() {
    this.basicAuth.logout();
  }
}
