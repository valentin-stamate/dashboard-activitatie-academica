import { Component, OnInit } from '@angular/core';
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activeLink(route: string) {
    return UtilService.activeLink(route);
  }

}
