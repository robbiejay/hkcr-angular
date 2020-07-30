import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../_services/posts.service';
import { HelpersService } from '../../_services/helpers.service';
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
    private _title: Title) { }

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

          let postData = {
            title: this.helpersService.HtmlEncode(data.title.rendered),
            content: this.helpersService.HtmlEncode(data.content.rendered),
            excerpt: this.helpersService.HtmlEncode(data.excerpt.rendered.replace(/<[^>]*>/g, '')),
            date: date,
            image_large: featured_img
          }
          this.posts.push(postData);
          // SEO updates
          this._title.setTitle(postData.title);
          this._meta.updateTag({ name: 'description', content: postData.excerpt});
          this._meta.updateTag({ name: 'og:image', content: postData.image_large});
          this._meta.updateTag({ name: 'og:title', content: postData.title});
          this._meta.updateTag({ name: 'og:description', content: postData.excerpt});

        // ADD KEYWORDS for blogs
        //  this._meta.updateTag({ name: 'keywords', content: postData.title + ', blog, ' + JSON.stringify(postData.tags)});
    //    console.log(this.posts);
      }
    )
  }


}
