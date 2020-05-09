import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public show: string;
  public isPlayerVisible: boolean;
  public playerVisibilityChange: Subject<boolean> = new Subject<boolean>();
  //public state = 'slidOut';

  constructor() {
    this.show = '';
    this.playerVisibilityChange.subscribe((value) => {
      this.isPlayerVisible = value
    })
  }

    playShow(show) {
  //    this.state = 'slidIn';
      this.playerVisibilityChange.next(true);
      this.show = show;
      console.log(this.show);
      console.log(document.getElementsByClassName('widget-play-button'))
      console.log(document.getElementsByClassName('ng-tns-c2-0')[0]);
      
    //  console.log(this.state);

    }

    closePlayer() {
      this.playerVisibilityChange.next(false);
      console.log(this.playerVisibilityChange);
    }
}
