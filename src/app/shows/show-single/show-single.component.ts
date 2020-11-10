import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '../../_services/posts.service';
import { PlayerService } from '../../_services/player.service';
import { HelpersService } from '../../_services/helpers.service';
//import { HtmlEncode } from '../../_helpers/helpers';

@Component({
  selector: 'app-show-single',
  templateUrl: './show-single.component.html',
  styleUrls: ['./show-single.component.scss']
})
export class ShowSingleComponent implements OnInit {

  showpost: {id: number, title: string};
  shows = [];
  relatedShows = [];
  counter = 0;
  tags = []
  isLoading : boolean;
  youtubeVideo = '';
  videoActive : boolean;
  showImageHasLoaded : boolean;

  constructor(private postsService: PostsService,
              private playerService: PlayerService,
              private helpersService: HelpersService,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location,
              private _meta: Meta,
              private _title: Title)
              {
              //   this.router.routeReuseStrategy.shouldReuseRoute = function () {
              //   return false;
              // };
}

  ngOnInit() {
    this.showImageHasLoaded = false;
    this.isLoading = true;
    this.videoActive = false;
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
  }

  getShow() {
    this.postsService.getSingleShow(this.showpost.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()).subscribe(
      data => {
        console.log(data);
        this.isLoading = false;
        let featured_img;
        let low_res_image;
        if(data.image_full == "DEFAULT") {
          featured_img = "assets/default_show.png";
        } else {
          featured_img = data.image_full;
          low_res_image = data.image_thumbnail;
        }
        let titleArr = this.helpersService.HtmlEncode(data.title).split('–');
        let date = titleArr.pop();
        let title = titleArr.join();

        let content = this.splitShowYoutube(this.helpersService.HtmlEncode(data.content))

        let showData = {
          title: title,
          content: content,
          date: date,
          excerpt: this.helpersService.HtmlEncode(data.excerpt),
          featured_image: featured_img,
          low_res_image: low_res_image,
          tags: data.tags
        }
        this.shows.push(showData);
        this.tags.push(data.tags);

      // SEO updates
      // this._title.setTitle(showData.title);
      // this._meta.updateTag({ name: 'description', content: showData.content},"name='description'");
      // this._meta.updateTag({ name: 'keywords', content: showData.title + ', mix, ' + JSON.stringify(showData.tags)},"name='keywords'");
      // this._meta.updateTag({ name: 'og:image', content: showData.featured_image},"name='og:image'");
      // this._meta.updateTag({ name: 'og:title', content: showData.title},"name='og:title'");
      // this._meta.updateTag({ name: 'og:description', content: showData.content},"name='og:description'");
      this.getRelatedShows(data.tags[0]);
    })
  }

  splitShowYoutube(content) {
    let contentArr = content.split('[youtube]');
    let contentNewArr = [];
    contentArr.forEach((chunk, index) => {
      if (index !== 0) {
        let chunkArr = chunk.split('[/youtube]');
        this.youtubeVideo = chunkArr[0];
        chunk = chunkArr[1];
      }
        contentNewArr.push(chunk);
    })
    return contentNewArr.join('');
  }

  listenShow(show){
    this.playerService.playShow(show);
  }

  watchShow() {
    this.videoActive = true;
  }

  getRelatedShows(tag) {
    this.counter++;
    this.postsService.getShowsByTag(tag.replace(/ /g, "_").toLowerCase(), this.counter).subscribe(
      data => {
        data.body.forEach((item, i) => {
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
          // if(i < 4) {
                      this.relatedShows.push(postData);
    //      }
        })
        console.log(this.relatedShows.length);
        if(this.relatedShows.length < 3) {
          this.getRelatedShows(this.shows[0].tags[this.counter])
        } else {
          for (var i = this.relatedShows.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = this.relatedShows[i];
              this.relatedShows[i] = this.relatedShows[j];
              this.relatedShows[j] = temp;
          }
          this.relatedShows = this.relatedShows.splice(1,4);
        }
        console.log(this.relatedShows)
        }
      )}

      goTo(location) {
        this.router.navigateByUrl('/', {skipLocationChange: true})
  .then(()=>this.router.navigate(['shows/',location]));
      }

      goBack() {
        this._location.back();
      }

      imageHasLoaded() {
        this.showImageHasLoaded = true;
      }
}
