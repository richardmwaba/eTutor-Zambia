import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  theForm: FormGroup;
  public loader:any;

  submitAcepted: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {
    // setting up form builder
    this.theForm = formBuilder.group({
      // name and username should ot exceed 30 characters and should only be letters
      name: ['', Validators.compose( [Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required] )],
      username: ['', Validators.compose( [Validators.maxLength(30),, Validators.required] )],
      // email is required and follows the pattern < john@doecom >
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]*')]) ],
      phone: ['', Validators.compose( [Validators.required, Validators.pattern('^(?:\\(\\d{3}\\)|\\d{3})[- ]?\\d{3}[- ]?\\d{4}$')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmPswd: ['', Validators.compose([Validators.required, this.equalto('password')])],
      status: 'inactive'
    });
  }

  /**
   * Validator function for comparing password and comfirm_password fields
   * @param field_name is the field being compared
   */
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = control.root.value[field_name] === input;
        if (!isValid)
            return {'equalTo': {isValid}};
        else
            return null;
    };
  }

  /**
   * Reisters a new user of the app
   */
  signIn() {

    this.submitAcepted = true;

    //console.log(this.theForm.value);
    if(this.theForm.valid){
      this.createLoader();
      this.loader.present();
    this.auth.signup(this.theForm.value).subscribe(
      data => {
        if(this.loader){this.loader.dismiss();}
        if (data['success']) {
          // show success msg
          this.presentToast(data['msg']);

          // redirect to log in
          this.navCtrl.pop();
        }else{
          // error handling
          this.presentToast(data['msg']);
          console.log(data['msg']);
        }
      },

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

  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "We are signing you up..."
    });
  }

}
