import { CovidDataService } from "./../data/covid-data.service";
import { BasicAuthenticationService } from "./../basic-authentication.service";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { request } from "http";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private basicAuth: BasicAuthenticationService,
    private covidDataService: CovidDataService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let basicAuthHeaderString = this.basicAuth.getAuthenticatedToken();
    let userName = this.basicAuth.getAuthenticatedUser();

    // console.log(`Header: ${basicAuthHeaderString}`);
    // console.log(`USER: ${userName}`);

    if (req.url.includes("pomber.github.io")) {
      req = req;
    }
    if (basicAuthHeaderString && userName) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString,
        },
      });
    }

    // request = this.addAuthenticationToken(request);

    return next.handle(req);
  }

  addAuthenticationToken(req: HttpRequest<any>) {
    let basicAuthHeaderString = this.basicAuth.getAuthenticatedToken();
    let userName = this.basicAuth.getAuthenticatedUser();

    if (req.url.includes("pomber.github.io")) {
      return req;
    } else if (basicAuthHeaderString && userName) {
      return req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString,
        },
      });
    }
  }
}
