import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-eight',
  templateUrl: './eight.component.html',
  styleUrls: ['./eight.component.css']
})
export class EightComponent implements OnInit {

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;
  images: string[];

  constructor() { }

  ngOnInit() {
    this.images = [
      'assets/images/bg.jpg',
      'assets/images/car.png',
      'assets/images/canberra.jpg',
      'assets/images/holi.jpg'
    ];
    
    this.carouselTileOne = {
      grid: { xs: 2, sm: 3, md: 3, lg: 4, all: 0 },
      speed: 600,
      interval: 3000,
      point: {
        visible: false,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            background: #6b6b6b;
            padding: 5px;
            margin: 0 3px;
            transition: .4s;
          }
          .ngxcarouselPoint li.active {
              border: 2px solid rgba(0, 0, 0, 0.55);
              transform: scale(1.2);
              background: transparent;
            }
        `
      },
      load: 2,
      loop: true,
      touch: true,
      easing: 'ease',
      animation: 'lazy'
    };

    this.carouselTileOneLoad();
  }

  public carouselTileOneLoad() {
    const len = this.carouselTileOneItems.length;
    if (len <= 10) {
      for (let i = len; i < len + 5; i++) {
        this.carouselTileOneItems.push(
          this.images[Math.floor(Math.random() * this.images.length)]
        );
      }
    }
  }

}
