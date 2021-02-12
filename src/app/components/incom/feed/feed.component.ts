import { CompileTemplateMetadata } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class FeedComponent implements OnInit {

  posts:any[] = []

  constructor(public backend: BackendService) {

  }

  ngOnInit(): void {
    this.backend.getPosts().subscribe({
      next : (response) =>{
        this.posts = response
        this.posts = this.posts.reverse()
      },
      error: () => {
        console.log("Error retrieving posts")
      },
    })
  }

}
