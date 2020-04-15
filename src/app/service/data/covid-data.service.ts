import { map } from "rxjs/operators";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Result } from "src/app/corona/corona.component";

@Injectable({
  providedIn: "root",
})
export class CovidDataService {
  constructor(private http: HttpClient) {}

  /*  getCovidData() {
    return this.http.get<Result[]>(
      //`https://covidapi.info/api/v1/country/USA/timeseries/2020-01-15/2020-04-07`
      `https://pomber.github.io/covid19/timeseries.json`
    );
    //.pipe(map((response: Response) => response.json()));
    //.pipe(map((res: Response) => res.result.json()));
    //.pipe((map(data: any) => Object.assign(new Covid(),data));
  } */
  /* getCovidLink() {
    return sessionStorage.getItem("isCovid");
  }

  clearSession() {
    sessionStorage.removeItem("isCovid");
  } */

  getCovidData() {
    let covid = "covidLink";
    return this.http.get<Result>(
      `https://pomber.github.io/covid19/timeseries.json`
    );
    /* .pipe(
        map((data) => {
          sessionStorage.setItem("isCovid", covid);
          return data;
        }) */
  }
}
