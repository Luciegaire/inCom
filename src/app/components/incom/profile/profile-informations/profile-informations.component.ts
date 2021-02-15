import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-profile-informations',
  templateUrl: './profile-informations.component.html',
  styleUrls: ['./profile-informations.component.css']
})
export class ProfileInformationsComponent implements OnInit {

  @Input()
  count: number = 0;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  // Recuperartion de l'objet User
  user = JSON.parse(localStorage.getItem('user'));

  firstame = this.user.firstname;
  lastname = this.user.lastname;
  status = "";
  phone = this.user.phone;
  address = this.user.address;
  postcode = this.user.postcode;
  city = this.user.city;
  gender = this.user.gender;
  birthdate = this.user.birthdate;

  // tslint:disable-next-line:typedef
  changed(id:number){
    this.count = id;
    this.change.emit(id);
  }
  constructor() { }
  ngOnInit(): void {
  }
}
