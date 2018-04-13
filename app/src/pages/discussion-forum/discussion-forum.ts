import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
// $IMPORTSTATEMENT

/**
 * Generated class for the DiscussionForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// $IONICPAGE
@Component({
  selector: 'page-discussion-forum',
  templateUrl: 'discussion-forum.html',
})
export class DiscussionForumPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionForumPage');
  }

}
