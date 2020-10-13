import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from "@angular/common";
import { PostsService } from '../../_services/posts.service';
import { HelpersService } from '../../_services/helpers.service';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {
  upcomingShows = [];
  constructor(private postsService: PostsService,
              private helpersService: HelpersService,
              private router: Router,
              private route: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId) { }

  currentDateHKMoment: string;
  currentDateMoment: string;
  currentTimeHKMoment : string;
  timeDifferenceMoment: number;

  currentDateHK: string;
  currentTimeHK: string;
  currentHourHK : number;
  upcomingHourHK : number;
  timeDifference : number;
  currentDate : string;
  mode: string;
  isLoading: boolean;

  daysOfWeek = [
    'SUN','MON','TUE','WED',"THU","FRI","SAT"
  ]


  ngOnInit() {
    this.isLoading = true;
  }

  // Move a lot of this computation to the back-end

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {

      if(this.route.snapshot.url.length == 0 || this.route.snapshot.url[0].path == 'livestream') {
      this.mode = 'home'
      } else {
      this.mode = 'archive'
      }

this.currentDateHK = moment().tz("Asia/Hong_Kong").format('YYYY-MM-DD');
this.currentDate = moment().local().format('YYYY-MM-DD');
this.currentTimeHK = moment().tz("Asia/Hong_Kong").format('HH:mm:SS');
this.timeDifference = 8 - (moment().local().utcOffset() / 60);

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

goTo(location) {
  this.router.navigate(['schedule/' + location])
}

}
