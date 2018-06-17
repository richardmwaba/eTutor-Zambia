import { Component, ViewChild } from '@angular/core';
import {LoadingController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
// page imports
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage} from '../pages/signup/signup';
<<<<<<< HEAD
import { FavouritesPage } from '../pages/favourites/favourites';
import {AuthProvider} from "../providers/auth/auth";
=======
import { MySubjectsPage } from '../pages/my-subjects/my-subjects';
import {AuthProvider} from "../providers/auth/auth";
import { AboutPage } from '../pages/about/about';
>>>>>>> 1d3c0124e987eefee30ff5caf00c11b62206c280

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage : any; // the currently active page
  public username:any;
  showLevel1 = null;
  showLevel2 = null;


  // leftIcon is the name of the button's icon
  pages: Array<{title: string, leftIcon: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthProvider,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {
    events.subscribe('user:authenticated', (user, username, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.pages = this.setSideMenuItems();
      console.log('Welcome', user, 'at', time);
    });
    events.subscribe('user:unauthenticated', (username, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.pages = this.setSideMenuItems();
    });
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = this.setSideMenuItems();
    this.activePage = this.pages[0]; // first active item is HomePage

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#e7e7e7');
      this.splashScreen.hide();
    });
  }

   setSideMenuItems(){

    if((AuthProvider.isAuthenticated())){
    let user  = JSON.parse(localStorage.getItem('user'));
    console.log("Signed in user is "+ user.username);
      this.username = user.username;

      return [
        { title: 'Home', leftIcon: 'home', component: HomePage },
        { title: 'Favourite', leftIcon: 'list-box', component: FavouritesPage },
        // { title: 'Subscription', leftIcon: 'pricetags', component: MySubjectsPage },
      ];
    }else {
      this.username =null;
      return [
        { title: 'Home', leftIcon: 'home', component: HomePage },
        { title: 'Sign In', leftIcon: 'log-in', component: LoginPage },
        { title: 'Sign Up', leftIcon: 'person-add', component: SignupPage },
        { title: 'About', leftIcon: 'information-circle', component: AboutPage },
      ];
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page; // sets the active page color
    // this.nav.push(page.component);
  }

  logout(){
    this.presentLoading();
    this.authService.logout();
    this.events.publish('user:unauthenticated', null, Date.now());
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "We are signing you out...",
      duration: 1000
    });
    loader.present();
  }

  checkActive(page){
    // checks if the page is active and returns that page
    return page == this.activePage;
  }

}
