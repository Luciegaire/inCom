import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-candidate',
  templateUrl: './profile-candidate.component.html',
  styleUrls: ['./profile-candidate.component.css']
})
export class ProfileCandidateComponent implements OnInit {

  page = 1;
  statusForm: number = -1;
  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();
  currentUser: any = ""
  candidate : {}
  contract = ""
  formdata = {
    old_password : "",
    new_password : ""
  }


  constructor(public backService: BackendService, private router: Router) {
  }

  mycount = 2;
  countChange(event) {
    this.mycount = event;
    console.log(this.mycount)
  }
  genders:Array<Object>  = [
    {id:0, gender: "Masculin"},
    {id:1, gender: "Féminin"},
    {id:2, gender: "Autre"}
  ]
  situations:Array<Object>  = [
    {id:0, situation: "Stage"},
    {id:1, situation: "Alternance"},
    {id:2, situation: "Job étudiant"},
    {id:3, situation: "CDI"},
    {id:4, situation: "CDD"},
    {id:5, situation: "Emploi saisonnier"},
    {id:6, situation: "Contrat d'apprentissage"},
    {id:7, situation: "Contrat de professionnalisation "},
  ]

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getCandidate(this.currentUser['user_id'])
  }
  updateUser(){

    let user = {
      user_id : this.currentUser.user_id,
      lastname : this.currentUser.lastname,
      firstname : this.currentUser.firstname,
      email : this.currentUser.email,
      password : this.currentUser.password,
      gender : this.currentUser.gender,
      birthdate : this.currentUser.birthdate,
      address: this.currentUser.address,
      phone : this.currentUser.phone,
      city : this.currentUser.city,
      postcode: this.currentUser.postcode,
      situation: this.currentUser.current_situation,
      candidate_id: this.currentUser.candidate_id,
    }
    this.backService.updateUser(this.currentUser.user_id, user).subscribe({
      next : (response) => {
        console.log(response)
        this.updateCandidate(this.currentUser.candidate_id)
        localStorage.setItem('user', JSON.stringify(response));
      },
      error: () => {
        console.log('Error updating user')
      },
      complete:() => {
      }
    })
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

  updateCandidate(id){
    console.log(id)
    let candidate = {
      candidate_id: id,
      phone: this.currentUser.phone,
      address: this.currentUser.address,
      postcode: this.currentUser.postcode,
      city: this.currentUser.city,
      contract_id : this.currentUser.contract,
      avatar_path : this.currentUser.avatar_path,
      current_situation_id : this.currentUser.current_situation_id,
    }
    this.backService.updateCandidate(id, candidate).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(candidate));
      },
      error: () =>{
        console.log("erreur recuperation candidat")
      },
      complete: () =>{
      }
    })
  }

}

