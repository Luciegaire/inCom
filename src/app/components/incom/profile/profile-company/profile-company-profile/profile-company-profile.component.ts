import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company-profile',
  templateUrl: './profile-company-profile.component.html',
  styleUrls: ['./profile-company-profile.component.css']
})
export class ProfileCompanyProfileComponent implements OnInit {

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();
  currentUser: any = ""
  company: any = ""
  statusForm: number = -1;


  @ViewChild('name') name:ElementRef;
  @ViewChild('logo') logo:ElementRef;
  @ViewChild('referent_lastname') referent_lastname:ElementRef;
  @ViewChild('referent_firstname') referent_firstname:ElementRef;
  @ViewChild('referent_email') referent_email:ElementRef;
  @ViewChild('referent_phone') referent_phone:ElementRef;

  formdata = {
    name: "",
    referent_lastname: "",
    referent_firstname: "",
    referent_email: "",
    referent_phone: "",
    logo: "",
    status: "0",
    business_sector_id: ""
  }

  constructor(public backend: BackendService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getCompany()
  }

  changed(id:number){
    this.changeStatus.emit(id);
  }

  getCompany(){
    this.backend.getCompanyByID(this.currentUser.company_id).subscribe({
      next : (response) =>{
        this.company = response
        console.log(response)
      },
      error: () => {
        console.log("Error retrieving company")
      },
      complete:() =>{
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
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    var validate = form.checkValidity()

    this.formdata.name = this.name.nativeElement.value
    this.formdata.logo = this.logo.nativeElement.value
    this.formdata.referent_lastname = this.referent_lastname.nativeElement.value
    this.formdata.referent_firstname = this.referent_firstname.nativeElement.value
    this.formdata.referent_email = this.referent_email.nativeElement.value
    this.formdata.referent_phone = this.referent_phone.nativeElement.value
    this.formdata.business_sector_id = this.company.business_sector_id
    console.log(this.company.business_sector_id)
    console.log(this.formdata)
    if (validate === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');

    if(validate){
      this.updateCompany()
    }

  }

}
