import { Component, OnInit } from '@angular/core';
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsers implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activeLink(route: string) {
    return UtilService.activeLink(route);
  }

}
