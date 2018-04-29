import { RouterModule, Routes } from '@angular/router';

import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { LoginLayoutComponent } from './_layout/login-layout/login-layout.component';

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

const appRoutes: Routes = [

     // Login routes goes here here
     { 
        path: '',
        component: LoginLayoutComponent, 
        children: [
            { path:'', component: LoginComponent, pathMatch: 'full' },
            { path:'register', component: RegisterComponent }
        ]
    },
     
    //App routes goes here 
    { 
        path: '', 
        component: AppLayoutComponent,
        children: [
            { path:'dashboard', component: DashboardComponent},
            { path:'exams/junior', component: JuniorComponent },
            { path:'exams/senior', component: SeniorComponent },
            { path:'exams/a-level', component: AlevelComponent },
            { path:'lessons/a-level', component: AlevelLessonsComponent },
            { path:'lessons/eight', component: EightComponent },
            { path:'lessons/nine', component: NineComponent },
            { path:'lessons/ten', component: TenComponent },
            { path:'lessons/eleven', component: ElevenComponent },
            { path:'lessons/twelve', component: TwelveComponent },
            { path:'profile', component: ProfileComponent },
            { path:'users', component: UsersComponent },
            { path:'clients', component: ClientsComponent }
        ]
    },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '/dashboard' }

    ]

export const routing = RouterModule.forRoot(appRoutes);