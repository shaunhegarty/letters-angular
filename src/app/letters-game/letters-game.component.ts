import { Component, OnInit } from '@angular/core';
import { LetterPile } from './letter-pile';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { WordService } from '../word.service';
import { MessageService } from '../message.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-letters-game',
  templateUrl: './letters-game.component.html',
  styleUrls: ['./letters-game.component.css']
})
export class LettersGameComponent implements OnInit {

  enteredWord = '';

  constructor(private wordService: WordService, private messageService: MessageService, private gameService: GameService) {  }

  ngOnInit() {

  }


  checkWords(innerWord: String): void {
    this.messageService.clear();
    this.wordService.checkWordInWord(innerWord, this.gameService.getCurrentMix());
    this.wordService.checkWordValid(innerWord);

  }

  log(message: String): void {
    this.messageService.add(message.toString());
  }

  clearlog(): void {
    this.messageService.clear();
  }

}
