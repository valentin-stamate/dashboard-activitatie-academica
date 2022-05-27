import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISIProceeding, ReportsUtil} from "../../reports.util";
import axios, {AxiosRequestConfig} from "axios";
import {RestEndpoints} from "../../../../models/rest.endpoints";
import {Cookies, CookieService} from "../../../../service/cookie.service";
import {UIMessages, UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-isi-proceedings',
  templateUrl: './isi-proceedings.component.html',
  styleUrls: ['./isi-proceedings.component.scss']
})
export class IsiProceedingsComponent implements OnInit {
  indexedVolumeType = ReportsUtil.IndexedVolumeTypes;
  conferenceType = ReportsUtil.NationalInternationalFem;

  @Input()
  form: ISIProceeding = new ISIProceeding();

  editMode = false;

  loading = false;
  responseMessage = '';

  @Input() readonly = false;
  @Input() updateEmitter!: EventEmitter<any>;
  @Input() deleteEmitter!: EventEmitter<void>;
  @Output() refreshEmitter = new EventEmitter();

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
    if (this.readonly) {
      return;
    }

    this.updateEmitter.subscribe((data) => {
      this.onUpdateEvent(data);
    });

    this.deleteEmitter.subscribe(() => {
      this.editMode = false;
    });
  }

  onUpdateEvent(item: ISIProceeding) {
    this.editMode = true;
    this.form = item;
  }

  onCancel() {
    this.form = new ISIProceeding();
    this.editMode = false;
  }

  getDate(input: HTMLInputElement): Date {
    return input.valueAsDate ? input.valueAsDate : new Date();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.loading = true;
    this.responseMessage = '';

    if (this.editMode) {
      axios.patch(`${RestEndpoints.ISI_PROCEEDINGS}/${this.form.id}`, this.form, this.config)
        .then(res => {
          this.form = new ISIProceeding();
          this.responseMessage = UIMessages.FORM_UPDATED;
        }).catch(err => {
        this.responseMessage = err.reponse.data;
      }).finally(() => {
        this.loading = false;

        this.refreshEmitter.emit();
      });
      return;
    }

    axios.post(RestEndpoints.ISI_PROCEEDINGS, this.form, this.config)
      .then(res => {
        this.form = new ISIProceeding();
        this.responseMessage = UIMessages.FORM_CREATED;
      }).catch(err => {
      this.responseMessage = err.reponse.data;
    }).finally(() => {
      this.loading = false;
      this.refreshEmitter.emit();
    });
    return;
  }

  checkForm(form: HTMLFormElement) {
    return UtilService.checkFormFields(form);
  }

}
