import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  score = 0;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.score = this.gameService.getCurrentScore();
  }

  getScore(): number {
    return this.gameService.getCurrentScore();
  }

}
