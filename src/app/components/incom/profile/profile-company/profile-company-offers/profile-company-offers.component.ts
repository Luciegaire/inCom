import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company-offers',
  templateUrl: './profile-company-offers.component.html',
  styleUrls: ['./profile-company-offers.component.css']
})
export class ProfileCompanyOffersComponent implements OnInit {
  currentUser: any = ""
  offers : any [] = []
  employees: any [] = []
  users_employees: any[] = []



  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  changeUserIDSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(public backend: BackendService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getOffers()
  }

  changed(id:number){
    this.changeStatus.emit(id);
  }

  changeStatusAndUserSelected(id: number, userId: number){
    console.log("edit")
    this.changeStatus.emit(id);
    this.changeUserIDSelected.emit(userId);
  }

  getDate(date){
    return new Date(date)
  }


  deleteOffer(id){

    this.backend.deleteOfferyID(id).subscribe({
      next: (res) => {
        console.log("success removing offer")
        this.ngOnInit()
      },
      error: () => {
        console.log("erreur suppression offre")
      }
    })

  }
  getOffers(){
    this.backend.getOfferByCompany(this.currentUser.company_id).subscribe({
      next : (response) =>{
        this.offers = response
        console.log(this.offers)
      },
      error: () => {
        console.log("Error retrieving offers")
      },
      complete:() =>{

        this.offers.forEach(offer => {
          this.backend.getContractByID(offer["contract_id"]).subscribe({
            next: (res) => {
              offer["contract"] = res.name
            }
          })
        })

        this.offers.forEach(offer => {
          this.backend.getEmployeeByEmployeeId(offer["employee_id"]).subscribe({
            next: (res) => {
              offer["lastname"] = res.lastname
              offer["firstname"] = res.firstname
            }
          })
        })






      }
    })
  }

}
