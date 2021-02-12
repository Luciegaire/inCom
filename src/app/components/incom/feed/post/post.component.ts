import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,

})

export class PostComponent implements OnInit {


  @Input() post: any
  comments: any[] = []
  comment: string;
  statusComment: number = -1
  likes: any[] = []
  isLike: boolean = false
  currentUser: any


  constructor(public backService: BackendService) {

  }

  getComments() {
    this.backService.getCommentsByID(this.post.post_id).subscribe({
      next : (response) =>{
        if(response != null){
          this.comments = response
        }
      },
      error: () => {
        console.log("Error retrieving comments")
      },
      complete: () => {
        this.getLikes()
      }

    })
  }

  getLikes() {
    this.backService.getLikesByID(this.post.post_id).subscribe({
      next : (response) =>{
        this.likes = response
      },
      error: () => {
        console.log("Error retrieving comments")
      },
      complete: () => {
        this.isLike = this.isLiked()
      }
    })
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.getComments()
  }

  changeStatusComment(){
    if(this.statusComment != 1)
      this.statusComment = 1
    else this.statusComment = -1
  }

  dateNow(onlyDate = false): string {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours() + 2, date.getUTCMinutes(), date.getUTCSeconds());

    var finalDate = new Date(now_utc).toISOString().replace(/T/, " ").replace(/\..+/, "");
    finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate
    return finalDate
  }

  deleteComment(id){
    this.backService.deleteCommentsByID(id).subscribe({
      next : (response) =>{
        console.log("Comment removed!")
        this.ngOnInit()
      },
      error: () => {
        console.log("Error removing user!")
      },
      complete : () => {

      }
    })
  }

  sendComment(){
    let currentDate = this.dateNow()
    let user = JSON.parse(localStorage.getItem('user'));
    let comment = {
      user_id: user.user_id,
      post_id: this.post.post_id ,
      text : this.comment,
      posted_at: currentDate
    }
    this.backService.createComment(comment).subscribe({
      next : (response) =>{
        console.log("Message sent!")
        this.comment = ''
        this.ngOnInit();
      },
      error: () => {
        console.log("Error sending msg!")
      },
    })


    console.log(this.comment)
  }

  isLiked(){
    return this.likes.some(like => like.user_id === this.currentUser.user_id)
  }




  like(){
    let like = {
      user_id: this.currentUser.user_id,
      post_id: this.post.post_id
    }
    this.backService.createLike(like).subscribe({
      next : (response) =>{
        this.likes.push(response)
        this.ngOnInit()
      },
      error: () => {
        console.log("Error like!")
      },
    })
    this.isLike = !this.isLike
  }



  unlike(){
    console.log(this.isLiked())
    let like = {
      user_id: this.currentUser.user_id,
      post_id: this.post.post_id
    }

    this.backService.deleteLike(like.post_id, like.user_id).subscribe({
      next : (response) =>{
        this.ngOnInit()
      },
      error: () => {
        console.log("Error unlike!")
      },
    })
    this.isLike = !this.isLike
  }
}


