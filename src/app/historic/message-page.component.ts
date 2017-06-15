import {Component, OnInit, Input} from "@angular/core";

import {MessageService} from "../../shared/services";

@Component({
  selector: "app-message-page",
  templateUrl: "./message-page.component.html",
  styleUrls: ["./message-page.component.css"]
})

export class MessagePageComponent implements OnInit {

  public page: number;

  @Input() public route: string;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  getMessagesFrom() {
    this.messageService.getMessagesFrom(this.route, this.page);
  }

}
