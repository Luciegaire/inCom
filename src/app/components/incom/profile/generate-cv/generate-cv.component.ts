import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.css']
})
export class GenerateCvComponent implements OnInit {

  constructor() { }

  // elementType = 'url';
  value = 'https://www.google.com/';
  elementType = NgxQrcodeElementTypes.URL;
  scale = 8;

  public QRcode: boolean = false;

  displayQrcode() {
    this.QRcode = true;
  }

  closeQrcode() {
    this.QRcode = false;
  }
  ngOnInit(): void {
  }

}
