import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PostsService } from '../../_services/posts.service';
import { HelpersService } from '../../_services/helpers.service';

@Component({
  selector: 'app-schedule-single',
  templateUrl: './schedule-single.component.html',
  styleUrls: ['./schedule-single.component.scss']
})
export class ScheduleSingleComponent implements OnInit {

  showpost: {id: number, title: string};
  shows = [];
  isLoading: boolean;
  latestShows = [];

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private helpersService: HelpersService,
              private _location: Location,
              private router: Router) { }


  ngOnInit() {
    this.showpost = {
      id: this.route.snapshot.params['id'],
      title: this.route.snapshot.params['title']
    }

    this.route.params.subscribe(
      (params: Params) => {
        this.showpost.id = params['id'];
        this.showpost.title = params['title'];
      }
    )
    this.getShow();
    this.getLatestShows();
  }

  getShow() {
    this.postsService.getSingleUpcoming(this.showpost.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()).subscribe(
      data => {
        console.log(data);
        this.isLoading = false;

        let featured_img;
        if(data._embedded['wp:featuredmedia'] == undefined) {
          featured_img = "assets/default_show.png";
        } else {
          featured_img = data._embedded['wp:featuredmedia'][0].source_url;
        }

        let titleArr = this.helpersService.HtmlEncode(data.title).split('–');

        let excerpt = this.helpersService.HtmlEncode(data.excerpt.rendered.replace(/<[^>]*>/g, ''));
        let excerptArr = excerpt.split('–');
        let date = excerptArr[0].trim().replace( /\//g, '-').split('-').reverse().join('-');
        let time = excerptArr[1].trim();

        let showData = {
          title: this.helpersService.HtmlEncode(data.title.rendered),
          content: this.helpersService.HtmlEncode(data.content.rendered),
          excerpt: this.helpersService.HtmlEncode(data.excerpt.rendered.replace(/<[^>]*>/g, '')),
          date: date,
          time: time,
          featured_image: featured_img

        }
        this.shows.push(showData);
      console.log(this.shows);

      // SEO updates
      // this._title.setTitle(showData.title);
      // this._meta.updateTag({ name: 'description', content: showData.content});
      // this._meta.updateTag({ name: 'keywords', content: showData.title + ', mix, ' + JSON.stringify(showData.tags)});
      // this._meta.updateTag({ name: 'og:image', content: showData.featured_image});
      // this._meta.updateTag({ name: 'og:title', content: showData.title});
      // this._meta.updateTag({ name: 'og:description', content: showData.content});
  //    this.getRelatedShows(data.tags[0]);
    })
  }

  getLatestShows() {
    this.postsService.getLatestShows().subscribe(
    data => {
      console.log(data);
      data.forEach((show, index) => {
        let featured_img;
        if(show.image_thumbnail == "DEFAULT") {
          featured_img = "assets/default_show.png";
        } else {
          featured_img = show.image_full;
        }
        let titleArr = this.helpersService.HtmlEncode(show.title).split('–');
        let date = titleArr.pop();
        let title = titleArr.join().trim();


        let latestShowData = {
          title: title,
          date: date,
          url: show.url,
          excerpt: this.helpersService.HtmlEncode(show.excerpt),
          featured_image: featured_img,
          tags: show.tags,
        }
        if(index < 4) {
        this.latestShows.push(latestShowData);
        }
    })
  }
)}

goTo(location) {
  this.router.navigate(['shows/' + location]);
}

  goBack() {
    this._location.back();
  }

}
