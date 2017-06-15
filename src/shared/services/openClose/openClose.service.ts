import {Injectable} from "@angular/core";

@Injectable()
export class OpenClose {

  public chaneList: boolean;
  public meteo: boolean;

  constructor() {
    this.chaneList = false;
    this.meteo = false;
  }

}
