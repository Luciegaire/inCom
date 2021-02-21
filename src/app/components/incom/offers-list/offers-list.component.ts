import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {


  user : any =""
  candidateOrCompany : {}
  companies : []

  loading = true
  status =""

  selectedOffers = []
  selectedSectors = []
  listOffers = []

  sectors : []
  contract = ""

  likesOffers : []
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

  getContent(text){
    if(text.length > 1000){
      return text.slice(0, 1000)+"...";
    }
    else
    return text
  }

  getDate(date){
    return new Date(date)
  }

  getCurrentSituation(id:number){
    this.backService.getSituationById(id).subscribe({
      next: (response) => {
        //console.log(response)
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
        this.listOffers.forEach(offer => {
          offer['isLiked'] = ""
        });
        //console.log(this.listOffers);
        this.selectedOffers = this.listOffers;
        this.loading = false
        //console.log(this.selectedOffers)
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
        //console.log(response)
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

  getLikes(){
    this.backService.getLikesOfferByUserID(this.user.user_id).subscribe({
      next: (response) => {
        this.likesOffers = response
        console.log(response)
      },
      error: () => {
        console.log("Erreur retriving likes")
      },
      complete: () => {

      }
    })
  }

  like(offer){
    let like = {
      user_id: this.user.user_id,
      offer_id: offer.offer_id
    }
    this.backService.createLikeOffer(like).subscribe({
      next : (response) =>{
        offer["isLiked"] = 1
        this.ngOnInit()
      },
      error: () => {
        console.log("Error like!")
      },
    })
  }

  unlike(offer){
    let like = {
      user_id: this.user.user_id,
      offer_id: offer.offer_id
    }

    this.backService.deleteLikeOffer(like.offer_id, like.user_id).subscribe({
      next : (response) =>{
        offer["isLiked"] = 0
        this.ngOnInit()
      },
      error: () => {
        console.log("Error unlike!")
      },
    })
  }


  manageLike(offer) {
    let likes = []
    console.log(this.user.user_id)
    this.backService.getLikesOfferByOfferIdAndUserId(offer.offer_id, this.user.user_id).subscribe({
      next : (response) =>{
          likes = response
          if(likes.length == 0){
            console.log("not liked")
            this.like(offer)
          }
          else{
            console.log("is liked")
            this.unlike(offer)
          }
      },
      error: () => {
        console.log("Error retrieving likes")
      },
      complete: () => {
      }
    })


  }

  getCompanyByIdUser(id : number){
    this.backService.getCompanyByUserId(id).subscribe({
      next: (response) => {
        //console.log("company",response)
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

  getBusinessSector(id : number){
    this.backService.getSectorById(id).subscribe({
      next: (response) => {
        //console.log("business",response)
        this.contract = response.name
      },
      error: () =>{
        console.log("erreur récupération Business")
      },
      complete: () =>{
      }
    })
  }


  ngOnInit(): void {
    this.getBusinessSectors()
    this.getContracts()
    this.getCompanies()
    this.getOffers()
    this.user = JSON.parse(localStorage.getItem('user'));
    //console.log(this.user)
    this.status = localStorage.getItem('status')
    if(this.status == "candidate"){
      this.getCandidate(this.user['user_id'])
    }
    else {
      this.getCompanyByIdUser(this.user['user_id'])
    }
    this.getLikes()
  }

}
