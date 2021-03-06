import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IconsInterface } from "../../interfaces/icons.interface";
import { Game } from "../../lib/game.class";
import { DatasourceService } from "../../services/datasource.service";
import { faCheckCircle, faEye, faTimesCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalConfirmationComponent } from "../../components/modal-confirmation/modal-confirmation.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GameSetupModalComponent } from "../../components/game-setup-modal/game-setup-modal.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {

  public icons: IconsInterface;
  public finishedGames!: Game[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public datasourceService: DatasourceService,
    public modalService: NgbModal,
    public title: Title,
  ) {
    this.icons = {
      faEye,
      faTrash,
      faCheckCircle,
      faTimesCircle
    };
  }

  ngOnInit(): void {
    this.finishedGames = this.activatedRoute.snapshot.data.finishedGames;
    this.finishedGames = this.sortGamesByBestResult();
    this.title.setTitle('Minesweeper - Statistics');
  }

  public sortGamesByBestResult(): Game[] {
    const levelMapping = {
      hard: 1,
      medium: 2,
      easy: 3,
      custom: 4,
    };
    return this.finishedGames.sort((a,b) => {
      const wonResult = ((a.stats.won === b.stats.won) ? 0 : (a.stats.won ? -1 : 1));
      const levelResult = levelMapping[a.settings.level] - levelMapping[b.settings.level];
      const timeSpentResult = a.stats.timeSpent - b.stats.timeSpent;
      return wonResult || levelResult || timeSpentResult;
    });
  }

  public inspectGame(gameId: string): void {
     this.router.navigate(['game', gameId]);
  }

  public async removeGame(gameId: string): Promise<void> {
    const modalRef = this.modalService.open(ModalConfirmationComponent);
    modalRef.componentInstance.title = 'Remove game';
    modalRef.componentInstance.description = 'Are you sure you want to remove this game?';
    modalRef.componentInstance.cancelBtnLabel = 'Cancel';
    modalRef.componentInstance.confirmBtnLabel = 'Remove';
    await modalRef.result;
    const connector = this.datasourceService.getConnector();
    await connector.removeGame(gameId);
    const targetGame = this.finishedGames.find((g) => g.id === gameId)!;
    const idx = this.finishedGames.indexOf(targetGame);
    this.finishedGames.splice(idx, 1);
    await this.datasourceService.getConnector().removeGame(gameId);
  }

  public newGame(): void {
    this.modalService.open(GameSetupModalComponent);
  }

}
