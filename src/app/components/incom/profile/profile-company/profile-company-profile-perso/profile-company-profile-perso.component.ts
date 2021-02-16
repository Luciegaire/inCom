import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { iif } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company-profile-perso',
  templateUrl: './profile-company-profile-perso.component.html',
  styleUrls: ['./profile-company-profile-perso.component.css']
})
export class ProfileCompanyProfilePersoComponent implements OnInit {

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();
  currentUser: any = ""
  statusForm: number = -1;

  formdata = {
    old_password : "",
    new_password : ""
  }

  constructor(public backend: BackendService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  changed(id:number){
    this.changeStatus.emit(id);
  }


  updateUser(){

    let user = {
      user_id : this.currentUser.user_id,
      lastname : this.currentUser.lastname,
      firstname : this.currentUser.firstname,
      email : this.currentUser.email,
      password : this.formdata.new_password,
      gender : this.currentUser.gender,
      birthdate : this.currentUser.birthdate,
      company_id : this.currentUser.company_id,
      employee_id: this.currentUser.employee_id,
      role: this.currentUser.role,
    }

    this.backend.updateUser(this.currentUser.user_id, user).subscribe({
      next : (response) =>{
        console.log(response)
        localStorage.setItem("user", JSON.stringify(user));
        this.statusForm = 1
      },
      error: () => {
        console.log("Error updating user")
      },
      complete:() =>{
      }
    })
  }




  validate(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    var validate = form.checkValidity()

    console.log(this.formdata)
    if (validate === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');

    if(validate){

      if(this.formdata.old_password == this.currentUser.password){

        if(this.formdata.new_password != this.currentUser.password){
          this.updateUser()
        }
        else{
          console.log("Le nouveau mot de passe doit être différent de l'ancien!")
          this.statusForm = 3
        }

      }else{
        console.log("L'ancien mot de passe ne correspond pas!")
        this.statusForm = 2
      }

    }

  }

}
