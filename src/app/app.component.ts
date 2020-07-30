import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { PlayerService } from './_services/player.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hkcr';
  livestreamActive = false;
  constructor(public playerService: PlayerService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId) {  }

  ngOnInit() {
}

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }

          var scrollToTop = window.setInterval(function () {
              var pos = window.pageYOffset;
              if (pos > 0) {
                  window.scrollTo(0, pos - 20); // how far to scroll on each step
              } else {
                  window.clearInterval(scrollToTop);
              }
          }, 16); // how fast to scroll (this equals roughly 60 fps)
      });
    }
  }
  }
