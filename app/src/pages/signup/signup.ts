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
      phone: ['', Validators.required],
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

    this.auth.signup(this.theForm.value).subscribe(
      data => {
        if (data['success']) {
          // show success msg
          this.presentToast();

          // redirect to log in
          this.navCtrl.push(LoginPage);
        }
      },
      // error handling
      err => { console.log(err); }
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
