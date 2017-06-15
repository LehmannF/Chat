import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {ChanelComponent} from "./chanelCreation/chanel.component";
import {ChanelViewListComponent} from "./chanelListSelector";
import {MessageComponent, MessageListComponent} from "./messages";
import {MessageFormComponent} from "./message-form";
import {MessageService} from "../shared/services/message/message.service";
import {MessagePageComponent} from "./historic/message-page.component";
import {ChanelService} from "../shared/services/chanel/chanel.service";
import {ChanelFormComponent} from "./chanelElementListSelector/chanel-form.component";
import {ChanelButtonComponent} from "./buttonChanelCreation/chanelButton.component";
import {ChannelListComponent} from "./chanelSelector/channel-list.component";
import {BarComponent} from "./barNavigation/bar.component";
import {WeatherComponent} from "./weather/weather.component";
import {HomeComponent} from "./home/home.component";
import {routing} from "./app.routing";
import {AuthGuard} from "./guard/auth.guard";
import {LoginComponent} from "./login/login.component";
import {Logout} from "../shared/services/logout/logout.service";
import {SafePipe} from "../shared/pipes/pipe";
import {ButtonChanelListComponent} from"./buttonChanelList/buttonChanelList.component";
import {OpenClose} from "../shared/services/openClose/openClose.service";
import {ButtonWeatherComponent} from "./buttonWeather/buttonWeather.component";

@NgModule({
  declarations: [
    AppComponent,
    ChanelViewListComponent,
    ChanelFormComponent,
    MessageFormComponent,
    MessageListComponent,
    MessageComponent,
    MessagePageComponent,
    ChanelComponent,
    ChanelButtonComponent,
    ChannelListComponent,
    BarComponent,
    WeatherComponent,
    HomeComponent,
    LoginComponent,
    BarComponent,
    SafePipe,
    ButtonChanelListComponent,
    ButtonWeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [Logout, AuthGuard, MessageService, ChanelService, OpenClose],
  bootstrap: [AppComponent]
})
export class AppModule {
}
