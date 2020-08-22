import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PostsService } from '../_services/posts.service';
import { PlayerService } from '../_services/player.service';
import { HelpersService } from '../_services/helpers.service';
//import { HtmlEncode } from '../_helpers/helpers';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
  animations: [
    trigger('fade', [
      state('fadeOut', style({
        'opacity': '0',
      })),
      state('fadeIn', style({
        'opacity': '1'
      })),
      transition('* => *', animate(200))
    ])
  ]
})
export class ShowsComponent implements OnInit {
  shows = [];
  showPage = 1;
  totalPages: number;
  isLoading = true;
  currentGenre = '';
  currentGenreID = '';
  state='fadeIn';

  mode: string;


  constructor(private postsService: PostsService,
              public playerService: PlayerService,
              private helpersService: HelpersService,
              private route: ActivatedRoute,
              private router: Router,
            @Inject(PLATFORM_ID) private platformId) { }


  get isPlayerVisible(): boolean {
    return this.playerService.isPlayerVisible;
  }

  fadeEnd(event){

  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
if(this.route.snapshot.url.length == 0 || this.route.snapshot.url[0].path == 'livestream') {
this.mode = 'home'
} else {
this.mode = 'archive'
}

this.getShows()
}
  }

  ngAfterViewInit() {

  }

  listenShow(show){
    this.playerService.playShow(show);
  }


  getShows() {
              if(isPlatformBrowser(this.platformId)) {
    this.isLoading = true;
    this.postsService.getTotalPages().subscribe(
      data => {
        this.totalPages = data.body;
      }
    )
    this.postsService.getShows(this.showPage).subscribe(
      data => {
        this.isLoading = false;
        data.body.forEach(show => {
          let featured_img;
          if(show.image_thumbnail == "DEFAULT") {
            featured_img = "assets/default_show.png";
          } else {
            featured_img = show.image_thumbnail;
          }
          let titleArr = this.helpersService.HtmlEncode(show.title).split('–');
          let date = titleArr.pop();
          let title = titleArr.join().trim();

          let showData = {
            title: title,
            date: date,
            url: show.url,
            excerpt: this.helpersService.HtmlEncode(show.excerpt),
            featured_image: featured_img,
            tags: show.tags,
          }
          this.shows.push(showData);
        })
        })
    }
  }

  prevShowPage() {
              if(isPlatformBrowser(this.platformId)) {
    if(this.showPage > 1){
      this.showPage--;
      this.shows = [];
      this.isLoading = true;
      if(this.currentGenre !== '') {
        this.postsService.getShowsByTag(this.currentGenre.replace(/ /g, "_").toLowerCase(), this.showPage).subscribe(
              data => {
                this.isLoading = false;
                data.body.forEach(item => {

                  let featured_img;
                  if(item.image_thumbnail == "DEFAULT") {
                    featured_img = "assets/default_show.png";
                  } else {
                    featured_img = item.image_thumbnail;
                  }
                  let titleArr = this.helpersService.HtmlEncode(item.title).split('–');
                  let date = titleArr.pop();
                  let title = titleArr.join();

                  let postData = {
                    title: title,
                    date: date,
                    url: item.url,
                    excerpt: this.helpersService.HtmlEncode(item.excerpt),
                    featured_image: featured_img,
                    tags: item.tags,
                  }
                  this.shows.push(postData);
                })
              }
            );
      } else {
        this.getShows();
      }
    }
  }
  }

  nextShowPage(){
              if(isPlatformBrowser(this.platformId)) {
  if(this.showPage < this.totalPages){
    this.showPage++;
    this.shows = [];
    this.isLoading = true;
    if(this.currentGenre !== '') {
      this.postsService.getShowsByTag(this.currentGenre.replace(/ /g, "_").toLowerCase(), this.showPage).subscribe(
            data => {
              this.isLoading = false;
              data.body.forEach(item => {

                let featured_img;
                if(item.image_thumbnail == "DEFAULT") {
                  featured_img = "assets/default_show.png";
                } else {
                  featured_img = item.image_thumbnail;
                }
                let titleArr = this.helpersService.HtmlEncode(item.title).split('–');
                let date = titleArr.pop();
                let title = titleArr.join();

                let postData = {
                  title: title,
                  date: date,
                  url: item.url,
                  excerpt: this.helpersService.HtmlEncode(item.excerpt),
                  featured_image: featured_img,
                  tags: item.tags
                }
                this.shows.push(postData);
              })
            }
          );
    } else {
      this.getShows();
    }
  }
}
  }

  sortByTag(tag) {
              if(isPlatformBrowser(this.platformId)) {
    this.currentGenre = tag;
    this.shows = [];
    this.isLoading = true;
    let page = 1;
    this.showPage = 1;
    this.postsService.getTagTotalPages(this.currentGenre.replace(/ /g, "_").toLowerCase()).subscribe(
      data => {
      //  console.log('genre total pages is' + data.body);
        this.totalPages = data.body;
      }
    )
    this.postsService.getShowsByTag(this.currentGenre.replace(/ /g, "_").toLowerCase(), page).subscribe(
      data => {
        this.isLoading = false;
        data.body.forEach(item => {

          let featured_img;
          if(item.image_thumbnail == "DEFAULT") {
            featured_img = "assets/default_show.png";
          } else {
            featured_img = item.image_thumbnail;
          }
          let titleArr = this.helpersService.HtmlEncode(item.title).split('–');
          let date = titleArr.pop();
          let title = titleArr.join();

          let postData = {
            title: title,
            date: date,
            url: item.url,
            excerpt: this.helpersService.HtmlEncode(item.excerpt),
            featured_image: featured_img,
            tags: item.tags
          }
          this.shows.push(postData);
        })
        })
      }
      }

  closeGenre() {
              if(isPlatformBrowser(this.platformId)) {
    this.shows = [];
    this.isLoading = true;
    this.showPage = 1;
    this.currentGenre = '';
    this.getShows();
  }
  }

  goTo(location) {
    this.router.navigate(['shows/' + location])
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
        if(isPlatformBrowser(this.platformId)) {
    if((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight && this.mode == 'archive') {
      this.loadMoreShows();
    }
  }
}

  loadMoreShows() {
              if(isPlatformBrowser(this.platformId)) {
  //  console.log(this.showPage + ' : SCROLLED TO BOTTOM OF PAGE')
      this.showPage++;
    if(this.currentGenre !== '') {
      this.postsService.getShowsByTag(this.currentGenre.replace(/ /g, "_").toLowerCase(), this.showPage).subscribe(
            data => {
              this.isLoading = false;
              data.body.forEach(item => {
                let featured_img;
                if(item.image_thumbnail == "DEFAULT") {
                  featured_img = "assets/default_show.png";
                } else {
                  featured_img = item.image_thumbnail;
                }
                let titleArr = this.helpersService.HtmlEncode(item.title).split('–');
                let date = titleArr.pop();
                let title = titleArr.join();

                let postData = {
                  title: title,
                  date: date,
                  url: item.url,
                  excerpt: this.helpersService.HtmlEncode(item.excerpt),
                  featured_image: featured_img,
                  tags: item.tags
                }
                this.shows.push(postData);
              })
            }
          )
      } else {
        this.postsService.getShows(this.showPage).subscribe(
          data => {
            this.isLoading = false;
            data.body.forEach(show => {
              let featured_img;
              if(show.image_thumbnail == "DEFAULT") {
                featured_img = "assets/default_show.png";
              } else {
                featured_img = show.image_thumbnail;
              }
              let titleArr = this.helpersService.HtmlEncode(show.title).split('–');
              let date = titleArr.pop();
              let title = titleArr.join().trim();

              let showData = {
                title: title,
                date: date,
                url: show.url,
                excerpt: this.helpersService.HtmlEncode(show.excerpt),
                featured_image: featured_img,
                tags: show.tags,
              }
              this.shows.push(showData);
            })
            })
      }
  }
}
}
