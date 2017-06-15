import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ChanelFormComponent } from "./chanel-form.component";
import {ChanelService} from "../../shared/services/chanel/chanel.service";

@NgModule({
  declarations: [
    ChanelFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChanelFormComponent],
  providers: [ChanelService]
})
export class MessageFormModule { }
