import {Component, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;

  constructor() {

  }

  ngAfterViewInit(){
    // this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
  }

}