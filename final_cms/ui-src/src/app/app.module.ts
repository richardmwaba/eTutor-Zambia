import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ValidateService } from './services/validate/validate.service';
import { AuthService } from './services/auth/auth.service';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlevelComponent } from './pages/exams/alevel/alevel.component';
import { JuniorComponent } from './pages/exams/junior/junior.component';
import { SeniorComponent } from './pages/exams/senior/senior.component';
import { AlevelLessonsComponent } from './pages/lessons/alevel/alevel.component';
import { EightComponent } from './pages/lessons/eight/eight.component';
import { NineComponent } from './pages/lessons/nine/nine.component';
import { TenComponent } from './pages/lessons/ten/ten.component';
import { ElevenComponent } from './pages/lessons/eleven/eleven.component';
import { TwelveComponent } from './pages/lessons/twelve/twelve.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { LoginLayoutComponent } from './_layout/login-layout/login-layout.component';

import { routing } from './app.routing';
import { AddSuperUserComponent } from './components/add-super-user/add-super-user.component';
import { AddJuniorExamMaterialComponent } from './components/add-junior-exam-material/add-junior-exam-material.component';
import { AddSeniorExamMaterialComponent } from './components/add-senior-exam-material/add-senior-exam-material.component';
import { AddSeniorMaterialComponent } from './components/add-senior-material/add-senior-material.component';
import { AddJuniorMaterialComponent } from './components/add-junior-material/add-junior-material.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    SidemenuComponent,
    DashboardComponent,
    AlevelComponent,
    JuniorComponent,
    SeniorComponent,
    AlevelLessonsComponent,
    EightComponent,
    NineComponent,
    TenComponent,
    ElevenComponent,
    TwelveComponent,
    ProfileComponent,
    UsersComponent,
    ClientsComponent,
    AppLayoutComponent,
    LoginLayoutComponent,
    AddSuperUserComponent,
    AddJuniorExamMaterialComponent,
    AddSeniorExamMaterialComponent,
    AddSeniorMaterialComponent,
    AddJuniorMaterialComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    FlashMessagesModule,
    NgxCarouselModule
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
