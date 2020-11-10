import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../_services/posts.service';
import { HelpersService } from '../_services/helpers.service';


@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

  constructor(private postsService: PostsService,
              private helpersService: HelpersService,
              private router: Router,
              private route: ActivatedRoute,
              private _title: Title,
              private _meta: Meta,
            @Inject(PLATFORM_ID) private platformId) { }
  residents = [];
  mode: string;

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
if(this.route.snapshot.url.length == 0 || this.route.snapshot.url[0].path == 'livestream') {
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
  }

  getResidents() {
            if(isPlatformBrowser(this.platformId)) {
    this.postsService.getResidents().subscribe(
      data => {
         console.log(data);
        data.forEach(resident => {
          let residentData = {
            title: this.helpersService.HtmlEncode(resident.title.rendered),
            content: this.helpersService.HtmlEncode(resident.content.rendered.replace(/<[^>]*>/g, '')),
            image_medium: resident._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
          }
          this.residents.push(residentData);
        })
        if(this.mode == 'home') {
          this.residents = this.residents.splice(0,12);
        }
      }
    )
  }
  console.log(this.residents);
  }

  goTo(location) {
                if(isPlatformBrowser(this.platformId)) {
                  console.log(location.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase());
    this.router.navigate(['residents/' + location.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()]);
  }
  }

}
