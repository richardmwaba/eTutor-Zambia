import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import { LessonsPage } from '../lessons/lessons';
import {DiscussionForumPage } from "../discussion-forum/discussion-forum";
import {VideosPage} from "../videos/videos";
import {StatusBar} from "@ionic-native/status-bar";
import {OptionsPopoverPage} from "../options-popover/options-popover";

/**
 * Generated class for the CourseDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})
export class CourseDetailPage {
  public subject:any;
  public tab1: any;
  public tab2: any;
  public tab3: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public statusBar : StatusBar,
    public popoverCtrl: PopoverController
  ) {
    this.subject = navParams.data;
    // this.statusBar.styleLightContent();

    this.tab1 = LessonsPage;
    this.tab2 = VideosPage;
    this.tab3 = DiscussionForumPage;

  }

  ionViewDidLoad() {
    // this.statusBar.overlaysWebView(false);
    // this.statusBar.backgroundColorByHexString('#ffffff');
    console.log('ionViewDidLoad CourseDetailPage');
    console.log(this.subject);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(OptionsPopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
