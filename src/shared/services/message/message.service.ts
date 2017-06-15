import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {URLSERVER} from "shared/constants/urls";
import {ChanelModel} from "../../models/ChanelModel";

@Injectable()
export class MessageService {

  /**
   * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
   * Il permet d'accéder aux channels. À partir de cet url, vous pourrez accéder aux messages.
   * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
   */
  public url: string;
  public message: MessageModel;
  public page: number;

  /**
   * MessageList$ est un type d'Observable particulier appelé ReplaySubject.
   * MessageList$ est un flux d'évenements qui stock la liste des messages. A chaque fois que l'on fait une requète
   * pour récupérer la liste des messages, messageList$ va pousser cette nouvelle liste dans son flux pour permettre
   * aux composants qui l'écoutent de récupérer les messages. Pour plus d'infos sur les observables, voir le README.md du projet
   * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
   */
  public messageList$: ReplaySubject<MessageModel[]>;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.messageList$ = new ReplaySubject(1);
    this.messageList$.next([new MessageModel()]);
  }

  /**
   * Fonction getMessage.
   * Cette fonction permet de récupérer la liste des messages pour un channel donné. Elle prend en parametre:
   * - route: La route. C'est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète.
   *          Pour l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant
   *          un nombre entier correspondant à l'identifiant (id) du channel.
   * Exemple de route: 1/messages
   * @param route
   * @returns {Observable<R>}
   */
  public getMessages(route: string) {
    this.getMessagesFrom(route, this.page);
  }


  public getMessagesFrom(route: string, page: number) {
    this.page = page;
    const finalUrl = this.url + route + "/?page=" + page;
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
  }

  /**
   * Fonction sendMessage.
   * Cette fonction permet l'envoi d'un message. Elle prend en paramêtre:
   * - route: La route est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète. Pour
   *          l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant un nombre
   *          entier correspondant à l'identifiant (id) du channel.
   *          Exemple de route: 1/messages
   * - message: Le message à envoyer. Ce message est de type MessageModel.
   * @param route
   * @param message
   */
  public sendMessage(route: string, message: MessageModel) {
    const finalUrl = this.url + route;
    const header = new Headers({"Content-type": "application/json"});
    const option = new RequestOptions({headers: header});
    this.http.post(finalUrl, {
      from: message.from,
      content: message.content
    }, option).subscribe((response) => this.extractMessageAndGetMessages(response, route));
  }

  /**
   * Fonction extractAndUpdateMessageList.
   * Cette fonction permet d'extraire la liste des messages de la 'response' reçue et ensuite de mettre à jour la liste
   * des message dans l'observable messageList$.
   * Elle est appelée dans la fonction getMessages et permet de directement récuperer une liste de MessageModel. Pour récupérer
   * les données de la reponse, il suffit d'appeler la fonction .json() qui retourne le body de la réponse.
   * @param response
   */
  extractAndUpdateMessageList(response: Response) {
    // Plus d'info sur Response ou sur la fonction .json()? si tu utilises Webstorm,
    // fait CTRL + Click pour voir la déclaration et la documentation
    const messageList = response.json() || []; // ExtractMessage: Si response.json() est undefined ou null,
    // messageList prendra la valeur tableau vide: [];
    this.messageList$.next(messageList); // On pousse les nouvelles données dans l'attribut messageList$
  }

  /**
   * Fonction extractMessage.
   * Cette fonction permet d'extraire les données reçues à travers les requêtes HTTP. Elle est appelée dans la fonction
   * sendMessage et permet de directement récuperer un MessageModel.
   * Elle va également faire un nouvel appel pour récupérer la liste complete des messages pour pouvoir mettre à jour la
   * liste des messages dans les composants.
   * @param response
   * @param route
   * @returns {any|{}}
   */

  private extractMessageAndGetMessages(response: Response, route: string): MessageModel {
    // Je suis vide aussi ...
    const messageList = response.json() || [];
    this.getMessages(route);
    this.messageList$.next(messageList);
    return messageList[messageList.length]; ///A remplacer ! On retourne ici un messageModel vide seulement pour que Typescript ne lève pas d'erreur !
  }

  public deletMessage(route: string) {
    // Je suis vide :(
    // Tu peux trouver des infos sur moi dans le README !
    this.http.delete(route);
  }

  public getAll(channelList: ChanelModel[]) {

  }

  sendToAllChannel(channelList: ChanelModel[], message: MessageModel) {
    message.setContent(this.replaceSmiley(message.getContent()));
    for (let i = 0; i < channelList.length; i++) {
      this.sendMessage(channelList[i].id + "/messages", message );
    }
  }

  replaceSmiley(content: string) {
    let result = content.replace(/\:\)/g, "🙂");
    result = result.replace(/\:\(/g, "😞"); // ok
    result = result.replace(/\:\o/g, "😲"); // ok
    result = result.replace(/\:\'\(/g, "😢"); // ok
    result = result.replace(/\<3/g, "❤️"); // ok
    result = result.replace(/\;\)/g, "😉"); // ok
    result = result.replace(/\:\p/g, "😛"); // ok
    result = result.replace(/\:\D/g, "😄"); // ok
    return result;
  }
}
