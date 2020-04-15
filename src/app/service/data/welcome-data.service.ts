// import { Covid } from "./../../welcome/welcome.component";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "src/app/app.constants";

export class HelloWorldBean {
  constructor(public message: String) {}
}

@Injectable({
  providedIn: "root",
})
export class WelcomeDataService {
  constructor(private http: HttpClient) {}

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`);
    //console.log("Execute Hello World Bean");
  }

  executeWithParam(name) {
    /* let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    }); */

    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean/${name}`);
  }

  /*  createBasicAuthenticationHttpHeader() {
    let username = "user";
    let password = "password";
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password);

    console.log(`Header: ${basicAuthHeaderString}`);

    return basicAuthHeaderString;
  } */
}
