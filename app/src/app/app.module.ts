import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AddCommentPageModule } from '../pages/add-comment/add-comment.module';
import { HomePage } from '../pages/home/home';
import { Category } from '../pipes/Category';
import { LoginPageModule } from '../pages/login/login.module';
import { FavouritesModule } from '../pages/favourites/favourites.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SubscriptionPageModule } from '../pages/subscription/subscription.module';
import { CourseDetailPageModule } from '../pages/course-detail/course-detail.module';
import { JuniorSecondaryPageModule } from '../pages/junior-secondary/junior-secondary.module';
import { PerGradePagesPageModule } from '../pages/per-grade-pages/per-grade-pages.module';
import { LessonsPageModule } from '../pages/lessons/lessons.module';
import { VideoPlayerPageModule } from '../pages/video-player/video-player.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthProvider } from '../providers/auth/auth';
import { SubjectsProvider } from '../providers/subjects/subjects';
import { VideosPageModule } from "../pages/videos/videos.module";
import { SubscriptionsProvider } from '../providers/subscriptions/subscriptions';
import { MySubjectsProvider } from '../providers/my-subjects/my-subjects';
import { DiscussionForumPageModule } from "../pages/discussion-forum/discussion-forum.module";
import { PopoverPageModule } from "../pages/popover/popover.module"
import { CommentsPageModule } from "../pages/comments/comments.module";
import { DiscussionsProvider } from '../providers/discussions/discussions';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginModalPageModule } from "../pages/login-modal/login-modal.module";
import { SignUpModalPageModule } from "../pages/sign-up-modal/sign-up-modal.module";
import { OptionsPopoverPageModule } from "../pages/options-popover/options-popover.module";
import { AboutPageModule } from '../pages/about/about.module';
import { DirectivesModule} from "../directives/directives.module";
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Category
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CourseDetailPageModule,
    IonicModule.forRoot(MyApp),
    FavouritesModule,
    LoginPageModule,
    SignupPageModule,
    JuniorSecondaryPageModule,
    PerGradePagesPageModule,
    LessonsPageModule,
    SubscriptionPageModule,
    VideoPlayerPageModule,
    VideosPageModule,
    DiscussionForumPageModule,
    PopoverPageModule,
    CommentsPageModule,
    AddCommentPageModule,
    LoginModalPageModule,
    SignUpModalPageModule,
    OptionsPopoverPageModule,
    DirectivesModule,
    AboutPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
  ],
  providers: [
    StatusBar,
    AndroidFullScreen,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    SubjectsProvider,
    HttpClientModule,
    SubscriptionsProvider,
    MySubjectsProvider,
    DiscussionsProvider,
    Keyboard,
    Category,
    Network,
    NetworkProvider,
    InAppBrowser
  ]

})
export class AppModule {
}
