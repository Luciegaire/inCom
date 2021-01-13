import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-profile-informations',
  templateUrl: './profile-informations.component.html',
  styleUrls: ['./profile-informations.component.css']
})
export class ProfileInformationsComponent implements OnInit {

  @Input()
  count: number = 0;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  // tslint:disable-next-line:typedef
  changed(id:number){
    this.count = id;
    this.change.emit(id);
  }
  constructor() { }
  ngOnInit(): void {
  }
}
