import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

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
    lastname : "",
    firstname : "",
    email : "",
    current_situation_id : null,
    phone : null,
    address : "",
    postcode : "",
    city : "",
    gender : "",
    birthdate : ""
  }
  complete = ""


  constructor(public backService: BackendService, private router: Router, private datePipe : DatePipe) {
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
    this.formdata.birthdate = this.datePipe.transform(this.currentUser.birthdate, 'yyyy-MM-dd')
    this.formdata.lastname = this.currentUser.lastname
    this.formdata.firstname = this.currentUser.firstname
    this.formdata.email = this.currentUser.email
    this.formdata.phone = this.currentUser.phone
    this.formdata.address = this.currentUser.address
    this.formdata.postcode = this.currentUser.postcode
    this.formdata.city = this.currentUser.city
    this.formdata.current_situation_id = this.currentUser.current_situation_id
    this.formdata.gender = this.currentUser.gender
    console.log("user", this.formdata)
  }

  getDate(date){
    return new Date(date)
  }

  updateUser(){

    let user = {
      user_id : this.currentUser.user_id,
      lastname : this.formdata.lastname,
      firstname : this.formdata.firstname,
      email : this.formdata.email,
      password : this.currentUser.password,
      gender : this.formdata.gender,
      birthdate : this.formdata.birthdate,
      address: this.formdata.address,
      phone : this.formdata.phone,
      city : this.formdata.city,
      postcode: this.formdata.postcode,
      current_situation_id: this.formdata.current_situation_id,
    }
    this.backService.updateUser(this.currentUser.user_id, user).subscribe({
      next : (response) => {
        this.updateCandidate(response.id)
        console.log(response)
        localStorage.setItem('user', JSON.stringify(user));
      },
      error: () => {
        console.log('Error updating user')
      },
      complete:() => {
        this.complete = "Le profil a été mis à jour"
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
    let candidate = {
      user_id: id,
      phone: this.formdata.phone,
      address: this.formdata.address,
      postcode: this.formdata.postcode,
      city: this.formdata.city,
      current_situation_id : this.formdata.current_situation_id,
      avatar_path : this.currentUser.avatar_path
    }

    this.backService.updateCandidateByuserId(this.candidate['candidate_id'] ,candidate).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: () =>{
        console.log("erreur recuperation candidat")
      },
      complete: () =>{

      }
    })
  }

}

