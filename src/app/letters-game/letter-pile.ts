


/**
 *  Builds a pile of letters with a specific distribution.
 *  Get consonants and vowels from this to ensure the list is appropriate.
 */
export class LetterPile {
  consonants: Array<String> = new Array;
  vowels: Array<String> = new Array;

  public static getRandomMix(size: number): String {
    const pile: LetterPile = new LetterPile();
    return pile.getMix(size);
  }

  public getMix(size: number): String {
    if (size > 15 || size < 0) {
      throw new Error('size: ' + size + ' is invalid');
    }

    // max consonant distribution = 7/9
    // min consonant distribution = 3/9

    // choose consonant or vowel
    let mix: String = '';
    let consCount = 0;
    let vowelCount = 0;

    while ( consCount + vowelCount < size) {
      let letter = '';
      if (Math.floor(Math.random() * 2) === 1
        && (consCount <= Math.floor(size * 7.0 / 9.0)
        || vowelCount >= Math.floor(size * 6.0 / 9.0))) {
        letter = this.getConsonant().toString();
        consCount++;
      } else {
        letter = this.getVowel().toString();
        vowelCount++;
      }
      mix = mix.concat(letter);
    }
    console.log(mix);
    return mix;
  }

  private fillConsonants(): void {
    this.addConsonant('B', 2);
    this.addConsonant('C', 3);
    this.addConsonant('D', 6);
    this.addConsonant('F', 2);
    this.addConsonant('G', 3);
    this.addConsonant('J', 1);
    this.addConsonant('K', 1);
    this.addConsonant('L', 5);
    this.addConsonant('M', 4);
    this.addConsonant('N', 8);
    this.addConsonant('P', 4);
    this.addConsonant('Q', 1);
    this.addConsonant('R', 9);
    this.addConsonant('S', 9);
    this.addConsonant('T', 9);
    this.addConsonant('V', 1);
    this.addConsonant('W', 1);
    this.addConsonant('X', 1);
    this.addConsonant('Y', 1);
    this.addConsonant('Z', 1);

  }

  private fillVowels(): void {
    this.addVowel('A', 15);
    this.addVowel('E', 21);
    this.addVowel('I', 13);
    this.addVowel('O', 13);
    this.addVowel('U', 5);
  }

  private addConsonant(letter: String, amount: number) {
    let i = 0;
    for (i = 0; i < amount; i++) {
      this.consonants.push(letter);
    }
  }

  private addVowel(letter: String, amount: number) {
    let i = 0;
    for (i = 0; i < amount; i++) {
      this.vowels.push(letter);
    }
  }

  public getConsonant(): String {
    const index = Math.floor(Math.random() * this.consonants.length);
    const letter = this.consonants[index];
    this.consonants.splice(index, 1);
    return letter;
  }

  public getVowel(): String {
    const index = Math.floor(Math.random() * this.vowels.length);
    const letter = this.vowels[index];
    this.vowels.splice(index, 1);
    return letter;
  }

  constructor() {
    this.fillConsonants();
    this.fillVowels();
  }
}
