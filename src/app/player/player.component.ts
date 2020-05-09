import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    trigger('slide', [
      state('slidOut', style({
        'opacity': '0',
        'bottom':'-120px'
      })),
      state('slidIn', style({
        'opacity': '1',
        'bottom':'0px'
      })),
      transition('slidOut => slidIn', animate(200)),
      transition('slidIn => slidOut', animate(200)),
    ])
  ]
})
export class PlayerComponent implements OnInit {

  state = 'slidOut';
  playerVisible: boolean;

  constructor(public playerService: PlayerService) {
    this.playerVisible = playerService.isPlayerVisible;
   }

  ngOnInit() {
    this.playerService.playerVisibilityChange.subscribe(value => {
      if (value) {
        this.state = 'slidIn';
      } else {
        this.state = 'slidOut';
      }
    })
  }

  closePlayer() {
    this.playerService.closePlayer();
  }

}
