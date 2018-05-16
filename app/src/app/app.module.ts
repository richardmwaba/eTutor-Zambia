import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import { AddCommentPageModule } from '../pages/add-comment/add-comment.module';
import {HomePage} from '../pages/home/home';
import {Category} from '../pipes/Category';
import {ListPage} from '../pages/list/list';
import {LoginPageModule} from '../pages/login/login.module';
import {MySubjectsPageModule} from '../pages/my-subjects/my-subjects.module';
import {SignupPageModule} from '../pages/signup/signup.module';
import {SubscriptionPageModule} from '../pages/subscription/subscription.module';
import {CourseDetailPageModule} from '../pages/course-detail/course-detail.module';
import {JuniorSecondaryPageModule} from '../pages/junior-secondary/junior-secondary.module';
import {PerGradePagesPageModule} from '../pages/per-grade-pages/per-grade-pages.module';
import {LessonsPageModule} from '../pages/lessons/lessons.module';
import {VideoPlayerPageModule} from '../pages/video-player/video-player.module';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';
import {SubjectsProvider} from '../providers/subjects/subjects';
import {VideosPageModule} from "../pages/videos/videos.module";
import { EqualValidatorDirective } from '../directives/equal-validator/equal-validator';
import { SubscriptionsProvider } from '../providers/subscriptions/subscriptions';
import { MySubjectsProvider } from '../providers/my-subjects/my-subjects';
import {DiscussionForumPageModule } from "../pages/discussion-forum/discussion-forum.module";
import {PopoverPageModule} from "../pages/popover/popover.module"
import { CommentsPageModule } from "../pages/comments/comments.module";
import { DiscussionsProvider } from '../providers/discussions/discussions';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Grade } from '../app/pipes/grade';
import { Keyboard } from '@ionic-native/keyboard';
import {LoginModalPageModule} from "../pages/login-modal/login-modal.module";
import {SignUpModalPageModule} from "../pages/sign-up-modal/sign-up-modal.module";
import { OptionsPopoverPageModule } from "../pages/options-popover/options-popover.module";
import { ComponentsModule } from "../components/components.module";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
      Grade,
        Category,
        EqualValidatorDirective,
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      CourseDetailPageModule,
      IonicModule.forRoot(MyApp),
      MySubjectsPageModule,
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
      ComponentsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        ListPage,
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
      Category
    ]
})
export class AppModule {
}
