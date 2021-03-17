import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { GameMock } from "../../../../test/unit/mocks/game.mock";
import { TimeSpentPipe } from "../../pipes/time-spent.pipe";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsComponent, TimeSpentPipe ],
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
                finishedGames: [GameMock],
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
