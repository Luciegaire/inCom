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

  constructor(public backService: BackendService) {

  }

  getComments() {
    this.backService.getCommentsByID(this.post.post_id).subscribe({
      next : (response) =>{
        console.log("trouvé")
        this.comments = response
        console.log(this.comments)
      },
      error: () => {
        console.log("Error retrieving comments")
      }
    })
  }

  ngOnInit(): void {
    console.log("post: " + this.post)
    this.getComments()
  }

  onClick(id) {
    console.log(id)
  }

}


