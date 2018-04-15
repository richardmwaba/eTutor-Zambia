import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.subject = this.navParams.get('subject')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionForumPage');
  }

}
