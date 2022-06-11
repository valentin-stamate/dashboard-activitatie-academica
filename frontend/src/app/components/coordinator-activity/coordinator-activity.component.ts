import {Component, OnInit} from '@angular/core';
import {CoordinatorReferentialActivity, CoordinatorScientificActivity} from "../reports/reports.util";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {RestEndpoints} from "../../models/rest.endpoints";
import {Cookies, CookieService} from "../../service/cookie.service";
import {UtilService} from "../../service/util.service";
import {FileModel} from "../../models/models";

@Component({
  selector: 'app-coordinator-activity',
  templateUrl: './coordinator-activity.component.html',
  styleUrls: ['./coordinator-activity.component.scss']
})
export class CoordinatorActivityComponent implements OnInit {

  existingScientificActivity = false;
  coordinatorScientificActivity = new CoordinatorScientificActivity();

  existingReferentialActivity = false;
  coordinatorReferentialActivity = new CoordinatorReferentialActivity();

  config: AxiosRequestConfig;
  filename: string = '';
  files: FileModel[] = [];

  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    this.config = {
      headers: {
        'Authorization': token,
      }
    };
  }

  ngOnInit(): void {
    this.onRefreshForms();
    this.onRefreshFiles();
  }

  onDeleteFile(file: FileModel) {
    axios.delete(`${RestEndpoints.COORDINATOR_FILE}/${file.id}`, this.config)
      .then(res => {

      }).catch(err => {

    }).finally(() => {
      this.onRefreshFiles();
    })
  }

  onUploadFile(event: Event, form: HTMLFormElement) {
    event.preventDefault();

    const formData = new FormData(form);

    axios.post(`${RestEndpoints.COORDINATOR_FILE}`, formData, this.config)
      .then(res => {

      }).catch(err => {

      }).finally(() => {
        this.onRefreshFiles();
      })

  }

  onRefreshFiles() {
    axios.get(`${RestEndpoints.COORDINATOR_FILE}`, this.config)
      .then(res => {
        this.files = res.data;
      }).catch(err => {

    }).finally(() => {

    })
  }

  onDownloadFile(file: FileModel) {
    axios.get(`${RestEndpoints.COORDINATOR_DOWNLOAD_FILE}/${file.id}`, {...this.config, responseType: 'blob'})
      .then(res => {
        UtilService.downloadBuffer(res.data, file.name);
      }).catch(err => {
        console.log(err);
      }).finally(() => {

      })
  }

  onFileInputChange(input: HTMLInputElement) {
    const filename = UtilService.getFilenameFromInput(input);

    if (filename) {
      this.filename = filename;
    }
  }

  onGetCoordinatorScientificActivity() {
    axios.get(RestEndpoints.COORDINATOR_SCIENTIFIC_ACTIVITY, this.config)
      .then(res => {
        const forms = res.data as CoordinatorScientificActivity[];

        if (forms.length !== 0) {
          this.existingScientificActivity = true;
          this.coordinatorScientificActivity = forms[0];
        } else {
          this.existingScientificActivity = false;
          this.coordinatorScientificActivity = new CoordinatorScientificActivity();
        }
      }).catch(err => {

    }).finally(() => {

    });

  }

  onUpdateCoordinatorScientificActivity(event: Event, form: HTMLFormElement) {
    event.preventDefault();

    const formData = new FormData(form);

    axios.patch(RestEndpoints.COORDINATOR_SCIENTIFIC_ACTIVITY, formData, this.config)
      .then(res => {

      }).catch((err: AxiosError) => {

      }).finally(() => {
        this.onGetCoordinatorScientificActivity();
      });
  }

  onDeleteCoordinatorScientificActivity() {
    axios.delete(RestEndpoints.COORDINATOR_SCIENTIFIC_ACTIVITY, this.config)
      .then(res => {

      }).catch(err => {

      }).finally(() => {
        this.onRefreshForms();
      });
  }

  onGetCoordinatorReferentialActivity() {
    axios.get(RestEndpoints.COORDINATOR_REFERENTIAL_ACTIVITY, this.config)
      .then(res => {
        const forms = res.data as CoordinatorReferentialActivity[];

        if (forms.length !== 0) {
          this.existingReferentialActivity = true;
          this.coordinatorReferentialActivity = forms[0];
        } else {
          this.existingReferentialActivity = false;
          this.coordinatorReferentialActivity = new CoordinatorReferentialActivity();
        }
      }).catch(err => {

    }).finally(() => {

    });
  }

  onUpdateCoordinatorReferentialActivity(event: Event, form: HTMLFormElement) {
    event.preventDefault();

    const formData = new FormData(form);

    axios.patch(RestEndpoints.COORDINATOR_REFERENTIAL_ACTIVITY, formData, this.config)
      .then(res => {

      }).catch(err => {

    }).finally(() => {
      this.onGetCoordinatorReferentialActivity();
    });
  }

  onDeleteCoordinatorReferentialActivity() {
    axios.delete(RestEndpoints.COORDINATOR_REFERENTIAL_ACTIVITY, this.config)
      .then(res => {

      }).catch(err => {

    }).finally(() => {
      this.onGetCoordinatorReferentialActivity();
    });
  }

  onRefreshForms() {
    this.onGetCoordinatorScientificActivity();
    this.onGetCoordinatorReferentialActivity();
  }

}
