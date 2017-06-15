import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {OpenClose} from "../../shared/services/openClose/openClose.service";
import {MessageFormComponent} from "../message-form/message-form.component";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  private loc: any;
  private API_KEY = "6f8906905a856dfc892499ec3c7bb121";
  private city: string;
  private icon: string;
  private request_name: string;
  private currentTemp: string;
  private temp_max: string;
  private temp_min: string;
  private description: string;

  constructor(private http: Http, public openCloseService: OpenClose) {
  }

  ngOnInit(): void {
    this.request_name = MessageFormComponent.getCity();
    this.giveWeather();
  }

  giveWeather() {
    this.http.get("http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + this.request_name + "&APPID=6f8906905a856dfc892499ec3c7bb121").subscribe((test) => {
      this.currentTemp = test.json().main.temp;
      this.city = test.json().name;
      this.temp_min = test.json().main.temp_min;
      this.temp_max = test.json().main.temp_max;
      this.description = test.json().weather[0].description;
      this.icon = "http://openweathermap.org/img/w/" + test.json().weather[0].icon + ".png";
    });
    const timer = new TimerObservable(10000);
    timer.subscribe(t => {
      return this.closeWeather();
    });
    console.log("on sort à la fin");
  }

  closeWeather() {
    this.openCloseService.meteo = false;
  }
}
