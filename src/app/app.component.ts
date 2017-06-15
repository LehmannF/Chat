import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  public title: string;

  public notifChild: string;

  public createChanelDisplay: boolean;

  constructor() {
    this.title = "Base Chanel";
    this.createChanelDisplay = false;
    Observable.create();
  }

  printChanelCreation(isDisplay) {
    this.createChanelDisplay = isDisplay;
  }

  notified(event: string) {
    this.notifChild = event;
    this.title = "Chanel " + this.notifChild.substring(0, this.notifChild.indexOf("/"));
  }
}
