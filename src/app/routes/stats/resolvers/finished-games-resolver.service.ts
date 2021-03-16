import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { DatasourceService } from "../../../services/datasource.service";
import { Game } from "../../../lib/game.class";

@Injectable({
  providedIn: 'root'
})
export class FinishedGamesResolverService implements Resolve<Game[]>{

  constructor(
    public router: Router,
    public datasourceService: DatasourceService
  ) {}

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Game[]> {
    const games = await this.datasourceService.getConnector().getGames();
    return games.filter((game: Game) => game.stats.finished);
  }
}
