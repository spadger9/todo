import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HelloWorldBean } from "./data/welcome-data.service";
import { map } from "rxjs/operators";
import { API_URL } from "../app.constants";

export class AuthenticationBean {
  constructor(public message: String) {}
}

@Injectable({
  providedIn: "root",
})
export class BasicAuthenticationService {
  constructor(private http: HttpClient) {}

  /*  authenticate(userName, password) {
    console.log("before " + this.isUserLoggedIn());
    if (userName === "user" && password === "password") {
      sessionStorage.setItem("authenticatedUser", userName);
      console.log("after " + this.isUserLoggedIn());
      return true;
    }
    return false;
  } */

  getAuthenticatedUser() {
    return sessionStorage.getItem("authenticatedUser");
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem("token");
    }
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("token");
    /*     sessionStorage.removeItem("isCovid"); */
  }

  executeBasicAuthenticationService(username, password) {
    console.log(`Username in service: ${username}`);
    console.log(`Password in service: ${password}`);
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password);

    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });

    return this.http
      .get<AuthenticationBean>(`${API_URL}/basicAuth`, {
        headers: header,
      })
      .pipe(
        map((data) => {
          sessionStorage.setItem("authenticatedUser", username);
          sessionStorage.setItem("token", basicAuthHeaderString);
          return data;
        })
      );
  }

  executeJWTAuthenticationService(username, password) {
    console.log(`Username in service: ${username}`);
    console.log(`Password in service: ${password}`);

    return this.http
      .post<any>(`${API_URL}/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((data) => {
          sessionStorage.setItem("authenticatedUser", username);
          sessionStorage.setItem("token", `Bearer ${data.token}`);
          return data;
        })
      );
  }

  /* createBasicAuthenticationHttpHeader() {
    let username = "user";
    let password = "password";
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password);

    console.log(`Header: ${basicAuthHeaderString}`);

    return basicAuthHeaderString;
  } */
}
