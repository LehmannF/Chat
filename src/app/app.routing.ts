



import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guard/auth.guard";
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [

  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "**", redirectTo: ""}


];

export const routing = RouterModule.forRoot(appRoutes);

