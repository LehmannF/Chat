import {Component, OnInit, Input} from "@angular/core";
import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {ChanelService} from "../../shared/services/chanel/chanel.service";
import {ChanelModel} from "../../shared/models/ChanelModel";
import {ReplaySubject} from "rxjs/ReplaySubject";


@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  private static city = "paris";
  public message: MessageModel;
  private route: string;
  @Input() notifyChildren: string;
  public static getCity() {
    return MessageFormComponent.city;
  }
  constructor(private messageService: MessageService, private chanelService: ChanelService) {
    this.message = new MessageModel(1, "hello!", localStorage.getItem("User"));
    this.route = "878/messages";
  }



  ngOnInit() { }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendMessage() {
    this.route = this.notifyChildren;
    if (this.isAWeatherRequest()) {
      this.getMeteoVille();
    } else {
      this.message.setContent( this.replaceSmiley(this.message.getContent()));
      this.messageService.sendMessage(this.route, this.message);
    }
  }

  getAllChannel() {
    this.chanelService.channelList$.unsubscribe();
    this.chanelService.channelList$ = new ReplaySubject(1);
    this.chanelService.channelList$.next([new ChanelModel()]);
    this.chanelService.init();
    this.messageService.sendToAllChannel(this.chanelService.channelList, this.message);
  }

  replaceSmiley(content: string) {
    let result = content.replace(/\:\)/g, "🙂");
    result = result.replace(/\:\(/g, "😞"); // ok
    result = result.replace(/\:\o/g, "😲"); // ok
    result = result.replace(/\:\'\(/g, "😢"); // ok
    result = result.replace(/\<3/g, "❤️"); // ok
    result = result.replace(/\;\)/g, "😉"); // ok
    result = result.replace(/\:p/g, "😛"); /// ok
    result = result.replace(/\:D/g, "😄"); // ok
    console.log(result);
    return result;
  }
  youtubeMin(content: string) {

  }

  getMeteoVille() {
    const chaine = this.message.getContent();
    const position = chaine.indexOf("/meteo");
    if (position !== -1) {
      const [first, second] = chaine.split(" ");
      MessageFormComponent.city = second;
      console.log(MessageFormComponent.city);
    }
  }
  isAWeatherRequest() {
    const chaine = this.message.getContent();
    const position = chaine.indexOf("/meteo");
    if (position !== -1) {
      return true;
    }
    return false;
  }
}
