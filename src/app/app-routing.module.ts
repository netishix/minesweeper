import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './routes/menu/menu.component';
import { GameComponent } from "./routes/game/game.component";
import { StatsComponent } from './routes/stats/stats.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { GameResolverService } from "./routes/game/resolvers/game-resolver.service";
import { ActiveGamesResolverService } from "./routes/menu/resolvers/active-games-resolver.service";
import { FinishedGamesResolverService } from "./routes/stats/resolvers/finished-games-resolver.service";
import { FaqComponent } from "./routes/faq/faq.component";

const routes: Routes = [
  {path: '', component: MenuComponent, resolve: { activeGames: ActiveGamesResolverService }},
  {path: 'game/:gameId', component: GameComponent, resolve: { game: GameResolverService }},
  {path: 'stats', component: StatsComponent, resolve: { finishedGames: FinishedGamesResolverService }},
  {path: 'faq', component: FaqComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
