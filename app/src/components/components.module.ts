import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable';
@NgModule({
	declarations: [ExpandableComponent],
	imports: [],
	exports: [ExpandableComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers:[ ExpandableComponent ]
})
export class ComponentsModule {}
