import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PostsService } from '../_services/posts.service';
import { PlayerService } from '../_services/player.service';
import { HtmlEncode } from '../_helpers/helpers';

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
      transition('* => *', animate(500)),
    ])
  ]
})
export class SliderComponent implements OnInit {
  sliderState = 'slide1';
  slideNumber: number;
  autoplayActive: boolean;
  listenBack = [];
  highlights = [];
  constructor(private postsService: PostsService,
              private playerService: PlayerService) { }

  ngOnInit() {
    this.autoplayActive = true;
    setInterval(()=> { this.autoplay(this.autoplayActive) }, 12 * 1000);

    this.postsService.getLatestShow().subscribe(
      data => {

          let latestShowData = {
            title: HtmlEncode(data[0].title),
            excerpt: HtmlEncode(data[0].excerpt),
            content: HtmlEncode(data[0].content),
            featured_image: data[0].image_thumbnail
          }
          this.listenBack.push(latestShowData);
      }
    )

    this.postsService.getHighlights().subscribe(
      data => {
        console.log(data);
        data.forEach((item, index) => {
          let sliderData = {
            title: HtmlEncode(item.title["rendered"]),
            excerpt: HtmlEncode(item.excerpt["rendered"].replace(/<[^>]*>/g, '')),
            content: HtmlEncode(item.content["rendered"].replace(/<[^>]*>/g, '')),
            featured_image: item._embedded["wp:featuredmedia"][0].source_url
          }
          this.highlights.push(sliderData);
        });
      }
    )
  }

  nextSlide() {
    this.autoplayActive = false;
    let nextNum = this.sliderState.split('').pop();
    this.slideNumber = Number(nextNum);
    if (this.slideNumber < 4) {
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
    this.slideNumber = 4;
  }
  this.sliderState = 'slide' + this.slideNumber;
  }

  autoplay(active) {
    if (active) {
    let nextNum = this.sliderState.split('').pop();
    this.slideNumber = Number(nextNum);
    if (this.slideNumber < 4) {
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
}
