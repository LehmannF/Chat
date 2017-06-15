import {Component, OnInit} from "@angular/core";

import {ChanelModel} from "../../shared/models/ChanelModel";

import {ChanelService} from "../../shared/services/chanel/chanel.service";

@Component({
  selector: "app-channel",
  templateUrl: "./chanel.component.html",
  styleUrls: ["./chanel.component.css"]
})

export class ChanelComponent implements OnInit {

  public chanel: ChanelModel;

  public created: string;

  constructor(private chanelService: ChanelService) {
    this.chanel = new ChanelModel(undefined, "Nom du chanel");
    this.created = "";
  }

  ngOnInit() {  }

  createChannel() {
    this.created = "Thread créé";
    const newChanel = new ChanelModel(undefined, this.chanel.name);
    this.chanel = new ChanelModel(undefined, "");
    this.chanelService.createChannel(newChanel);
  }
}
