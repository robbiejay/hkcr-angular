import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../_services/posts.service';
import { HtmlEncode } from '../_helpers/helpers';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts = [];
  constructor(private postsService: PostsService,
  private router: Router) { }

  ngOnInit() {
        this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe(
      data => {
        console.log(data);
        data.forEach(post => {

// CHECKING FOR NO IMAGE
          let featured_img;
          if(post._embedded['wp:featuredmedia'] == undefined) {
            featured_img = "assets/default_show.png";
          } else {
            featured_img = post._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
          }


          let excerpt = HtmlEncode(post.excerpt.rendered.replace(/<[^>]*>/g, ''));
            if (excerpt.length > 140) {
              excerpt = excerpt.substring(0, 140) + '...';
            }


          let postData = {
            title: HtmlEncode(post.title.rendered),
            filename: HtmlEncode(post.title.rendered).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase(),
            content: HtmlEncode(post.content.rendered),
            excerpt: excerpt,
            image_large: featured_img
          }
          this.posts.push(postData);
        })
        console.log(this.posts);
      }
    )
  }

  goTo(location) {
    this.router.navigate(['blog/' + location]);
  }

}
