import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

<<<<<<< HEAD
<<<<<<< Updated upstream
=======
  createPost(data) {
    return this.http.post<any>(`${environment.backUrl}/posts`, data)
  }

  toto(){
    return "toto"
  }
>>>>>>> Stashed changes
=======
  toto() { return "ok" }
>>>>>>> parent of 6539626... mise en place back pour requêtes
}
