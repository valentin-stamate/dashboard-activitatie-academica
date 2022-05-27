import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {RestEndpoints} from "../../../models/rest.endpoints";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading = false;
  responseMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSignup(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    const formData = new FormData(form);

    this.loading = true;
    this.responseMessage = '';
    axios.post(RestEndpoints.SIGNUP_STUDENT, formData)
      .then(res => {
        window.location.href = '/login';
      }).catch(err => {
        this.responseMessage = err.response.data;
      }).finally(() => {
        this.loading = false;
    });
  }

}
