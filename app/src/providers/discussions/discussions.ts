import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DiscussionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiscussionsProvider {
  private baseURL: string = "http://localhost:3000/discussions/";
  private discussion:any;

  // content header for the server
  contentHeader = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http: HttpClient) {
    this.discussion = null;
    console.log('Hello DiscussionsProvider Provider');
  }


  /**
   *
   * @param topic_id
   * @param username
   * @returns {Promise<any>}
   */
  getDiscussion(topic_id, username){
    if(this.discussion){
      return Promise.resolve(this.discussion);
  }

    return new Promise(resolve => {
      this.http.get(this.baseURL+'find/'+topic_id+'/'+username, {headers: this.contentHeader}).subscribe(
        data=>{
          this.discussion = data;
          resolve(this.discussion);
        }
      )
    });
}

getDiscussionNoAuth(topic_id){
  if(this.discussion){
    return Promise.resolve(this.discussion);
  }

  return new Promise(resolve => {
    this.http.get(this.baseURL+'find/'+topic_id, {headers: this.contentHeader}).subscribe(
      data=>{
        this.discussion = data;
        resolve(this.discussion);
      }
    )
  });
  }

  /**
   * @param data
   */
  addComment(data){
    return this.http.post(this.baseURL+'add/', data, {headers:this.contentHeader});
  }

}
