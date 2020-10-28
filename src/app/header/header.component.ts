import { Renderer2, Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from '../_services/player.service';
import { PostsService } from '../_services/posts.service';
import { HelpersService } from '../_services/helpers.service';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('comingUpSlide', [
      state('comingUpSlide1', style({
        'margin-top':'0px'
      })),
      state('comingUpSlide2', style({
        'margin-top':'-40px'
      })),
      transition('* => *', animate(500)),
    ]),
    trigger('chatToggle', [
      state('chatClosed', style({
        'height': '0px'
      })),
      state('chatOpen', style({
        'height': '380px'
      })),
      transition('* => *', animate(500))
    ]),
    trigger('chatPanelToggle', [
      state('panelNotActive', style({
        'opacity': '1'
      })),
      state('panelActive', style({
        'opacity': '0',
        'visibility': 'hidden'
      })),
      transition('* => *', animate(500))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  comingUpSliderState = 'comingUpSlide1';

  isLivestreamPage: boolean;
  chatPanelActive = false;
  chatPanelToggleState = 'panelNotActive';
  chatActive = 'chatClosed';

  constructor(public playerService: PlayerService,
    private postsService: PostsService,
    private helpersService: HelpersService,
              private renderer2: Renderer2,
              private route: ActivatedRoute,
              @Inject(DOCUMENT) private _document: Document,
              @Inject(PLATFORM_ID) private platformId) { }
  mobileMenuActive = false;


  upcomingShows = [];
  currentDateHK: string;
  currentTimeHK: string;
  currentHourHK : number;
  upcomingHourHK : number;
  timeDifference : number;
  currentDate : string;
  isLoading: boolean;
  mode: string;

  nowPlaying: string;
  upNext: string;
  upNextTime: string;

  daysOfWeek = [
    'SUN','MON','TUE','WED',"THU","FRI","SAT"
  ]

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {

      this.nowPlaying = '';
      setInterval(()=> { this.autoplayComingUp() }, 11 * 1000);
      const videojs_script = this.renderer2.createElement('script')
      videojs_script.src = 'https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js';
      this.renderer2.appendChild(this._document.body, videojs_script);

      const http_streaming_script = this.renderer2.createElement('script')
      http_streaming_script.src = 'https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.min.js';
      this.renderer2.appendChild(this._document.body, http_streaming_script);

      this.currentDateHK = moment().tz("Asia/Hong_Kong").format('YYYY-MM-DD');
      this.currentDate = moment().local().format('YYYY-MM-DD');
      this.currentTimeHK = moment().tz("Asia/Hong_Kong").format('HH:mm:SS');
      this.timeDifference = 8 - (moment().local().utcOffset() / 60);


      this.getUpcomingShows();

      this.postsService.nowPlayingStateChange.subscribe(value => {
        this.nowPlaying = this.postsService.nowPlaying;
      });

      this.postsService.upNextStateChange.subscribe(value => {
        this.upNext = this.postsService.upNext;
      });

      this.postsService.upNextTimeStateChange.subscribe(value => {
        this.upNextTime = this.postsService.upNextTime;
      });
    }
  }

  getUpcomingShows() {
    if(isPlatformBrowser(this.platformId)) {
this.postsService.getUpcomingShows().subscribe(
data => {
let upNext = false;

data.forEach(upcoming => {

this.isLoading = false;
let featured_img;
if(upcoming._embedded["wp:featuredmedia"] == undefined) {
featured_img = "assets/default_show.png";
} else {
featured_img = upcoming._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
}

let excerpt = this.helpersService.HtmlEncode(upcoming.excerpt.rendered.replace(/<[^>]*>/g, ''));

let excerptArr = excerpt.split('–');
let date = excerptArr[0].trim().replace( /\//g, '-').split('-').reverse().join('-');
let time = excerptArr[1].trim();

let day = moment(date).format('d');
let upcomingDataArr = date.split('-');
let currentDateHKArr = this.currentDateHK.split('-');


let timeArr = time.split(':');
let newHour = parseInt(timeArr[0]) - this.timeDifference;
timeArr[0] = JSON.stringify(newHour);

if(newHour >= 24) {
timeArr[0] = JSON.stringify(newHour - 24);
}
if(newHour < 0) {
timeArr[0] = JSON.stringify(newHour + 24);
}
let local_time = timeArr.join(':');

let has_show_aired = false;
let now_playing = false;
let up_next = false;



if (upcomingDataArr.join('') < currentDateHKArr.join('')) {
has_show_aired = true;
}

if (upcomingDataArr.join('') == currentDateHKArr.join('')) {
let upcomingTimeArr = time.split(':');
let currentTimeHKArr = this.currentTimeHK.split(':');

if (upcomingTimeArr[0].trim() < currentTimeHKArr[0].trim()) {
  has_show_aired = true;
}


if (upcomingTimeArr[0].trim() == currentTimeHKArr[0].trim()) {
  now_playing = true;
  this.postsService.changeNowPlaying(this.helpersService.HtmlEncode(upcoming.title.rendered));
}
}

let upcomingData = {
title: this.helpersService.HtmlEncode(upcoming.title.rendered),
content: this.helpersService.HtmlEncode(upcoming.content.rendered.replace(/<[^>]*>/g, '')),
filename: this.helpersService.HtmlEncode(upcoming.title.rendered).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase(),
excerpt: this.helpersService.HtmlEncode(upcoming.excerpt.rendered.replace(/<[^>]*>/g, '')),
date : date,
time: time,
day: day,
local_time: local_time,
featured_image: featured_img,
has_show_aired: has_show_aired,
now_playing: now_playing,
up_next: up_next
}

if (!upcomingData.has_show_aired) {
this.upcomingShows.push(upcomingData);
}



})
this.upcomingShows.sort((a, b) => {
if (a.date > b.date) { return 1 }
if (a.date < b.date) { return -1}
if (a.date == b.date ) {
if (a.time > b.time) { return 1 }
if (a.time < b.time ){ return -1}
}
})

let hasUpNext = false;
this.upcomingShows.forEach((item, i) => {
if(item.up_next) {
hasUpNext = true;
this.postsService.changeUpNext(item.title);
this.postsService.changeUpNextTime(this.daysOfWeek[item.day] + ' | ' + item.local_time);
}
if(this.mode == 'home') {
let indexOfPeriod = item.content.indexOf('.');
item.content = item.content.substring(0, indexOfPeriod);
}
})
if (!hasUpNext) {
if(this.upcomingShows[0].now_playing) {
this.upcomingShows[1].up_next = true;
this.postsService.changeUpNext(this.upcomingShows[1].title);
this.postsService.changeUpNextTime(this.daysOfWeek[this.upcomingShows[1].day] + ' | ' + this.upcomingShows[1].local_time)
} else {
this.upcomingShows[0].up_next = true;
this.postsService.changeUpNext(this.upcomingShows[0].title);
this.postsService.changeUpNextTime(this.daysOfWeek[this.upcomingShows[0].day] + ' | ' + this.upcomingShows[0].local_time)
}

if(this.mode == 'home') {
this.upcomingShows = this.upcomingShows.splice(0,4);
}

}
})
}
}

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

  autoplayComingUp() {
  if(this.nowPlaying !== '') {
    if(this.comingUpSliderState == 'comingUpSlide1') {
      this.comingUpSliderState = 'comingUpSlide2';
    } else {
      this.comingUpSliderState = 'comingUpSlide1';
    }
  }
}

  toggleChat() {
    if(!this.chatPanelActive) {
    this.chatPanelToggleState = 'panelActive';
    this.chatActive = 'chatOpen';
    var scrollToTop = window.setInterval(function () {
        var pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 1000); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 60); // how fast to scroll (this equals roughly 60 fps)
  } else {
    this.chatPanelToggleState = 'panelNotActive';
    this.chatActive = 'chatClosed';
  }
  this.chatPanelActive = !this.chatPanelActive;
  }
}

// <script async src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
//   <script async src="https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.min.js"></script>
