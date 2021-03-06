import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { ENV } from '@app/env'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  private baseURL: string = ENV.host_url + "users";

  // content header for the server
  contentHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  error: string;
  user: any;
  authToken: string;

  constructor(
    private http: HttpClient
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Checks whether the user is still logged in
   */
  static isAuthenticated() {

    return tokenNotExpired('token');
  }

  /**
   * Signs a new user into the app
   * @param data useer's sign up data
   */
  signup(data) {
    return this.http.post(this.baseURL + '/register', data, { headers: this.contentHeader });
  }

  /**
   * Logs a user into the app
   * @param data the user's log in credentials
   */
  authenticateUser(data) {
    return this.http.post(this.baseURL + '/authenticate', data, { headers: this.contentHeader });
  }

  /**
   * Gets forgot password from api
   */
  forgotPasswordUrl() {
    return this.baseURL + '/forgot-password';
  }

  /**
   * Stores the user's profile info on the app
   * @param token generated after log in process
   * @param user the user data that's returned to the app
   */
  storeData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  /*
  *Loads token from local storage
  * 
  * */
  //Get: Load Token From Local Storage
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  appendToken() {
    this.loadToken();
    this.contentHeader = this.contentHeader.append('Authorization', this.authToken);
  }

  /**
   * Logs a user out of the app
   */
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
