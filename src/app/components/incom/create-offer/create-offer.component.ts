import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  constructor(private backService : BackendService) { }

  user = {}
  company = {}
  sector = ""

  getCompany(id : number){
    this.backService.getCompanyById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.company = response
      },
      error: () =>{
        console.log("erreur récupération company")
      },
      complete: () =>{
        this.getSector(this.company['business_sector_id'])
      }
    })
  }

  getSector(id:number){
    this.backService.getSectorById(id).subscribe({
      next: (response) => {
        this.sector = response.name
      },
      error: () =>{
        console.log("erreur récupération secteur")
      },
      complete: () =>{
      }
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCompany(this.user['user_id'])
  }

}
