import { Renderer2, Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PlayerService } from '../../_services/player.service';

declare var paypal;

@Component({
  selector: 'app-chatango',
  templateUrl: './chatango.component.html',
  styleUrls: ['./chatango.component.scss']
})
export class ChatangoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer2: Renderer2,
    private playerService: PlayerService,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {

      let chatHeight = 520;
      // if(this.route.snapshot.url.length == 0) {
      //     chatHeight = 380;
      //   if(this.route.snapshot.url.length !== 0) {
      //     if(this.route.snapshot.url[0].path !== 'livestream') {
      //         chatHeight = 380;
      //     }

      if(this.playerService.livestreamActive == false) {
        chatHeight = 380;
      } else {
        chatHeight = 520;
        if(window.innerWidth < 992) {
          chatHeight = 225;
        }
      }



    const s = this.renderer2.createElement('script')
    s.type = 'text/javascript';
    s.src = 'https://st.chatango.com/js/gz/emb.js';
    s.style='width:99%;height:' + chatHeight + 'px;'
    s.text = `{"handle":"hkcrlive","arch":"js","styles":{"a":"FFDF00","b":100,"c":"000000","d":"000000","k":"FFDF00","l":"FFDF00","m":"FFDF00","p":"10","q":"FFDF00","r":100,"t":0,"surl":0,"allowpm":0}}`;
    s.id='cid0020000259104939105';
    s.dataCfasync='false';
    s.async='true';

    this.renderer2.setStyle(
  s,
  'width:100%',
  'height:520px'
);

    // id="cid0020000259104939105"
    // data-cfasync="false"
    // async
    // src="//st.chatango.com/js/gz/emb.js"
    // style="width: 300px;height: 400px;"

if (this.playerService.livestreamActive == false) {
  this.renderer2.appendChild(this._document.body.childNodes[1].childNodes[0].childNodes[1].childNodes[2].childNodes[0].childNodes[0], s)
} else {
  this.renderer2.appendChild(this._document.body.childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[1], s);
}


    //
    //
  //
  }
}
}
