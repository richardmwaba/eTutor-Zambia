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
   * @param user_id
   * @returns {Promise<any>}
   */
  getDiscussion(topic_id, user_id){
    if(this.discussion){
      return Promise.resolve(this.discussion);
  }

    return new Promise(resolve => {
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
    return this.http.post(this.baseURL+'add/', data, { headers: this.contentHeader });
  }

  updateReactions(comment, hasLiked, hasDisliked, user_id, topic_id){
    return this.http.patch(this.baseURL+'updateReactions/'+hasLiked+'/'+hasDisliked+'/'+user_id+'/'+topic_id, comment, { headers: this.contentHeader });
  }

  deleteComment(comment){
    return this.http.delete(this.baseURL+'comment/delete/'+comment._id);
  }

  deleteDiscussion(comment){
    return this.http.delete(this.baseURL+'delete/'+comment._id);
  }
}
