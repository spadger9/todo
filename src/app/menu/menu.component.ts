import { BasicAuthenticationService } from "./../service/basic-authentication.service";
import { HardcodedAuthenticationService } from "./../service/hardcoded-authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  authorizedUser: String;

  constructor(
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    public basicAuth: BasicAuthenticationService
  ) {}

  ngOnInit() {
    this.authorizedUser = this.basicAuth.getAuthenticatedUser();
    //this.isUserLoggedIn = authUser ? true : false;
    /* if (authUser) {
      this.isUserLoggedIn = true;
    } */
  }
}
