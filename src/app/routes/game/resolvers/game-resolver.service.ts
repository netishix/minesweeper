import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Game } from "../../../lib/game.class";
import { DatasourceService } from "../../../services/datasource.service";

@Injectable({
  providedIn: 'root'
})
export class GameResolverService implements Resolve<Game> {

  constructor(
    public router: Router,
    public datasourceService: DatasourceService
  ) {}

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Game> {
    const gameId = route.paramMap.get('gameId')!;
    const game = await this.datasourceService.getConnector().getGame(gameId);
    if (!game) {
      this.router.navigate(['notFound']);
      throw new Error(`Game with id ${gameId} does not exist.`);
    }
    return game;
  }
}
