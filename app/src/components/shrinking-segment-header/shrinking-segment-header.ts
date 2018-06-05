import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

/**
 * Generated class for the ShrinkingSegmentHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shrinking-segment-header',
  templateUrl: 'shrinking-segment-header.html'
})
export class ShrinkingSegmentHeaderComponent {
  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;

  newHeaderHeight: any;
  text: string;

  constructor(public element: ElementRef, public renderer: Renderer2) {
    console.log('Hello ShrinkingSegmentHeaderComponent Component');
    this.text = 'Hello World';
  }

  ngAfterViewInit(){

    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.scrollArea.ionScroll.subscribe((ev) => {
      // this.resizeHeader(ev);
    });

  }

}
