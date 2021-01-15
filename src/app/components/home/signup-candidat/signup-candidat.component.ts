import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-signup-candidat',
  templateUrl: './signup-candidat.component.html',
  styleUrls: ['./signup-candidat.component.css']
})
export class SignupCandidatComponent implements OnInit {


  status: number = 0;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  // tslint:disable-next-line:typedef
  changed(id:number){
    this.status = id;
    this.change.emit(id);
  }
  constructor(){

  }
  ngOnInit(): void {
  }

}
