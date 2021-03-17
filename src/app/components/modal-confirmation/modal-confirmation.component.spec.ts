import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationComponent } from './modal-confirmation.component';
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {GameSetupModalComponent} from "../game-setup-modal/game-setup-modal.component";
import {SettingsModalComponent} from "../settings-modal/settings-modal.component";

describe('ModalConfirmationComponent', () => {
  let component: ModalConfirmationComponent;
  let fixture: ComponentFixture<ModalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmationComponent ],
      imports: [
        NgbModule
      ],
      providers: [
        NgbActiveModal
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
