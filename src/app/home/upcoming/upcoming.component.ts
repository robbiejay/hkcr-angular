import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../_services/posts.service';
import { HtmlEncode } from '../../_helpers/helpers';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {
  upcomingShows = [];
  constructor(private postsService: PostsService) { }

  currentDateHK: string;

  ngOnInit() {

    this.currentDateHK = new Date().toLocaleString("en-UK", {
      timeZone: "Asia/Hong_Kong"
    });
    // Splitting date string into date + time
    console.log(this.currentDateHK)
    let currentDateArr = this.currentDateHK.split(',');
    this.currentDateHK = currentDateArr[0].replace( /\//g, '-').split('-').reverse().join('-');
        console.log(this.currentDateHK);

    this.getUpcomingShows();
  }

  getUpcomingShows() {
    this.postsService.getUpcomingShows().subscribe(
      data => {
        console.log(data);
        data.forEach(upcoming => {
          let excerpt = HtmlEncode(upcoming.excerpt.rendered.replace(/<[^>]*>/g, ''));
          let excerptArr = excerpt.split('–');
          let date = excerptArr[0].trim().replace( /\//g, '-').split('-').reverse().join('-');
          let time = excerptArr[1].trim();
          let upcomingData = {
            title: HtmlEncode(upcoming.title.rendered),
            excerpt: HtmlEncode(upcoming.excerpt.rendered.replace(/<[^>]*>/g, '')),
            date : date,
            time: time
          }
          console.log(upcomingData.date.split('-').join('') + ' < ' + this.currentDateHK.split('-').join(''))
          //if (upcomingData.date.split('-').join('') > this.currentDateHK.split('-').join('')) {
          this.upcomingShows.push(upcomingData);
          //}
        })
          this.upcomingShows.sort((a, b) => {
          if (a.date > b.date) { return 1 }
          if (a.date < b.date) { return -1}
          if (a.date == b.date ) {
            if (a.time > b.time) { return 1 }
            if (a.time < b.time ){ return -1}
          }
        })
      })
  }
}
