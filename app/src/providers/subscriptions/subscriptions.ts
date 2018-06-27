import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController} from 'ionic-angular';
import {AuthProvider} from "../auth/auth";

/*
  Generated class for the SubscriptionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubscriptionsProvider {
  data: any;
  private baseURL: string = "https://zedtutor.herokuapp.com/subscriptions";
  // content header for the server
  contentHeader = new HttpHeaders({'Content-Type': 'application/json'});
  error: string;
  user: any;
  subjectId: any;
  userEmail: any;
  found:any;
  authToken: string;
  public subscription:any;
  public subject: any;

  constructor(public http: HttpClient,
              private toastCtrl: ToastController,
              public authService: AuthProvider,
  ) {
    this.subscription = null;
    console.log('Hello SubscriptionsProvider Provider');
  }

  /**
  /* @param subject to check
  /* @param user the user who's subscription we are checking
   /*return true if the user has an active subscription for this subject
   */
  verifySubscription(subject, user){
    this.subject = subject;
    this.user = user;
    // don't have the data yet
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/verify/' + this.subject._id + '/' + this.user.email)
        .subscribe(data => {
          this.data = data;
          //localStorage.setItem('subscription', JSON.stringify(this.data['subscription']));
          this.subscription = this.data['subscription'];
          resolve(this.data);
        });
    });
  }

  /**
   * subscribes user to subject
   * @param data
   * @returns {Observable<Object>}
   */
  subscribeUser(data){
    this.appendToken();
    return this.http.post(this.baseURL+'/subscribeUser', data, { headers: this.contentHeader });
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

  appendToken(){
    this.loadToken();
    this.contentHeader = this.contentHeader.append('Authorization', this.authToken);
  }

  /**
   * Presents a success toast on sign up
   */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      //position, cssCLass
    });

    toast.present(); // shows the toaster
  }

}
