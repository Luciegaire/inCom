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
      name:"Orange",
      sector:"Société francaise de télécommunications",
      img:"../../../assets/img/orange.png"
    },
    {
      id:1,
      name:"Mcdonald's",
      sector:"Chaine de restauration rapide",
      img:"../../../assets/img/mcdo.png"
    },
    {
      id:2,
      name:"Naval Group",
      sector:"Leader européen du naval de défense",
      img:"../../../assets/img/naval.jpg"
    },
    {
      id:3,
      name:"Mcdonald's",
      sector:"Chaine de estauration rapide",
      img:"../../../assets/img/mcdo.png"
    }
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
