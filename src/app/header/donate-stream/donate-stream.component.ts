import { Renderer2, Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PostsService } from '../../_services/posts.service';
import { DonateService } from '../../_services/donate.service';
import { DecimalPipe, DOCUMENT } from '@angular/common';

declare var paypal: any;

@Component({
  selector: 'app-donate-stream',
  templateUrl: './donate-stream.component.html',
  styleUrls: ['./donate-stream.component.scss'],
  providers: [DecimalPipe],
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
      state('slide5', style({
        'margin-top':'-384px'
      })),
      state('slide7', style({
        'margin-top':'-576px'
      })),
      transition('* => *', animate('333ms ease-in-out')),
    ]),
    trigger('popup', [
      state('out', style({
        'height':'0px',
      })),
      state('desktop-in', style({
        'height':'96px',
        'visibility':'visible'
      })),
      state('mobile-in', style({
        'height':'192px',
        'visibility':'visible'
      })),
      transition('* => *', animate(1200))
    ])
  ]
})
export class DonateStreamComponent implements OnInit {


  constructor(private postsService: PostsService,
              public donateService: DonateService,
              private decimalPipe: DecimalPipe,
              private renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document,
              @Inject(PLATFORM_ID) private platformId) { }
              popupState = 'out';
currentShow = 'HKCR';
donateState: string;
hkcrDonation: string;
valueOfDonationInServerDays: any;
paymentConfirmed: boolean;

  ngOnInit() {
    if(this.postsService.nowPlaying !== undefined) {
    this.currentShow = this.postsService.nowPlaying;
  }
  console.log(this.postsService.nowPlaying);

  this.donateService.donateStateChange.subscribe(value => {
    this.donateState = value;
  });

  this.donateService.hkcrDonateStateChange.subscribe(value => {
    let arr = value.split('- ')
    let arr2 = arr[1].split('.');
    this.valueOfDonationInServerDays = Math.floor(parseFloat(arr2[0])/1.333);
    if(this.valueOfDonationInServerDays < 1) {
      this.valueOfDonationInServerDays = '< 1'
    }
  })

  this.donateService.paymentConfirmedStateChange.subscribe(value => {
    this.paymentConfirmed = value;
  })

  this.postsService.nowPlayingStateChange.subscribe(value => {
    if(value !== '') {
    this.currentShow = this.postsService.nowPlaying;
  } else {
    this.currentShow = 'HKCR';
  }
  });
  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
      if (window.innerWidth > 768) {
          setTimeout(() => {
            this.popupState='desktop-in';
          }, 12000);
      } else {
        setTimeout(() => {
          this.popupState='mobile-in';
        }, 12000);
      }
  }
  }

  advanceToSlide1() {
      this.donateService.changeSlide('slide1');
  }

advanceToSlide2() {
  if (window.innerWidth > 768) {
      this.donateService.changeSlide('slide2');
  } else {
    this.donateService.changeSlide('slide3');
  }
}

advanceToSlide3() {
    this.donateService.changeSlide('slide3');
}

advanceToSlide4() {
    this.donateService.changeSlide('slide4');
}


}
