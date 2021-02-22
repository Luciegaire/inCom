import { Component, OnInit, Inject } from '@angular/core';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { FileService } from 'src/app/services/file.service';
import { BackendService } from 'src/app/services/backend.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.css']
})
export class GenerateCvComponent implements OnInit {

  currentUser: any ="";
  user_has_cv: boolean;
  loader:boolean = false;


  selectedImage: any = null;

  url: string;
  id: string; // mettre le user_id
  file: string;

  msg: string = 'error';
  qrCodeURL: string = '';
  candidate : {};

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService, private BackendService : BackendService) { }

  ngOnInit() {
    this.fileService.getImageDetailList();
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getCandidate(this.currentUser['user_id']);
  }
  
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  save() {
    this.loader = true;
    this.id = this.candidate['candidate_id'] //user_id
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.fileService.insertImageDetails(this.id, this.url);
          this.loader = false;
          this.opensweetalert();
          this.user_has_cv = true;
          this.BackendService.updateCandidateCV(this.id,{cv_id : "true"}).subscribe({
            next: (response) => {
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


  userCV() {
    if (this.candidate['cv_id']==='true'){
      this.user_has_cv = true;
    } else {
      this.user_has_cv = false;
    }
    return this.user_has_cv;
  }


  elementType = NgxQrcodeElementTypes.URL;
  scale = 3;

  public QRcode: boolean = false;

  displayQrcode() {
    this.getPDF(this.candidate['candidate_id']);
    this.QRcode = true;
  }

  closeQrcode() {
    this.QRcode = false;
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
          this.opensweetalertError();
        }
        else {
          console.log(this.msg);
          this.qrCodeURL = this.msg
          this.msg = 'error';
        }
      }
    );
  }


  getCandidate(id : number){
    this.BackendService.getCandidateById(id).subscribe({
      next: (response) => {
        //console.log(response)
        this.candidate = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.userCV();
      }
    })
  }

  opensweetalert()
  {
    Swal.fire({
        text: 'Votre CV a bien été enregistré !',
        icon: 'success'
      });
  }
  
  opensweetalertError()
  {
    Swal.fire({
        text: 'Oups... une errreur est survenue ! Veuillez réessayer plus tard.',
        icon: 'error'
      });
  }
}
