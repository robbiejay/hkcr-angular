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
    this.totalPages = 46;
    this.getShows()
  }

  listenShow(show){
    this.playerService.playShow(show);
  }


  getShows() {
    this.isLoading = true;
    this.postsService.getShows(this.showPage).subscribe(
      data => {
        this.isLoading = false;
        data.body.forEach(show => {
          let showData = {
            title: HtmlEncode(show.title),
            excerpt: HtmlEncode(show.excerpt),
            featured_image: show.image_thumbnail,
            tags: show.tags,
          }
          this.shows.push(showData);
        })
        })
    }

  prevShowPage() {
    if(this.showPage > 1){
      this.showPage--;
      this.shows = [];
      this.isLoading = true;
      if(this.currentGenre !== '') {
        this.postsService.getShowsByTag(this.currentGenre.replace(/ /g, "_").toLowerCase(), this.showPage).subscribe(
              data => {
                this.isLoading = false;
                data.body.forEach(item => {
                  let postData = {
                    title: HtmlEncode(item.title),
                    excerpt: HtmlEncode(item.excerpt),
                    featured_image: item.image_thumbnail,
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

  nextShowPage(){
  if(this.showPage < this.totalPages){
    this.showPage++;
    this.shows = [];
    this.isLoading = true;
    if(this.currentGenre !== '') {
      this.postsService.getShowsByTag(this.currentGenre.replace(/ /g, "_").toLowerCase(), this.showPage).subscribe(
            data => {
              this.isLoading = false;
              data.body.forEach(item => {
                let postData = {
                  title: HtmlEncode(item.title),
                  excerpt: HtmlEncode(item.excerpt),
                  featured_image: item.image_thumbnail,
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

  sortByTag(tag) {
    this.currentGenre = tag;
    this.shows = [];
    this.isLoading = true;
    let page = 1;
    this.postsService.getShowsByTag(this.currentGenre.replace(/ /g, "_").toLowerCase(), page).subscribe(
      data => {
        this.isLoading = false;
        data.body.forEach(item => {
          let postData = {
            title: HtmlEncode(item.title),
            excerpt: HtmlEncode(item.excerpt),
            featured_image: item.image_thumbnail,
            tags: item.tags
          }
          this.shows.push(postData);
        })
        })
      }

  closeGenre() {
    this.shows = [];
    this.isLoading = true;
    this.showPage = 1;
    this.currentGenre = '';
    this.getShows();
  }

}
