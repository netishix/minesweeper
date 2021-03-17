import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSetupModalComponent } from './game-setup-modal.component';
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('GameSetupModalComponent', () => {
  let component: GameSetupModalComponent;
  let fixture: ComponentFixture<GameSetupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSetupModalComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        NgbModule,
      ],
      providers: [
        NgbActiveModal
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSetupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
