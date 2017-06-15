import {Component, OnInit} from "@angular/core";
import {OpenClose} from "../../shared/services/openClose/openClose.service";

@Component({
  selector: "app-button-chanel-list",
  templateUrl: "./buttonChanelList.component.html",
  styleUrls: ["./buttonChanelList.component.css"]
})

export class ButtonChanelListComponent implements OnInit {

  constructor(private openCloseService: OpenClose) {

  }

  ngOnInit(): void {

  }

  public openClose() {
    this.openCloseService.chaneList = !this.openCloseService.chaneList;
  }

}
