import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {RestEndpoints} from "../../../models/rest.endpoints";
import {Cookies, CookieService} from "../../../service/cookie.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  responseMessage = '';

  authType = 1;
  authWithCode = false;

  constructor() { }

  ngOnInit(): void {
  }

  onLoginStudent(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    const formData = new FormData(form);

    this.loading = true;
    this.responseMessage = '';

    if (!this.authWithCode) {
      axios.post(RestEndpoints.LOGIN_STUDENT, formData)
        .then(res => {
          this.authWithCode = true;
        }).catch(err => {
        this.responseMessage = err.response.data;
      }).finally(() => {
        this.loading = false;
      });

      return
    }

    axios.post(RestEndpoints.LOGIN_STUDENT_CODE, formData)
      .then(res => {
        CookieService.setCookie(Cookies.AUTH, res.data);
        location.href = '/';
      }).catch(err => {
      this.responseMessage = err.response.data;
    }).finally(() => {
      this.loading = false;
    });
  }

  onLoginCoordinator(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    const formData = new FormData(form);

    this.loading = true;
    this.responseMessage = '';
    axios.post(RestEndpoints.LOGIN_COORDINATOR, formData)
      .then(res => {
        CookieService.setCookie(Cookies.AUTH, res.data);
        location.href = '/';
      }).catch(err => {
      this.responseMessage = err.response.data;
    }).finally(() => {
      this.loading = false;
    });
  }

  onLoginAdmin(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    const formData = new FormData(form);

    this.loading = true;
    this.responseMessage = '';

    if (!this.authWithCode) {
      axios.post(RestEndpoints.LOGIN_ADMIN, formData)
        .then(res => {
          this.authWithCode = true;
        }).catch(err => {
        this.responseMessage = err.response.data;
      }).finally(() => {
        this.loading = false;
      });

      return;
    }

    axios.post(RestEndpoints.LOGIN_ADMIN_CODE, formData)
      .then(res => {
        CookieService.setCookie(Cookies.AUTH, res.data);
        location.href = '/';
      }).catch(err => {
      this.responseMessage = err.response.data;
    }).finally(() => {
      this.loading = false;
    });
  }

  changeAuthType(type: number) {
    this.authWithCode = false;
    this.authType = type;
  }

}
