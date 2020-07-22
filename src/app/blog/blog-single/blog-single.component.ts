import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../_services/posts.service';
import { HtmlEncode } from '../../_helpers/helpers';

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
    private route: ActivatedRoute) { }

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

          let dateArr = HtmlEncode(data.date).split('T');
          let date = dateArr[0].split('-').reverse().join('/');

          let postData = {
            title: HtmlEncode(data.title.rendered),
            content: HtmlEncode(data.content.rendered),
            excerpt: HtmlEncode(data.excerpt.rendered.replace(/<[^>]*>/g, '')),
            date: date,
            image_large: featured_img
          }
          this.posts.push(postData);
    //    console.log(this.posts);
      }
    )
  }


}
