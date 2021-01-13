import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {

  offers = [
    {
      offer_id : 1,
      psted_at : "12-01-2021",
      content : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web.",
      title : "Vendeur en prêt à porter",
      fast_apply : 0,
      url :"https://www.google.com/",
      salary : "1500",
      city : "Marseille",
      department : 13,
      start_date : "15-06-2021",
      end_date : "02-09-2021",
      contract_id : "CDD", // à changer plus tard car id
      offer_sectir_id : "Vente", // à changer plus tard car id
      employee_id : "Pierre Le Ny", // à changer plus tard car id
      company_id : "The Kooples" //// à changer plus tard car id ET A RAJOUTER EN BASE
    },
    {
      offer_id : 2,
      psted_at : "12-01-2021",
      content : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web.",
      title : "Développeur Angular",
      fast_apply : 0,
      url :"https://www.google.com/",
      salary : "2500",
      city : "Aix-en-Provence",
      department : 13,
      start_date : "15-06-2021",
      end_date : "null",
      contract_id : "CDI", // à changer plus tard car id
      offer_sectir_id : "Ingénierie", // à changer plus tard car id
      employee_id : "Florian Ricciardi", // à changer plus tard car id
      company_id : "Capgemini" //// à changer plus tard car id ET A RAJOUTER EN BASE
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
