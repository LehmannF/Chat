
import { MessageModel } from "../../../shared/models/MessageModel";
import {MessageService} from "../../../shared/services/message/message.service";
import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  stringList: string[];

  @Input() message: MessageModel;
  resault = "";
  constructor(private messageService: MessageService) {
    this.message = new MessageModel(0, "Hello!");
    messageService.message = this.message;
  }
  verify(message: string) {
    if (message.includes("youtube.com/watch?v=")) {
      this.resault = "https://www.youtube.com/embed/" + message.split("=")[1];
      return true;
    }
    if ((message.includes("https://www.instagram.com/p") || message.includes("http://www.instagram.com/p")) && !message.includes("embed")) {
      this.resault = message + "embed/";
      return true;
    }
    if (message.includes("twitter") && !message.includes("%2Fstatus%2F")) {
      this.resault = "http://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2F"
        + message.split("/")[3] + "%2Fstatus%2F" + message.split("/")[5];
      return true;
    }
    return false;
  }

  /**https://www.youtube.com/watch?v=SrUV8yRJyIs
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Notre composant qui prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur. Si vous souhaitez manipuler votre message lors du chargement du composant, vous devez
   * le faire dans le ngOnInit.
   */

  ngOnInit() {
    if (this.message.content.includes("https://") || this.message.content.includes("https://")) {
      this.stringList = this.message.content.split(" ");
    } else {
      this.stringList = [""];
      this.stringList[0] = this.message.content;
    }
  }

}
