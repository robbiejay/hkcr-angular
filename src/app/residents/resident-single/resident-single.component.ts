import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../_services/posts.service';
import { HtmlEncode } from '../../_helpers/helpers';

@Component({
  selector: 'app-resident-single',
  templateUrl: './resident-single.component.html',
  styleUrls: ['./resident-single.component.scss']
})
export class ResidentSingleComponent implements OnInit {

  residentpost: {id: number, title: string};
  residents = [];

  constructor(private postsService: PostsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
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

        let featured_img;
        if(data._embedded['wp:featuredmedia'] == undefined) {
          featured_img = "assets/default_show.png";
        } else {
          featured_img = data._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
        }



        let residentData = {
          title: HtmlEncode(data.title.rendered),
          content: HtmlEncode(data.content.rendered),
          image_large: featured_img
        }
        this.residents.push(residentData);
      console.log(this.residents);
    })
  }
}
