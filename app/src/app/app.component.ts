import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


// page imports
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage} from '../pages/signup/signup';
import { AllSubjectsPage } from '../pages/all-subjects/all-subjects';
import { MySubjectsPage } from '../pages/my-subjects/my-subjects';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { VideoPlayerPage } from '../pages/video-player/video-player';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage : any; // the currently active page

  // leftIcon is the name of the button's icon
  pages: Array<{title: string, leftIcon: string,component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Home', leftIcon: 'home', component: HomePage },
      { title: 'Sign In', leftIcon: 'signin', component: LoginPage },
      { title: 'Sign Up', leftIcon: 'signup', component: SignupPage },
      // { title: 'List', leftIcon: 'list', component: ListPage },
      { title: 'All Subjects', leftIcon: 'list', component: AllSubjectsPage },
      { title: 'My Subjects', leftIcon: 'list-box', component: MySubjectsPage },
      { title: 'Subscription', leftIcon: 'subscription', component: SubscriptionPage },
      { title: 'VideoPlayer', leftIcon: 'subscription', component: VideoPlayerPage }
    ];

    this.activePage = this.pages[0]; // first active item is HomePage

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page; // sets the active page color
  }

  checkActive(page){
    // checks if the page is active and returns that page
    return page == this.activePage;
  }

}
