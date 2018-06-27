import { Component, ViewChild } from '@angular/core';
import {LoadingController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
// page imports
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage} from '../pages/signup/signup';
import { FavouritesPage } from '../pages/favourites/favourites';
import {AuthProvider} from "../providers/auth/auth";
import { AboutPage } from '../pages/about/about';
import { NetworkProvider } from '../providers/network/network';

import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage : any; // the currently active page
  public username:any;

  showSplash = true;

  // leftIcon is the name of the button's icon
  pages: Array<{title: string, leftIcon: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthProvider,
    public events: Events,
    public loadingCtrl: LoadingController,
    public network: Network,
    public networkProvider: NetworkProvider
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
      this.statusBar.backgroundColorByHexString('#d1d1d1');
      this.splashScreen.hide();

      this.networkProvider.initializeNetworkEvents();
      // Offline event
      this.events.subscribe('network:offline', () => {
          alert('network:offline ==> '+this.network.type);    
      });

      // Online event
      this.events.subscribe('network:online', () => {
          alert('network:online ==> '+this.network.type);        
      });

      timer(3000).subscribe(() => this.showSplash = false);
    });
  }

   setSideMenuItems(){

    if((AuthProvider.isAuthenticated())){
    let user  = JSON.parse(localStorage.getItem('user'));
    console.log("Signed in user is "+ user.username);
      this.username = user.username;

      return [
        { title: 'Home', leftIcon: 'home', component: HomePage },
        { title: 'Favourites', leftIcon: 'list-box', component: FavouritesPage },
        { title: 'About', leftIcon: 'information-circle', component: AboutPage },
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
      duration: 500
    });
    loader.present();
  }

  checkActive(page){
    // checks if the page is active and returns that page
    return page == this.activePage;
  }

}
