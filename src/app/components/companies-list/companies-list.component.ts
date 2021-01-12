import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  listCompany= [
    {
      id:0,
      name:"orange",
      content:"entreprise de téléphonie"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
