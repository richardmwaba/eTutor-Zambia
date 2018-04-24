import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {DiscussionsProvider} from "../../providers/discussions/discussions";
import {AuthProvider} from "../../providers/auth/auth";

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
  public topic: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public discussionService: DiscussionsProvider,
    public authervice: AuthProvider,
    public formBuilder: FormBuilder) {
    this.topic = navParams.get("topic");
    this.user = this.authervice.user;
    this.commentForm = formBuilder.group({
      title: ['', Validators.compose( [Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      topic_id: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])]
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
    this.submitAttempt = true;

    console.log('discussion: ' + this.commentForm.value);

    this.discussionService.addComment(this.commentForm.value).subscribe(data => {

      if (data['success']) {

        // show success toast
        this.presentToast(data['msg']);

        // dismiss the modal
        this.navCtrl.pop()

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
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      //position, cssCLass
    });

    toast.present(); // shows the toaster
  }

}
