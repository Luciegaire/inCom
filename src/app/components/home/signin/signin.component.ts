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
    localStorage.removeItem('status')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
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
                this.backService.getCandidateById(response.user.user_id).subscribe({
                  next: (res) => {
                    console.log(res)
                    console.log("candidat")
                    localStorage.setItem('status', "candidate");
                    localStorage.setItem('user', JSON.stringify(res))
                    this.router.navigateByUrl('/incom/feed');
                  },
                  error: () => {
                    this.backService.getEmployeeById(response.user.user_id).subscribe({
                      next: (res) => {
                        console.log("emplouee")
                        localStorage.setItem('status', "employee");
                        localStorage.setItem('user', JSON.stringify(res))
                        this.router.navigateByUrl('/incom/feed');
                      },
                      error: () => {
                        this.statusForm = 2
                        this.router.navigateByUrl('/incom/feed');
                      }
                    })
                  }
                })
              }
            },
            error: () => {
              console.log("error")
              this.statusForm = 2
            }
          })
    }
  }


}
