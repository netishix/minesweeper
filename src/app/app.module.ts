import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { MenuComponent } from './routes/menu/menu.component';
import { GameComponent } from './routes/game/game.component';
import { StatsComponent } from './routes/stats/stats.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { GameSetupModalComponent } from './components/game-setup-modal/game-setup-modal.component';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
import { BoardComponent } from './components/board/board.component';
import { FaqComponent } from './routes/faq/faq.component';
import { TimeSpentPipe } from './pipes/time-spent.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GameComponent,
    StatsComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SettingsModalComponent,
    GameSetupModalComponent,
    ModalConfirmationComponent,
    BoardComponent,
    FaqComponent,
    TimeSpentPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GameSetupModalComponent, SettingsModalComponent, ModalConfirmationComponent]
})
export class AppModule { }
