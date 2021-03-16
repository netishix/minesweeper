import { Component, OnInit } from '@angular/core';
import { IconsInterface } from "../../interfaces/icons.interface";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public icons: IconsInterface;

  constructor() {
    this.icons = {
      faBomb
    }
  }

  ngOnInit(): void {
  }

}
