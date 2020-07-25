import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _meta: Meta, private _title: Title) { }

  ngOnInit() {

    this._title.setTitle("HKCR | Hong Kong Community Radio");
    this._meta.updateTag({ name: 'description', content: "HKCR 🌐 | Hong Kong Community Radio, independent livestream platform for latest mixes, podcasts, DJs & music from Hong Kong. 香港聯合電台 (簡稱HKCR) ，一個提供最新電台Mix ， Podcast 廣播以及地下音樂的獨立網上平台。"});
    this._meta.updateTag({ name: 'keywords', content: "Hong Kong, Electronic, Music, Mix, Podcast, Livestream, Radio"});
    this._meta.updateTag({ name: 'og:image', content: "http://hkcr.live/wp-content/uploads/2020/05/18-3.jpg"});
    this._meta.updateTag({ name: 'og:title', content: "HKCR | Hong Kong Community Radio"});
    this._meta.updateTag({ name: 'og:description', content: "HKCR 🌐 | Hong Kong Community Radio, independent platform for latest mixes, podcasts, DJs & music from Hong Kong. 香港聯合電台 (簡稱HKCR) ，一個提供最新電台Mix ， Podcast 廣播以及地下音樂的獨立網上平台。"});
  }

}
