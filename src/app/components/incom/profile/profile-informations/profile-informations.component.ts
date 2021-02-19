import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

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
  candidate = JSON.parse(localStorage.getItem('candidate'));
  contract =""

  firstame = this.user.firstname;
  lastname = this.user.lastname;
  status = "";
  phone = this.user.phone;
  address = this.user.address;
  postcode = this.user.postcode;
  city = this.user.city;
  gender = this.user.gender;
  birthdate = this.user.birthdate;
  current_situation = this.user.current_situation;
  avatar = this.user.avatar_path;

  constructor(private backService: BackendService) { }
  ngOnInit(): void {
    this.getCandidate(this.user.user_id)
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCandidate(this.user['user_id'])
  }

  getCandidate(id : number){
    this.backService.getCandidateById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.candidate = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.getCurrentSituation(this.candidate['current_situation_id'])
      }
    })
  }

  getCurrentSituation(id:number){
    this.backService.getSituationById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.contract = response.name
      },
      error: () =>{
        console.log("erreur récupération situation")
      },
      complete: () =>{
      }
    })
  }

  // tslint:disable-next-line:typedef
  changed(id:number){
    this.count = id;
    this.change.emit(id);
  }

}
