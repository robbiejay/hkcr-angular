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

  // getShowsbyPage(page): Observable<any> {
  //   let url = 'http://hkcr.live/wp_api/data/shows/shows_1.json';
  //   return this.http.get(
  //     url,
  //     {observe: 'response'}
  //   )
  // }

  getShows(page): Observable<any> {
    let url = 'http://hkcr.live/wp_api/data/shows/shows_' + page + '.json';
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getSingleShow(filename): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp_api/data/shows/single/' + filename + '.json',
      {responseType: 'json'}
    );
  }

  getTotalPages(): Observable<any> {
    let url = 'http://hkcr.live/wp_api/data/shows/total_pages.json';
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getShowsByTag(tagID, page): Observable<any> {
    let url = 'http://hkcr.live/wp_api/data/shows/genres/' + tagID + '_'+ page + '.json'
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getTagTotalPages(tagID): Observable<any> {
    let url = 'http://hkcr.live/wp_api/data/shows/genres/_totals/' + tagID + '.json'
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
      'http://hkcr.live/wp_api/data/schedule/schedule.json',
      {responseType: 'json'}
    );
  }

  getHighlights(): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp_api/data/highlights/highlight_reel.json',
      {responseType: 'json'}
    );
  }

  getResidents(): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp_api/data/residents/residents.json',
      {responseType: 'json'}
    );
  }

  getSingleResident(filename): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp_api/data/residents/single/' + filename + '.json',
      {responseType: 'json'}
    );
  }

  getUpcomingShows(): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp_api/data/upcoming-shows/upcoming_shows.json',
      {responseType: 'json'}
    )
  }

  getPosts(): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp_api/data/blog/blog.json',
      {responseType: 'json'}
    );
  }

  getSinglePost(filename): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp_api/data/blog/single/' + filename + '.json',
      {responseType: 'json'}
    );
  }

  getLatestShow(): Observable<any> {
    return this.http.get(
      'http://hkcr.live/wp_api/data/shows/shows_1.json',
      {responseType: 'json'}
    );
  }
}
