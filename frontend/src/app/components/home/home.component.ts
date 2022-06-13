import { Component, OnInit } from '@angular/core';
import {Cookies, CookieService} from "../../service/cookie.service";
import {JwtService} from "../../service/jwt.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userType: number;

  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    const decodedJwt = JwtService.decodeJWT(token);

    this.userType = decodedJwt.userType;
  }

  ngOnInit(): void { }

  openChat() {
    // @ts-ignore
    tidioChatApi.open();
  }

}
