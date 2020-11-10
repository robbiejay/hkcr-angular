import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformBrowser } from '@angular/common';
import { PlayerService } from '../../_services/player.service';
import videojs from 'video.js';
// import 'hls.js';
// import 'videojs-contrib-dash';
// import 'videojs-contrib-eme';
// import 'videojs-contrib-hls';
//import "@videojs/http-streaming";
//import 'videojs-contrib-quality-levels';
  //import 'videojs-resolution-switcher';

@Component({
  selector: 'app-radiostream',
  templateUrl: './radiostream.component.html',
  styleUrls: ['./radiostream.component.scss']
})
export class RadiostreamComponent implements OnInit, OnDestroy {
  radioActive: boolean;
  radio: any;
  errorActive: boolean;

  constructor(public playerService: PlayerService,
    private _location: Location,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId ) { }
  @ViewChild('radio') radioElement: ElementRef;


  ngOnInit() {
    this.radioActive = false;
  }

  ngAfterViewInit() {
            if(isPlatformBrowser(this.platformId)) {
    const options = {
                  "preload": "auto",
                  "width": 0,
                  "controls": false,
                  hls: {
                    withCredentials: true
                  }
               };
                  this.radio = videojs(this.radioElement.nativeElement, options);

                  this.radio.src([
                    {
                      type: "application/x-mpegURL",
                      src: "https://hkcr.live/audio/index.m3u8"
                      }
                  ]);
                  this.radio.on('error', ((error) => {
                    this.errorActive = true;
                  }))
                  // console.log(this.radio);
                  // console.log(this.radio.Player);
                  // console.log(this.radioElement);
                  //video.play();
                }
  }

  ngOnDestroy() {
              if(isPlatformBrowser(this.platformId)) {
    this.radio.dispose();
  }
  }

playRadio($event) {
  $event.preventDefault();
  this.radio.play();
  this.radioActive = true;
}

pauseRadio($event) {
  $event.preventDefault();
  this.radio.pause();
  this.radioActive = false;
}

activateLivestream() {
  this.playerService.livestreamActive = true;
    this._location.go('livestream');
    var scrollToTop = window.setInterval(function () {
        var pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 1000); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 60); // how fast to scroll (this equals roughly 60 fps)
}
}
