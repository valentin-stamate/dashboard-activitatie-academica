import {Component, Input, OnInit} from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../service/cookie.service";
import {Student} from "../../models/models";
import {JwtService} from "../../service/jwt.service";
import {Location} from '@angular/common';
import {RestEndpoints} from "../../models/rest.endpoints";
import {UserType} from "../../service/user.type";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: Student;
  userTypes = UserType;

  @Input() navigation!: boolean

  config: AxiosRequestConfig;
  userType: number;

  constructor(private location: Location) {
    const token = CookieService.readCookie(Cookies.AUTH);
    const decodedJwt = JwtService.decodeJWT(token);

    if (!decodedJwt) {
      this.user = {} as Student;
      this.config = {} as AxiosRequestConfig;
      this.userType = 0;
      return;
    }

    this.user = decodedJwt as Student;
    this.userType = decodedJwt.userType;

    this.config = {
      headers: {
        'Authorization': token
      }
    };
  }

  ngOnInit(): void {
    if (!this.navigation) {
      return;
    }

    axios.get(RestEndpoints.CHECK, this.config)
      .then(res => {})
      .catch((err) => {
        CookieService.deleteAllCookies();
        window.location.href = '/login';
      });
  }

  onLogout(event: Event) {
    event.preventDefault();
    CookieService.deleteAllCookies();
    window.location.href = '/login';
  }

  handleAdminUsersActiveLink(){
    let relativePath: string = this.location.path();

    const paths: string[] = [
      '/admin-users', '/admin-users/students', '/admin-users/coordinators',
    ];
    return paths.includes(relativePath);
  }

  handleAdminEmailActiveLink(){
    let relativePath: string = this.location.path();

    const paths: string[] = [
      '/admin-email', '/admin-email/semester-activity', '/admin-email/verbal-process', '/admin-email/thesis-notification',
    ];
    return paths.includes(relativePath);
  }

  handleAdminFilesActiveLink(){
    let relativePath: string = this.location.path();

    const paths: string[] = [
      '/admin-files', '/admin-files/export', '/admin-files/faz',
    ];
    return paths.includes(relativePath);
  }

  handleHomeActiveLink(){
    let relativePath: string = this.location.path();

    const paths: string[] = ['/', '', '/home'];
    return paths.includes(relativePath);
  }

}
