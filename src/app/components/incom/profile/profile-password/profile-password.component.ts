import { formatDate } from '@angular/common';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BackendService} from '../../../../services/backend.service';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent implements OnInit {
  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();
  currentUser: any = ""

  formdata = {
    old_password: "",
    new_password: "",
    cnew_password :""
  }

  error = ""
  complete = ""

  constructor(public backend: BackendService) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
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
        localStorage.setItem('user', JSON.stringify(user));
      },
      error: () => {
        console.log("Error updating user")
      },
      complete:() =>{
        this.complete = "Le mot de passe a été mis à jour"
      }
    })
  }

  validate(){
    console.log("validate")
    console.log(this.formdata.old_password)
    console.log(this.currentUser)
    this.error = ""
      if(this.formdata.old_password == this.currentUser.password){
        if(this.formdata.new_password != "" && this.formdata.cnew_password != ""){
          if(this.formdata.new_password != this.currentUser.password){
            if(this.formdata.new_password == this.formdata.cnew_password){
              this.updateUser()
            }
            else {
              this.error = "Le nouveau mot de passe et la confirmation ne sont pas identiques"
            }
          }
          else {
            this.error = "Le nouveau mot de passe et l'ancien sont identiques"
          }
        }
        else {
          this.error = "Veuillez renseigner le nouveau mot de passe et la confirmation"
        }
        }
      else {
        this.error = "Le mot de passe actuel n'est pas exacte"
      }
    }
}
