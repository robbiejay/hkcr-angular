import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
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
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit, OnDestroy {


  livestreamPlayerWidth : number;
  livestreamPlayerHeight : number;
  video: any;

  constructor(private _title: Title, private playerService: PlayerService,
  @Inject(PLATFORM_ID) private platformId) { }
  @ViewChild('video') videoElement: ElementRef;
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
                  "width": this.livestreamPlayerWidth - 10,
                  hls: {
                    withCredentials: true
                  },
                  plugins: {
                    videoJsResolutionSwitcher: {
                      default: 'high',
                      dynamicLabel: true
                    }
                  }
               };

                  this.video = videojs(this.videoElement.nativeElement, options);

                  this.video.src([
                    {
                      type: "application/x-mpegURL",
                      src: "https://hkcr.live/hls/test.m3u8"
                      }
                  ]);
                  this.video.play();
                  console.log(this.video.userActive());
                  console.log(this.video.readyState());
      }

      this._title.setTitle("Livestream | HKCR")

    }

      ngOnDestroy() {
        this.video.dispose();
      }

      deactivateLivestream() {
        this.playerService.livestreamActive = false;
      }
}
