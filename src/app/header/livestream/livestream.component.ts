import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser } from "@angular/common";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PlayerService } from '../../_services/player.service';
import videojs from 'video.js';
// import 'hls.js';
// import 'videojs-contrib-dash';
// import 'videojs-contrib-eme';
// import 'videojs-contrib-hls';
import "@videojs/http-streaming";
import 'videojs-contrib-quality-levels';
import 'videojs-resolution-switcher';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss'],
  animations: [
    trigger('fadeBG', [
      state('fadeOut', style({
        'background-color':'rgba(255,223,0,0)',
        'filter': 'blur(35px)',
        'opacity': 0,
        'display': 'none'

      })),
      state('fadeIn', style({
        'background-color':'rgba(255,255,255,1)',

      })),
      transition('* => *', animate(2400)),
    ])
  ]
})
export class LivestreamComponent implements OnInit, OnDestroy {


  fadeBGState = 'fadeIn';
  livestreamPlayerWidth : number;
  livestreamPlayerHeight : number;
  video: any;

  constructor(private _title: Title,
    private _location: Location,
    private playerService: PlayerService,
  @Inject(PLATFORM_ID) private platformId) { }
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  name = 'Angular 6';


  ngOnInit() {
    if(this.livestreamPlayerWidth > 960) {
      this.livestreamPlayerWidth = 960;
    }
  }

  ngAfterViewInit() {
        if(isPlatformBrowser(this.platformId)) {

    this.livestreamPlayerHeight = window.innerHeight;
    this.livestreamPlayerWidth = window.innerWidth;

    this.playerService.checkStream().subscribe(
      data => {
        console.log(data);
      }
    )
        if(this.livestreamPlayerWidth > 960) {
          this.livestreamPlayerWidth = 960;
        }
    const options = {
                  "preload": "auto",
                  "controls": true,
                  "width": this.livestreamPlayerWidth - 10,
                  "poster":"https://admin.hkcr.live/wp-content/uploads/2020/07/hkcr-meta.png",
                  hls: {
                    withCredentials: true
                  },
                  plugins: {
                    videoJsResolutionSwitcher: {
                      default: 'high',
                      dynamicLabel: true
                    }
                  }
               }

                  this.video = videojs(this.videoElement.nativeElement, options, function() {
                    this.updateSrc([
                      {
                    //    lastleftoffatthispoint
                        // https://kmoskwiak.github.io/videojs-resolution-switcher
                        // https://licson.net/post/setting-up-adaptive-streaming-with-nginx/
                      }
                    ])

                  });

                  this.video.src([
                    {
                      type: "application/x-mpegURL",
                      src: "https://hkcr.live/hls/test.m3u8"
                      }
                  ]);
                  this.video.play();
                  console.log(this.video.userActive());
                  console.log(this.video.readyState());
                  this.fadeBGState = 'fadeOut';
      }

      this._title.setTitle("Livestream | HKCR")

    }

      ngOnDestroy() {
        this.video.dispose();
      }

      deactivateLivestream() {
        this.playerService.livestreamActive = false;
        this._location.go('home');
      }
}
