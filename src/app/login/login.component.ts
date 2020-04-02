import { HardcodedAuthenticationService } from "./../service/hardcoded-authentication.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userName = "shrawin";
  password = "";
  errorMessage = "Invalid credentials";
  invalidLogin = false;

  constructor(
    private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService
  ) {}

  ngOnInit() {}

  handleLogin() {
    if (
      this.hardcodedAuthenticationService.authenticate(
        this.userName,
        this.password
      )
    ) {
      this.router.navigate(["welcome", this.userName]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }

    // console.log(this.userName);
    // console.log(this.password);
  }
}
