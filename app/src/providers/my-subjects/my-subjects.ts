import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MySubjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MySubjectsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MySubjectsProvider Provider');
  }

}
