import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  status: number = 0;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  // tslint:disable-next-line:typedef
  changed(id:number){
    this.status = id;
    this.change.emit(id);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
