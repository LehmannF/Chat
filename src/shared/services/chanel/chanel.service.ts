import {ChanelModel} from "../../models/ChanelModel";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {URLSERVER} from "shared/constants/urls";
import {ReplaySubject} from "rxjs/ReplaySubject";
@Injectable()
export class ChanelService {


  public channelList$: ReplaySubject<ChanelModel[]>;
  public channelList: ChanelModel[];
  private url: string;
  private page: number;
  private i: number;
  private reset: boolean;
  private reset2: boolean;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.channelList$ = new ReplaySubject(1);
    this.channelList$.next([new ChanelModel()]);
    this.i = 0;
    this.channelList = [];
  }

  createChannel(chanel: ChanelModel) {
    const header = new Headers({"Content-type": "application/json"});
    const option = new RequestOptions({headers: header});
    this.http.post(this.url, chanel, option).subscribe();
  }

  public init() {
    this.channelList$.subscribe((channel) => {
      if (this.reset) {
        this.reset = false;
        this.reset2 = true;
      }
      if (this.i === 0 && this.reset2) {
        this.channelList = [];
        this.reset2 = false;
      }
      this.concatTab(channel);
      if (this.channelList.length % 20 === 0) {
        this.getChannel(this.i);
        this.i = this.i + 1;
      } else {
        this.reset = true;

        this.i = 0;
        this.reset2 = true;
      }
    });
    console.log("" + this.channelList.length);
  }

  getChannel(page: number) {
    this.page = page;
    const finalUrl = this.url + "/?page=" + page;
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateChannelList(response));
  }

  concatTab(chanel: ChanelModel[]) {
    for (let i = 0; i < chanel.length; i++) {
      if (!(chanel.length === 1 && this.i === 0)) {
        this.channelList.push(chanel[i]);
      }
    }
  }

  private extractAndUpdateChannelList(response: Response) {

    // Plus d'info sur Response ou sur la fonction .json()? si tu utilises Webstorm,
    // fait CTRL + Click pour voir la déclaration et la documentation
    const channelList = response.json() || []; // ExtractMessage: Si response.json() est undefined ou null,
    // messageList prendra la valeur tableau vide: [];
    this.channelList$.next(channelList); // On pousse les nouvelles données dans l'attribut messageList$
  }
}
