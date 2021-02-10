import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Input()
  status: number = 1;

  statusForm: number = -1;

  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  formdata = {
    email: "",
    password: ""
  }

  changed(id:number){
    this.status = id;
    this.changeStatus.emit(id);
  }

  constructor(public authService: AuthService, public backService: BackendService, private router: Router) { }

  ngOnInit(): void {
      this.statusForm = -1
  }

  login(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    var validate = form.checkValidity()

    if (validate === false) {
      event.preventDefault();
      event.stopPropagation();

    }
    form.classList.add('was-validated');

    if (this.formdata.email && this.formdata.password) {
      this.authService.login(this.formdata.email, this.formdata.password)
          .subscribe({
            next: (response) => {
              console.log(response.user.user_id)
              console.log("User is logged in");
              if(response.token){
                this.statusForm = 1
                localStorage.setItem('token', response.token);
                localStorage.setItem('user_id', response.user.user_id)
                this.backService.getCandidateById(response.user.user_id).subscribe({
                  next: () => {
                    localStorage.setItem('status', "candidate");
                  },
                  error: () => {
                    localStorage.setItem('status', "employee");
                  }
                })
                this.router.navigateByUrl('/incom/feed');
              }
            },
            error: () => {
              this.statusForm = 2
            }
          })
    }
  }


}
