import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  superUser: any;
  private baseUrl: string = "http://localhost:3000/superusers/";
  contentHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  //Post: Register User
  registerSuperUser(superUser){
    return this.http.post(this.baseUrl+'register', superUser, { headers: this.contentHeader });
    //.map(res => res.json());
  }

  //Post: Authenticate User
  authenticateSuperUser(superUser){
    return this.http.post(this.baseUrl+'authenticate', superUser, { headers: this.contentHeader });
    //.map(res => res.json());
  }

  //Get: User Profile
  getProfile(){
    this.appendToken();
    return this.http.get(this.baseUrl+'profile', { headers: this.contentHeader });
    //.map(res => res.json());
  }

  //Post: Store User
  storeSuperUserData(token, superUser){
    localStorage.setItem('id_token', token);
    localStorage.setItem('superUser', JSON.stringify(superUser));
    this.authToken = token;
    this.superUser = superUser;
  }

  //Get: Super users
  getSuperUsers() {
    this.appendToken();
    return this.http.get(this.baseUrl+'all', { headers: this.contentHeader});
    //.map(res => res.json());
  }

  addSuperUser(superUser){
    this.appendToken();
    return this.http.post(this.baseUrl+'add', superUser, { headers: this.contentHeader });
    //.map(res => res.json());
  }

  //Logout User
  logout(){
    this.authToken = null;
    this.superUser = null;
    localStorage.clear();
  }

  //Get: Load Token From Local Storage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  appendToken(){
    this.loadToken();
    this.contentHeader = this.contentHeader.append('Authorization', this.authToken);
  }

}
