import {Component, HostBinding, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {fadeStateTrigger} from "../shared/animations/fade.animation";

@Component({
  selector: 'wfm-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigger]
})

export class AuthComponent implements OnInit{

  constructor(private router : Router, private activeRoute : ActivatedRoute){

  }

  @HostBinding('@fade') fade = true; // fade = true for animation to run infinite

  ngOnInit(){
    this.router.navigate(['/login']);
  }

}
