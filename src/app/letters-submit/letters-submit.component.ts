import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service';
import { MessageService } from '../message.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-letters-submit',
  templateUrl: './letters-submit.component.html',
  styleUrls: ['./letters-submit.component.css']
})
export class LettersSubmitComponent implements OnInit {

  enteredWord = '';

  constructor(private wordService: WordService, private messageService: MessageService, private gameService: GameService) {  }

  ngOnInit() {

  }

  submitWord() {

    this.messageService.clear();
    this.gameService.getBestWords(this.gameService.getCurrentMix());
    this.gameService.submitWord(this.enteredWord);
  }

  checkWords(innerWord: String): void {
    this.messageService.clear();
    this.gameService.checkWordInWord(innerWord, this.gameService.getCurrentMix());
    this.wordService.checkWordValid(innerWord);

  }

  log(message: String): void {
    this.messageService.add(message.toString());
  }

  clearlog(): void {
    this.messageService.clear();
  }
}
