import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(@Inject(PLATFORM_ID) private platformId) { }

  HtmlEncode(html) {
            if(isPlatformBrowser(this.platformId)) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(/<[^>]*>/), replace);
  }

}
