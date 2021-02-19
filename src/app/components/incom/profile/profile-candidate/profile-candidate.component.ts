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


  constructor(public backService: BackendService, private router: Router) {
  }

  mycount = 2;
  countChange(event) {
    this.mycount = event;
    console.log(this.mycount)
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }
  updateUser(){

    let user = {
      user_id : this.currentUser.user_id,
      firstname : this.currentUser.firstname,
      lastname : this.currentUser.lastname,
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

