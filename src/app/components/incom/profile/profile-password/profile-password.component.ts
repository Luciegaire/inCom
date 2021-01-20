import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent implements OnInit {
  passwordCandidates = [{
    password: "chichi"
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
