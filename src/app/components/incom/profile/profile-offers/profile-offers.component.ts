import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';


@Component({
  selector: 'app-profile-offers',
  templateUrl: './profile-offers.component.html',
  styleUrls: ['./profile-offers.component.css']
})
export class ProfileOffersComponent implements OnInit {

  currentUser: any = "";
  candidate: {};
  listOffersLiked = [];
  candidateOrCompany : {};
  sectors : [];
  contract = "";




  constructor(private BackendService: BackendService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getOffersByUserIdLike(this.currentUser['user_id']);
  }

  getOffersByUserIdLike(id: number) {
    this.BackendService.getOffersByUserIdLike(id).subscribe({
      next: (response) => {
        this.listOffersLiked = response;
        console.log(this.listOffersLiked);
      },
      error: () => {
        console.log("erreur récupération entreprises")
      },
      complete: () => {
      }
    })
  }



  getCompanyByIdUser(id: number) {
    this.BackendService.getCompanyByUserId(id).subscribe({
      next: (response) => {
        //console.log("company",response)
        this.candidateOrCompany = response
      },
      error: () => {
        console.log("erreur récupération candidate")
      },
      complete: () => {
        this.getBusinessSector(this.candidateOrCompany['business_sector_id'])
      }
    })
  }

  getBusinessSector(id : number){
    this.BackendService.getSectorById(id).subscribe({
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

  // getOfferByID(id : number) {
  //   this.BackendService.getOfferByID(id).subscribe({
  // }
  

}
