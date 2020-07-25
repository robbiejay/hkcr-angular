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
        'opacity': '1',
        'bottom':'-120px'
      })),
      state('slidIn', style({
        'opacity': '1',
        'bottom':'0px'
      })),
      transition('slidOut => slidIn', animate(200)),
      transition('slidIn => slidOut', animate(200)),
    ]),
    trigger('btn-slide', [
      state('btn-slidOut', style({
        'opacity': '1',
        'bottom':'0px'
      })),
      state('btn-slidIn', style({
        'opacity': '1',
        'bottom':'60px'
      })),
      transition('btn-slidOut => btn-slidIn', animate(200)),
      transition('btn-slidIn => btn-slidOut', animate(200)),
    ])
  ]
})
export class PlayerComponent implements OnInit {

  state = 'slidOut';
  btnState = 'btn-slidOut';
  playerVisible: boolean;
  playerState: string;

  constructor(public playerService: PlayerService) {
    this.playerVisible = playerService.isPlayerVisible;
   }

  ngOnInit() {
    this.playerService.playerVisibilityChange.subscribe(value => {
      if (value) {
        this.state = 'slidIn';
        this.btnState = 'btn-slidIn'
        this.playerState = 'X';
      } else {
        this.state = 'slidOut';
        this.btnState = 'btn-slidOut';
        this.playerState = 'O';
      }
    })
  }

  closePlayer() {
    this.playerService.closePlayer();
  }

  togglePlayer() {
    this.playerService.togglePlayer();
  }

}
