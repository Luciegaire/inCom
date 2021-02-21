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
  statusApply = -1
  file: string;
  selectedImage: any = null;
  candidate : {};
  id: string; // mettre le user_id
  url: string;
  qrCodeURL: string = '';


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

    console.log(this.statusApply)

    this.save()
    /*if(this.statusApply == -1){
      this.formdata.date = this.dateNow()
      console.log(this.formdata)
      this.backService.createApplication(this.formdata).subscribe({
        next: (response) => {
          console.log(response)
          this.statusForm = 1
          this.statusApply = 1
        },
        error: () =>{
          this.statusForm = 2
          console.log("erreur creation application")
        },
        complete: () =>{

        }
      })
    }
    else{
      console.log("vous avez déjà postulé")
    }*/
  }

  getApplication(){
    this.backService.getApplication(this.user.user_id, this.offer.offer_id).subscribe({
      next: (response) => {
        console.log("taille: " + response.length)
        if(response.length != 0){
          this.statusApply = 1
        }else{
          this.statusApply = -1
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
          this.msg = 'error';
        }
      }
    );
  }

  ngOnInit(): void {
    this.fileService.getImageDetailList();
    this.user = JSON.parse(localStorage.getItem('user'))
    this.formdata.user_id = this.user.user_id
    this.formdata.offer_id = this.offer.offer_id
    this.formdata.company_id = this.offer.company_id
    this.getBusinessSectors()
    this.getCompanies()
    this.getContracts()
    this.getLike()
    this.getApplication()
    this.getCandidate(this.user['user_id']);


  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  save() {
    this.id = this.candidate['candidate_id'] //user_id
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.fileService.insertImageDetails(this.id, this.url);
          alert('Votre CV a bien été enregistré !');
          this.backService.updateCandidateCV(this.id,{cv_id : "true"}).subscribe({
            next: (response) => {
              //console.log(response)
              this.candidate['cv_id'] = "true";
            },
            error: () =>{
              console.log("erreur update candidate cv_id")
            },
            complete: () =>{
            }
          });
        })
      })
    ).subscribe();
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
      }
    })
  }



}
