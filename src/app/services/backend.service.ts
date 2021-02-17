import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  //FEED
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };

  headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});

  createPost(data) {
    return this.http.post<any>(`${environment.backUrl}/post`, data, this.optionRequete)
  }

  getPosts(){
    return this.http.get<any>(`${environment.backUrl}/post`)
  }

  getBusinessSectors(){
    return this.http.get<any>(`${environment.backUrl}/business_sector`)
  };

  getNumberOffers(){
    return this.http.get<any>(`${environment.backUrl}/nbOffers`)
  };

  createCompany(data){
    return this.http.post<any>(`${environment.backUrl}/company`, data, this.optionRequete)
  };

  getCompanies(){
    return this.http.get<any>(`${environment.backUrl}/company`, {headers : this.headers})
  };

  getOffers(){
    return this.http.get<any>(`${environment.backUrl}/offer`, {headers : this.headers})
  };

  getCompanyByID(id){
    return this.http.get<any>(`${environment.backUrl}/company/`+id)
  };


  getCompaniesByName(name){
    return this.http.get<any>(`${environment.backUrl}/company/name/`+name)
  };

  createUser(data) {
    return this.http.post<any>(`${environment.backUrl}/user`, data, this.optionRequete)
  };

  getUserByEmail(email){
    return this.http.get<any>(`${environment.backUrl}/user/email/`+email)
  };

  getUserByID(id){
    return this.http.get<any>(`${environment.backUrl}/user/`+id)
  };

  createCandidate(data) {
    return this.http.post<any>(`${environment.backUrl}/candidate`, data, this.optionRequete)
  }

  getCandidateById(id){
    return this.http.get<any>(`${environment.backUrl}/candidate/`+id)
  }

  getCompanyById(id){
    return this.http.get<any>(`${environment.backUrl}/company/`+id)
  }

  getSectorById(id){
    return this.http.get<any>(`${environment.backUrl}/business_sector/`+id)
  }

  getSituationById(id){
    return this.http.get<any>(`${environment.backUrl}/contracts/`+id)
  }

  createEmployee(data){
    return this.http.post<any>(`${environment.backUrl}/employee`, data, this.optionRequete)
  }

  getEmployeeById(id){
    return this.http.get<any>(`${environment.backUrl}/employee/`+id)
  }

  getContracts(){
    return this.http.get<any>(`${environment.backUrl}/contracts/`)
  }

  getSectors(){
    return this.http.get<any>(`${environment.backUrl}/business_sector/`)
  }

  insertImageCompany(id, data){
    return this.http.post<any>(`${environment.backUrl}/company/${id}/img`, data, this.optionRequete)
  }

  postImage(id, fd ): Observable<string>{
    return this.http.post<string>(`${environment.backUrl}/company/${id}/img`, fd, this.optionRequete);
  }

  getCommentsByID(id){
    return this.http.get<any>(`${environment.backUrl}/comments/${id}`, {headers : this.headers})
  };

  createComment(data) {
    return this.http.post<any>(`${environment.backUrl}/comment`, data, this.optionRequete)
  }

  deleteCommentsByID(id){
    return this.http.delete<any>(`${environment.backUrl}/comment/${id}`, {headers : this.headers})
  };

  createLike(data) {
    return this.http.post<any>(`${environment.backUrl}/like`, data, this.optionRequete)
  }

  deleteLike(post_id,user_id) {
    return this.http.delete<any>(`${environment.backUrl}/like/${post_id}/${user_id}`, {headers : this.headers})
  }
  getLikesByID(id){
    return this.http.get<any>(`${environment.backUrl}/likes/${id}`, {headers : this.headers})
  };

  getCompanyByEmployeeId(id){
    return this.http.get<any>(`${environment.backUrl}/company/companyByEmployee/${id}`, {headers : this.headers})
  }

}
