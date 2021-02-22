import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company-account-creation',
  templateUrl: './profile-company-account-creation.component.html',
  styleUrls: ['./profile-company-account-creation.component.css']
})
export class ProfileCompanyAccountCreationComponent implements OnInit {

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  genders:Array<Object>  = [
    {id:0, gender: "Masculin"},
    {id:1, gender: "Féminin"},
    {id:2, gender: "Autre"}
  ]

  roles:Array<Object>  = [
    {id:0, role: "Administrateur"},
    {id:1, role: "Modérateur"}
  ]

  avatarTbl = [
    'man1.png','man2.png','man3.png','man4.png',
    'woman1.png','woman2.png','woman3.png','woman4.png',
    ];

  userdata = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    gender: "",
    birthdate: ""
  };

  employeedata = {
    company_id: "",
    user_id: "",
    role: ""
  };

  currentUser: any = ""

  statusForm: number = -1;

  constructor(public backService: BackendService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.employeedata.company_id = this.currentUser.company_id
  }

  changed(id:number){
    this.changeStatus.emit(id);
  }

  createUser(){
    let user = {
      lastname : this.userdata.lastname,
      firstname : this.userdata.firstname,
      email : this.userdata.email,
      password : this.userdata.password,
      gender: this.userdata.gender,
      birthdate: this.userdata.birthdate
    }

    this.backService.createUser(user).subscribe({
      next: (response) => {
        this.createEmployee(response.id)
      },
      error: () => {
        console.log("Erreur création employee")
      },
      complete: () => {

      }
    }

    )

  }


  createEmployee(user_id){
    let employee ={
      company_id: this.employeedata.company_id,
      user_id: user_id,
      role: this.employeedata.role
    }

    this.backService.createEmployee(employee).subscribe({
      next: (response) => {
        this.statusForm = 1
        this.changed(3)
        console.log(response)
      },
      error: () =>{
        console.log("erreur création employé")
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

      if(this.userdata.password == this.userdata.cpassword){
        this.backService.getUserByEmail(this.userdata.email).subscribe({
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


    console.log(this.userdata)
    console.log(this.employeedata)
  }

}
