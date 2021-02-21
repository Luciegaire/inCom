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


  candidateOrCompany : {}
  loading = true
  sector =""
  user :{}
  status = ""
  contract = ""

  id = ""
  company : {}
  offers : {}
  contracts : []
  companies : []
  sectors : []
  tabLittleOffers : []


  getDate(date){
    return new Date(date)
  }


  getCompany(id : number){
    let array = this.companies.filter(x => x['company_id'] === id)
    if(array.length != 0){
      return array[0]['name']
    }
    else return ""
  }

  getContract(id : number){
    let array = this.contracts.filter(x => x['contract_id'] === id)
    if(array.length != 0){
      return array[0]['name']
    }
    else return ""
  }

  getSector(id : number){
    let array = this.sectors.filter(x => x['business_sector_id'] === id)
    if(array.length != 0){
      return array[0]['name']
    }
    else return ""
  }

  getBusinessSectors(){
    this.backendService.getBusinessSectors().subscribe({
      next: (response) => {
        this.sectors = response
      },
      error: () =>{
        console.log("erreur récupération secteurs")
      },
      complete: () =>{
        this.loading = false
      }
    })
  }

  getContent(text){
    if(text.length > 1000){
      return text.slice(0, 1000)+"...";
    }
    else
    return text
  }

  getCompanies(){
    this.backendService.getCompanies().subscribe({
      next: (response) => {
        this.companies = response
      },
      error: () =>{
        console.log("erreur récupération secteurs")
      },
      complete: () =>{
      }
    })
  }

  getContracts(){
    this.backendService.getContracts().subscribe({
      next: (response) => {
        this.contracts = response
      },
      error: () => {
        console.log("Erreur création user")
      },
      complete: () => {

      }
    })
  }

  getBusinessSector(id){
    this.backendService.getSectorById(id).subscribe({
      next: (response) => {
        this.sector = response.name
      },
      error : () => {
        console.log("erreur récup ")
      },
      complete: () => {
        this.getOffers(this.candidateOrCompany['company_id'],"gauche")
      }
    })
  }

  getOffers(id,cote){
    this.backendService.getOffersByCompanyId(id).subscribe({
      next : (response) =>{
        if(cote == "gauche"){
          this.tabLittleOffers = response
        }
        else {
          this.offers = response
        }
        console.log("offers", response)
      },
      error: () => {
        console.log("Error retrieving posts")
      },
      complete : () => {
      }
    })
  }

  getCompanyById(id){
    this.backendService.getCompanyById(id).subscribe({
      next : (response) =>{
        console.log("company", response)
        this.company = response
      },
      error: () => {
        console.log("Error retrieving posts")
      },
      complete : () => {
        this.loading = false
      }
    })
  }

  getCurrentSituation(id:number){
    this.backendService.getSituationById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.contract = response.name
      },
      error: () =>{
        console.log("erreur récupération situation")
      },
      complete: () =>{
      }
    })
  }

  getCandidate(id : number){
    this.backendService.getCandidateById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.candidateOrCompany = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.getCurrentSituation(this.candidateOrCompany['current_situation_id'])
      }
    })
  }

  getCompanyByIdUser(id : number){
    this.backendService.getCompanyByUserId(id).subscribe({
      next: (response) => {
        console.log("company",response)
        this.candidateOrCompany = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.getBusinessSector(this.candidateOrCompany['business_sector_id'])
      }
    })
  }

  getInfosUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.status = localStorage.getItem('status')
    if(this.status == "candidate"){
      this.getCandidate(this.user['user_id'])
    }
    else {
      this.getCompanyByIdUser(this.user['user_id'])
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      if (routeParams) {
        console.log("paramètres de la route", routeParams)
        this.id = routeParams.id
        this.getCompanyById(parseInt(this.id))
        this.getBusinessSectors()
        this.getContracts()
        this.getCompanies()
        this.getOffers(this.id,"droit")
        this.getInfosUser()
      }
    });
  }
}
