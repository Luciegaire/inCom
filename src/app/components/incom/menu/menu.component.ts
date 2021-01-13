import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  tab=0

  changeTab(index :number){
    this.tab = index
  }

  constructor() { }

  ngOnInit(): void {
  }

}
