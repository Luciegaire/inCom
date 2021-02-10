import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-candidate',
  templateUrl: './profile-candidate.component.html',
  styleUrls: ['./profile-candidate.component.css']
})
export class ProfileCandidateComponent implements OnInit {

  candidates = [
    {
      id : 1,
      lastname : "farace",
      firstname: "loic",
      email: "loic.farace@gmail.com",
      birthdate: "28/06/1995",
      address: "645 rue du piemont",
      postcode: 13090,
      city: "Aix-En-Provence",
      phone : "0654345643"
    }]

  constructor() { }

  ngOnInit(): void {
  }

}
