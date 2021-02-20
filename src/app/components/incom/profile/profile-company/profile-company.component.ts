import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {
  status: number = 1
  userIDSelected: number = -1
  company : {}
  user : {}
  sector = ""
  constructor(private backService : BackendService ) { }

  statusChange(event){
    console.log("changement")
    this.status = event;
    console.log(this.status)
  }

  userIDSelectedChange(event){
    this.userIDSelected = event
  }

  getCompanyByIdUser(id : number){
    this.backService.getCompanyByUserId(id).subscribe({
      next: (response) => {
        console.log("company",response)
        this.company = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.getBusinessSector(this.company['business_sector_id'])
      }
    })
  }

  getBusinessSector(id : number){
    this.backService.getSectorById(id).subscribe({
      next: (response) => {
        console.log("business",response)
        this.sector = response.name
      },
      error: () =>{
        console.log("erreur récupération Business")
      },
      complete: () =>{
      }
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCompanyByIdUser(this.user['user_id'])
  }

}
