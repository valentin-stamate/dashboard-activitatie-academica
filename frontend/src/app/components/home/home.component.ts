import { Component, OnInit } from '@angular/core';
import {Cookies, CookieService} from "../../service/cookie.service";
import {JwtService} from "../../service/jwt.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userType: number = 0;

  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    const decodedJwt = JwtService.decodeJWT(token);

    if (decodedJwt == null) {
      CookieService.deleteAllCookies();
      location.href = '/login';
      return;
    }

    this.userType = decodedJwt.userType;
  }

  ngOnInit(): void { }

  openChat() {
    // @ts-ignore
    tidioChatApi.open();
  }

}
