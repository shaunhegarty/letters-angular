import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letters-game',
  templateUrl: './letters-game.component.html',
  styleUrls: ['./letters-game.component.css']
})
export class LettersGameComponent implements OnInit {

  lettersMix = 'SERRATION';

  enteredWord = '';

  constructor() { }

  ngOnInit() {
  }

  checkWords(innerWord: String): void {
    const contains = this.isWordContainingWord(innerWord, this.lettersMix);
    if (contains) {
      console.log(innerWord + ' is in ' + this.lettersMix);
    } else {
      console.log(innerWord + ' is NOT in ' + this.lettersMix);
    }
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

    console.log(counts);

    for (const letter of trimmedInner.toLowerCase().split('')) {
      if (!counts[letter]) {
        counts[letter]  = 0;
      }
      counts[letter]--;
    }

    return Object.keys(counts).reduce(function(isWordContainingWord, key) {
      console.log(key + ': ' + counts[key]);
      return isWordContainingWord && !(counts[key] < 0);
    }, true);

  }

}
