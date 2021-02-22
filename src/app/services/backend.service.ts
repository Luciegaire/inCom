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

  getOffersByCompanyId(id){
    return this.http.get<any>(`${environment.backUrl}/offers/company/`+id)
  }

  getCompaniesByName(name){
    return this.http.get<any>(`${environment.backUrl}/company/name/`+name)
  };

  createUser(data) {
    return this.http.post<any>(`${environment.backUrl}/user`, data, this.optionRequete)
  };

  updateUser(userId, data) {
    return this.http.put<any>(`${environment.backUrl}/user/`+userId, data,  this.optionRequete)
  };
  getUserByEmail(email){
    return this.http.get<any>(`${environment.backUrl}/user/email/`+email)
  };

  getUserByID(id){
    return this.http.get<any>(`${environment.backUrl}/user/`+id)
  };


  deleteUserByID(id){
    return this.http.delete<any>(`${environment.backUrl}/user/`+id)
  };

  createCandidate(data) {
    return this.http.post<any>(`${environment.backUrl}/candidate`, data, this.optionRequete)
  }

  updateCandidateByuserId(id, data){
    return this.http.put<any>(`${environment.backUrl}/candidate/`+id, data, this.optionRequete)
  }

  updateCandidateCV(id,data) {
    return this.http.put<any>(`${environment.backUrl}/candidate-cv/`+id, data,  this.optionRequete)
  };

  getCandidateById(id){
    return this.http.get<any>(`${environment.backUrl}/candidate/`+id)
  }

  getCompanyById(id){
    return this.http.get<any>(`${environment.backUrl}/company/`+id)
  }

  updateCompany(id, data){
    return this.http.put<any>(`${environment.backUrl}/company/`+id, data, this.optionRequete)
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

  getEmployeeByEmployeeId(id){
    return this.http.get<any>(`${environment.backUrl}/employee/id/`+id)
  }

  deleteEmployeeByUserId(id){
    return this.http.delete<any>(`${environment.backUrl}/employee/`+id)
  }

  getEmployeesByIdCompany(id){
    return this.http.get<any>(`${environment.backUrl}/company/`+id+`/employees`)
  }


  getSituation(){
    return this.http.get<any>(`${environment.backUrl}/current_situation/`)
  }


  getSectors(){
    return this.http.get<any>(`${environment.backUrl}/business_sector/`)
  }


  getContracts(){
    return this.http.get<any>(`${environment.backUrl}/contracts/`)
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

  createOffer(data){
    return this.http.post<any>(`${environment.backUrl}/offer`, data, this.optionRequete)
  };

  getOfferByCompany(id){
    return this.http.get<any>(`${environment.backUrl}/offers/company/${id}`, {headers : this.headers})
  };

  getOfferByID(id){
    return this.http.get<any>(`${environment.backUrl}/offer/${id}`, {headers : this.headers})
  };

  getOffersByUserIdLike(id){
    return this.http.get<any>(`${environment.backUrl}/offer-liked/${id}`, {headers : this.headers})
  };

  updateOffer(id, data){
    return this.http.put<any>(`${environment.backUrl}/offer/`+id, data, this.optionRequete)
  }


  createLikeOffer(data) {
    return this.http.post<any>(`${environment.backUrl}/likeOffer`, data, this.optionRequete)
  }

  deleteLikeOffer(offer_id,user_id) {
    return this.http.delete<any>(`${environment.backUrl}/likeOffer/${offer_id}/${user_id}`, {headers : this.headers})
  }

  getLikesOfferByID(id){
    return this.http.get<any>(`${environment.backUrl}/likesOffer/${id}`, {headers : this.headers})
  }
  getLikesOfferByUserID(id){
    return this.http.get<any>(`${environment.backUrl}/likesOfferByUserID/${id}`, {headers : this.headers})
  }

  getLikesOfferByOfferIdAndUserId(offer_id, user_id){
    return this.http.get<any>(`${environment.backUrl}/likesOffer/${user_id}/${offer_id}`, {headers : this.headers})
  }

  getContractByID(id){
    return this.http.get<any>(`${environment.backUrl}/contracts/${id}`, {headers : this.headers})
  };

  deleteOfferyID(id){
    return this.http.delete<any>(`${environment.backUrl}/offer/${id}`, {headers : this.headers})
  };

  getCompanyByEmployeeId(id){
    return this.http.get<any>(`${environment.backUrl}/company/companyByEmployee/${id}`, {headers : this.headers})
  }

  getCompanyByUserId(id){
    return this.http.get<any>(`${environment.backUrl}/company/companyByUser/${id}`, {headers : this.headers})
  }

  getRandomCompanies(){
    return this.http.get<any>(`${environment.backUrl}/company-random`, {headers : this.headers})
  };

  createApplication(data) {
    return this.http.post<any>(`${environment.backUrl}/apply_offer`, data, this.optionRequete)
  }
}
