import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-candidate',
  templateUrl: './profile-candidate.component.html',
  styleUrls: ['./profile-candidate.component.css']
})
export class ProfileCandidateComponent implements OnInit {

  page = 1;
  statusForm: number = -1;
  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  status: number = 1;

  constructor(public backService: BackendService, private router: Router) {
  }

  mycount = 2;
  id = localStorage.getItem('user_id');

  countChange(event) {
    this.mycount = event;
    console.log(this.mycount)
  }


  ngOnInit(): void {
  }

  changed(id: number) {
    this.status = id;
    this.changeStatus.emit(id);
  }


}
