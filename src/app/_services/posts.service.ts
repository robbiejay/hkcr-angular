import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private shows = [];
  private showSubscription: Subscription;

  getShows(page): Observable<any> {
    let url = 'http://hkcr.live/wp-json/wp/v2/posts?_embed&categories=14&page=' + page + '&per_page=6'
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getShowsByTag(tagID, page): Observable<any> {
    let url = 'http://hkcr.live/wp-json/wp/v2/posts?_embed&categories=14&page=' + page + '&tags='+ tagID + '&per_page=9'
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getTag(tag): Observable<any> {
    let url = 'http://hkcr.live/wp-json/wp/v2/tags/' + tag;
    return this.http.get(
      url,
      {responseType: 'json'}
    );
  }

  getSchedule(): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp-json/wp/v2/posts?_embed&categories=15',
      {responseType: 'json'}
    );
  }

  getHighlights(): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp-json/wp/v2/posts?_embed&categories=164',
      {responseType: 'json'}
    );
  }

  getLatestShow(): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp-json/wp/v2/posts?_embed&categories=14&per_page=1',
      {responseType: 'json'}
    );
  }
}
