import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from "../../lib/board.class";
import { IconsInterface } from "../../interfaces/icons.interface";
import { faBomb, faFlag, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Cell } from "../../lib/cell.class";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  public icons: IconsInterface
  @Input() board!: Board;
  @Output() onOpenCell: EventEmitter<any>;
  @Output() onFinish: EventEmitter<boolean>

  constructor() {
    this.icons = {
      faQuestion,
      faFlag,
      faBomb
    };
    this.onOpenCell = new EventEmitter<boolean>();
    this.onFinish = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.subscribeToBoardResult();
  }

  public onCellClick(event: Event, cell: Cell) {
    event.preventDefault();
    let moveType: 'open' | 'guess';
    if (event.type === 'click') {
      moveType = 'open';
      this.board.onMove(moveType, cell);
      this.onOpenCell.emit();
    } else if (event.type === 'contextmenu') {
      moveType = 'guess';
      this.board.onMove(moveType, cell);
    }
  }

  public subscribeToBoardResult() {
    this.board.onFinish
      .subscribe((won) => {
        this.onFinish.emit(won);
        this.board.revealBoard();
      })
  }

}
