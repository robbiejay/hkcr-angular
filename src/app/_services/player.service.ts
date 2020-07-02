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
    //   let widget = window.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget"));
    //
    //     // console.log(window.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")));
    //     let iframe = document.getElementById("mixcloud-widget");
    //     let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    //     if (  iframeDoc.readyState  == 'complete' ) {
    //         iframe.contentWindow.onload = function(){
    //             alert("I am loaded");
    //         };
    //         // The loading is complete, call the function we want executed once the iframe is loaded
    //         afterLoading();
    //         widget.ready.then((a)=>{
    //         widget.play();
    //         });
    //         return;
    //     }
    //     // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    //     window.setTimeout(checkIframeLoaded, 100);
    //
    // function afterLoading(){
    //     alert("I am here");
    // }



        // console.log(this.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")));

        // window.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).play();
        // window.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).togglePlay();
        // window.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).events.play();
      //  console.log(window.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).events);
      //  window.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget")).events.togglePlay();


    }

    mixcloudLoaded() {
      // let widget = this.window.Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget"));
      // widget.ready.then((a)=>{
      //   widget.play();
      // });
    }

    closePlayer() {
      this.playerVisibilityChange.next(false);
    }

    checkStream(): Observable<any> {
      let url = 'https://161.35.20.148/hls/test.m3u8';
      return this.http.get(
        url,
        {responseType: 'text',
        observe:'response'},
      )
    }
}
