import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company-offers-edit',
  templateUrl: './profile-company-offers-edit.component.html',
  styleUrls: ['./profile-company-offers-edit.component.css']
})
export class ProfileCompanyOffersEditComponent implements OnInit {

  @Input() userIDSelected

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();
  currentUser: any = ""
  offer: any = ""
  statusForm: number = -1;
  sector = ""
  sectors : any []
  contracts= []

  @ViewChild('city') city:ElementRef;
  @ViewChild('content') content:ElementRef;
  @ViewChild('department') department:ElementRef;
  @ViewChild('end_date') end_date:ElementRef;
  @ViewChild('contract_id') contract_id:ElementRef;
  @ViewChild('offer_sector_id') offer_sector_id:ElementRef;
  @ViewChild('posted_at') posted_at:ElementRef;
  @ViewChild('salary') salary:ElementRef;
  @ViewChild('start_date') start_date:ElementRef;
  @ViewChild('title') title:ElementRef;
  @ViewChild('url') url:ElementRef;


  formdata = {
    city: "",
    content: "",
    contract_id: "",
    department: "",
    end_date: "",
    logo: "",
    fast_apply: "1",
    company_id: "",
    offer_sector_id:"",
    posted_at: "",
    salary: "",
    start_date: "",
    title: "",
    url: ""
  }
  backService: any;

  constructor(public backend: BackendService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getOffer()
    this.getSectors()
    this.getContracts()
  }

  changed(id:number){
    this.changeStatus.emit(id);
  }

  getDate(date){
    return new Date(date)
  }

  getSector(id){
    console.log("get sector")
      this.backend.getSectorById(id).subscribe({
        next : (response) =>{
          this.sector = response
          //console.log(this.sector)
        },
        error: () => {
          console.log("Error retrieving sector")
        },
        complete:() =>{
        }
      })


  }

  getOffer(){
    this.backend.getOfferByID(this.userIDSelected).subscribe({
      next : (response) =>{
        this.offer = response
        //console.log(response)
        console.log("heyy")
      },
      error: () => {
        console.log("Error retrieving offer")
      },
      complete:() =>{
        this.getSector(this.offer.sector_id)

      }
    })
  }

  getSectors(){
    this.backend.getSectors().subscribe({
      next: (response) => {
        //console.log(response)
        this.sectors = response
      },
      error: () =>{
        console.log("Erreur dans la récupération des secteurs")
      },
      complete: () =>{
      }
    })
  }

  getContracts(){
    this.backend.getContracts().subscribe({
      next: (response) => {
        //console.log(response)
        this.contracts = response
      },
      error: () =>{
        console.log("Erreur dans la récupération des contrats")
      },
      complete: () =>{
      }
    })
  }

  updateCompany(){
    this.backend.updateCompany(this.currentUser.company_id, this.formdata).subscribe({
      next : (response) =>{
        console.log(response)
      },
      error: () => {
        console.log("Error updating company")
      },
      complete:() =>{
      }
    })
  }

  validate(){
    this.formdata.title = this.title.nativeElement.value
    this.formdata.contract_id = this.contract_id.nativeElement.value
    this.formdata.offer_sector_id = this.offer_sector_id.nativeElement.value
    /*this.formdata.content = this.content.nativeElement.value
    this.formdata.salary = this.salary.nativeElement.value
    this.formdata.city = this.city.nativeElement.value
    this.formdata.department = this.department.nativeElement.value
    this.formdata.start_date = this.start_date.nativeElement.value
    this.formdata.end_date = this.end_date.nativeElement.value
    this.formdata.url = this.url.nativeElement.value*/



    console.log(this.formdata)
  }

}
