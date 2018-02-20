import { Routes, RouterModule } from '@angular/router';

import { Exams } from './exams.component';
import { AlevelExams } from './components/a-level/a-level_exams.component';
import { JuniorExams } from './components/junior/junior_exams.component';
import { SeniorExams } from './components/senior/senior_exams.component';

const routes: Routes = [
  {
    path: '',
    component: Exams,
    children: [
      { path: 'a-level', component: AlevelExams },
      { path: 'junior', component: JuniorExams },
      { path: 'senior', component: SeniorExams }
    ]
  }
];

export const routing = RouterModule.forChild(routes);