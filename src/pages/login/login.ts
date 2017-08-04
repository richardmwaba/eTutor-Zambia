import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

import { SignupPage } from '../signup/signup';
import { MySubjectsPage } from '../my-subjects/my-subjects';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // sinupPage = 'SignupPage';

  loginForm:FormGroup;
  loading:Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthProvider,
  public formBuilder: FormBuilder, public alertCtrl: AlertController,
  public loadingCtrl: LoadingController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot(MySubjectsPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToSignUp(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

}
