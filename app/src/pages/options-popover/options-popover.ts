import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { MySubjectsProvider } from "../../providers/my-subjects/my-subjects"

/**
 * Generated class for the OptionsPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options-popover',
  templateUrl: 'options-popover.html',
})
export class OptionsPopoverPage {

  public subject:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public mySubjectsService: MySubjectsProvider) {
    // this.subject = navParams.get("subject");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPopoverPage');
  }

  /**
   * saves a subject to my subjects
   */
  addToMySubjects(){
    console.log("Adding "+this.subject.subject.name);
    if((AuthProvider.isAuthenticated())){
      this.mySubjectsService.enroll(this.subject).subscribe(data=>{
        this.presentToast(data['msg']);
      });
    }
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
