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


  constructor(public backService: BackendService, private router: Router) {
  }

  mycount = 2;
  // Recuperartion de l'objet User
  user = JSON.parse(localStorage.getItem('user'));

  firstame = this.user.firstname;
  lastname = this.user.lastname;
  status = "";
  phone = this.user.phone;
  address = this.user.address;
  postcode = this.user.postcode;
  city = this.user.city;
  gender = this.user.gender;
  birthdate = this.user.birthdate;

  countChange(event) {
    this.mycount = event;
    console.log(this.mycount)
  }


  ngOnInit(): void {
  }

  validate() {
    this.user.birthdate = ""
    //Convert the birthdate object into the right format
    if (this.birthdate != undefined) {
      for (let prop of Object.keys(this.birthdate)) {
        this.user.birthdate += this.birthdate[prop] + '-'
      }
      this.user.birthdate = this.user.birthdate.slice(0, -1)
    }

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    var validate = form.checkValidity()

    if (validate === false) {
      event.preventDefault();
      event.stopPropagation();

    }
    form.classList.add('was-validated');
  }
}

