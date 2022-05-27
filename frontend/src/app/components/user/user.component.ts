import { Component, OnInit } from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../service/cookie.service";
import {RestEndpoints} from "../../models/rest.endpoints";
import {Student} from "../../models/models";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loading = false;
  responseMessage = '';
  token: string;

  student: Student = {} as any;
  config: AxiosRequestConfig;

  constructor() {
    this.token = CookieService.readCookie(Cookies.AUTH);
    this.config = {
      headers: {
        'Authorization': this.token
      }
    }
  }

  ngOnInit(): void {
    this.onGetInformation();
  }

  onGetInformation() {
    this.loading = true;
    this.responseMessage = '';
    axios.get(RestEndpoints.INFORMATION, this.config)
      .then(res => {
        this.student = res.data;
        this.student.createdAt = new Date(this.student.createdAt);
      }).catch(err => {
      this.responseMessage = err.response.data;
    }).finally(() => {
      this.loading = false;
    });
  }

}
