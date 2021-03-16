import { Component, OnInit } from '@angular/core';
import { IconsInterface } from "../../interfaces/icons.interface";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  public icons: IconsInterface;
  constructor() {
    this.icons = {
      faHeart,
    }
  }

  ngOnInit(): void {
  }

}
