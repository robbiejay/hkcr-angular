import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
export class RadiostreamComponent implements OnInit {
  radioActive: boolean;
  video: any;

  constructor(private playerService: PlayerService) { }
  @ViewChild('video') videoElement: ElementRef;


  ngOnInit() {
    this.radioActive = false;
  }

  ngAfterViewInit() {
    const options = {
                  "preload": "auto",
                  "width": 0,
                  "controls": false,
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
                      src: "http://161.35.20.148/audio/index.m3u8"
                      }
                  ]);
                  //video.play();
  }

playRadio() {
  this.video.play();
  this.radioActive = true;
}

pauseRadio() {
  this.video.pause();
  this.radioActive = false;
}
}
