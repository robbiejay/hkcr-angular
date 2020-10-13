import { Component, OnInit, ViewEncapsulation, SecurityContext } from '@angular/core';
import { Location } from '@angular/common';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../_services/posts.service';
import { HelpersService } from '../../_services/helpers.service';
import { IframePipe } from '../../_pipes/iframe.pipe';
// import { HtmlEncode } from '../../_helpers/helpers';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogSingleComponent implements OnInit {

  blogpost: {id: number, title: string};
  posts = [];

  constructor(private postsService: PostsService,
              private helpersService: HelpersService,
    private route: ActivatedRoute,
    private _meta: Meta,
    private _title: Title,
    private _location: Location,
    private sanitizer : DomSanitizer,
    private iframePipe : IframePipe) { }

  ngOnInit() {
    // access route params
    this.blogpost = {
      id: this.route.snapshot.params['id'],
      title: this.route.snapshot.params['title']
    }

    this.route.params.subscribe(
      (params: Params) => {
        this.blogpost.id = params['id'];
        this.blogpost.title = params['title'];
      }
    )
    this.getPost();
  }

  getPost() {
    this.postsService.getSinglePost(this.blogpost.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()).subscribe(
      data => {
        console.log(data);
// CHECKING FOR NO IMAGE
          let featured_img;
          if(data._embedded['wp:featuredmedia'] == undefined) {
            featured_img = "assets/default_show.png";
          } else {
            featured_img = data._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
          }

          let dateArr = this.helpersService.HtmlEncode(data.date).split('T');
          let date = dateArr[0].split('-').reverse().join('/');

          let content = this.helpersService.HtmlEncode(data.content.rendered);

          let soundcloudArr = content.split('[soundcloud]');
          let soundcloudNewArr = [];
          console.log(soundcloudArr);
          soundcloudArr.forEach((chunk, index) => {
            if(index !== 0) {
            let chunkArr = chunk.split('[/soundcloud]');
            let url = chunkArr[0];
            let iframe_width = "100%";
            console.log(url);
            let iframe = `<iframe width=` + iframe_width + ` height="166" src=` + url + ` scrolling="no" frameborder="no" allow="autoplay"></iframe>`
            chunkArr[0] = iframe;
            chunkArr.join('');
            chunk = this.helpersService.HtmlEncode(chunkArr.join(''));
          }
          soundcloudNewArr.push(chunk);
          console.log(soundcloudNewArr);
          })
          console.log(this.helpersService.HtmlEncode(this.sanitizer.bypassSecurityTrustHtml(soundcloudNewArr.join())));

          content = soundcloudNewArr.join('');

          let mixcloudArr = content.split('[mixcloud]');
          let mixcloudNewArr = [];
          console.log(mixcloudArr);
          mixcloudArr.forEach((chunk, index) => {
            if(index !== 0) {
            let chunkArr = chunk.split('[/mixcloud]');
            let url = chunkArr[0];
            let iframe_width = "100%";
            let iframe_height = "120"
            console.log(url);
            let iframe = `<iframe width=` + iframe_width + ` height=`+ iframe_height +` src=` + url + ` scrolling="no" frameborder="no" allow="autoplay"></iframe>`
            chunkArr[0] = iframe;
            chunkArr.join('');
            console.log(JSON.stringify(chunkArr.join('')))
            chunk = this.helpersService.HtmlEncode(chunkArr.join(''));
          }
          mixcloudNewArr.push(chunk);
          })
          console.log(mixcloudNewArr);
          content = mixcloudNewArr.join('');

          let bandcampArr = content.split('[bandcamp]');
          let bandcampNewArr = [];
          bandcampArr.forEach((chunk, index) => {
            if(index !== 0) {
            let chunkArr = chunk.split('[/bandcamp]');
            let url = chunkArr[0];
            let iframe_width = "100%";
            let iframe_height = "120";
            let iframe = `<iframe width=` + iframe_width + ` height=` + iframe_height + ` src=` + url + ` scrolling="no" frameborder="0" allow="encrypted-media" allowtransparency="true"></iframe>`
            chunkArr[0] = iframe;
            chunkArr.join('');
            chunk = this.helpersService.HtmlEncode(chunkArr.join(''));
          }
          bandcampNewArr.push(chunk);
          })
          console.log(bandcampNewArr);
          content = bandcampNewArr.join('');

          let spotifyArr = content.split('[spotify]');
          let spotifyNewArr = [];
          spotifyArr.forEach((chunk, index) => {
            if(index !== 0) {
            let chunkArr = chunk.split('[/spotify]');
            let url = chunkArr[0];
            let iframe_width = "100%";
            let iframe_height = "380";
            let iframe = `<iframe width=` + iframe_width + ` height=`+ iframe_height +` src=` + url + ` scrolling="no" frameborder="0" allow="encrypted-media" allowtransparency="true"></iframe>`
            chunkArr[0] = iframe;
            chunkArr.join('');
            chunk = this.helpersService.HtmlEncode((chunkArr.join('')));
          }
          spotifyNewArr.push(chunk);
          })
          console.log(spotifyNewArr);
          content = spotifyNewArr.join('');

          let youtubeArr = content.split('[youtube]');
          let youtubeNewArr = [];
          youtubeArr.forEach((chunk, index) => {
            if(index !== 0) {
            let chunkArr = chunk.split('[/youtube]');
            let url = chunkArr[0];
            let iframe_width = "100%";
            let iframe_height = "560";
            let iframe = `<iframe width=` + iframe_width + ` height=`+ iframe_height +` src=` + url + ` scrolling="no" frameborder="0" allow="encrypted-media; accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            chunkArr[0] = iframe;
            chunkArr.join('');
            chunk = this.helpersService.HtmlEncode((chunkArr.join('')));
          }
          youtubeNewArr.push(chunk);
          })
          console.log(youtubeNewArr);
          content = youtubeNewArr.join('');


          content = this.iframePipe.transform(content);



          let postData = {
            title: this.helpersService.HtmlEncode(data.title.rendered),
            content: content,
            excerpt: this.helpersService.HtmlEncode(data.excerpt.rendered.replace(/<[^>]*>/g, '')),
            date: date,
            image_large: featured_img
          }
          this.posts.push(postData);
          // SEO updates
          this._title.setTitle(postData.title);
          // this._meta.updateTag({ name: 'description', content: postData.excerpt});
          // this._meta.updateTag({ property: 'og:image', content: postData.image_large});
          // this._meta.updateTag({ property: 'og:title', content: postData.title});
          // this._meta.updateTag({ property: 'og:description', content: postData.excerpt});

        // ADD KEYWORDS for blogs
        //  this._meta.updateTag({ name: 'keywords', content: postData.title + ', blog, ' + JSON.stringify(postData.tags)});
    //    console.log(this.posts);
      }
    )
  }

  goBack() {
    this._location.back();
  }


}
