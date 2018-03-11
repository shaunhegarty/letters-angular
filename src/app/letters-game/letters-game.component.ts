import { Component, OnInit } from '@angular/core';
import { LetterPile } from './letter-pile';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { WordService } from '../word.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-letters-game',
  templateUrl: './letters-game.component.html',
  styleUrls: ['./letters-game.component.css']
})
export class LettersGameComponent implements OnInit {

  lettersMix = '';
  enteredWord = '';

  constructor(private wordService: WordService, private messageService: MessageService) {
    this.lettersMix += LetterPile.getRandomMix(9).toString();
    console.log(this.lettersMix);
  }

  ngOnInit() {

  }

  checkWords(innerWord: String): void {
    this.clearlog();
    const contains = this.wordService.isWordContainingWord(innerWord, this.lettersMix);
    const message: String = innerWord.toUpperCase() + (contains ? ' is in ' : ' is NOT in ') + this.lettersMix.toUpperCase();
    this.log(message);

    this.wordService.checkWordValid(innerWord);

  }

  log(message: String): void {
    this.messageService.add(message.toString());
  }

  clearlog(): void {
    this.messageService.clear();
  }

}
