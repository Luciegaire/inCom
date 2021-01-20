import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-candidate',
  templateUrl: './profile-candidate.component.html',
  styleUrls: ['./profile-candidate.component.css']
})
export class ProfileCandidateComponent implements OnInit {

  candidates = [];

  constructor(
    public backService: BackendService
  ) { }

  ngOnInit(): void {
    this.backService.getCandidate().subscribe((response) => {
      console.log(response);
    });
  }
}
