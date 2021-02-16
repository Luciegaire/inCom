import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company-offers-creation',
  templateUrl: './profile-company-offers-creation.component.html',
  styleUrls: ['./profile-company-offers-creation.component.css']
})
export class ProfileCompanyOffersCreationComponent implements OnInit {

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  userIDselected
  currentUser: any = ""

  statusForm: number = -1;

  formdata = {
    "contract_id" : "",
    "employee_id": "",
    "posted_at": "",
    "content": "",
    "title": "",
    "fast_apply": "1",
    "url": "",
    "salary": "",
    "city": "",
    "department": "",
    "start_date": "",
    "end_date": "",
    "offer_sector_id": "",
    "company_id": ""
  }

  sectors= []
  contracts= []

  constructor(public backService: BackendService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.formdata.company_id = this.currentUser.company_id
    this.formdata.employee_id = this.currentUser.employee_id
    this.getSectors()
    this.getContracts()
  }

  dateNow(onlyDate = false): string {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours() + 2, date.getUTCMinutes(), date.getUTCSeconds());

    var finalDate = new Date(now_utc).toISOString().replace(/T/, " ").replace(/\..+/, "");
    finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate
    return finalDate
  }

  getSectors(){
    this.backService.getSectors().subscribe({
      next: (response) => {
        console.log(response)
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
    this.backService.getContracts().subscribe({
      next: (response) => {
        console.log(response)
        this.contracts = response
      },
      error: () =>{
        console.log("Erreur dans la récupération des contrats")
      },
      complete: () =>{
      }
    })
  }


  changed(id:number){
    this.changeStatus.emit(id);
  }

  createOffer(){
    this.formdata.posted_at = this.dateNow()
    let offer ={
      contract_id : this.formdata.contract_id,
      employee_id: this.formdata.employee_id,
      posted_at: this.formdata.posted_at,
      content:this.formdata.content ,
      title: this.formdata.title,
      fast_apply: this.formdata.fast_apply,
      url:this.formdata.url,
      salary: this.formdata.salary,
      city: this.formdata.city,
      department: this.formdata.department,
      start_date: this.formdata.start_date,
      end_date: this.formdata.end_date,
      offer_sector_id: this.formdata.offer_sector_id,
      company_id: this.formdata.company_id
    }

    this.backService.createOffer(offer).subscribe({
      next: (response) => {
        this.statusForm = 1
        this.changed(3)
        console.log(response)
      },
      error: () =>{
        console.log("erreur création offer")
        this.statusForm = 2
      },
      complete: () =>{

      }
    })
  }

  validate(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    var validate = form.checkValidity()

    if (validate === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');

    if(validate){
      this.createOffer()
    }

  }


}
