import { Component, OnInit, Inject } from '@angular/core';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { FileService } from 'src/app/services/file.service';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http'
import { AngularFireFunctions } from "@angular/fire/functions";




@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.css']
})
export class GenerateCvComponent implements OnInit {


  selectedImage: any = null;

  url: string;
  id: string; // mettre le user_id
  file: string;

  msg: string = 'error';
  qrCodeURL: string = '';

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService) { }

  ngOnInit() {
    this.fileService.getImageDetailList();
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  save() {
    this.id = '2' //user_id
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.fileService.insertImageDetails(this.id, this.url);
          alert('Votre CV a bien été enregistré !');
        })
      })
    ).subscribe();
  }

  user_has_cv: boolean = true;
  elementType = NgxQrcodeElementTypes.URL;
  scale = 3;

  public QRcode: boolean = false;

  displayQrcode() {
    this.getPDF('1')
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

}
