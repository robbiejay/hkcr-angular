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
  //public state = 'slidOut';

  constructor(private http: HttpClient) {
    this.show = '';
    this.playerVisibilityChange.subscribe((value) => {
      this.isPlayerVisible = value
    })
  }

    playShow(show) {
  //    this.state = 'slidIn';
      this.playerVisibilityChange.next(true);
      this.show = show;

        // this.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).ready.then(function() {
        // console.log(this.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")));
        // this.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).events.play.on();
        // this.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).play();
        // this.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).togglePlay();
        // this.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).events.play();
        // this.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).events.togglePlay();
        //     });

    }

    closePlayer() {
      this.playerVisibilityChange.next(false);
    }

    checkStream(): Observable<any> {
      let url = 'http://161.35.20.148/hls/test.m3u8';
      return this.http.get(
        url,
        {responseType: 'text',
        observe:'response'},
      )
    }
}
