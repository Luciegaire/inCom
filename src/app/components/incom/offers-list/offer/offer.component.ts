import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  @Input() offer : any

  msg: string = 'error';

  companies : []
  sectors : []
  contracts : []
  likes: any[] = []
  isLike: boolean = false
  user: any
  statusForm : number
  statusApply = []
  file: string;
  selectedImage: any = null;
  candidate : {};
  id: string; // mettre le user_id
  url: string;
  qrCodeURL: string = '';
  user_has_cv: boolean;
  statusFormApply = -1
  statusUser = ""

  formdata = {
    user_id : "",
    offer_id : "",
    company_id : "",
    content : "",
    date : "",
    cv : ""
  }

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService,private backService : BackendService) { }

  getDate(date){
    return new Date(date)
  }

  getCompany(id : number){
    let array = this.companies.filter(x => x['company_id'] === id)
    if(array.length != 0){
      return array[0]['name']
    }
    else return ""
  }

  getContract(id : number){
    let array = this.contracts.filter(x => x['contract_id'] === id)
    if(array.length != 0){
      return array[0]['name']
    }
    else return ""
  }

  getSector(id : number){
    let array = this.sectors.filter(x => x['business_sector_id'] === id)
    if(array.length != 0){
      return array[0]['name']
    }
    else return ""
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

  getCompanies(){
    this.backService.getCompanies().subscribe({
      next: (response) => {
        this.companies = response
      },
      error: () =>{
        console.log("erreur récupération secteurs")
      },
      complete: () =>{
      }
    })
  }

  getContracts(){
    this.backService.getContracts().subscribe({
      next: (response) => {
        this.contracts = response
      },
      error: () => {
        console.log("Erreur création user")
      },
      complete: () => {

      }
    })
  }

  getContent(text){
    if(text.length > 1000){
      return text.slice(0, 1000)+"...";
    }
    else
    return text
  }

  getLike() {
    this.backService.getLikesOfferByOfferIdAndUserId(this.offer.offer_id,this.user.user_id).subscribe({
      next : (response) =>{
        this.likes = response
        if(this.likes.length != 0){
          this.isLike = true
        }
        else{
          this.isLike = false
        }
        console.log(this.likes)
      },
      error: () => {
        console.log("Error retrieving comments")
      },
      complete: () => {
        //this.isLike = this.isLiked()
      }
    })
  }

  like(offer){
    let like = {
      user_id: this.user.user_id,
      offer_id: offer.offer_id
    }
    this.backService.createLikeOffer(like).subscribe({
      next : (response) =>{
        offer["isLiked"] = 1
        this.ngOnInit()
      },
      error: () => {
        console.log("Error like!")
      },
    })
  }

  unlike(offer){
    let like = {
      user_id: this.user.user_id,
      offer_id: offer.offer_id
    }

    this.backService.deleteLikeOffer(like.offer_id, like.user_id).subscribe({
      next : (response) =>{
        offer["isLiked"] = 0
        this.ngOnInit()
      },
      error: () => {
        console.log("Error unlike!")
      },
    })
  }

  dateNow(onlyDate = false): string {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours() + 2, date.getUTCMinutes(), date.getUTCSeconds());

    var finalDate = new Date(now_utc).toISOString().replace(/T/, " ").replace(/\..+/, "");
    finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate
    return finalDate
  }

  apply(){
    console.log(this.formdata)
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    var validate = form.checkValidity()

    if (validate === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');

    if(validate){
      if(this.user_has_cv == true){
        if(this.statusApply.length == 0){

          this.formdata.date = this.dateNow()
          console.log(this.formdata)
          this.backService.createApplication(this.formdata).subscribe({
            next: (response) => {
              console.log(response)
              this.statusForm = 1
              this.ngOnInit()

            },
            error: () =>{
              console.log("erreur creation application")
              this.statusForm = 2
            },
            complete: () =>{

            }
          })
        }else{
          this.statusForm = 4
          console.log("vous avez déjà postulé")
        }

      }else{
        this.statusForm = 3
        console.log("Vous devez uploader un cv")
      }

    }


  }




  getApplication(id){
    console.log(id)
    this.backService.getApplication(this.user.user_id, id).subscribe({
      next: (response) => {
        console.log("taille: " + response.length)
        if(response.length != 0){
          this.statusApply = response
        }else{
          this.statusApply = []
        }

      },
      error: () =>{
        console.log("erreur get application")
      },
      complete: () =>{

      }
    })
  }

  getPDF(value) {
    this.fileService.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileService.fileList = list.map(item => { return item.payload.val(); });
        this.fileService.fileList.forEach(element => {
          if (element.id === value)
            this.msg = element.url;
        });
        if (this.msg === 'error') {
          alert('No record found');
        }
        else {
          console.log(this.msg);
          this.qrCodeURL = this.msg
          this.formdata.cv = this.qrCodeURL
          this.msg = 'error';
        }
      }
    );
  }

  ngOnInit(): void {
    this.fileService.getImageDetailList();
    this.user = JSON.parse(localStorage.getItem('user'))
    this.statusUser = localStorage.getItem('status')
    this.formdata.user_id = this.user.user_id
    this.formdata.offer_id = this.offer.offer_id
    this.formdata.company_id = this.offer.company_id
    this.getBusinessSectors()
    this.getCompanies()
    this.getContracts()
    this.getLike()
    this.getCandidate(this.user['user_id']);
    this.getApplication(this.offer.offer_id)

  }

  getCandidate(id : number){
    this.backService.getCandidateById(id).subscribe({
      next: (response) => {
        //console.log(response)
        this.candidate = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.userCV();
        this.getPDF(this.candidate['candidate_id']);
      }
    })
  }

  userCV() {
    if (this.candidate['cv_id']==='true'){
      this.user_has_cv = true;
    } else {
      this.user_has_cv = false;
    }
    return this.user_has_cv;
  }


}
