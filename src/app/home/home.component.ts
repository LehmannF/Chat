import { Component, OnInit } from "@angular/core";
import {Observable} from "rxjs/Observable";
import {OpenClose} from "../../shared/services/openClose/openClose.service";
import {Logout} from "../../shared/services/logout/logout.service";

@Component({
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})

export class HomeComponent {

  public title: string;

  public notifChild: string;

  public createChanelDisplay: boolean;

  constructor(public openCloseService: OpenClose, private logout: Logout) {
    this.title = "Base Chanel";
    this.createChanelDisplay = false;
    Observable.create();
  }

  printChanelCreation(isDisplay) {
    this.createChanelDisplay = isDisplay;
  }

  logOut() {
    this.logout.logout();
  }

  notified(event: string) {
    this.notifChild = event;
    this.title = "Chanel " + this.notifChild.substring(0, this.notifChild.indexOf("/"));
  }

}
