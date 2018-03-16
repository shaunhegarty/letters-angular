import { Component, OnInit } from '@angular/core';
import { GameService, Round } from '../game.service';

@Component({
  selector: 'app-round-history',
  templateUrl: './round-history.component.html',
  styleUrls: ['./round-history.component.css']
})
export class RoundHistoryComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {

  }

  getHistory(): Round[] {
    return this.gameService.getRoundHistory();
  }

}
