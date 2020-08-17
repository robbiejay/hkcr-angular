import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from "@angular/common";
import { PostsService } from '../../_services/posts.service';
import { HelpersService } from '../../_services/helpers.service';
//import { HtmlEncode } from '../../_helpers/helpers';


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
              @Inject(PLATFORM_ID) private platformId) { }

  currentDateHK: string;
  currentTimeHK: string;
  currentHourHK : number;
  upcomingHourHK : number;
  timeDifference : number;
  currentDate : Date;


  ngOnInit() {

  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
this.currentDateHK = new Date().toLocaleString("en-UK", {
timeZone: "Asia/Hong_Kong"
});
this.currentDate = new Date();
console.log(this.currentDate);
this.timeDifference = this.currentDate.getTimezoneOffset()/60 + 8;
console.log(this.timeDifference);
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
// Splitting date string into date + time
//  console.log(this.currentDateHK)
let currentDateArr = this.currentDateHK.split(',');
this.currentDateHK = currentDateArr[0].replace( /\//g, '-').split('-').reverse().join('-');
this.currentTimeHK = currentDateArr[1];
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

          // ---- Formatting date to always have DD / MM / YYYY format ----
          let upcomingDataArr = date.split('-');
          upcomingDataArr.forEach(element => {
            if (element.length < 2) {
              element = '0' + element;
            }
          });

          let currentDateHKArr = this.currentDateHK.split('-');
          currentDateHKArr.forEach(element => {
            if (element.length < 2) {
              element = '0' + element;
            }
          });

          let timeArr = time.split(':');
          let newHour = parseInt(timeArr[0]) - this.timeDifference;
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


          // ---- Finding if show has aired or not ----
          // -- Checking if time has passed if day is the same --
          if (upcomingDataArr.join('') == currentDateHKArr.join('')) {
            let upcomingTimeArr = time.split(':');
            let currentTimeHKArr = this.currentTimeHK.split(':');

            if (upcomingTimeArr[0].trim() < currentTimeHKArr[0].trim()) {
              has_show_aired = true;
            }

            if (upNext) {
              up_next = true;
              upNext = false;
            }

            if (upcomingTimeArr[0].trim() == currentTimeHKArr[0].trim()) {
              now_playing = true;
              upNext = true;
            } else {
              up_next = true;
            }
          }

          let upcomingData = {
            title: this.helpersService.HtmlEncode(upcoming.title.rendered),
            filename: this.helpersService.HtmlEncode(upcoming.title.rendered).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase(),
            excerpt: this.helpersService.HtmlEncode(upcoming.excerpt.rendered.replace(/<[^>]*>/g, '')),
            date : date,
            time: time,
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
        console.log(this.upcomingShows);
      })
  }
}

goTo(location) {
  this.router.navigate(['schedule/' + location])
}

}
