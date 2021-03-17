import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { faFlag, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { IconsInterface } from "../../interfaces/icons.interface";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {

  public icons: IconsInterface;
  constructor(
    public title: Title,
  ) {
    this.icons = {
      faFlag,
      faQuestion
    }
  }

  ngOnInit(): void {
    this.title.setTitle('Minesweeper - FAQ');
  }

}
