import { Component, OnInit } from '@angular/core';
import {Cookies, CookieService} from "../../../service/cookie.service";
import axios, {AxiosRequestConfig} from "axios";
import {RestEndpoints} from "../../../models/rest.endpoints";
import {UtilService} from "../../../service/util.service";
import {EmailTemplates} from "../../admin-email/email.templates";

interface Interval {
  start: number;
  end: number;
}

@Component({
  selector: 'app-faz',
  templateUrl: './faz.component.html',
  styleUrls: ['./faz.component.scss']
})
export class FazComponent implements OnInit {
  notificationMessage = '';
  loading = false;
  fileStructureModal = false;

  filename: string = '';

  fazFooter = EmailTemplates.FAZ_FOOTER;

  config: AxiosRequestConfig;

  intervals: Interval[] = [{
    start: 0,
    end: 0,
  }];

  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);

    this.config = {
      headers: {
        'Authorization': token,
      }
    };
  }

  ngOnInit(): void {
  }

  addInterval() {
    this.intervals.push({
      start: 0,
      end: 0,
    });
  }

  deleteInterval() {
    if (this.intervals.length > 1) {
      this.intervals.pop();
    }
  }

  onDownload(event: Event, form: HTMLFormElement) {
    event.preventDefault();

    const formData = new FormData(form);
    formData.set('intervals', JSON.stringify(this.intervals));

    this.loading = true;
    axios.post(RestEndpoints.FAZ, formData, {...this.config, responseType: 'blob'})
      .then(res => {
        const fileName = `faz_${UtilService.stringDate(new Date())}.zip`;
        UtilService.downloadBuffer(res.data, fileName);
      }).catch(async err => {

        if (typeof err.response.data === typeof '') {
          const errBlob = err.response.data as Blob;
          this.notificationMessage = await errBlob.text();
        } else {
          this.notificationMessage = 'Fișier invalid';
        }
      }).finally(() => {
        this.loading = false;
      });
  }

  onCloseNotification() {
    this.notificationMessage = '';
  }

  onFileInputChange(input: HTMLInputElement) {
    const filename = UtilService.getFilenameFromInput(input);

    if (filename != null) {
      this.filename = filename;
    }

    console.log(this.filename);
  }

  onCloseModal() {
    this.fileStructureModal = false;
  }

  onOpenFileStructureModal() {
    this.fileStructureModal = true;
  }

}
