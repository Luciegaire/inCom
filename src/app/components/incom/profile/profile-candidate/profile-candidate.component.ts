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

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
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
      contract: this.currentUser.contract,
      avatar: this.currentUser.avatar_path,
    }
    this.backService.updateUser(this.currentUser.user_id, user).subscribe({
      next : (response) => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(user));
      },
      error: () => {
        console.log('Error updating user')
      },
      complete:() => {
      }
    })
  }
}

