import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-company-offers-edit',
  templateUrl: './profile-company-offers-edit.component.html',
  styleUrls: ['./profile-company-offers-edit.component.css']
})
export class ProfileCompanyOffersEditComponent implements OnInit {

  @Input() userIDSelected

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();
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
    offer_id:"",
    city: "",
    content: "",
    contract_id: "",
    department: "",
    end_date: "",
    fast_apply: "1",
    company_id: "",
    offer_sector_id:"",
    posted_at: "",
    salary: "",
    start_date: "",
    title: "",
    url: "",
    employee_id: ""
  }
  backService: any;

  constructor(public backend: BackendService, public datepipe: DatePipe) { }

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


  getOffer(){
    this.backend.getOfferByID(this.userIDSelected).subscribe({
      next : (response) =>{
        this.offer = response
        this.formdata.employee_id = this.offer.employee_id
        this.formdata.offer_id = this.offer.offer_id
        this.formdata.start_date =  this.datepipe.transform(this.offer.start_date , 'yyyy-MM-dd')
        this.formdata.end_date = this.datepipe.transform(this.offer.end_date , 'yyyy-MM-dd')
        this.formdata.contract_id = this.offer.contract_id
        this.formdata.offer_sector_id = this.offer.offer_sector_id
        this.formdata.posted_at = this.offer.posted_at
        this.formdata.company_id = this.offer.company_id
        this.formdata.department = this.offer.department
        this.formdata.title = this.offer.title
        this.formdata.city = this.offer.city
        this.formdata.content = this.offer.content
        this.formdata.salary = this.offer.salary
        this.formdata.url = this.offer.url
        console.log(this.formdata)
      },
      error: () => {
        console.log("Error retrieving offer")
      },
      complete:() =>{
      }
    })
  }

  getSectors(){
    this.backend.getSectors().subscribe({
      next: (response) => {
        //console.log(response)
        this.sectors = response
        console.log("sectors")
        console.log(this.sectors)
      },
      error: () =>{
        console.log("Erreur dans la récupération des secteurs")
      },
      complete: () =>{
      }
    })
  }

  getSector(id : number){
    if(id != undefined){
      let array = this.sectors.filter(x => x['business_sector_id'] === id)
      if(array.length != 0){
        return array[0]['name']
      }
      else return ""
    }
    else return ""
  }

  getContract(id : number){
    if(id != undefined){
      let array = this.contracts.filter(x => x['contract_id'] === id)
      if(array.length != 0){
        return array[0]['name']
      }
      else return ""
    }
    else return ""
  }

  getContracts(){
    this.backend.getContracts().subscribe({
      next: (response) => {
        //console.log(response)
        this.contracts = response
        console.log("contracts")
        console.log(this.contracts)
      },
      error: () =>{
        console.log("Erreur dans la récupération des contrats")
      },
      complete: () =>{
      }
    })
  }

  contractChanges(event : any) {
    let selected : any = event.target.value;
    this.formdata.contract_id = selected
  }


  sectorChanges(event : any) {
    let selected : any = event.target.value;
    this.formdata.offer_sector_id = selected
  }


  updateOffer(){

    this.backend.updateOffer(this.offer.offer_id, this.formdata).subscribe({
      next : (response) =>{
        console.log(response)
        this.statusForm = 1
      },
      error: () => {
        console.log("Error updating offer")
      },
      complete:() =>{

      }
    })
  }

  validate(){
  var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
      var validate = form.checkValidity()
      console.log(this.formdata)
      if (validate === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');

      if(validate){
        this.updateOffer()
      }else{
        this.statusForm = 2
      }
    }

  }
