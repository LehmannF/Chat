import {Component, Input, OnInit} from "@angular/core";

import { MessageService } from "../../../shared/services";
import { MessageModel } from "../../../shared/models/MessageModel";
import {Observable} from "rxjs/Rx";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {

  public messageList: MessageModel[];
  private route: string;
  public page: number;
  @Input() myRoute: string;

  constructor(private messageService: MessageService) {
    this.route = "861/messages";
    this.messageList = [];
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Le composant MessageComponent prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   * En general, l'utilisation des services dans le NgOnInit est une bonne practice. Le constructeur ne doit servir qu'à
   * l'initialisation simple des variables. Pour plus d'information sur le ngOnInit, il y a un lien dans le README.
   */
  ngOnInit() {
    this.messageService.getMessages(this.route);
///this.messageService.messageList$.subscribe((messages) => {this.messageList = messages; this.sort(); });

    this.messageService.messageList$.subscribe((messages) =>  { if (true) {
      this.messageList = messages;
      this.sort();
    }});
   /* const updateTimer = Observable.interval(2000);
    updateTimer.subscribe(t => this.messageService.getMessages(this.myRoute));
    */
  }

  sort() {
    const messageListTemp: MessageModel[] = [];
    for (let i = this.messageList.length - 1; i >= 0; i--) {
      messageListTemp.push(this.messageList[i]);
    }
    this.messageList = messageListTemp;
  }

  unsort(): MessageModel[] {
    const messageListTemp: MessageModel[] = [];
    for (let i = this.messageList.length - 1; i >= 0; i--) {
      messageListTemp.push(this.messageList[i]);
    }
    return messageListTemp;
  }

  update(messages: MessageModel[]) {
    const messageListTemp = this.unsort();
    if (messageListTemp.length === 0) {
      console.log("UPDATE1");

      return true;
    }
    console.log("UPDATE3");
    for (let i = 0; i < messageListTemp.length; i++) {
      if (messageListTemp[i].content !== messages[i].content ) {
        console.log("UPDATE2");
        console.log(messageListTemp[i].content + "  "  +  messages[i].content);
        return true;
      }

    }
    return false;

  }

}
