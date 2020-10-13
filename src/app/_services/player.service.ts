import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, mapTo } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public show: string;
  public isPlayerVisible: boolean;
  public playerVisibilityChange: Subject<boolean> = new Subject<boolean>();
  public nowPlaying = '';
  public upNext = '';
  public livestreamActive = false;
  public hasOpenedShow = false;
  //public state = 'slidOut';

  constructor(private http: HttpClient) {
    this.show = '';
    this.playerVisibilityChange.subscribe((value) => {
      this.isPlayerVisible = value
    })
  }

    playShow(show) {
      this.playerVisibilityChange.next(true);
      this.show = show;
      this.hasOpenedShow = true;

    }

    mixcloudLoaded() {

    }

    closePlayer() {
      this.playerVisibilityChange.next(false);
    }

    togglePlayer() {
      this.playerVisibilityChange.next(!this.isPlayerVisible);
    }

    checkStream(): Observable<any> {
      let url = 'https://hkcr.live/hls/test.m3u8';
      return this.http.get(
        url,
        {responseType: 'text',
        observe:'response'},
      )
    }
}
