import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';

import {SignupPage} from '../signup/signup';
import {AuthProvider} from './../../providers/auth/auth';
import {HomePage} from '../home/home';
import {Events} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // variable
  logForm: FormGroup;
  submitAttempt: boolean = false;

  token: string;
  user: any;
  username: string;
  public subject: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    public toastCtrl: ToastController,
    public events: Events,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {

    this.subject = navParams.get("subject");
    this.logForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]*')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signUp(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage, {subject: this.subject});
  }

  dismissModal() {
    this.navCtrl.pop();
  }

  /**
   * Logs a user into the app
   */
  login() {
    this.submitAttempt = true;

    console.log('credentials: ' + this.logForm.value);
    this.presentLoading();
    this.auth.authenticateUser(this.logForm.value).subscribe(data => {

      if (data['success']) {
        // get token and user from returned data
        this.token = data['token'];
        this.user = data['user'];
        this.username = this.user.username;

        // store token and user dits in local storage
        //TODO: may need to user secure storage for this data
        this.auth.storeData(this.token, this.user);

        // show success toast
        this.presentToast();
        // console.log('User authenticated! '+this.username);
        this.events.publish('user:authenticated', this.user, this.username, Date.now());

        // redirect to home page
        this.navCtrl.setRoot(HomePage);
        // this.navCtrl.pop();

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

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "We are signing you in...",
      duration: 3000
    });
    loader.present();
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
