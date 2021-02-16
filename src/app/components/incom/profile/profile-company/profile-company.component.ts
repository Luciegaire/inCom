import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {
  status: number = 0
  userIDSelected: number = -1
  constructor() { }

  statusChange(event){
    console.log("changement")
    this.status = event;
    console.log(this.status)
  }

  userIDSelectedChange(event){
    this.userIDSelected = event
  }


  ngOnInit(): void {
  }

}
