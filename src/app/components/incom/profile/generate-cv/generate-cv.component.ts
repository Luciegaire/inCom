import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.css']
})
export class GenerateCvComponent implements OnInit {

  constructor() { }
  
  public myAngularxQrCode: string = 'https://www.google.com/';
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
