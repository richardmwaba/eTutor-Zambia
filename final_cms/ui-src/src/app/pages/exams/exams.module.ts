import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AppTranslationModule } from '../../app.translation.module';


import { Exams } from './exams.component';
import { routing } from './exams.routing';
import { AlevelExams } from './components/a-level';
import { JuniorExams } from './components/junior';
import { SeniorExams } from './components/senior';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgbRatingModule,
    AppTranslationModule,
    routing
  ],
  declarations: [
    Exams,
    AlevelExams,
    JuniorExams,
    SeniorExams
  ]
})
export class ExamsModule {}