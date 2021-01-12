import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tab : number = 1

  rows : [ "cc", "aa", "zz", "ee", "rr"]
  constructor(private back : BackendService) { }

  changeTab(nb : number): void {
    this.tab = nb
  }

  ngOnInit(): void {
    this.back.toto()
    // avant de charger la vue 
  }

}
