import { Component, OnInit } from '@angular/core';
import {ReportsUtil} from "../../reports/reports.util";
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../../service/cookie.service";
import {RestEndpoints} from "../../../models/rest.endpoints";
import {UtilService} from "../../../service/util.service";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  loading = false;
  notificationMessage = '';

  reports = ReportsUtil.studentReports;
  coordinatorReports = ReportsUtil.coordinatorReports;

  config: AxiosRequestConfig;
  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    this.config = {
      responseType: 'blob',
      headers: {
        'Authorization': token,
      }
    };
  }

  ngOnInit(): void {
  }

  onDownload() {

    this.loading = true;
    axios.get(RestEndpoints.EXPORT_FORMS, this.config)
      .then(res => {
        const fileName = `data_${UtilService.stringDate(new Date())}.zip`;
        UtilService.downloadBuffer(res.data, fileName);
      }).catch(err => {
        this.notificationMessage = err.response.data;
      }).finally(() => {
        this.loading = false;
      });
  }

  onCloseNotification() {
    this.notificationMessage = '';
  }

}
