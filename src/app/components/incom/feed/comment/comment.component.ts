import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: any

  constructor(public backend: BackendService) { }

  user: any = ""
  lastname: string = ""
  firstname: string = ""

  @Output() idComment: EventEmitter<number> =   new EventEmitter();

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.comment)
    this.backend.getUserByID(this.comment.user_id).subscribe({
      next : (response) =>{
        this.firstname = response.firstname
        this.lastname = response.lastname
      },
      error: () => {
        console.log("Error retrieving user!")
      },
    })

  }

  getDate(date){
    return new Date(date)
  }

  removeComment(){
    this.idComment.emit(this.comment.comment_id);
  }

}
