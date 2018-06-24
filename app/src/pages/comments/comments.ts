import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
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
  public topic: any;
  public comments: any;
  public likes = 0;
  public hasLiked: Boolean;
  public dislikes = 0;
  public hasDisliked: Boolean;
  public data:any;
  public user: any;
  public didReact=0;
  public loader:any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public discussionsService: DiscussionsProvider,
    private toastCtrl: ToastController,
    public AuthService: AuthProvider,
    public navParams: NavParams) {
    this.hasLiked = false;
    this.hasDisliked = false;
    //get the topic selected form the discussions page
    this.topic = this.navParams.get('topic');
    this.user = JSON.parse(localStorage.getItem('user'));
    //initialise this class with data from the database


  }

  createLoader(){
    this.loader = this.loader = this.loadingCtrl.create({
      content: "Loading comments..."
    });
  }

  ionViewDidLoad() {
    this.createLoader();
    this.loader.present();
    this.initialise(null);
    // this.presentToast(this.data['msg']);

    console.log('ionViewDidLoad CommentsPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.initialise(refresher);
  }
  /**
   * initialises this class with values from the db
   * checking which comments the logged in user or has not liked
   */
  initialise(refresher) {
    let user_id = null;
    if (this.user) {
      user_id = this.user.id;
    }
    this.discussionsService.getDiscussion(this.topic._id, user_id).then(data => {
      this.data = data;
      this.comments = data['comments'];
      if(this.loader) {
        this.loader.dismiss();
      }
      if(refresher) {
        refresher.complete();
      }

    });
  }

  /**
   * set the hasLiked and hasDisliked variables to those retrieved form the the db
   * @param reviewer, information about this user to tell weather this user has already liked or is liking the first time
   */
  setHasLikedHasDisliked(reviewer) {
    this.hasLiked = reviewer.hasLiked;
    this.hasDisliked = reviewer.hasDisliked;
    this.didReact = 1;
  }

  /**
   * controls what happens when a click event is generated
   * @param comment,  a comment object representing the disliked comment
   */
  like(comment) {
    this.presentToast("Saving...");
    if (AuthProvider.isAuthenticated()) {
      let reviewer = comment.reviewers.find(x => x._id === this.user.id);  // we check if this user reacted to this comment earlier.
      if(reviewer) {this.setHasLikedHasDisliked(reviewer);} //if this user did react earlier, set the hasLiked and disliked attributes accordingly else set the didReact to null or false
      this.hasLiked ? this.neutralState(comment) : this.likedState(comment); //set the current state for this comment
      this.saveLike(comment); //update records in db
    } else {
      this.presentToast("Your are not signed in!");
    }
  }

  /**
   * controls what happens when a click event is generated
   * @param comment , a comment object representing the disliked comment
   */
  dislike(comment) {
    this.presentToast("Saving...");
    if (AuthProvider.isAuthenticated()) {
      let reviewer = comment.reviewers.find(x => x._id === this.user.id);// we check if this user reacted to this comment earlier.
      if(reviewer){this.setHasLikedHasDisliked(reviewer);}//if this user reacted, set the hasLiked and disliked attributes accordingly
      this.hasDisliked ? this.neutralState(comment) : this.dislikedState(comment); //set the current state for this comment
      this.saveDislike(comment); //update records in db
    } else {
      this.presentToast("Your are not signed in!");
    }
  }

  /**
   * goes to the liked state
   * @param comment
   */
  likedState(comment) {
    comment.likes++;
    this.hasLiked = true;
    this.checkForDislike(comment);
  }

  /**
   * goes to the disliked state
   * @param comment
   */
  dislikedState(comment) {
    comment.dislikes++;
    this.hasDisliked = true;
    this.checkForLike(comment);
  }

  /**
   * goes to the neutral state
   * @param comment
   */
  neutralState(comment) {
    this.checkForLike(comment);
      this.checkForDislike(comment);
  }

  /**
   * checks if this user already has a dislike count for this comment
   * @param comment
   */
  checkForDislike(comment) {
    if (this.hasDisliked) {
      comment.dislikes--;
      this.hasDisliked = false;
    }
  }

  /**
   * checks if this user already has a like count for this comment
   * @param comment
   */
  checkForLike(comment) {
    if (this.hasLiked) {
      comment.likes--;
      this.hasLiked = false;
    }
  }

  /**
   * updates the comment attributes the db
   * @param comment
   */
  saveLike(comment) {
    this.discussionsService.updateReactions(this.topic._id, comment._id, this.hasLiked, this.hasDisliked, this.user.id, comment.likes, comment.dislikes, this.didReact).subscribe(data => {
      if (data['success']) {
        this.comments = data['comments'];
        this.presentToast(data['msg']);
      } else {
        this.presentToast(data['msg']);
        // this.like(comment);
      }
    })
  }

  /**
   * updates the comment attributes in the db
   * @param comment, the comment this user is reacting to
   */
  saveDislike(comment) {
    this.discussionsService.updateReactions(this.topic._id, comment._id, this.hasLiked, this.hasDisliked, this.user.id, comment.likes, comment.dislikes, this.didReact).subscribe(data => {
      if (data['success']) {
        this.comments = data['comments'];
        this.presentToast(data['msg']);
      } else {
        this.presentToast(data['msg']);
        // this.dislike(comment);
      }
    })
  }

  /**
   *
   * @param topic
   */
  showAddCommentModal(topic) {
    if (AuthProvider.isAuthenticated()) {
      let modal = this.modalCtrl.create(AddCommentPage, {topic, hasDiscussion: this.data['success']});
      modal.present();
      modal.onDidDismiss(data=>{
        if(data){
          this.comments = data;
        }
      })
    } else {
      this.presentToast("Your are not signed in!");
    }
  }


  deleteComment(comment) {
    if (AuthProvider.isAuthenticated()) {
    this.presentToast("We are removing "+comment.title);
    this.discussionsService.deleteComment(this.topic._id, comment._id).subscribe(data => {
      this.comments = data['comments'];
      this.presentToast(data['msg']);
    });
    } else {
      this.presentToast("Your are not signed in!");
    }
  }

  dismissModal(){
    this.navCtrl.pop();
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
