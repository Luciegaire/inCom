import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company-apply',
  templateUrl: './profile-company-apply.component.html',
  styleUrls: ['./profile-company-apply.component.css']
})
export class ProfileCompanyApplyComponent implements OnInit {

  user: any
  applications : any
  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  constructor(public backend: BackendService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getApplicationByCompany()
  }

  getApplicationByCompany(){
    this.backend.getApplicationCompany(this.user.company_id).subscribe({
      next: (res) => {
        console.log(res)
        this.applications = res
      },
      error: () => {
        console.log("erreur retrieving application")
      },
      complete: () => {
        this.applications.forEach(application => {
          var res
          var res2
          this.backend.getUserByID(application.user_id).subscribe({
            next : (response) =>{
              res = response
            },
            error: () => {
              console.log("Error retrieving user!")
            },
            complete: () => {
              console.log(res)
              application['firstname'] = res.firstname
              application['lastname'] = res.lastname
              application['email'] = res.email
            }
          })

          this.backend.getOfferByID(application.offer_id).subscribe({
            next : (response) =>{
              console.log(response)
              res2 = response
            },
            error: () => {
              console.log("Error retrieving user!")
            },
            complete: () => {
              application['title'] = res2.title
            }
          })

        });
      }

    })
  }

  changed(id:number){
    this.changeStatus.emit(id);
  }


}
