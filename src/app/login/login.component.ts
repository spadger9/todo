import { BasicAuthenticationService } from "./../service/basic-authentication.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userName = "in28minutes";
  password = "";
  errorMessage = "Invalid credentials";
  invalidLogin = false;

  constructor(
    private router: Router,
    private basicAuthService: BasicAuthenticationService
  ) {}

  ngOnInit() {}

  handleBasicAuthLogin() {
    this.basicAuthService
      .executeBasicAuthenticationService(this.userName, this.password)
      .subscribe(
        (data) => {
          console.log(data),
            this.router.navigate(["welcome", this.userName]),
            (this.invalidLogin = false);
        },

        (error) => {
          console.log(`Error loggin in: ${error} `), (this.invalidLogin = true);
        }
      );
  }

  handleJWTAuthLogin() {
    this.basicAuthService
      .executeJWTAuthenticationService(this.userName, this.password)
      .subscribe(
        (data) => {
          console.log(data),
            this.router.navigate(["welcome", this.userName]),
            (this.invalidLogin = false);
        },

        (error) => {
          console.log(`Error loggin in: ${error} `), (this.invalidLogin = true);
        }
      );
  }
}
