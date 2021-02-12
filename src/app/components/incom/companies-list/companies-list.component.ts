import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  sectors = []

  loading = true;
  listCompany= []
  nbOffers=[]

  selectedCompany = [];
  selectedSectors = [];

  options : any = {
    path: '/assets/lottie/loader_file.json',
  };

  user : {}
  candidate : {}
  current_situation = ""

  constructor(
    public backService: BackendService
    ) { }

  clickedCheck(checked : boolean, idSelect : number){
    if(checked){
      this.selectedSectors.push(idSelect);
      }
    else{
      var index = this.selectedSectors.indexOf(idSelect);
      this.selectedSectors.splice(index, 1);
    }
    if (this.selectedSectors.length > 0){
      this.selectedCompany = this.listCompany.filter((item) => this.selectedSectors.indexOf(item.business_sector_id) != -1);
    }
    else {
      this.selectedCompany = this.listCompany
    }
  }

  getCandidate(id : number){
    this.backService.getCandidateById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.candidate = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.getCurrentSituation(this.candidate['current_situation_id'])
      }
    })
  }

  getCompanies(){
    this.backService.getCompanies().subscribe({
      next: (response) => {
        this.listCompany = response;
        this.selectedCompany = response;
        this.loading = false
      },
      error: () =>{
        console.log("erreur récupération entreprises")
      },
      complete: () =>{
      }
    })
  }

  getBusinessSectors(){
    this.backService.getBusinessSectors().subscribe({
      next: (response) => {
        this.sectors = response
      },
      error: () =>{
        console.log("erreur récupération secteurs")
      },
      complete: () =>{
      }
    })
  }

  getSector(id : number){
    let array = this.sectors.filter(x => x.business_sector_id === id);
    if(array.length != 0){
      return array[0].name
    }
    else return ""
  }

  getCurrentSituation(id:number){
    this.backService.getSituationById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.current_situation = response.name
      },
      error: () =>{
        console.log("erreur récupération situation")
      },
      complete: () =>{
      }
    })
  }

  getNbOf(){
    this.backService.getNumberOffers().subscribe({
      next: (response) => {
        this.nbOffers = response
      },
      error: () =>{
        console.log("erreur récupération nombre d'offre")
      },
      complete: () =>{
      }
    })
  }

  getNunber(id :number){
    let array = this.nbOffers.filter(x => x.company_id === id);
    if(array.length != 0){
      return array[0].nbOffers
    }
    else return "0"
  }

  ngOnInit(): void {
    this.getCompanies()
    this.getBusinessSectors()
    this.getNbOf()
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCandidate(this.user['user_id'])

  }

}
