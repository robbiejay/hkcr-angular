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

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
this.currentDateHK = new Date().toLocaleString("en-UK", {
timeZone: "Asia/Hong_Kong"
});
// Splitting date string into date + time
//  console.log(this.currentDateHK)
let currentDateArr = this.currentDateHK.split(',');
this.currentDateHK = currentDateArr[0].replace( /\//g, '-').split('-').reverse().join('-');
//        console.log(this.currentDateHK);

this.getUpcomingShows();
}
  }

  getUpcomingShows() {
                if(isPlatformBrowser(this.platformId)) {
    this.postsService.getUpcomingShows().subscribe(
      data => {
  //      console.log(data);
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
          let upcomingData = {
            title: this.helpersService.HtmlEncode(upcoming.title.rendered),
            filename: this.helpersService.HtmlEncode(upcoming.title.rendered).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase(),
            excerpt: this.helpersService.HtmlEncode(upcoming.excerpt.rendered.replace(/<[^>]*>/g, '')),
            date : date,
            time: time,
            featured_image: featured_img
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
        console.log(this.upcomingShows);
      })
  }
}

goTo(location) {
  this.router.navigate(['schedule/' + location])
}

}
