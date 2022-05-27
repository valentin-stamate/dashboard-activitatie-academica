import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../../../service/cookie.service";
import {RestEndpoints} from "../../../../models/rest.endpoints";
import {WithoutActivity} from "../../reports.util";
import {UIMessages, UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-without-activity',
  templateUrl: './without-activity.component.html',
  styleUrls: ['./without-activity.component.scss']
})
export class WithoutActivityComponent implements OnInit {

  @Input()
  form: WithoutActivity = new WithoutActivity();

  editMode = false;

  loading = false;
  responseMessage = '';

  @Input() readonly = false;
  @Input() updateEmitter!: EventEmitter<WithoutActivity>;
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

  onUpdateEvent(item: WithoutActivity) {
    this.editMode = true;
    this.form = item;
  }

  onCancel() {
    this.form = new WithoutActivity();
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
      axios.patch(`${RestEndpoints.WITHOUT_ACTIVITY}/${this.form.id}`, this.form, this.config)
        .then(res => {
          this.form = new WithoutActivity();
          this.responseMessage = UIMessages.FORM_UPDATED;
        }).catch(err => {
        this.responseMessage = err.reponse.data;
      }).finally(() => {
        this.loading = false;

        this.refreshEmitter.emit();
      });
      return;
    }

    axios.post(RestEndpoints.WITHOUT_ACTIVITY, this.form, this.config)
      .then(res => {
        this.form = new WithoutActivity();
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
