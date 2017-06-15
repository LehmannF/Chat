import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BarComponent } from "./bar.component";
import {routing} from "../app.routing";

@NgModule({
  declarations: [
    BarComponent
  ],
  imports: [
    CommonModule,
    routing
  ],
  exports: [BarComponent],
})
export class BarModule { }
