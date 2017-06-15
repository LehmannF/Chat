import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {OpenClose} from "../../shared/services/openClose/openClose.service";

@Component({
  selector: "app-chanel-button",
  templateUrl: "./chanelButton.component.html",
  styleUrls: ["./chanelButton.component.css"]
})

export class ChanelButtonComponent implements OnInit {

  @Output() display = new EventEmitter();

  public isDisplay: boolean;

  constructor(public opencloseservice: OpenClose) {
    this.isDisplay = false;
  }

  ngOnInit() {
  }

  onClick() {
    this.isDisplay = !this.isDisplay;
    this.display.emit(this.isDisplay);
  }


}
