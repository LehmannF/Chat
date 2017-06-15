
import {Component, OnInit} from "@angular/core";
import {UserModel} from "../../shared/models/UserModel";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  moduleId: module.id,
  templateUrl: "./login.component.html"
})

export class LoginComponent implements OnInit {

  public user: UserModel;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.user = new UserModel("", "");
  }

  ngOnInit() {

  }

  login() {
    localStorage.setItem("User", this.user.username);
    this.router.navigate([""]);
  }

}
