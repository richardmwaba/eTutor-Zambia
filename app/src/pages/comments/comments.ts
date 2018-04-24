import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AddCommentPage} from "../add-comment/add-comment";
import {DiscussionsProvider} from "../../providers/discussions/discussions";
import {AuthProvider} from "../../providers/auth/auth";
// $IMPORTSTATEMENT

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// $IONICPAGE
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  public topic:any;
  public comments:any;
  public likes=0;
  public hasLiked:Boolean;
  public dislikes=0;
  public hasDisliked:Boolean;
  public data=[];
  public user:any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public discussionsService: DiscussionsProvider,
    private toastCtrl: ToastController,
    public AuthService: AuthProvider,
    public navParams: NavParams) {
    this.hasLiked = false;
    this.hasDisliked = false;
    //get the topic selected form the discussions page
    this.topic = this.navParams.get('topic');
    this.user = this.AuthService.user;

    //initialise this class with data from the database
    this.AuthService.isAuthenticated() ? this.initialiseWithAuth() : this.initialiseWithNoAuth();


  }

  ionViewDidLoad() {

      this.presentToast(this.data['msg']);

    console.log('ionViewDidLoad CommentsPage');
  }


  initialiseWithNoAuth(){
    this.discussionsService.getDiscussionNoAuth(this.topic._id).then(data=>{
      this.data = data;
      this.comments = data['comments'];
    });
  }

  initialiseWithAuth(){
    this.discussionsService.getDiscussion(this.topic._id, this.user.username).then(data=>{
      this.data = data;
      this.comments = data['comments'];
    });
  }


  /**
   * controls what happens when a click event is generated
   * @param comment,  a comment object representing the disliked comment
   */
  like(comment){

    if(this.AuthService.isAuthenticated()) {
      this.hasLiked ? this.neutralState(comment) : this.likedState(comment);
    }else{
      this.presentToast("Your are not signed in!");
    }
  }

  /**
   * controls what happens when a click event is generated
   * @param comment , a comment object representing the disliked comment
   */
  dislike(comment){
    if(this.AuthService.isAuthenticated()) {
      this.hasDisliked ? this.neutralState(comment) : this.dislikedState(comment);
    }else {
        this.presentToast("Your are not signed in!");
    }
    }

  /**
   *
   * @param comment
   */
  likedState(comment){
    comment.likes++;
    this.hasLiked=true;
      if(this.hasDisliked){
        comment.dislikes--;
        this.hasDisliked=false;
    }
  }

  /**
   *
   * @param comment
   */
  dislikedState(comment){
      comment.dislikes++;
      this.hasDisliked=true;
      if(this.hasLiked) {
        comment.likes--;
        this.hasLiked = false;
      }
  }

  /**
   *
   * @param comment
   */
  neutralState(comment){
    if (this.hasLiked) {
      comment.likes--;
      this.hasLiked = false;
    }else if(this.hasDisliked){
        comment.dislikes--;
        this.hasDisliked=false;
      }
    }

  /**
   *
   * @param topic
   */
  presentModal(topic) {
    if(this.AuthService.isAuthenticated()) {
    let modal = this.modalCtrl.create(AddCommentPage, {topic});
    modal.present();
    }else {
      this.presentToast("Your are not signed in!");
    }
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

}
