import { BasicAuthenticationService } from "./../service/basic-authentication.service";
import { element } from "protractor";
import { map } from "rxjs/operators";
import { CovidDataService } from "./../service/data/covid-data.service";
import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { forEach } from "@angular/router/src/utils/collection";

export interface Result extends Records {
  country: {
    data: {
      Records: [];
    };
  };
}

export interface Records {
  date: Date;
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface ModifiedRecords {
  country: string;
  date: Date;
  confirmed: number;
  deaths: number;
  recovered: number;
}

@Component({
  selector: "app-corona",
  templateUrl: "./corona.component.html",
  styleUrls: ["./corona.component.css"],
})
export class CoronaComponent implements OnInit {
  country;
  load: boolean;
  startDay;
  randomArray;
  covid: Result;
  modified: ModifiedRecords[];
  totalDeaths: number;
  totalActiveCases: number;
  totalRecoveries: number;
  cList;
  dailyValues: boolean = false;
  buttonName: string = "Show Daily";
  len: number;
  tot: number;
  constructor(
    private covidDataService: CovidDataService,
    private basicAuth: BasicAuthenticationService
  ) {}

  ngOnInit() {
    this.dataRefresh();
    //  this.covidDataService.clearSession();
    this.basicAuth.logout();
  }

  dataRefresh() {
    this.covidDataService.getCovidData().subscribe(
      (response) => {
        this.covid = response;
        console.log(`Covid obj: ${this.covid}`);
        //this.covid.country = Object.keys(this.covid);
        //this.randomArray = this.covid.country;
        this.randomArray = Object.keys(this.covid);
        console.log(`Covid object here: ${this.covid}`);

        let arr = [];
        arr = this.covid[this.randomArray[0]];
        this.tot = arr.length - 1;
      },
      (error) => console.log(`Error encountered during fetch: ${error}`)
    );
  }

  reset() {
    this.load = false;
  }

  getCovidData(country) {
    if (this.country === undefined || this.country === null) {
      this.country = this.randomArray[0];
    }

    this.cList = this.covid[this.country];

    (this.startDay = "Jan 22, 2020"), (this.load = true);

    this.getDeaths(this.cList);
    this.getActiveCases(this.cList);
    this.getRecoveries(this.cList);
  }

  showDaily() {
    this.dailyValues = !this.dailyValues;

    if (this.dailyValues) {
      this.buttonName = "Hide Daily";
    } else {
      this.buttonName = "Show Daily";
    }
  }

  getActiveCases(cList: any) {
    this.len = this.cList.length - 1;
    let confirmed = this.cList[this.len].confirmed;

    this.totalActiveCases = confirmed - this.cList[this.len].recovered;
  }
  getDeaths(cList: any) {
    this.len = this.cList.length - 1;

    this.totalDeaths = this.cList[this.len].deaths;
  }
  getRecoveries(cList: any) {
    this.len = this.cList.length - 1;

    this.totalRecoveries = this.cList[this.len].recovered;
  }
}
