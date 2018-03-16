import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WordService } from './word.service';


import { AppComponent } from './app.component';
import { LettersGameComponent } from './letters-game/letters-game.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { GameService } from './game.service';
import { LettersMixComponent } from './letters-mix/letters-mix.component';
import { LettersSubmitComponent } from './letters-submit/letters-submit.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LettersGameComponent,
    MessagesComponent,
    LettersMixComponent,
    LettersSubmitComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WordService, MessageService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
