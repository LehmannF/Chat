import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MessageService} from "../../shared/services";
import {ChanelModel} from "../../shared/models/ChanelModel";
import {ChannelListComponent} from "../chanelSelector/channel-list.component";


@Component({
  selector: "app-chanel-form",
  templateUrl: "./chanel-form.component.html",
  styleUrls: ["./chanel-form.component.css"]
})
export class ChanelFormComponent extends ChannelListComponent implements OnInit {
  @Input() chanel: ChanelModel;
  @Output() notifyParent = new EventEmitter();

  ngOnInit() { }

  constructor(protected messageService: MessageService) {
    super(messageService);
  }

  giveChannelCustom() {
    this.messageService.page = 0;
    this.route = "" + this.chanel.id;
    this.notifyParent.emit(this.route);
    this.giveChannel();
  }
}
