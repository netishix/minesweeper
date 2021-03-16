import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  template: `
          <div class="modal-header">
            <h4 class="modal-title text-secondary">{{title}}</h4>
            <button type="button" class="close" aria-label="Close" (click)="_NgbActiveModal.dismiss()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{description}}
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-outline-secondary" (click)="_NgbActiveModal.dismiss()">{{cancelBtnLabel}}</button>
            <button type="button" class="btn btn-primary" (click)="_NgbActiveModal.close()">{{confirmBtnLabel}}</button>
          </div>
    `,
  styleUrls: ['./modal-confirmation.component.sass']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() public title: string | null;
  @Input() public description: string | null;
  @Input() public cancelBtnLabel: string | null;
  @Input() public confirmBtnLabel: string | null;

  public constructor(
    public _NgbActiveModal: NgbActiveModal
  ) {
    this.title = null;
    this.description = null;
    this.cancelBtnLabel = null;
    this.confirmBtnLabel = null;
  }

  public ngOnInit(): void {
    this.confirmBtnLabel = this.confirmBtnLabel || 'Ok';
    this.cancelBtnLabel = this.cancelBtnLabel || 'Cancel';
  }

}
