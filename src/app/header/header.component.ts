import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public playerService: PlayerService ) { }

  ngOnInit() {
  }

}
