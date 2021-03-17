import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import {ActivatedRoute} from "@angular/router";
import {GameMock} from "../../../../test/unit/mocks/game.mock";
import {RouterTestingModule} from "@angular/router/testing";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TimeSpentPipe} from "../../pipes/time-spent.pipe";
import {BoardComponent} from "../../components/board/board.component";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent, BoardComponent, TimeSpentPipe ],
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                game: GameMock,
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
