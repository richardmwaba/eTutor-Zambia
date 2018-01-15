import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // form variables
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmpswd: string;

  passwrd: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  isMatch(event: KeyboardEvent) {
    this.passwrd = event.target['value'];
    if (this.passwrd === this.password) {
      return true;
    } else {
      return false;
    }
  }

  signIn(user) {
    user.status = 'inactive'; // for a first time user, sub -> is not active

    // console.log(user);

    this.auth.signup(user).subscribe(
      data => {
        if (data['success']) {
          // show success msg
          this.presentToast();

          // redirect to log in
          this.navCtrl.push(LoginPage);
        }
      },
      // error handling
      err => {console.log(err);}
    );
  }

  /**
   * Presents a success toast on sign up
   */
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'You have successfully created an account...',
      duration: 3000,
      //position, cssCLass
    });

    toast.present(); // shows the toaster
  }

}
