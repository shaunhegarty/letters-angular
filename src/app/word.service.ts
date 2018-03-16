import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { LetterPile } from './letters-game/letter-pile';

@Injectable()
export class WordService {

  valid: Word;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getLettersMix(size: number): String {
    return LetterPile.getRandomMix(size).toString();
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

  checkWordInWord(innerWord: String, outerWord: String): boolean {
    const contains = this.isWordContainingWord(innerWord, outerWord);
    const message: string = innerWord.toUpperCase()
      + (contains ? ' IS IN ' : ' IS NOT IN ')
      + outerWord.toUpperCase();
    this.messageService.add(message);
    return contains;
  }

  checkWordValid(word: String): void {
    const that = this;
    const url = 'http://api.shaunhegarty.com/validate/' + word;
    this.http.get<Word>(url).subscribe(data => this.checkWord(word, data));
    // let val: {};
    // this.http.get<Word>(url).subscribe(function(data) {
    //   let message: string = word + ' is ';
    //   if (!data.valid) {
    //     message += 'not ';
    //   }
    //   message += 'in the dictionary';
    //   that.messageService.add(message.toUpperCase());
    // });
  }

  checkWord(word: String, data: Word) {
    let message: string = word + ' is ';
    if (!data.valid) {
      message += 'not ';
    }
    message += 'in the dictionary';
    this.messageService.add(message.toUpperCase());
  }

}

export interface Word {
  valid: boolean;
}
