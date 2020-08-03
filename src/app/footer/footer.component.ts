import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getDate();
  constructor( private playerService: PlayerService ) { }

  ngOnInit() {
  }

}
