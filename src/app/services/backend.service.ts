import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }


  createPost(data) {
    return this.http.post<any>(`${environment.backUrl}/posts`, data)
  }

  toto(){
    return "toto"
  }
}
