import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {MySubjectsProvider} from '../../providers/my-subjects/my-subjects'
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
  public data: any;
  public noFavs = true;
  public user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public mySubjectsService: MySubjectsProvider,
    public authService: AuthProvider
  ) {

    this.data=null;
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
        this.data = data;
        this.mySubjects = data['mySubjects'];
        // if array is not empty, then favorites exist
        if (this.mySubjects.length > 0) {
          this.noFavs = false;
        }
        console.log("Found " + data['mySubjects']);
      });
    }
  }

  remove(subject) {
    this.presentToast("We are removing "+subject.name+" from favourites");
    this.mySubjectsService.remove(subject).subscribe(data => {
      if(data['success']) {
        this.mySubjects = data['mySubjects'];
        console.log("New subjects " + data['mySubjects']);
      }
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
