import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service';
import { MessageService } from '../message.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-letters-mix',
  templateUrl: './letters-mix.component.html',
  styleUrls: ['./letters-mix.component.css']
})
export class LettersMixComponent implements OnInit {

  constructor(private gameService: GameService, private messageService: MessageService) {
    this.setLettersMix();
  }

  ngOnInit() {
  }


  setLettersMix(): void {
    this.gameService.newMix(9);
  }

  getLettersMix(): String {
    return this.gameService.getCurrentMix();
  }

}
