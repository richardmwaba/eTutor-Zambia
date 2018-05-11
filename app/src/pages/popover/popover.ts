import { Component, Input , ViewChild} from '@angular/core';
import {NavController, NavParams, Searchbar, ViewController} from 'ionic-angular';
import {SubjectsProvider} from "../../providers/subjects/subjects";
import {CourseDetailPage} from "../course-detail/course-detail";
import { Keyboard } from '@ionic-native/keyboard';
// $IMPORTSTATEMENT

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// $IONICPAGE
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  searchQuery: string = '';
  items: Array<any>;
  subjects:Array<any>;
  constructor(
    public navCtrl: NavController,
    public subjectsService: SubjectsProvider,
    private keyboard: Keyboard,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.subjectsService.getSubjects().then((data) => {
      console.log(data);
      this.subjects = data;
    });
    this.initializeItems();
  }

  ionViewDidLoad() {
    this.keyboard.show();
    console.log('ionViewDidLoad PopoverPage');
  }

  initializeItems() {
    this.items = this.subjects;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  courseDetail(subject) {
    //navigate to the selected course detail page
    this.navCtrl.push(CourseDetailPage, {subject});
  }

  dismiss(){
    this.keyboard.close();
    this.viewCtrl.dismiss();
  }

}
