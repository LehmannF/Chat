import { Component, OnInit } from "@angular/core";
import {Logout} from "../../shared/services/logout/logout.service";

@Component({
  selector: "app-bar",
  templateUrl: "./bar.component.html",
  styleUrls: ["./bar.component.css"]
})

export class BarComponent implements OnInit {



  constructor(private logout: Logout) {

  }

  ngOnInit() {

  }

  createChannel() {

  }

  logOut() {
    this.logout.logout();
  }

  onClickChat() {
  }
}
