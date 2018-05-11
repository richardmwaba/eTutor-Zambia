import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { CommentsPage} from "../comments/comments";
import {HomePage} from "../home/home";
import {AddCommentPage} from "../add-comment/add-comment";
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
public subject:Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController) {
    this.subject = this.navParams.get('subject')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionForumPage');
  }

  // dismissModal(){
  //   this.navCtrl.setRoot(HomePage);
  // }

  // openComments(topic){
  //   this.navCtrl.push(CommentsPage, {topic});
  // }

  /**
   *
   * @param topic
   */
  openComments(topic) {
      let modal = this.modalCtrl.create(CommentsPage, {topic});
      modal.present();
  }
}
