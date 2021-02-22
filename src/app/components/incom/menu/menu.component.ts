import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  clicked = false;

  linkprofile =""

  linkhome =""

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
      var stat = localStorage.getItem('status').toString()
      this.status = localStorage.getItem('status').toString() == "candidate"
      console.log("statu", status)
      if (stat == "candidate"){
        this.linkprofile = "/incom/profile-page"
      }
      else{
        this.linkprofile = "/incom/profile-company"
      }

  }

  logout(){
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("status")
  }
}
