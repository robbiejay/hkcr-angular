import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, isDevMode } from '@angular/core';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from "@angular/common";
import { PlayerService } from './_services/player.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';

declare let gtag: Function;
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
              private route: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId) {

                this.router.events.subscribe(event => {
                  if (event instanceof NavigationEnd && environment.production) {
                    gtag('config', 'UA-171054401-1',
                  {
                    'page_path': event.urlAfterRedirects
                  }
                );
                  }
                })

               }

  ngOnInit() {

  }


  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          console.log(evt);
          if(evt instanceof NavigationEnd && evt.url !== '/livestream' && evt.url !== '/') {
          var scrollToTop = window.setInterval(function () {
              var pos = window.pageYOffset;
              if (pos > 0) {
                  window.scrollTo(0, pos - 100); // how far to scroll on each step
              } else {
                  window.clearInterval(scrollToTop);
              }
          }, 60); // how fast to scroll (this equals roughly 60 fps)
      }
    });
    }
  }
}
