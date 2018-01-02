import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {Category} from '../pipes/Category';
import {AllSubjectsPage} from '../pages/all-subjects/all-subjects';
import {ListPage} from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {MySubjectsPage} from '../pages/my-subjects/my-subjects';
import {SignupPage} from '../pages/signup/signup';
import {SubscriptionPage} from '../pages/subscription/subscription';
import {CourseDetailPage} from '../pages/course-detail/course-detail';
import {JuniorSecondaryPage} from '../pages/junior-secondary/junior-secondary';
import {ALevelExamsPage} from '../pages/a-level-exams/a-level-exams';
import {PerGradePagesPage} from '../pages/per-grade-pages/per-grade-pages';
import {LessonsPage} from '../pages/lessons/lessons';
import {LessonContentPage} from '../pages/lesson-content/lesson-content';
import {VideoPlayerPage} from '../pages/video-player/video-player';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';
import {SubjectsProvider} from '../providers/subjects/subjects';
import {VideosPage} from "../pages/videos/videos";

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
        CourseDetailPage,
        JuniorSecondaryPage,
        ALevelExamsPage,
        PerGradePagesPage,
        LessonsPage,
        LessonContentPage,
        VideoPlayerPage,
        Category,
        VideosPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
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
        CourseDetailPage,
        JuniorSecondaryPage,
        ALevelExamsPage,
        PerGradePagesPage,
        LessonsPage,
        LessonContentPage,
        VideoPlayerPage,
        VideosPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        SubjectsProvider,
        HttpClientModule
    ]
})
export class AppModule {
}
