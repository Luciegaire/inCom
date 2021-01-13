import { Component, OnInit } from '@angular/core';
import {EventEmitter} from '@angular/core';
import {ProfileInformationsComponent} from '../profile-informations/profile-informations.component';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  page = 1;

  constructor() { }
  mycount = 2;
  
  countChange(event){
    this.mycount = event;
    console.log(this.mycount)
  }
  ngOnInit(): void {
  }

}
