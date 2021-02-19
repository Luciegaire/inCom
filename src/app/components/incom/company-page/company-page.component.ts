import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private backendService : BackendService
  ) { }

  loading = true

  id = ""
  company : {}
  offers : {}

  getDate(date){
    return new Date(date)
  }

  getCompany(id){
    this.backendService.getCompanyById(id).subscribe({
      next:(response) => {
        this.company = response
        console.log(this.company)
      },
      error: () => {
        console.log("Erreur récup company")
      },
      complete: () => {}
    })
  }

  getOffers(id){
    this.backendService.getOffersByCompanyId(id).subscribe({
      next : (response) =>{
        console.log("offers", response)
        this.offers = response
      },
      error: () => {
        console.log("Error retrieving posts")
      },
      complete : () => {
        this.loading = false
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      if (routeParams) {
        console.log("paramètres de la route", routeParams)
        this.id = routeParams.id
        this.getCompany(this.id)
        this.getOffers(this.id)
      }
    });
  }
}
