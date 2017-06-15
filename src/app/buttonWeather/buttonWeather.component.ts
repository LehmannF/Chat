import {Component, OnInit} from "@angular/core";
import {OpenClose} from "../../shared/services/openClose/openClose.service";

@Component({
  selector: "app-button-weather",
  templateUrl: "./buttonWeather.component.html",
  styleUrls: ["./buttonWeather.component.css"]
})

export class ButtonWeatherComponent implements OnInit {

  constructor(private openCloseService: OpenClose) { }

  public openClose() {
    this.openCloseService.meteo = !this.openCloseService.meteo;
  }

  ngOnInit(): void { }

}
