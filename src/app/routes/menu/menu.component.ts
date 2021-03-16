import { Component, OnInit } from '@angular/core';
import {faBomb, faCog, faPlay, faQuestion, faTachometerAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IconsInterface } from "../../interfaces/icons.interface";
import { GameSetupModalComponent } from "../../components/game-setup-modal/game-setup-modal.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Game } from "../../lib/game.class";
import { DatasourceService } from "../../services/datasource.service";
import {ModalConfirmationComponent} from "../../components/modal-confirmation/modal-confirmation.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  public icons: IconsInterface
  public activeGames: Game[];

  constructor(
    public modalService: NgbModal,
    public activatedRoute: ActivatedRoute,
    public datasourceService: DatasourceService,
    public router: Router,
  ) {
    this.icons = {
      faBomb,
      faCog,
      faQuestion,
      faTachometerAlt,
      faGithub,
      faPlay,
      faTrash
    }
    this.activeGames = [];
  }

  ngOnInit(): void {
    this.activeGames = this.activatedRoute.snapshot.data.activeGames;
  }

  public newGame(): void {
    this.modalService.open(GameSetupModalComponent);
  }

  public resumeGame(gameId: string): void {
    this.router.navigate(['game', gameId]);
  }

  public async removeGame(gameId: string): Promise<void> {
    const modalRef = this.modalService.open(ModalConfirmationComponent);
    modalRef.componentInstance.title = 'Discard game';
    modalRef.componentInstance.description = 'Are you sure you want to discard this game?';
    modalRef.componentInstance.cancelBtnLabel = 'Cancel';
    modalRef.componentInstance.confirmBtnLabel = 'Discard';
    await modalRef.result;
    const connector = this.datasourceService.getConnector();
    await connector.removeGame(gameId);
    const targetGame = this.activeGames.find((g) => g.id === gameId)!;
    const idx = this.activeGames.indexOf(targetGame);
    this.activeGames.splice(idx, 1);
  }

}
