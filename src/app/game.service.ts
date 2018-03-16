import { Injectable } from '@angular/core';
import { WordService, Word } from './word.service';
import { MessageService } from './message.service';
import { LetterPile } from './letters-game/letter-pile';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {

  currentMix: String = '';
  currentScore = 0;

  roundHistory: Round[] = [];

  constructor(private http: HttpClient, private wordService: WordService, private messageService: MessageService) {
    this.newMix(9);
  }

  newMix(size: number): String {
    this.currentMix = this.getLettersMix(9);
    return this.currentMix;
  }

  getCurrentMix(): String {
    return this.currentMix;
  }

  submitRound(enteredWord: String, valid: boolean) {
    const round: Round = {
      word: enteredWord,
      mix: this.currentMix.toString(),
      score: valid ? enteredWord.length : 0
    };

    if (round.score === 9) {
      round.score = round.score * 2;
    }

    this.roundHistory.concat(round);
    this.currentScore += round.score;
    this.messageService.add('Got ' + round.score + ' points. Total: ' + this.currentScore);
  }

  submitWord(word: String): void {
    if (this.checkWordInWord(word, this.currentMix)) {
      const url = 'http://api.shaunhegarty.com/validate/' + word;
      this.http.get<Word>(url).subscribe(data => this.receiveWord(word, data.valid));
    } else {
      this.receiveWord(word, false);
    }
    this.newMix(9);
  }

  receiveWord(word: String, valid: boolean) {
    const message: String = word + ' is ' + (!valid ? 'not ' : '') + 'in the dictionary';
    this.messageService.add(message.toUpperCase());
    this.submitRound(word, valid);
  }

  checkWordInWord(innerWord: String, outerWord: String): boolean {
    const contains = this.wordService.isWordContainingWord(innerWord, outerWord);
    const message: string = innerWord.toUpperCase()
      + (contains ? ' IS IN ' : ' IS NOT IN ')
      + outerWord.toUpperCase();
    this.messageService.add(message);
    return contains;
  }

  getLettersMix(size: number): String {
    return LetterPile.getRandomMix(size).toString();
  }

  getCurrentScore(): number {
    return this.currentScore;
  }

}

export class Round {
  word: String;
  mix: String;
  score: number;
}
