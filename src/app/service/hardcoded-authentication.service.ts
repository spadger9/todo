import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HardcodedAuthenticationService {
  constructor() {}

  authenticate(userName, password) {
    console.log("before " + this.isUserLoggedIn());
    if (userName === "shrawin" && password === "yourock") {
      sessionStorage.setItem("authenticateUser", userName);
      console.log("after " + this.isUserLoggedIn());
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticateUser");
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem("authenticateUser");
  }
}
