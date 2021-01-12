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
      content:"entreprise de téléphonie",
      img:""
    },
    {
      id:1,
      name:"Mcdonald's",
      content:"Restauration rapide",
      img:""
    },
    {
      id:2,
      name:"Naval Group",
      content:"entreprise pour l'armée",
      img:""
    },
    {
      id:3,
      name:"Mcdonald's",
      content:"Restauration rapide",
      img:""
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
