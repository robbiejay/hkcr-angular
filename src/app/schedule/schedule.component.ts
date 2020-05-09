import { Component, OnInit } from '@angular/core';
import { PostsService } from '../_services/posts.service';
import { HtmlEncode } from '../_helpers/helpers';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private postsService: PostsService) { }
  currentDay = 0;
  scheduleListing = [];
  isLoading = true;

  ngOnInit() {
    this.postsService.getSchedule().subscribe(
      data => {
        data.forEach(item => { // Splitting whole text
        let scheduleContent = HtmlEncode(item.content["rendered"].replace(/<[^>]*>/g, ''));
        let scheduleArr = scheduleContent.split('%%');
        let dayArr = [];
        for(let i = 2; i<=scheduleArr.length; i = i + 2) { // Splitting by day
          dayArr.push(scheduleArr[i]);
        }

        dayArr.forEach(dayItem => {
          let dayListing = [];
          let scheduleDayArr = dayItem.split(';');
          scheduleDayArr.forEach(scheduleDayItem => {
            let scheduleDayListingArr = scheduleDayItem.split(':');
            let scheduleDayListing = {
              time: scheduleDayListingArr[0],
              content: scheduleDayListingArr[1]
            }
            dayListing.push(scheduleDayListing);
          })
          this.scheduleListing.push(dayListing);
        })
        this.isLoading = false;
        console.log(this.scheduleListing);
      }
    )
  })
}

toggleDay(day){
  this.currentDay = day;
}

}
