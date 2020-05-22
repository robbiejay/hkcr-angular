import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PlayerService } from '../_services/player.service';
import videojs from 'video.js';
// import 'hls.js';
// import 'videojs-contrib-dash';
// import 'videojs-contrib-eme';
// import 'videojs-contrib-hls';
import "@videojs/http-streaming";
import 'videojs-contrib-quality-levels';
import 'videojs-resolution-switcher';

@Component({
  selector: 'app-radiostream',
  templateUrl: './radiostream.component.html',
  styleUrls: ['./radiostream.component.scss']
})
export class RadiostreamComponent implements OnInit, OnDestroy {
  radioActive: boolean;
  radio: any;

  constructor(public playerService: PlayerService) { }
  @ViewChild('radio') radioElement: ElementRef;


  ngOnInit() {
    this.radioActive = false;
  }

  ngAfterViewInit() {
    const options = {
                  "preload": "auto",
                  "width": 0,
                  "controls": false,
                  fullscreen: {
                    options: {
                      navigationUI: 'hide'
                    }
                  },
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



                  this.radio = videojs(this.radioElement.nativeElement, options);

                  this.radio.src([
                    {
                      type: "application/x-mpegURL",
                      src: "http://161.35.20.148/audio/index.m3u8"
                      }
                  ]);
                  this.radio.on('error', ((error) => {
                    console.log(error);
                    console.log(window);
                  }))
                  console.log(this.radio);
                                    console.log(this.radio.Player);
                       console.log(this.radioElement);
                       console.log(this.radioElement.nativeElement.error.MediaError)
                  //video.play();
  }

  ngOnDestroy() {
    this.radio.dispose();
  }

playRadio($event) {
  $event.preventDefault();
  this.radio.play();
  this.radioActive = true;
}

pauseRadio($event) {
  $event.preventDefault();
  this.radio.pause();
  this.radio.exitFullscreen();
  this.radioActive = false;
}

activateLivestream() {
  this.playerService.livestreamActive = true;
}
}
