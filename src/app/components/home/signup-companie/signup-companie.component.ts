import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { cpuUsage } from 'process';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-signup-companie',
  templateUrl: './signup-companie.component.html',
  styleUrls: ['./signup-companie.component.css']
})
export class SignupCompanieComponent implements OnInit {

  @Input()
  status: number = 2;

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  formdata = {
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    gender: "",
    logo : "",
    birthdate:"",
    password: "",
    cpassword: "",
    companyName: "",
    sector: ""
  }

  genders:Array<Object>  = [
    {id:0, gender: "Masculin"},
    {id:1, gender: "Féminin"},
    {id:2, gender: "Autre"}
  ]

  sectors= []

  statusForm: number = -1;

  validForm = 1;

  constructor(public backService: BackendService, private router: Router){

  }

  getSectors(){
    this.backService.getSectors().subscribe({
      next: (response) => {
        console.log(response)
        this.sectors = response
      },
      error: () =>{
        console.log("Erreur dans la récupération des secteurs")
      },
      complete: () =>{
      }
    })
  }

  ngOnInit(): void {
    this.getSectors()
  }

  changed(id:number){
    this.status = id;
    this.changeStatus.emit(id);
  }

  createEmployee(company_id, user_id){
    let employee ={
      company_id: company_id,
      user_id: user_id,
      role: "Administrateur"
    }

    this.backService.createEmployee(employee).subscribe({
      next: (response) => {
        console.log(response)
        this.changed(0)
      },
      error: () =>{
        console.log("erreur création employé")
      },
      complete: () =>{
      }
    })


  }

  createCompany(id){
    let company = {
      name: this.formdata.companyName,
      referent_lastname: this.formdata.lastname,
      referent_firstname: this.formdata.firstname,
      referent_email: this.formdata.email,
      referent_phone: this.formdata.phonenumber,
      status: 0,
      business_sector_id: this.formdata.sector,
      logo : this.formdata.logo
    }

    this.backService.createCompany(company).subscribe({
      next: (response) => {
        console.log(response)
        this.createEmployee(response.id, id)
        this.statusForm = 1
      },
      error: () =>{
        console.log("erreur création entreprise")
      },
      complete: () =>{

      }
    })
  }

  createUser(){
    let user = {
      lastname : this.formdata.lastname,
      firstname : this.formdata.firstname,
      email : this.formdata.email,
      password : this.formdata.password,
      gender: this.formdata.gender,
      birthdate: this.formdata.birthdate
    }

    this.backService.createUser(user).subscribe({
      next: (response) => {
        console.log(response.id)
        this.createCompany(response.id)
      },
      error: () => {
        console.log("Erreur création user")
      },
      complete: () => {

      }
    }

    )

  }
  validate(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    var validate = form.checkValidity()

    if (validate === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');

    if(validate){

      if(this.formdata.password == this.formdata.cpassword){
        this.backService.getCompaniesByName(this.formdata.companyName).subscribe({
          next: (response) => {​​​​
            console.log("L'entreprise existe déjà!")
            this.statusForm = 2
          }​​​​,
          error: () => {
            this.backService.getUserByEmail(this.formdata.email).subscribe({
              next: (response) => {​​​​
                this.statusForm = 3
                console.log("user existe")
              }​​​​,
              error : () => {
                console.log("création de l'utilisateur")
                this.createUser()
              }
              })
          }
          })
      }
    }
  }

  // encodeImageFileAsURL(element) {
  //   console.log(element)
  //   var file = element.files[0];

  //   var reader = new FileReader();
  //   reader.onloadend = function() {
  //     console.log('RESULT', reader.result)
  //   }
  //   reader.readAsDataURL(file);
  // }

}
