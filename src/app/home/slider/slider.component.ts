import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PostsService } from '../../_services/posts.service';
import { PlayerService } from '../../_services/player.service';
import { HelpersService } from '../../_services/helpers.service';
import { LazyService } from '../../_services/lazy.service';
// import { HtmlEncode } from '../../_helpers/helpers';

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
      state('slide4', style({
        'left':'-300vw'
      })),
      state('slide5', style({
        'left':'-400vw'
      })),
      state('slide6', style({
        'left':'-500vw'
      })),
      transition('* => *', animate(500)),
    ])
  ]
})
export class SliderComponent implements OnInit {
  sliderState = 'slide1';
  slideNumber: number;
  autoplayActive: boolean;
  slide1HasLoaded: boolean;
  slide2HasLoaded: boolean;
  slide3HasLoaded: boolean;
  slide4HasLoaded: boolean;
  slide5HasLoaded: boolean;
  slide6HasLoaded: boolean;
  listenBack = [];
  highlights = [];
  constructor(private postsService: PostsService,
              private playerService: PlayerService,
              private helpersService: HelpersService,
              private lazyService: LazyService,
              @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {
    this.slide1HasLoaded = false;
    this.slide2HasLoaded = false;
    this.slide3HasLoaded = false;
    this.slide4HasLoaded = false;
    this.slide5HasLoaded = false;
    this.slide6HasLoaded = false;
}

ngAfterViewInit() {
  if(isPlatformBrowser(this.platformId)) {
setInterval(()=> { this.autoplay(this.autoplayActive) }, 7 * 1000);

// Combine all three functions into one function

this.postsService.getLatestShows().subscribe(
data => {

    let latestShowData = {
      title: this.helpersService.HtmlEncode(data[0].title),
      excerpt: this.helpersService.HtmlEncode(data[0].excerpt),
      content: this.helpersService.HtmlEncode(data[0].content),
      featured_image: data[0].image_thumbnail
    }
    this.listenBack.push(latestShowData);
}
)

this.postsService.getHighlights().subscribe(
data => {
  data.forEach((item, index) => {
    let sliderData = {
      title: this.helpersService.HtmlEncode(item.title["rendered"]),
      excerpt: this.helpersService.HtmlEncode(item.excerpt["rendered"].replace(/<[^>]*>/g, '')),
      content: this.helpersService.HtmlEncode(item.content["rendered"].replace(/<[^>]*>/g, '')),
      low_res_image: item._embedded["wp:featuredmedia"][0].media_details.sizes["portfolio-auto"].source_url,
      featured_image: item._embedded["wp:featuredmedia"][0].source_url
    }
    this.highlights.push(sliderData);
  });
}
)
}
}

  nextSlide() {
    this.autoplayActive = false;
    let nextNum = this.sliderState.split('').pop();
    this.slideNumber = Number(nextNum);
    if (this.slideNumber < 6) {
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
    this.slideNumber = 6;
  }
  this.sliderState = 'slide' + this.slideNumber;
  }

  autoplay(active) {
    if (active) {
    let nextNum = this.sliderState.split('').pop();
    this.slideNumber = Number(nextNum);
    if (this.slideNumber < 6) {
    this.slideNumber++; }
    else {
      this.slideNumber = 1;
    }
    this.sliderState = 'slide' + this.slideNumber;
  }
  }

  listenToLatestShow(show) {
    this.playerService.playShow(show);
  }

  slideImage1HasLoaded() {
    this.slide1HasLoaded = true;
    this.lazyService.imageHasLoaded();
  }

  slideImage2HasLoaded() {
    this.slide2HasLoaded = true;
    this.autoplayActive = true;
    this.lazyService.imageHasLoaded();
  }

  slideImage3HasLoaded() {
    this.slide3HasLoaded = true;
    this.lazyService.imageHasLoaded();
  }

  slideImage4HasLoaded() {
    this.slide4HasLoaded = true;
    this.lazyService.imageHasLoaded();
  }

  slideImage5HasLoaded() {
    this.slide5HasLoaded = true;
    this.lazyService.imageHasLoaded();
  }

  slideImage6HasLoaded() {
    this.slide6HasLoaded = true;
    this.lazyService.imageHasLoaded();
  }
}
