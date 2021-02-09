import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @Input()
  status: number = 1;

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  changed(id:number){
    this.status = id;
    this.changeStatus.emit(id);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
