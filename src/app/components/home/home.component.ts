import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  status: number = 3
  constructor() { }

  statusChange(event){
    this.status = event;
    console.log(this.status)
  }


  ngOnInit(): void {
  }

}
