import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MySubjectsProvider} from '../../providers/my-subjects/my-subjects'
import {AuthProvider} from "../../providers/auth/auth";
import {CourseDetailPage} from "../course-detail/course-detail";
import {LoginPage} from "../login/login";

/**
 * Generated class for the MySubjectsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-subjects',
  templateUrl: 'my-subjects.html',
})
export class MySubjectsPage {
  public mySubjects: any;
  public user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mySubjectsService: MySubjectsProvider,
              public authService: AuthProvider
  ) {
    // //this.user = this.authService.user;
    // this.user = this.navParams.get("user");
    // this.mySubjectsService.getMySubjects(this.user).then(data=>{
    //   this.mySubjects = data;
    // });
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
