import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  //FEED

  createPost(data) {
    return this.http.post<any>(`${environment.backUrl}/posts`, data)
  }

  getPosts(){
    return this.http.get<any>(`${environment.backUrl}/posts`)
  }

  //COMPANIES

  getCompanies(){
    return this.http.get<any>(`${environment.backUrl}/company`)
  }

  getBusinessSectors(){
    return this.http.get<any>(`${environment.backUrl}/business_sector`)
  }

  getNumberOffers(){
    return this.http.get<any>(`${environment.backUrl}/nbOffers`)
  }
}
