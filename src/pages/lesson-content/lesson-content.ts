import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LessonContentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lesson-content',
  templateUrl: 'lesson-content.html',
})
export class LessonContentPage {

  // variable
  lesson: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // get the parameter that was passed from lessons page
    this.lesson = navParams.get('lesson');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonContentPage');
  }

}
