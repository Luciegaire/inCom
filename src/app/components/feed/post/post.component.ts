import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  posts = [
    {
      post_id : 1,
      posted_at : "12/01/2021",
      first_name: "Florent",
      last_name: "Ricciardi",
      infos: "Ingénieur Full Stack, Scrum Master, Positive Thinker",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web."
    },
    {
      post_id : 2,
      posted_at : "12/01/2021",
      first_name: "Pierre",
      last_name: "Le Ny",
      infos: "Développeur HTML & Wix",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web."
    }
  ]



  constructor() { }

  ngOnInit(): void {
  }

}


