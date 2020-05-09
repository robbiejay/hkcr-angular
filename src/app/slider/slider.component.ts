import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slide', [
      state('slide1', style({
        'left':'0vw'
      })),
      state('slide2', style({
        'left':'-100vw'
      })),
      state('slide3', style({
        'left':'-200vw'
      })),
      transition('slide1 => slide2', animate(500)),
      transition('slide1 => slide3', animate(500)),
      transition('slide2 => slide1', animate(500)),
      transition('slide2 => slide3', animate(500)),
      transition('slide3 => slide1', animate(500)),
      transition('slide3 => slide2', animate(500)),
    ])
  ]
})
export class SliderComponent implements OnInit {
  sliderState = 'slide1';
  slideNumber: number;
  autoplayActive: boolean;
  constructor() { }

  ngOnInit() {
    this.autoplayActive = true;
    setInterval(()=> { this.autoplay(this.autoplayActive) }, 8 * 1000);
  }

  nextSlide() {
    this.autoplayActive = false;
    let nextNum = this.sliderState.split('').pop();
    this.slideNumber = Number(nextNum);
    if (this.slideNumber < 3) {
    this.slideNumber++; }
    else {
      this.slideNumber = 1;
    }
    this.sliderState = 'slide' + this.slideNumber;
  }

  prevSlide() {
    this.autoplayActive = false;
    let nextNum = this.sliderState.split('').pop();
    this.slideNumber = Number(nextNum);
    if(this.slideNumber > 1) {
    this.slideNumber--;
  } else {
    this.slideNumber = 3;
  }
  this.sliderState = 'slide' + this.slideNumber;
  }

  autoplay(active) {
    if (active) {
    let nextNum = this.sliderState.split('').pop();
    this.slideNumber = Number(nextNum);
    if (this.slideNumber < 3) {
    this.slideNumber++; }
    else {
      this.slideNumber = 1;
    }
    this.sliderState = 'slide' + this.slideNumber;
  }
  }
}
