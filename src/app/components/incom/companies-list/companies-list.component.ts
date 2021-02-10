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

  getCompanies(){
    this.backService.getCompanies().subscribe((response)=>{
      this.listCompany = response;
      this.selectedCompany = response;
      this.loading = false
    })
  }

  getBusinessSectors(){
    this.backService.getBusinessSectors().subscribe((response)=>{
      this.sectors = response
    })
  }

  getSector(id : number){
    let array = this.sectors.filter(x => x.business_sector_id === id);
    if(array.length != 0){
      return array[0].name
    }
    else return ""
  }

  getNbOf(){
    this.backService.getNumberOffers().subscribe((response)=>{
      this.nbOffers = response
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
  }

}
