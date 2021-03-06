import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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
  public mySubjects: any=null;
  public user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public mySubjectsService: MySubjectsProvider,
    public authService: AuthProvider
  ) {
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySubjectsPage');
  }

  initialize() {
    if ((AuthProvider.isAuthenticated())) {
      console.log('You are authenticated. We are getting your subjects')
      this.user = this.authService.user;
      this.mySubjectsService.getMySubjects().then(data => {
        this.mySubjects = data['mySubjects'];
        console.log("Found " + data['subjects']);
      });
    }
  }

  remove(subject) {
    this.mySubjectsService.remove(subject).subscribe(data => {
      this.mySubjects = data['mySubjects'];
      console.log("New subjects " + data['mySubjects']);
      this.presentToast(data['msg']);
    });
  }

  /**
   * Presents a success toast on sign up
   */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      //position, cssCLass
    });

    toast.present(); // shows the toaster
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
