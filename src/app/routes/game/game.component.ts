import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Game } from "../../lib/game.class";
import { IconsInterface } from "../../interfaces/icons.interface";
import {
  faArrowLeft,
  faFlushed,
  faPlay,
  faRedo,
  faSadCry,
  faSmileBeam,
  faTachometerAlt
} from "@fortawesome/free-solid-svg-icons";
import { DatasourceService } from "../../services/datasource.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit, OnDestroy {

  public icons: IconsInterface;
  public autoSaveInterval: any;
  public game!: Game;
  public isEmojiFaceBlinking: boolean;

  constructor(
    public activatedRoute: ActivatedRoute,
    public datasourceService: DatasourceService,
    public router: Router,
    public title: Title
  ) {
    this.icons = {
      faSmileBeam,
      faFlushed,
      faSadCry,
      faArrowLeft,
      faTachometerAlt,
      faRedo,
      faPlay
    };
    this.isEmojiFaceBlinking = false;
  }

  ngOnInit(): void {
    this.game = this.activatedRoute.snapshot.data.game;
    this.title.setTitle(`Game - ${this.game.settings.xCells}x${this.game.settings.yCells} - ${this.game.settings.totalBombs} bombs`);
    if (!this.game.stats.finished) {
      this.resumeGame();
    }
  }

  ngOnDestroy() {
    this.game.stopRecordingTime();
    this.stopAutoSave();
  }

  public resumeGame(): void {
    this.game.recordTime();
    this.startAutoSave();
  }

  public startAutoSave() {
    this.autoSaveInterval = setInterval(() => {
      this.saveGameState();
    }, 1000);
  }

  public stopAutoSave() {
    clearInterval(this.autoSaveInterval);
  }

  public async saveGameState() {
    await this.datasourceService.getConnector().updateGame(this.game);
  }

  public async finishGame(won: boolean): Promise<void> {
    this.stopAutoSave();
    this.game.stopRecordingTime();
    this.game.stats.finished = true;
    this.game.stats.endDate = new Date().toISOString();
    this.game.stats.won = won;
    await this.saveGameState();
  }

  public restartGame(): void {
    const currentGameId = this.game.id;
    const currentGameSettings = this.game.settings;
    this.game = new Game()
    this.game.init(currentGameSettings);
    this.game.id = currentGameId;
    this.resumeGame();
  }

  public async newGame(): Promise<void> {
    const currentGameSettings = this.game.settings;
    const game = new Game()
    game.init(currentGameSettings);
    await this.datasourceService.getConnector().createGame(game);
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    await this.router.navigate(['game', game.id]);
  }

  public blinkFaceEmoji(): void {
    this.isEmojiFaceBlinking = true;
    setTimeout(() => {
      this.isEmojiFaceBlinking = false;
    }, 300);
  }
}
