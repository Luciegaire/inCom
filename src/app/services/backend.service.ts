import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };

  headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});

  createPost(data) {
    return this.http.post<any>(`${environment.backUrl}/posts`, data, this.optionRequete)
  }

  getPosts(){
    return this.http.get<any>(`${environment.backUrl}/posts`)
  }

  createCompany(data){
    return this.http.post<any>(`${environment.backUrl}/company`, data, this.optionRequete)
  }
  getCompanies(){
    return this.http.get<any>(`${environment.backUrl}/company`, {headers : this.headers})
  }

  getCompaniesByName(name){
    return this.http.get<any>(`${environment.backUrl}/company/name/`+name)
  }


  createUser(data) {
    return this.http.post<any>(`${environment.backUrl}/user`, data, this.optionRequete)
  }

  getUserByEmail(email){
    return this.http.get<any>(`${environment.backUrl}/user/email/`+email)
  }

  createCandidate(data) {
    return this.http.post<any>(`${environment.backUrl}/candidate`, data, this.optionRequete)
  }

  createEmployee(data){
    return this.http.post<any>(`${environment.backUrl}/employee`, data, this.optionRequete)
  }

}
