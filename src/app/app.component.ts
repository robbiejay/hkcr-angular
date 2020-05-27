import { Component } from '@angular/core';
import { PlayerService } from './_services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hkcr';
  livestreamActive = false;
  constructor(public playerService: PlayerService) {  }

}
