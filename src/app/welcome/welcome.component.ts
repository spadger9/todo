import { CovidDataService } from "./../service/data/covid-data.service";
import { WelcomeDataService } from "./../service/data/welcome-data.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
})
export class WelcomeComponent implements OnInit {
  welcomeMessage;

  activeUsername = "";
  playData: any;
  constructor(
    private route: ActivatedRoute,
    private welcomeDataService: WelcomeDataService,
    private covidDataService: CovidDataService
  ) {}

  ngOnInit() {
    this.activeUsername = this.route.snapshot.params["name"];
  }

  /* getWelcomeMessage() {
    //console.log("You are welcomed.");
    //console.log(this.welcomeDataService.executeHelloWorldBeanService());

    this.welcomeDataService.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessResponse(response),
      error => this.handleError(error)
    );

    console.log("Last line of getWelcomeMessage");
  } */

  getWelcomeWithParams() {
    this.welcomeDataService.executeWithParam(this.activeUsername).subscribe(
      (response) => this.handleSuccessResponse(response),
      (error) => this.handleError(error)
    );
  }

  handleSuccessResponse(response) {
    this.welcomeMessage = response.message;
  }

  handleError(error) {
    this.welcomeMessage =
      error.error.message + " at time " + error.error.timestamp;
  }
}
