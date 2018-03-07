import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CouponProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CouponProvider {
  data: any;
  private baseURL: string = "http://localhost:3000/coupons";

  // content header for the server
  contentHeader = new HttpHeaders({'Content-Type': 'application/json'});
  error: string;
  user: any;
  authToken: string;
  constructor(public http: HttpClient) {
    this.data = null;
    console.log('Hello CouponProvider Provider');
  }

  subscribeUser(data){
      return this.http.post(this.baseURL+'/subscribeUser', data, { headers: this.contentHeader });
    }

}
