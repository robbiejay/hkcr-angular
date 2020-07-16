import { Component, OnInit } from '@angular/core';
import { PostsService } from '../_services/posts.service';
import { PlayerService } from '../_services/player.service';
import { HtmlEncode } from '../_helpers/helpers';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private postsService: PostsService, private playerService: PlayerService) { }
  currentDay = 0;
  scheduleListing = [];
  isLoading = true;
  currentDateHK: string;
  currentHourHK: string;
  currentMinuteHK: string;
  currentTimeHK: string;
  todayTimes = [];

  ngOnInit() {
    this.postsService.getSchedule().subscribe(
      data => {
        data.forEach((item, index) => { // Splitting Object into seperate post
        let scheduleContent = HtmlEncode(item.content["rendered"].replace(/<[^>]*>/g, '')); // accessing 'rendered' content in object
        let scheduleArr = scheduleContent.split('%%');
        let dayArr = [];
        for(let i = 2; i<=scheduleArr.length; i = i + 2) { // for each post content, Splitting into days
          dayArr.push(scheduleArr[i]);
        };
        dayArr.forEach((dayItem, dayIndex) => {  // For each day, splitting into seperate listings
          let dayListing = [];
          let scheduleDayArr = dayItem.split(';');
          scheduleDayArr.forEach(scheduleDayItem => {
            let scheduleDayListingArr = scheduleDayItem.split(':');
            let scheduleDayListing = {
              time: scheduleDayListingArr[0],
              content: scheduleDayListingArr[1]
            }
            if(dayIndex == this.currentDay) {
              this.todayTimes.push(scheduleDayListing);
            }
            dayListing.push(scheduleDayListing);
          })
          this.scheduleListing.push(dayListing);
        })
        this.isLoading = false;
        this.todayTimes.forEach((timeItem, timeIndex) => {
          let timeArr = timeItem.time.split('-');
          if((+this.currentTimeHK >= +timeArr[0]) && (+this.currentTimeHK <= +timeArr[1])) {
            console.log('This is the object for now playing');
            console.log(timeItem);
              this.playerService.nowPlaying = timeItem.content;
              if(this.todayTimes.length !== 0 ) {
              this.playerService.upNext = this.todayTimes[timeIndex + 1].content;
            }
          }
        })
      }
    )
  })
  this.currentDateHK = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Hong_Kong"
  });
  let todayHK = new Date(this.currentDateHK);
  //this.currentDay = todayHK.getDay();
 // console.log(todayHK);
 // console.log(todayHK.getDay());
 if(todayHK.getDay() == 0) { this.currentDay = 6 } // 0 = SUN, 6 = SUN
 if(todayHK.getDay() == 1) { this.currentDay = 0 }
 if(todayHK.getDay() == 2) { this.currentDay = 1 }
 if(todayHK.getDay() == 3) { this.currentDay = 2 }
 if(todayHK.getDay() == 4) { this.currentDay = 3 }
 if(todayHK.getDay() == 5) { this.currentDay = 4 }
 if(todayHK.getDay() == 6) { this.currentDay = 5 }

 this.currentHourHK = todayHK.getHours().toString();
 if(this.currentHourHK.split('').length == 1) {
   let hourArr = this.currentHourHK.split('');
   hourArr.unshift('0');
   this.currentHourHK = hourArr.join('');
 };
 this.currentMinuteHK = todayHK.getMinutes().toString();
 this.currentTimeHK = this.currentHourHK + this.currentMinuteHK;
 // console.log(this.currentTimeHK);
}

toggleDay(day){
  this.currentDay = day;
}

}
