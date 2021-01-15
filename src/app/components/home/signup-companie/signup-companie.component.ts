import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-signup-companie',
  templateUrl: './signup-companie.component.html',
  styleUrls: ['./signup-companie.component.css']
})
export class SignupCompanieComponent implements OnInit {

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
