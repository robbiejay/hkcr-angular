import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../_services/posts.service';
import { HelpersService } from '../../_services/helpers.service';
//import { HtmlEncode } from '../_helpers/helpers';

@Component({
  selector: 'app-blogroll',
  templateUrl: './blogroll.component.html',
  styleUrls: ['./blogroll.component.scss']
})
export class BlogrollComponent implements OnInit {

  posts = [];
  constructor(private postsService: PostsService,
              private helpersService: HelpersService,
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


          let excerpt = this.helpersService.HtmlEncode(post.excerpt.rendered.replace(/<[^>]*>/g, ''));
            if (excerpt.length > 140) {
              excerpt = excerpt.substring(0, 140) + '...';
            }


          let postData = {
            title: this.helpersService.HtmlEncode(post.title.rendered),
            filename: this.helpersService.HtmlEncode(post.title.rendered).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase(),
            content: this.helpersService.HtmlEncode(post.content.rendered),
            excerpt: excerpt,
            image_large: featured_img
          }
          this.posts.push(postData);
        })
        this.posts = this.posts.slice(0,3)
        console.log(this.posts);
      }
    )
  }

  goTo(location) {
    this.router.navigate(['blog/' + location]);
  }

}
