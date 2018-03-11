import { Component, OnInit } from '@angular/core';
import { LetterPile } from './letter-pile';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-letters-game',
  templateUrl: './letters-game.component.html',
  styleUrls: ['./letters-game.component.css']
})
export class LettersGameComponent implements OnInit {

  lettersMix = '';
  enteredWord = '';
  valid: Word;

  constructor(private http: HttpClient) {
    this.lettersMix += LetterPile.getRandomMix(9).toString();
    console.log(this.lettersMix);
  }

  ngOnInit() {

  }

  checkWords(innerWord: String): void {
    this.clearlog();
    const contains = this.isWordContainingWord(innerWord, this.lettersMix);
    let message: String = '';
    message = innerWord.toUpperCase() + (contains ? ' is in ' : ' is NOT in ') + this.lettersMix.toUpperCase();
    this.log(message);

    this.checkWordValid(innerWord);

  }

  log(message: String): void {
    console.log(message);
    const messageBox: HTMLElement = document.getElementById('message');
    messageBox.textContent += '\n\r' + message.toString();
  }

  clearlog(): void {
    const messageBox: HTMLElement = document.getElementById('message');
    messageBox.textContent = '';
  }

  checkWordValid(word: String): void {
    const that = this;
    const url = 'http://api.shaunhegarty.com/validate/' + word;
    // let val: {};
    this.http.get<Word>(url).subscribe(function(data) {
      let message: String = word + ' is ';
      if (!data.valid) {
        message += 'not ';
      }
      message += 'in the dictionary';
      that.log(message);
    });
  }

  isWordContainingWord(innerWord: String, outerWord: String): boolean {
    if (!innerWord || !outerWord || !innerWord.length || !outerWord.length) {
      throw new Error('isWordContainingWord requires two strings to be passed.');
    }

    const counts: Map<String, number> = new Map;
    const trimmedInner = innerWord.replace(/\s+/g, '');
    const trimmedOuter = outerWord.replace(/\s+/g, '');

    console.log('checking: ' + trimmedInner + ' and ' + trimmedOuter);

    if (trimmedOuter.length < trimmedInner.length) {
      return false;
    }

    for (const letter of trimmedOuter.toLowerCase().split('')) {
      if (!counts[letter]) {
        counts[letter]  = 0;
      }
      counts[letter]++;
    }

    for (const letter of trimmedInner.toLowerCase().split('')) {
      if (!counts[letter]) {
        counts[letter]  = 0;
      }
      counts[letter]--;
    }

    return Object.keys(counts).reduce(function(isWordContainingWord, key) {
      return isWordContainingWord && !(counts[key] < 0);
    }, true);

  }

}

export interface Word {
  valid: boolean;
}
