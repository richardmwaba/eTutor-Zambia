import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  theForm: FormGroup;

  submitAcepted: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder
  ) {
    // setting up form builber
    this.theForm = formBuilder.group({
      // name and username should ot exceed 30 characters and should only be letters
      name: ['', Validators.compose( [Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required] )],
      username: ['', Validators.compose( [Validators.maxLength(30),, Validators.required] )],
      // email is required and follows the pattern < john@doecom >
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]*')]) ],
      phone: ['', Validators.compose( [Validators.required, Validators.pattern('^(?:\\(\\d{3}\\)|\\d{3})[- ]?\\d{3}[- ]?\\d{4}$')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      status: 'inactive'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  /**
   * Reisters a new user of the app
   */
  signIn() {

    this.submitAcepted = true;

    //console.log(this.theForm.value);
    if(this.theForm.valid){

    this.auth.signup(this.theForm.value).subscribe(
      data => {
        if (data['success']) {
          // show success msg
          this.presentToast(data['msg']);

          // redirect to log in
          this.navCtrl.push(LoginPage);
        }else{
          // error handling
          this.presentToast(data['msg']);
          console.log(data['msg']);
        }
      },

      // err => { console.log(err); }
    );
  }else{
      this.presentToast("Cannot not submit because you still have errors");
    }
  }

  dismissModal(){
    this.navCtrl.pop();
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
