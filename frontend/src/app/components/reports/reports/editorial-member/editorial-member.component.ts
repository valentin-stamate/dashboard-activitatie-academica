import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditorialMember, ReportsUtil} from "../../reports.util";
import axios, {AxiosRequestConfig} from "axios";
import {Cookies, CookieService} from "../../../../service/cookie.service";
import {RestEndpoints} from "../../../../models/rest.endpoints";
import {UIMessages, UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-editorial-member',
  templateUrl: './editorial-member.component.html',
  styleUrls: ['./editorial-member.component.scss']
})
export class EditorialMemberComponent implements OnInit {
  quality = ReportsUtil.Quality;
  nationalInternational = ReportsUtil.NationalInternationalMasc;

  @Input()
  form: EditorialMember = new EditorialMember();

  editMode = false;

  loading = false;
  responseMessage = '';

  @Input() readonly = false;
  @Input() updateEmitter!: EventEmitter<EditorialMember>;
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

  onUpdateEvent(item: EditorialMember) {
    this.editMode = true;
    this.form = item;
  }

  onCancel() {
    this.form = new EditorialMember();
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
      axios.patch(`${RestEndpoints.EDITORIAL_MEMBER}/${this.form.id}`, this.form, this.config)
        .then(res => {
          this.form = new EditorialMember();
          this.responseMessage = UIMessages.FORM_UPDATED;
        }).catch(err => {
        this.responseMessage = err.reponse.data;
      }).finally(() => {
        this.loading = false;

        this.refreshEmitter.emit();
      });
      return;
    }

    axios.post(RestEndpoints.EDITORIAL_MEMBER, this.form, this.config)
      .then(res => {
        this.form = new EditorialMember();
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
