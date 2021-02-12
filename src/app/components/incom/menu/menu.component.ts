import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  clicked = false;

  clickBurger() {
    this.clicked = !this.clicked
  }

  tab = 0

  changeTab(index: number) {
    this.tab = index
    if (this.clicked == true) {
      this.clickBurger();
    }
  }

  status: boolean

  constructor() { }

  ngOnInit(): void {
    this.status = localStorage.getItem('status').toString() == "candidate"
  }

}
