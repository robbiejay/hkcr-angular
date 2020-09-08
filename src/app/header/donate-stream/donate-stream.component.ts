import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PostsService } from '../../_services/posts.service';
import { DonateService } from '../../_services/donate.service';

@Component({
  selector: 'app-donate-stream',
  templateUrl: './donate-stream.component.html',
  styleUrls: ['./donate-stream.component.scss'],
  animations: [
    trigger('slide', [
      state('slide1', style({
        'margin-top':'0px'
      })),
      state('slide2', style({
        'margin-top':'-96px'
      })),
      state('slide3', style({
        'margin-top':'-192px'
      })),
      state('slide4', style({
        'margin-top':'-288px'
      })),
      transition('* => *', animate('333ms ease-in-out')),
    ])
  ]
})
export class DonateStreamComponent implements OnInit {


  constructor(private postsService: PostsService,
              private donateService: DonateService) { }
currentShow: string;
donateState: string;
  ngOnInit() {
    if(this.postsService.nowPlaying !== '') {
    this.currentShow = this.postsService.nowPlaying;
  } else {
    this.currentShow = 'HKCR';
  }

  this.donateService.donateStateChange.subscribe(value => {
    this.donateState = value;
  });

  this.postsService.nowPlayingStateChange.subscribe(value => {
    if(value !== '') {
    this.currentShow = this.postsService.nowPlaying;
  } else {
    this.currentShow = 'HKCR';
  }
  });
  }

  advanceToSlide1() {
      this.donateService.changeSlide('slide1');
  }

advanceToSlide2() {
    this.donateService.changeSlide('slide2');
}

advanceToSlide3() {
    this.donateService.changeSlide('slide3');
}

advanceToSlide4() {
    this.donateService.changeSlide('slide4');
}


}
