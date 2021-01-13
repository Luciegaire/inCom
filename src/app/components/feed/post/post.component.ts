import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {



  posts = []

  constructor(public backService: BackendService) {

   }

  ngOnInit(): void {
    this.backService.getPosts().subscribe((response)=>{
      let value = response["hydra:member"]
      this.posts = value
      console.log(value)

    })

  }

}


