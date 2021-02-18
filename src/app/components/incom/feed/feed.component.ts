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
  candidate : {}
  contract = ""

  currentUser: any =""
  currentStatusUser: any = ""
  constructor(public backend: BackendService) {

  }

  getPosts(){
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

  getCandidate(id : number){
    this.backend.getCandidateById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.candidate = response
      },
      error: () =>{
        console.log("erreur récupération candidate")
      },
      complete: () =>{
        this.getCurrentSituation(this.candidate['current_situation_id'])
      }
    })
  }

  getCurrentSituation(id:number){
    this.backend.getSituationById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.contract = response.name
      },
      error: () =>{
        console.log("erreur récupération situation")
      },
      complete: () =>{
      }
    })
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.currentStatusUser = localStorage.getItem("status")
    this.getCandidate(this.currentUser['user_id'])
    this.getPosts()
  }

  reloadPosts(isPost){
    if(isPost){
      this.getPosts()
    }
  }

}
