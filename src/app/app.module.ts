import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AllSubjectsPage } from '../pages/all-subjects/all-subjects';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MySubjectsPage } from '../pages/my-subjects/my-subjects';
import { SignupPage } from '../pages/signup/signup';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { CourseDetailPage } from '../pages/course-detail/course-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AllSubjectsPage,
    ListPage,
    LoginPage,
    MySubjectsPage,
    SignupPage,
    SubscriptionPage,
    CourseDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AllSubjectsPage,
    ListPage,
    LoginPage,
    MySubjectsPage,
    SignupPage,
    SubscriptionPage,
    CourseDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
