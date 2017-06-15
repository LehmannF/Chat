import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MessagePageComponent } from "./message-page.component";
import { MessageService } from "../../shared/services";

@NgModule({
  declarations: [
    MessagePageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [MessagePageComponent],
  providers: [MessageService]
})
export class MessagePageModule { }
