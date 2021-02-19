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
    old_password: this.currentUser.password,
    new_password: ""
  }

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
      }
    }
  }
}
