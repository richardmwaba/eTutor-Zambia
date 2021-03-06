import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

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
  public loader:any;
  authSubscription: any;

  token: string;
  user: any;
  username: string;
  public subject: any;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    public toastCtrl: ToastController,
    public events: Events,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private inAppBrowser: InAppBrowser
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

  forgotPassword() {
    const url = this.auth.forgotPasswordUrl();
    console.log(url);
    const browser = this.inAppBrowser.create(url, '_self', this.options);
  }

  dismissModal() {
    this.navCtrl.pop();
  }

  /**
   * Logs a user into the app
   */
  login() {
    if(this.logForm.valid) {
      this.submitAttempt = true;
      console.log('credentials: ' + this.logForm.value);
      this.createLoader();
      this.loader.present();
      this.authSubscription = this.auth.authenticateUser(this.logForm.value).subscribe(data => {

        if (this.loader) {
          this.loader.dismiss();
        }
        if (data['success']) {
          // get token and user from returned data
          this.token = data['token'];
          this.user = data['user'];
          this.username = this.user.username;

          // store token and user dits in local storage
          //TODO: may need to user secure storage for this data
          this.auth.storeData(this.token, this.user);
          // show success toast
          this.presentToast('You have successfully logged in...');
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
    }else{
      this.presentToast("You still have errors");
    }
  }

  /**
   * Creates a loader on sign in
   */
  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "We are signing you in..."
    });
  }

  /**
   * Presents a success toast on log in
   */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      //position, cssCLass
    });

    toast.present(); // shows the toaster
  }

  /**
   * Unsubscribes from the services on view exit
   */
  onViewDidExit(){
    this.authSubscription.unsubscribe();
  }

}
