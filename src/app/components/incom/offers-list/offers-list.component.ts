import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {

  offers = [
    {
      offer_id : 1,
      psted_at : "12-01-2021",
      content : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web.",
      title : "Vendeur en prêt à porter",
      fast_apply : 0,
      url :"https://www.google.com/",
      salary : "1500",
      city : "Marseille",
      department : 13,
      start_date : "15-06-2021",
      end_date : "02-09-2021",
      contract_id : "CDD", // à changer plus tard car id
      offer_sectir_id : "Vente", // à changer plus tard car id
      employee_id : "Pierre Le Ny", // à changer plus tard car id
      company_id : "The Kooples" //// à changer plus tard car id ET A RAJOUTER EN BASE
    },
    {
      offer_id : 2,
      psted_at : "12-01-2021",
      content : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web.",
      title : "Développeur Angular",
      fast_apply : 0,
      url :"https://www.google.com/",
      salary : "2500",
      city : "Aix-en-Provence",
      department : 13,
      start_date : "15-06-2021",
      end_date : "null",
      contract_id : "CDI", // à changer plus tard car id
      offer_sectir_id : "Ingénierie", // à changer plus tard car id
      employee_id : "Florian Ricciardi", // à changer plus tard car id
      company_id : "Capgemini" //// à changer plus tard car id ET A RAJOUTER EN BASE
    }
  ]

  user : {}
  candidate : {}
  companies : []

  loading = true

  selectedOffers = []
  selectedSectors = []
  listOffers = []

  sectors : []
  contract = ""

  contracts = []

  constructor(private backService : BackendService) { }

  clickedCheck(checked : boolean, idSelect : number){
    console.log("id",idSelect)
    if(checked){
      this.selectedSectors.push(idSelect);
      }
    else{
      var index = this.selectedSectors.indexOf(idSelect);
      this.selectedSectors.splice(index, 1);
    }
    if (this.selectedSectors.length > 0){
      this.selectedOffers = this.listOffers.filter((item) => this.selectedSectors.indexOf(item.offer_sector_id) != -1);
    }
    else {
      this.selectedOffers = this.listOffers
    }
  }

  getDate(date){
    return new Date(date)
  }

  getCurrentSituation(id:number){
    this.backService.getSituationById(id).subscribe({
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

  getOffers(){
    this.backService.getOffers().subscribe({
      next: (response) => {
        this.listOffers = response;
        this.selectedOffers = response;
        this.loading = false
        console.log(this.selectedOffers)
      },
      error: () =>{
        console.log("erreur récupération entreprises")
      },
      complete: () =>{
      }
    })
  }

  getBusinessSectors(){
    this.backService.getBusinessSectors().subscribe({
      next: (response) => {
        this.sectors = response
      },
      error: () =>{
        console.log("erreur récupération secteurs")
      },
      complete: () =>{
      }
    })
  }

  getCompanies(){
    this.backService.getCompanies().subscribe({
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
    this.backService.getContracts().subscribe({
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

  getCandidate(id : number){
    this.backService.getCandidateById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.candidate = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.getCurrentSituation(this.candidate['current_situation_id'])
      }
    })
  }

  ngOnInit(): void {
    this.getBusinessSectors()
    this.getContracts()
    this.getCompanies()
    this.getOffers()
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCandidate(this.user['user_id'])
  }

}
