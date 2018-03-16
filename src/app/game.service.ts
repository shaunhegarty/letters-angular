import { Injectable } from '@angular/core';
import { WordService } from './word.service';

@Injectable()
export class GameService {

  currentMix: String = '';
  currentScore = 0;

  roundHistory: Round[] = [];

  constructor(private wordService: WordService) { }

  newMix(size: number): String {
    this.currentMix = this.wordService.getLettersMix(9);
    return this.currentMix;
  }

  getCurrentMix(): String {
    return this.currentMix;
  }

  submitRound(enteredWord: String) {
    const round: Round = {
      word: enteredWord,
      mix: this.currentMix.toString(),
      score: enteredWord.length
    };

    this.roundHistory.concat(round);
    this.currentScore += round.score;
  }

}

export class Round {
  word: String;
  mix: String;
  score: number;
}
