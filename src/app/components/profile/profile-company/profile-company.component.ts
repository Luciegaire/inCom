import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {
  companyProfile = true;
  companyOffers = false;
  companyOffers2 = false;
  companyAccounts = false;

  constructor() { }

  // tslint:disable-next-line: typedef
  DisplayProfile() {
    this.companyProfile = true;
    this.companyOffers = false;
    this.companyOffers2 = false;
    this.companyAccounts = false;
  }

  // tslint:disable-next-line: typedef
  DisplayOffers() {
    this.companyProfile = false;
    this.companyOffers = true;
    this.companyOffers2 = false;
    this.companyAccounts = false;
  }

  // tslint:disable-next-line: typedef
  DisplayOffers2() {
    this.companyProfile = false;
    this.companyOffers = false;
    this.companyOffers2 = true;
    this.companyAccounts = false;
  }

  // tslint:disable-next-line: typedef
  DisplayAccounts() {
    this.companyProfile = false;
    this.companyOffers = false;
    this.companyOffers2 = false;
    this.companyAccounts = true;
  }

  ngOnInit(): void {
  }

}
