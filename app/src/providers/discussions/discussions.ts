import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@app/env'
/*
  Generated class for the DiscussionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiscussionsProvider {
  private baseURL: string = ENV.host_url+"discussions/";
  private discussion:any;
  authToken: string;

  // content header for the server
  contentHeader = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http: HttpClient) {
    this.discussion = null;
  }


  /**
   *
   * @param topic_id
   * @param user_id
   * @returns {Promise<any>}
   */
  getDiscussion(topic_id, user_id){
  //   if(this.discussion){
  //     return Promise.resolve(this.discussion);
  // }

    return new Promise(resolve => {
      this.appendToken();
      this.http.get(this.baseURL+'find/'+topic_id+'/'+user_id, {headers: this.contentHeader}).subscribe(
        data=>{
          this.discussion = data;
          resolve(this.discussion);
        }
      )
    });
}

  /**
   *
   * @param data
   * @returns {Observable<Object>}
   */
  addComment(data){
    this.appendToken();
    return this.http.post(this.baseURL+'add/', data, { headers: this.contentHeader });
  }


  /**
   *
   * @param comment_id
   * @param topic_id
   * @param hasLiked
   * @param hasDisliked
   * @param user_id
   * @param likes
   * @param dislikes
   * @param didReact
   * @returns {Observable<Object>}
   */
  updateReactions(topic_id, comment_id, hasLiked, hasDisliked, user_id, likes,dislikes, didReact){
    this.appendToken();
    return this.http.patch(this.baseURL+'updateReactions/'+topic_id+'/'+comment_id+'/'+hasLiked+'/'+hasDisliked+'/'+user_id+'/'+likes+'/'+dislikes+'/'+didReact, null, { headers: this.contentHeader });
  }

  deleteComment(topic_id, comment_id){
    this.appendToken();
    return this.http.delete(this.baseURL+'comments/delete/'+topic_id+"/"+comment_id);
  }

  deleteDiscussion(topic){
    this.appendToken();
    return this.http.delete(this.baseURL+'delete/'+topic._id, { headers: this.contentHeader});
  }

  /*
  *Loads token from local storage
  *
  * */
  //Get: Load Token From Local Storage
  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  appendToken(){
    this.loadToken();
    this.contentHeader = this.contentHeader.append('Authorization', this.authToken);
  }
}
