import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


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
import { EightComponent } from './pages/lessons/eight/eight.component';
import { NineComponent } from './pages/lessons/nine/nine.component';
import { TenComponent } from './pages/lessons/ten/ten.component';
import { ElevenComponent } from './pages/lessons/eleven/eleven.component';
import { TwelveComponent } from './pages/lessons/twelve/twelve.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';


const appRoutes: Routes = [
{ path:'', component: DashboardComponent },
{ path:'login', component: LoginComponent },
{ path:'register', component: RegisterComponent },
{ path:'exams/junior', component: JuniorComponent },
{ path:'exams/senior', component: SeniorComponent },
{ path:'exams/a-level', component: AlevelComponent },
{ path:'lessons/eight', component: EightComponent },
{ path:'lessons/nine', component: NineComponent },
{ path:'lessons/ten', component: TenComponent },
{ path:'lessons/eleven', component: ElevenComponent },
{ path:'lessons/twelve', component: TwelveComponent },
{ path:'profile', component: ProfileComponent },
{ path:'users', component: UsersComponent },
{ path:'clients', component: ClientsComponent }
]

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
    EightComponent,
    NineComponent,
    TenComponent,
    ElevenComponent,
    TwelveComponent,
    ProfileComponent,
    UsersComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
