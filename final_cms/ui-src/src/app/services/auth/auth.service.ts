import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  superUser: any;

  constructor(private http: Http) { }

  //Post: Register User
  registerSuperUser(superUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', superUser, { headers: headers })
    .map(res => res.json());
  }

  //Post: Authenticate User
  authenticateSuperUser(superUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', superUser, { headers: headers })
    .map(res => res.json());
  }

  //Get: User Profile
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
    .map(res => res.json());
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
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    const uri = 'http://localhost:3000/users/all';
    return this
            .http
            .get(uri)
            .map(res => res.json());
  }

  addSuperUser(superUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/add', superUser, { headers: headers })
    .map(res => res.json());
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

}
