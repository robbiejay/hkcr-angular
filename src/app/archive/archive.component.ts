import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PostsService } from '../_services/posts.service';
import { PlayerService } from '../_services/player.service';
import { HtmlEncode } from '../_helpers/helpers';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  shows = [];
  showPage = 1;
  totalPages: number;
  isLoading = true;
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
        console.log(data);
        this.totalPages = data.headers.get('X-WP-TotalPages');
        console.log(this.totalPages);
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
          if(item._embedded["wp:featuredmedia"][0].source_url == undefined) {
            console.log(item.title["rendered"])
          }
          let postData = {
            title: HtmlEncode(item.title["rendered"]),
            excerpt: HtmlEncode(item.excerpt["rendered"].replace(/<[^>]*>/g, '')),
            featured_image: item._embedded["wp:featuredmedia"][0].source_url,
            tags: tagList
          }
          this.shows.push(postData);
        })
      console.log(this.shows);
      }
    );
  }

  prevShowPage() {
    if(this.showPage > 1){
      this.showPage--;
      console.log(this.showPage);
      this.shows = [];
      this.isLoading = true;
      this.getShows();
    }
  }

  nextShowPage(){
  if(this.showPage < this.totalPages){
    this.showPage++;
    console.log(this.showPage);
    this.shows = [];
    this.isLoading = true;
    this.getShows();
  }
  }

}
