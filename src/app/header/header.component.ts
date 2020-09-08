import { Renderer2, Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PlayerService } from '../_services/player.service';
import { PostsService } from '../_services/posts.service';
import { HelpersService } from '../_services/helpers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public playerService: PlayerService,
    private postsService: PostsService,
    private helpersService: HelpersService,
              private renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document,
              @Inject(PLATFORM_ID) private platformId) { }
  mobileMenuActive = false;


  upcomingShows = [];
  currentDateHK: string;
  currentTimeHK: string;
  currentHourHK : number;
  upcomingHourHK : number;
  timeDifference : number;
  currentDate : Date;
  isLoading: boolean;
  mode: string;

  daysOfWeek = [
    'SUN','MON','TUE','WED',"THU","FRI","SAT"
  ]

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
      const videojs_script = this.renderer2.createElement('script')
      videojs_script.src = 'https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js';
      this.renderer2.appendChild(this._document.body, videojs_script);

      const http_streaming_script = this.renderer2.createElement('script')
      http_streaming_script.src = 'https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.min.js';
      this.renderer2.appendChild(this._document.body, http_streaming_script);

      this.currentDateHK = new Date().toLocaleString("en-UK", {
      timeZone: "Asia/Hong_Kong"
      });

      this.currentDate = new Date()
      this.timeDifference = this.currentDate.getTimezoneOffset()/60 + 8;

      let currentDateArr = this.currentDateHK.split(',');
      this.currentDateHK = currentDateArr[0].replace( /\//g, '-').split('-').reverse().join('-');


      let currentDateNewArr = this.currentDateHK.split('-');
      currentDateNewArr.forEach(item => {
        if (item.length < 2) {
          item = '0' + item;
        }
      })
      this.currentDateHK = currentDateNewArr.join('-');

      this.currentTimeHK = currentDateArr[1];
          console.log(this.currentTimeHK);
      if(this.currentTimeHK.includes('PM')) {
        let twentyfourArr = this.currentTimeHK.split('PM');
        let twentyfourHourArr = twentyfourArr[0].split(':');
        twentyfourHourArr[0] = JSON.stringify(parseInt(twentyfourHourArr[0]) + 12);
        this.currentTimeHK = twentyfourHourArr.join(':');
      }

      if(this.currentTimeHK.includes('AM')) {
        let twentyfourArr = this.currentTimeHK.split('AM');
        let twentyfourHourArr = twentyfourArr[0].split(':');
        if (twentyfourHourArr[0].length < 1) {
          twentyfourHourArr[0] = '0' + twentyfourHourArr[0];
        }
        this.currentTimeHK = twentyfourHourArr.join(':');
      }
      console.log(this.currentTimeHK);

      this.getUpcomingShows();
    }
  }

  getUpcomingShows() {
    if(isPlatformBrowser(this.platformId)) {
this.postsService.getUpcomingShows().subscribe(
data => {
//      console.log(data);

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
let dayDate = new Date(date);
let day = dayDate.getDay();
// ---- Formatting date to always have DD / MM / YYYY format ----
let upcomingDataArr = date.split('-');

let currentDateHKArr = this.currentDateHK.split('-');

let is12Hour = false;
currentDateHKArr.forEach((element, i) => {
// console.log(element.length)
if (element.length == 1) {
  currentDateHKArr[i] = '0' + element;
  is12Hour = true;
}
});

if(is12Hour) {
let temp_var = currentDateHKArr[1]
currentDateHKArr[1] = currentDateHKArr[2];
currentDateHKArr[2] = temp_var;
}

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
// console.log(local_time);

let has_show_aired = false;
let now_playing = false;
let up_next = false;


// ---- Finding if show has aired or not ----
// -- Checking if time has passed if day is the same --
console.log(upcomingDataArr.join('') + ' ' + currentDateHKArr.join(''))

if (upcomingDataArr.join('') < currentDateHKArr.join('')) {
has_show_aired = true;
}

if (upcomingDataArr.join('') == currentDateHKArr.join('')) {
let upcomingTimeArr = time.split(':');
let currentTimeHKArr = this.currentTimeHK.split(':');

console.log(this.currentTimeHK + ' ' + time)
console.log(upcomingTimeArr[0].trim() + ' < ' + currentTimeHKArr[0].trim())
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
}
if(this.mode == 'home') {
let indexOfPeriod = item.content.indexOf('.');
console.log(indexOfPeriod);
item.content = item.content.substring(0, indexOfPeriod);
}
})
if (!hasUpNext) {
if(this.upcomingShows[0].now_playing) {
this.upcomingShows[1].up_next = true;
} else {
this.upcomingShows[0].up_next = true;
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

}

// <script async src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
//   <script async src="https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.min.js"></script>
