import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MessageModel} from "../../shared/models/MessageModel";
import {MessageService} from "../../shared/services/message/message.service";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.html",
  styleUrls: ["./channel-list.css"]
})
export class ChannelListComponent implements OnInit {

  protected route: string;

  public messageList: MessageModel[];

  @Output() notifyParent = new EventEmitter();

  constructor(protected messageService: MessageService) { }

  giveChannel() {
    this.route += "/messages";
    this.messageService.getMessages(this.route);
    this.messageService.messageList$.subscribe((messages) => this.messageList = messages);
    console.log(this.route);
    this.notifyParent.emit(this.route);
    this.route = "";
  }

  ngOnInit() { }
}
