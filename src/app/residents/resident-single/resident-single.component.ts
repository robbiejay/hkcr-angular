import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { PostsService } from '../../_services/posts.service';
import { HelpersService } from '../../_services/helpers.service';
//import { HtmlEncode } from '../../_helpers/helpers';

@Component({
  selector: 'app-resident-single',
  templateUrl: './resident-single.component.html',
  styleUrls: ['./resident-single.component.scss']
})
export class ResidentSingleComponent implements OnInit {

  residentpost: {id: number, title: string};
  residents = [];
  residentShows = [];
  isLoading : boolean;

  constructor(private postsService: PostsService,
              private helpersService: HelpersService,
    private route: ActivatedRoute,
    private router : Router,
    private _location: Location,
    private _title: Title,
    private _meta: Meta) { }

  ngOnInit() {
    this.isLoading = true;
    this.residentpost = {
      id: this.route.snapshot.params['id'],
      title: this.route.snapshot.params['title']
    }

    this.route.params.subscribe(
      (params: Params) => {
        this.residentpost.id = params['id'];
        this.residentpost.title = params['title'];
      }
    )
    this.getResident();
  }

  getResident() {
    this.postsService.getSingleResident(this.residentpost.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()).subscribe(
      data => {
        console.log(data);
        this.isLoading = false;
        let featured_img;
        if(data._embedded['wp:featuredmedia'] == undefined) {
          featured_img = "assets/default_show.png";
        } else {
          featured_img = data._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
        }



        let residentData = {
          title: this.helpersService.HtmlEncode(data.title.rendered),
          content: this.helpersService.HtmlEncode(data.content.rendered),
          image_large: featured_img
        }

        // SEO updates
        this._title.setTitle(residentData.title);
        this._meta.updateTag({ name: 'description', content: residentData.content});
        this._meta.updateTag({ name: 'keywords', content: residentData.title + ', resident, DJ'});
        this._meta.updateTag({ name: 'og:image', content: residentData.image_large});
        this._meta.updateTag({ name: 'og:title', content: residentData.title});
        this._meta.updateTag({ name: 'og:description', content: residentData.content});


        this.residents.push(residentData);
      console.log(this.residents);
      this.getResidentShows(this.residents[0].title.replace(/[^a-zA-Z0-9]+/g, "_").toLowerCase());
    })
  }

  getResidentShows(resident) {
    console.log(resident);
    this.postsService.getShowsByTag(resident, 1).subscribe(
      data => {
        data.body.forEach(item => {
          let featured_img;
          if(item.image_thumbnail == "DEFAULT") {
            featured_img = "assets/default_show.png";
          } else {
            featured_img = item.image_full;
          }
          let titleArr = this.helpersService.HtmlEncode(item.title).split('–');
          let date = titleArr.pop();
          let title = titleArr.join();

          let postData = {
            title: title,
            date: date,
            url: item.url,
            excerpt: this.helpersService.HtmlEncode(item.excerpt),
            featured_image: featured_img,
            tags: item.tags
          }
          this.residentShows.push(postData);
        })
      }
    )
  }

  goTo(location) {
    this.router.navigate(['shows/' + location])
  }

  goBack() {
    this._location.back();
  }
}
