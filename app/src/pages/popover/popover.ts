import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SubjectsProvider} from "../../providers/subjects/subjects";
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
  items: string[];
  subjects: any;
  constructor(
    public navCtrl: NavController,
    public subjectsService: SubjectsProvider,
    public navParams: NavParams) {
    this.subjectsService.getSubjects().then((data) => {
      console.log(data);
      this.subjects = data;
    });
    this.initializeItems();
  }

  ionViewDidLoad() {
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
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
