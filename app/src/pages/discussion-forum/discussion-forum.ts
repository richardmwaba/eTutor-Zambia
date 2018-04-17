import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { AddCommentPage } from "../add-comment/add-comment";
// $IMPORTSTATEMENT

/**
 * Generated class for the DiscussionForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// $IONICPAGE
@IonicPage()
@Component({
  selector: 'page-discussion-forum',
  templateUrl: 'discussion-forum.html',
})
export class DiscussionForumPage {
public subject:any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
    this.subject = this.navParams.get('subject')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionForumPage');
  }

  presentModal() {
    let modal = this.modalCtrl.create(AddCommentPage);
    modal.present();
  }

}
