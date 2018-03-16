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

  lettersMix: String = '';

  constructor(private gameService: GameService, private messageService: MessageService) {
    this.setLettersMix(9);
    console.log(this.lettersMix);
  }

  ngOnInit() {
  }


  setLettersMix(size: number): void {
    this.lettersMix = this.gameService.newMix(9);
  }

}
