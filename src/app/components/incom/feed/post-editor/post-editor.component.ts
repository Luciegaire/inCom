import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuillConfiguration } from "./quill-configuration";
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  quillConfiguration = QuillConfiguration;
  @Input() control: FormControl

  constructor(
    public backService: BackendService,
  ) {

   }

  ngOnInit(): void {
    this.control = this.control ?? new FormControl()
  }

  dateNow(onlyDate = false): string {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours() + 2, date.getUTCMinutes(), date.getUTCSeconds());

    var finalDate = new Date(now_utc).toISOString().replace(/T/, " ").replace(/\..+/, "");
    finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate
    return finalDate
  }

  sendPost(): void {
    let currentDate = this.dateNow()
    var user = JSON.parse(localStorage.getItem('user'));

    this.backService.getEmployeeById(user.user_id).subscribe((response) => {
      let author = response.firstname+ " " +response.lastname
      let data = {
        employee_id : user.user_id,
        posted_at : currentDate,
        author : author,
        content : this.control.value
      }
      this.backService.createPost(data).subscribe((response) =>{
        console.log(response)
      })
    })


    console.log(this.control.value)
  }

}
