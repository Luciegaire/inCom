import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendService } from "./backend.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(public backend: BackendService, private http: HttpClient){}

  res: number = -1
  login(email:string, password:string ) {
    return this.http.post<any>(`${environment.backUrl}/login/`, {email, password})
  }
}
