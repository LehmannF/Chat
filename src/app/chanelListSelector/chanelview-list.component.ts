import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ChanelService} from "../../shared/services/chanel/chanel.service";
@Component({
  selector: "app-chanelview-list",
  templateUrl: "./chanelview-list.html",
  styleUrls: ["./chanelview-list.css"]
})

export class ChanelViewListComponent implements OnInit {

  @Output() notifyParent = new EventEmitter();

  ngOnInit() {
    this.chanelService.init();
  }

  constructor(public chanelService: ChanelService) {
  }

  notified(event: string) {
    this.notifyParent.emit(event);
  }

}
