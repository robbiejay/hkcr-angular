import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../_services/posts.service';
import { HtmlEncode } from '../_helpers/helpers';


@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

  constructor(private postsService: PostsService,
              private router: Router,
              private route: ActivatedRoute,
              private _title: Title,
              private _meta: Meta) { }
  residents = [];
  mode: string;

  ngOnInit() {
    if(this.route.snapshot.url.length == 0) {
      this.mode = 'home'
    } else {
      this.mode = 'archive'
    }

    if(this.mode == 'archive') {
      // SEO updates
      this._title.setTitle("Residents | HKCR");
      this._meta.updateTag({ name: 'description', content: "Hear new mixes from Hong Kong Community Radio's resident DJ's"});
      this._meta.updateTag({ name: 'keywords', content: 'resident, DJ, mix, hong kong, electronic, music'});
    }
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

  goTo(location) {
    this.router.navigate(['residents/' + location.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()]);
  }

}
