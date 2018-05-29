import { Component } from '@angular/core';
import {ModalController, ViewController, NavController, NavParams, ToastController} from 'ionic-angular';
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
  public user: any;
  public hasDiscussion: boolean = false;
  public topic: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public discussionService: DiscussionsProvider,
    public authService: AuthProvider,
    public viwCtrl: ViewController,
    public formBuilder: FormBuilder) {
    this.topic = navParams.get("topic");
    this.hasDiscussion = navParams.get("hasDiscussion");
    this.user = this.authService.user;
    this.commentForm = formBuilder.group({
      title: ['', Validators.compose( [Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      topic_id: ['', Validators.compose([Validators.required])],
      user_id: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      hasDiscussion: ['', Validators.compose([Validators.required])]
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


    this.discussionService.addComment(this.commentForm.value).subscribe(data => {

      if (data['success']) {

        // show success toast
        this.presentToast(data['msg']);
        // dismiss the modal
        this.viwCtrl.dismiss(data['comments']);
      } else {
        // show error alert
        console.log(data['msg']);
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
