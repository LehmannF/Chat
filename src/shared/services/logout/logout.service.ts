import {Component, Injectable, OnInit} from "@angular/core";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";


@Injectable()
export class Logout implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

  }

   public logout() {
    console.log("logout");
    localStorage.removeItem("User")
     this.router.navigate(["/login"]);
  }

}
