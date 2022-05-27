import { Component, OnInit } from '@angular/core';
import {Cookies, CookieService} from "../../../service/cookie.service";
import axios, {AxiosRequestConfig} from "axios";
import {RestEndpoints} from "../../../models/rest.endpoints";
import {UtilService} from "../../../service/util.service";
import {EmailTemplates} from "../email.templates";

@Component({
  selector: 'app-faz',
  templateUrl: './faz.component.html',
  styleUrls: ['./faz.component.scss']
})
export class FazComponent implements OnInit {
  notificationMessage = '';
  loading = false;
  fileStructureModal = false;

  filename = '';

  fazFooter = EmailTemplates.FAZ_FOOTER;

  config: AxiosRequestConfig;

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

  onDownload(event: Event, form: HTMLFormElement) {
    event.preventDefault();

    const formData = new FormData(form);

    this.loading = true;
    axios.post(RestEndpoints.FAZ, formData, {...this.config, responseType: 'blob'})
      .then(res => {
        const fileName = `faz_${UtilService.stringDate(new Date())}.zip`;
        UtilService.downloadBuffer(res.data, fileName);
      }).catch(async err => {
        const errBlob = err.response.data as Blob;
        this.notificationMessage = await errBlob.text();
      }).finally(() => {
        this.loading = false;
      });
  }

  onCloseNotification() {
    this.notificationMessage = '';
  }

  onFileInputChange(input: HTMLInputElement) {
    const filename = UtilService.getFilenameFromInput(input);

    if (filename) {
      this.filename = filename;
    }
  }

  onCloseModal() {
    this.fileStructureModal = false;
  }

  onOpenFileStructureModal() {
    this.fileStructureModal = true;
  }

}
