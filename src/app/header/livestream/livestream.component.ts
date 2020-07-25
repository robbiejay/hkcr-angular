import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PlayerService } from '../../_services/player.service';
import videojs from 'video.js';
// import 'hls.js';
// import 'videojs-contrib-dash';
// import 'videojs-contrib-eme';
// import 'videojs-contrib-hls';
import "@videojs/http-streaming";
import 'videojs-contrib-quality-levels';
import 'videojs-resolution-switcher';


@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit, OnDestroy {


  livestreamPlayerHeight = window.innerHeight;
  livestreamPlayerWidth = window.innerWidth;
  video: any;

  constructor(private playerService: PlayerService) { }
  @ViewChild('video') videoElement: ElementRef;
  name = 'Angular 6';


  ngOnInit() {
    if(this.livestreamPlayerWidth > 960) {
      this.livestreamPlayerWidth = 960;
    }
  }

  ngAfterViewInit() {
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

      ngOnDestroy() {
        this.video.dispose();
      }

      deactivateLivestream() {
        this.playerService.livestreamActive = false;
      }
}
