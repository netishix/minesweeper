import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Game } from "../../../lib/game.class";
import { DatasourceService } from "../../../services/datasource.service";

@Injectable({
  providedIn: 'root'
})
export class ActiveGamesResolverService implements Resolve<Game[]> {

  constructor(
    public router: Router,
    public datasourceService: DatasourceService
  ) {}

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Game[]> {
    const games = await this.datasourceService.getConnector().getGames();
    return games.filter((game: Game) => !game.stats.finished);
  }
}
