import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PostsService } from '../_services/posts.service';
import { PlayerService } from '../_services/player.service';
import { HtmlEncode } from '../_helpers/helpers';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit {
  shows = [];
  showPage = 1;
  totalPages: number;
  isLoading = true;
  currentGenre = '';
  currentGenreID = '';
  constructor(private postsService: PostsService,
              public playerService: PlayerService) { }


  get isPlayerVisible(): boolean {
    return this.playerService.isPlayerVisible;
  }

  ngOnInit() {
    this.getShows()
  }

  listenShow(show){
    this.playerService.playShow(show);
  }

  getShows() {
    this.postsService.getShows(this.showPage).subscribe(
      data => {
        this.totalPages = data.headers.get('X-WP-TotalPages');
        this.isLoading = false;
        data.body.forEach(item => {
          let tagList = [];
          item.tags.forEach(tag => {
            this.postsService.getTag(tag).subscribe(
              tagData => {
                tagList.push(tagData.name);
              }
            );
          })
          let featured_img = ''
          if(item._embedded["wp:featuredmedia"] == undefined) {
            featured_img = "assets/default_show.png";
          } else {
            featured_img = item._embedded["wp:featuredmedia"][0].source_url
          }
          let postData = {
            title: HtmlEncode(item.title["rendered"]),
            excerpt: HtmlEncode(item.excerpt["rendered"].replace(/<[^>]*>/g, '')),
            featured_image: featured_img,
            tags: tagList,
            tagIDs: item.tags
          }
          this.shows.push(postData);
        })
      }
    );
  }

  prevShowPage() {
    if(this.showPage > 1){
      this.showPage--;
      this.shows = [];
      this.isLoading = true;
      if(this.currentGenre !== '') {
        this.postsService.getShowsByTag(this.currentGenreID, this.showPage).subscribe(
              data => {
                this.totalPages = data.headers.get('X-WP-TotalPages');
                this.isLoading = false;
                data.body.forEach(item => {
                  let tagList = [];
                  item.tags.forEach(tag => {
                    this.postsService.getTag(tag).subscribe(
                      tagData => {
                        tagList.push(tagData.name);
                      }
                    );
                  })
                  let featured_img = ''
                  if(item._embedded["wp:featuredmedia"] == undefined) {
                    let featured_img = "assets/default_show.png";
                  } else {
                    let featured_img = item._embedded["wp:featuredmedia"][0].source_url
                  }
                  let postData = {
                    title: HtmlEncode(item.title["rendered"]),
                    excerpt: HtmlEncode(item.excerpt["rendered"].replace(/<[^>]*>/g, '')),
                    featured_image: featured_img,
                    tags: tagList,
                    tagIDs: item.tags
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

  nextShowPage(){
  if(this.showPage < this.totalPages){
    this.showPage++;
    this.shows = [];
    this.isLoading = true;
    if(this.currentGenre !== '') {
      this.postsService.getShowsByTag(this.currentGenreID, this.showPage).subscribe(
            data => {
              this.totalPages = data.headers.get('X-WP-TotalPages');
              this.isLoading = false;
              data.body.forEach(item => {
                let tagList = [];
                item.tags.forEach(tag => {
                  this.postsService.getTag(tag).subscribe(
                    tagData => {
                      tagList.push(tagData.name);
                    }
                  );
                })
                let featured_img = ''
                if(item._embedded["wp:featuredmedia"] == undefined) {
                  featured_img = "assets/default_show.png";
                } else {
                  featured_img = item._embedded["wp:featuredmedia"][0].source_url
                }
                let postData = {
                  title: HtmlEncode(item.title["rendered"]),
                  excerpt: HtmlEncode(item.excerpt["rendered"].replace(/<[^>]*>/g, '')),
                  featured_image: featured_img,
                  tags: tagList,
                  tagIDs: item.tags
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

  sortByTag(tagID, index, showIndex) {
    this.currentGenre = this.shows[showIndex].tags[index];
    this.currentGenreID = tagID;
      this.shows = [];
    this.isLoading = true;
    let page = 1;
    this.postsService.getShowsByTag(tagID, page).subscribe(
      data => {
        this.totalPages = data.headers.get('X-WP-TotalPages');
        this.isLoading = false;
        data.body.forEach(item => {
          let tagList = [];
          item.tags.forEach(tag => {
            this.postsService.getTag(tag).subscribe(
              tagData => {
                tagList.push(tagData.name);
              }
            );
          })

          let featured_img = ''
          if(item._embedded["wp:featuredmedia"] == undefined) {
            featured_img = "assets/default_show.png";
          } else {
            featured_img = item._embedded["wp:featuredmedia"][0].source_url
          }
          let postData = {
            title: HtmlEncode(item.title["rendered"]),
            excerpt: HtmlEncode(item.excerpt["rendered"].replace(/<[^>]*>/g, '')),
            featured_image: featured_img,
            tags: tagList,
            tagIDs: item.tags
          }
          this.shows.push(postData);
        })
      }
    );
  }

  closeGenre() {
    this.shows = [];
    this.isLoading = true;
    this.showPage = 1;
    this.currentGenre = '';
    this.postsService.getShows(this.showPage).subscribe(
      data => {
        this.totalPages = data.headers.get('X-WP-TotalPages');
        this.isLoading = false;
        data.body.forEach(item => {
          let tagList = [];
          item.tags.forEach(tag => {
            this.postsService.getTag(tag).subscribe(
              tagData => {
                tagList.push(tagData.name);
              }
            );
          })
          let featured_img = ''
          if(item._embedded["wp:featuredmedia"] == undefined) {
            featured_img = "assets/default_show.png";
          } else {
            featured_img = item._embedded["wp:featuredmedia"][0].source_url
          }
          let postData = {
            title: HtmlEncode(item.title["rendered"]),
            excerpt: HtmlEncode(item.excerpt["rendered"].replace(/<[^>]*>/g, '')),
            featured_image: featured_img,
            tags: tagList,
            tagIDs: item.tags
          }
          this.shows.push(postData);
        })
      }
    );
  }

}
