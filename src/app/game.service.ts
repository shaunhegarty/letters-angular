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

  submitRound(round: Round, valid: boolean) {
    round.score = valid ? round.word.length : 0;

    if (round.score === 9) {
      round.score = round.score * 2;
    }

    this.roundHistory.push(round);
    while (this.roundHistory.length > 20) {
      this.roundHistory.shift();
    }
    this.currentScore += round.score;
    this.messageService.add('Got ' + round.score + ' points. Total: ' + this.currentScore);
  }

  submitWord(enteredWord: String): void {
    const round: Round = {
      word: enteredWord,
      mix: this.currentMix,
      score: enteredWord.length
    };

    if (this.checkWordInWord(enteredWord, this.currentMix)) {
      const url = 'http://api.shaunhegarty.com/validate/' + enteredWord;
      this.http.get<Word>(url).subscribe(data => this.receiveWord(round, data.valid));
    } else {
      this.receiveWord(round, false);
    }
    this.newMix(9);
  }

  receiveWord(round: Round, valid: boolean) {
    const message: String = round.word + ' is ' + (!valid ? 'not ' : '') + 'in the dictionary';
    this.messageService.add(message.toUpperCase());
    this.submitRound(round, valid);
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

  getRoundHistory(): Round[] {
    return this.roundHistory;
  }

}

export class Round {
  word: String;
  mix: String;
  score: number;
}
