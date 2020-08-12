import { Component, OnInit } from '@angular/core';
import { PostsService} from '../_services/posts.service';
import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getDate();
  timestamp = '';
  constructor( public playerService: PlayerService,
              public postsService: PostsService) { }

  ngOnInit() {
    this.getTimestamp();
  }


  getTimestamp() {
    this.postsService.getLatestUpdatedTimestamp().subscribe(
      data => {
        this.timestamp = data;
      }
    )
  }
}
