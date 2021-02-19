import { CompileTemplateMetadata } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class FeedComponent implements OnInit {

  posts:any[] = []
  candidateOrCompany : {}
  contract = ""

  tabLittleOffers : []

  currentUser: any =""
  currentStatusUser: any = ""
  constructor(public backend: BackendService) {

  }

  getOffers(id){
    this.backend.getOffersByCompanyId(id).subscribe({
      next : (response) =>{
        console.log("offers", response)
        this.tabLittleOffers = response
      },
      error: () => {
        console.log("Error retrieving posts")
      },
    })
  }

  getPosts(){
    this.backend.getPosts().subscribe({
      next : (response) =>{
        this.posts = response
        this.posts = this.posts.reverse()
        console.log("ici posts", response)
      },
      error: () => {
        console.log("Error retrieving posts")
      },
    })
  }

  getCandidate(id : number){
    this.backend.getCandidateById(id).subscribe({
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

  getCompany(id : number){
    this.backend.getCompanyByUserId(id).subscribe({
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

  getBusinessSector(id : number){
    this.backend.getSectorById(id).subscribe({
      next: (response) => {
        console.log("business",response)
        this.contract = response.name
      },
      error: () =>{
        console.log("erreur récupération Business")
      },
      complete: () =>{
        this.getOffers(this.candidateOrCompany['company_id'])
      }
    })
  }

  getCurrentSituation(id:number){
    this.backend.getSituationById(id).subscribe({
      next: (response) => {
        console.log("curretn sit",response)
        this.contract = response.name
      },
      error: () =>{
        console.log("erreur récupération Situation")
      },
      complete: () =>{
      }
    })
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.currentStatusUser = localStorage.getItem("status")
    console.log("current statut user",this.currentStatusUser)
    if(this.currentStatusUser == "candidate"){
      this.getCandidate(this.currentUser['user_id'])
    }
    else {
      this.getCompany(this.currentUser['user_id'])
    }
    this.getPosts()
  }

  reloadPosts(isPost){
    if(isPost){
      this.getPosts()
    }
  }

}
