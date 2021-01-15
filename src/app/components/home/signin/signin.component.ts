import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

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
