import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  password = this.user.password;

  constructor() { }

  ngOnInit(): void {
  }

}
