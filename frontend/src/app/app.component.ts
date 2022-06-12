import { Component } from '@angular/core';
import {Cookies, CookieService} from "./service/cookie.service";
import {JwtService} from "./service/jwt.service";
import {Student} from "./models/models";
import {UserType} from "./service/user.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SystemManagement-Frontend';

  ngOnInit() {
    this.onLoadChat();
  }

  onLoadChat() {
    // @ts-ignore
    if (window.tidioChatApi) {
      // @ts-ignore
      window.tidioChatApi.on("ready", this.onTidioChatReady);
    } else {
      document.addEventListener("tidioChat-ready", this.onTidioChatReady);
    }
  }

  // Code after chat loaded
  onTidioChatReady() {
    const token = CookieService.readCookie(Cookies.AUTH);
    const decodedJwt = JwtService.decodeJWT(token);
    const user = decodedJwt as Student;

    if (decodedJwt == null) {
      // @ts-ignore
      tidioChatApi.display(false);
      return;
    }

    const userType = decodedJwt.userType;

    if (userType !== UserType.STUDENT) {
      // @ts-ignore
      tidioChatApi.display(false);
      return;
    }

    // @ts-ignore
    document.tidioIdentify = {
      distinct_id: user.id, // Unique visitor ID in your system
      email: user.email, // visitor email
      name: user.identifier, // Visitor name
      // phone: "+44 2032897807" //Visitor phone
    };
  }

}
