import { Renderer2, Inject, PLATFORM_ID, Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chatango',
  templateUrl: './chatango.component.html',
  styleUrls: ['./chatango.component.scss']
})
export class ChatangoComponent implements OnInit {

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
    const s = this.renderer2.createElement('script')
    s.type = 'text/javascript';
    s.src = 'https://st.chatango.com/js/gz/emb.js';
    s.style='width:100%;height: 520px;'
    s.text = `{"handle":"hkcrlive","arch":"js","styles":{"a":"FFDF00","b":100,"c":"000000","d":"000000","k":"FFDF00","l":"FFDF00","m":"FFDF00","p":"10","q":"FFDF00","r":100,"t":0,"surl":0,"allowpm":0,"fwtickm":1}}`;
    s.id='cid0020000259104939105';
    s.dataCfasync='false';
    s.async='true';

    this.renderer2.setStyle(
  s,
  'width:100%',
  'height:400px'
);

    // id="cid0020000259104939105"
    // data-cfasync="false"
    // async
    // src="//st.chatango.com/js/gz/emb.js"
    // style="width: 300px;height: 400px;"

    console.log(this._document.body);
    this.renderer2.appendChild(this._document.body.childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[1], s);
  }
}
}
