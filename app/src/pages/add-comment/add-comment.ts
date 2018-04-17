import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {HomePage} from "../home/home";
import {PopoverPage} from "../popover/popover";
// $IMPORTSTATEMENT

/**
 * Generated class for the AddCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// $IONICPAGE
@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html',
})
export class AddCommentPage {

  commentForm: FormGroup;
  submitAttempt: boolean = false;

  token: string;
  user: any;
  public subject: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder) {
    this.subject = navParams.get("subject");
    this.commentForm = formBuilder.group({
      title: ['', Validators.compose( [Validators.required])],
      message: ['', Validators.compose([Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCommentPage');
  }

  dismissModal(){
    this.navCtrl.pop();
  }

  /**
   * submits a user comment
   */
  submit() {
    // this.submitAttempt = true;
    //
    // console.log('credentials: ' + this.commentForm.value);
    //
    // this.auth.authenticateUser(this.commentForm.value).subscribe(data => {
    //
    //   if (data['success']) {
    //     // get token and user from returned data
    //     this.token = data['token'];
    //     this.user = data['user'];
    //
    //     // store token and user dits in local storage
    //     //TODO: may need to user secure storage for this data
    //     this.auth.storeData(this.token, this.user);
    //
    //     // show success toast
    //     this.presentToast();
    //
    //     // redirect to home page
    //     this.navCtrl.setRoot(HomePage);
    //
    //   } else {
    //     // show error alert
    //     let toastWarn = this.toastCtrl.create({
    //       message: data['msg'],
    //       duration: 3000,
    //       position: 'top',
    //       cssClass: 'warning'
    //     });
    //
    //     toastWarn.present();
    //   }
    //
    // });
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
