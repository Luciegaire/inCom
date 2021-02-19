import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cpuUsage } from 'process';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile-company-accounts',
  templateUrl: './profile-company-accounts.component.html',
  styleUrls: ['./profile-company-accounts.component.css']
})
export class ProfileCompanyAccountsComponent implements OnInit {

  currentUser: any = ""
  employees: any [] = []
  users_employees: any[] = []



  @Output()
  changeStatus: EventEmitter<number> = new EventEmitter<number>();

  constructor(public backend: BackendService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getEmployees()
    console.log(this.employees)
  }

  changed(id:number){
    this.changeStatus.emit(id);
  }

  getEmployees(){
    this.backend.getEmployeesByIdCompany(this.currentUser.company_id).subscribe({
      next : (response) =>{
        this.employees = response
        //console.log(response)
      },
      error: () => {
        console.log("Error retrieving employees")
      },
      complete:() =>{
        this.getUserEmployees()
        //console.log(this.users_employees)
      }
    })
  }

  getUserEmployees(){
    this.employees.forEach( employee => {
      this.backend.getUserByID(employee.user_id).subscribe({
        next : (response) => {
          let user = response
          user["role"] = employee.role
          this.users_employees.push(user)
        },
        error: () => {
            console.log("Error retrieving users ")
        }
      })
    })
  }

  removeUser(id){

   this.backend.deleteEmployeeByUserId(id).subscribe({
      next : (response) => {
        console.log("success deleting employee ")

      },
      error: () => {
          console.log("Error deleting employee ")
      },
      complete: () => {
        this.ngOnInit()
      }
    })

  }

}
