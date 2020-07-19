import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  blogpost: {id: number, title: string}

  constructor(private route: ActivatedRoute) { }

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
  }

}
