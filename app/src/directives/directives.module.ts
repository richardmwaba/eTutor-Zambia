import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { ScrollHideDirective } from './scroll-hide/scroll-hide';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [ScrollHideDirective],
	imports: [IonicModule.forRoot(ScrollHideDirective)],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
	exports: [ScrollHideDirective]
})
export class DirectivesModule {}
