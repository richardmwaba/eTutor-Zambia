import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable';
import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header/shrinking-segment-header';
@NgModule({
	declarations: [ExpandableComponent,
    ShrinkingSegmentHeaderComponent],
	imports: [],
	exports: [ExpandableComponent,
    ShrinkingSegmentHeaderComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers:[ ExpandableComponent ]
})
export class ComponentsModule {}
