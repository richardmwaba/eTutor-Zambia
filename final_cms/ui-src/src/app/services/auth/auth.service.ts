import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  superUser: any;

  constructor(private http: Http) { }

  registerSuperUser(superUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', superUser, { headers: headers })
    .map(res => res.json());
  }

  authenticateSuperUser(superUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', superUser, { headers: headers })
    .map(res => res.json());
  }

  storeSuperUserData(token, superUser){
    localStorage.setItem('id_token', token);
    localStorage.setItem('superUser', JSON.stringify(superUser));
    this.authToken = token;
    this.superUser = superUser;
  }

  logout(){
    this.authToken = null;
    this.superUser = null;
    localStorage.clear();
  }

}
