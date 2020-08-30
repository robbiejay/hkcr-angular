import { Renderer2, Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public playerService: PlayerService,
              private renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document,
              @Inject(PLATFORM_ID) private platformId) { }
  mobileMenuActive = false;
  ngOnInit() {
  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
      const videojs_script = this.renderer2.createElement('script')
      videojs_script.src = 'https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js';
      this.renderer2.appendChild(this._document.body, videojs_script);

      const http_streaming_script = this.renderer2.createElement('script')
      http_streaming_script.src = 'https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.min.js';
      this.renderer2.appendChild(this._document.body, http_streaming_script);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

}

// <script async src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
//   <script async src="https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.min.js"></script>
