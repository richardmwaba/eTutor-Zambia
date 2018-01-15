import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { AuthProvider } from './../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // variable
  email: string;
  password: string;
  token: string;
  user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signUp(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }

  /**
   * Logs a user into the app
   * @param data from the input form
   */
  login(data) {
    console.log('credentials: ' + data);

    this.auth.authenticateUser(data).subscribe(data => {

      if (data['success'] === true) {
        // get token and user from returned data
        this.token = data['token'];
        this.user = data['user'];

        // store token and user dits in local storage
        //TODO: may need to user secure storage for this data
        this.auth.storeData(this.token, this.user);
        
        // show success toast
        this.presentToast();

        // redirect to home page
        this.navCtrl.setRoot(HomePage);

      } else {
        // show error alert
        let toastWarn = this.toastCtrl.create({
          message: data['msg'],
          duration: 3000,
          position: 'top',
          cssClass: 'warning'
        });

        toastWarn.present();
      }

    });
  }

  /**
   * Presents a success toast on log in
   */
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'You have successfully logged in...',
      duration: 3000,
      //position, cssCLass
    });

    toast.present(); // shows the toaster
  }

}
