import { Component, OnInit } from '@angular/core';
import { PostsService } from '../_services/posts.service';
import { HtmlEncode } from '../_helpers/helpers';


@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

  constructor(private postsService: PostsService) { }
  residents = [];

  ngOnInit() {
    this.getResidents();
  }

  getResidents() {
    this.postsService.getResidents().subscribe(
      data => {
        console.log(data);
        data.forEach(resident => {
          let residentData = {
            title: HtmlEncode(resident.title.rendered),
            content: HtmlEncode(resident.content.rendered.replace(/<[^>]*>/g, '')),
            image_medium: resident._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url,
          }
          this.residents.push(residentData);
        })
      }
    )
  }

}
