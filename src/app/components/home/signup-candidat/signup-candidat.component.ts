import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-signup-candidat',
  templateUrl: './signup-candidat.component.html',
  styleUrls: ['./signup-candidat.component.css']
})
export class SignupCandidatComponent implements OnInit {


  @Input()
  status: number = 1;

  validPassword: number = 0;

  statusForm: number = -1;


  genders:Array<Object>  = [
    {id:0, gender: "Masculin"},
    {id:1, gender: "Féminin"},
    {id:2, gender: "Autre"}
  ]

  // birthdate

  formdata = {
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    gender: "",
    birthdate:"",
    address: "",
    city: "",
    postcode: "",
    password: "",
    contract: "",
    cpassword: "",
    avatar_path : ""
  }

  avatarTbl = [
    'man1.png','man2.png','man3.png','man4.png',
    'woman1.png','woman2.png','woman3.png','woman4.png',
    ];

  changeCurrentAvatar(path: string) {
    this.formdata.avatar_path = path
  }

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  situations = []

  constructor(public backService: BackendService, private router: Router) {

  }

  getSituations(){
    this.backService.getContracts().subscribe({
      next: (response) => {
        console.log(response)
        this.situations = response
      },
      error: () => {
        console.log("Erreur création user")
      },
      complete: () => {

      }
    })
  }

  ngOnInit(): void {
    this.getSituations()
  }

  changed(id:number){
    this.status = id;
    this.changeStatus.emit(id);
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
        this.createCandidate(response.id)
      },
      error: () => {
        console.log("Erreur création user")
      },
      complete: () => {

      }
    }

    )

  }

  createCandidate(id){
    let candidate = {
      user_id: id,
      phone: this.formdata.phonenumber,
      address: this.formdata.address,
      postcode: this.formdata.postcode,
      city: this.formdata.city,
      contract_id : this.formdata.contract,
      avatar_path : this.formdata.avatar_path
    }

    this.backService.createCandidate(candidate).subscribe({
      next: (response) => {
        console.log(response)
        this.statusForm = 1
        this.changed(0)
      },
      error: () =>{
        console.log("erreur création candidat")
      },
      complete: () =>{

      }
    })
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

        this.backService.getUserByEmail(this.formdata.email).subscribe({
          next: (response) => {​​​​
            this.statusForm = 3
            console.log("user déjà existant")
          }​​​​,

          error: () => {
            console.log("User non existant")
            this.createUser()
          }​​​​,

          complete: () => {​​​​

          }​​​​
          })

      }else{
        this.statusForm = 2
        console.log("Les mots de passe ne sont pas identiques")
      }
    }else{
      console.log("Veuillez remplir tous les champs")
    }

  }

  checkPassword(){
    if(this.formdata.password == this.formdata.cpassword){

      this.validPassword = 1
    }else{

      this.validPassword = -1
    }
  }

}
