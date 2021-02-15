import {Component, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {ProfileInformationsComponent} from '../profile-informations/profile-informations.component';
import {BackendService} from '../../../../services/backend.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  page = 1;
  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  constructor(public backService: BackendService, private router: Router) {
  }

  mycount = 2;

  countChange(event) {
    this.mycount = event;
    console.log(this.mycount)
  }


  ngOnInit(): void {
  }
}
