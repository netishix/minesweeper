import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { FormInterface } from "../../interfaces/form.interface";
import { DEFAULT_LEVEL, LEVELS } from "../../constants";
import { Game } from "../../lib/game.class";
import { DatasourceService } from "../../services/datasource.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-game-setup-modal',
  templateUrl: './game-setup-modal.component.html',
  styleUrls: ['./game-setup-modal.component.sass']
})
export class GameSetupModalComponent implements OnInit {

  public form: FormInterface;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public datasourceService: DatasourceService,
    public router: Router
  ) {
    const levelSelectOptions = Object.keys(LEVELS).map((levelName) => {
      return {name: LEVELS[levelName as keyof typeof LEVELS].label, value: levelName};
    });
    this.form = {
      errors: {},
      selectOptions: {
        level: levelSelectOptions
      },
      fg: this.formBuilder.group({
        level: [null, Validators.required],
        xCells: [null, Validators.required],
        yCells: [null, Validators.required],
        totalBombs: [null, Validators.required],
      }),
      isLoading: false,
      isSubmitted: false,
    }
  }

  ngOnInit(): void {
    this.onLevelChange();
    this.initializeFormValues();
  }

  public initializeFormValues(): void {
    this.form.fg.get('level')?.setValue(DEFAULT_LEVEL);
  }

  public onLevelChange(): void {
    const levelControl = this.form.fg.get('level');
      levelControl?.valueChanges.subscribe((newValue) => {
        const targetLevelSettings = LEVELS[newValue as keyof typeof LEVELS];
        this.form.fg.patchValue({
          xCells: targetLevelSettings.xCells,
          yCells: targetLevelSettings.yCells,
          totalBombs: targetLevelSettings.totalBombs
        });
      });
  }

  public isCustomLevel(): boolean {
    return this.form.fg.get('level')?.value === 'custom';
  }

  public async createNewGame(): Promise<Game> {
    const formValues = this.form.fg.value;
    const settings = {
      level: formValues.level,
      totalBombs: formValues.totalBombs,
      xCells: formValues.xCells,
      yCells: formValues.yCells
    };
    const game: Game = new Game();
    game.init(settings);
    await this.datasourceService.getConnector()?.createGame(game);
    return game;
  }

  public async submitForm(): Promise<void> {
    const createdGame = await this.createNewGame();
    this.activeModal.close('Game was created successfully.');
    await this.router.navigate(['game', createdGame.id]);
  }

}
