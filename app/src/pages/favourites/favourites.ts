import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {CourseDetailPage} from "../course-detail/course-detail";

/**
 * Generated class for the MySubjectsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-subjects',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  public mySubjects: any;
  public user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySubjectsPage');
  }

  /**
   *
   * @param subject
   */
  courseDetail(subject) {
    //navigate to the selected course detail page
    this.navCtrl.push(CourseDetailPage, {subject});
  }

}
