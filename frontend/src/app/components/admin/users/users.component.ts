import { Component, OnInit } from '@angular/core';
import {AllowedStudent, Coordinator, Student} from "../../../models/models";
import axios, {AxiosRequestConfig} from "axios";
import {RestEndpoints} from "../../../models/rest.endpoints";
import {Cookies, CookieService} from "../../../service/cookie.service";
import {UtilService} from "../../../service/util.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  notificationMessage: string = '';
  modal = false;
  coordinatorModal = false;

  baseInfoSearchString: string = '';
  usersSearchString: string = '';

  config: AxiosRequestConfig;

  allowedStudentsLoading = false;
  allowedStudentsList: AllowedStudent[] = [];
  filteredAllowedStudentsList: AllowedStudent[] = [];

  usersLoading = false;
  usersList: Student[] = [];
  filteredUserList: Student[] = [];

  filename = '';
  filenameCoordinatorFile = '';

  coordinatorsList: Coordinator[] = [];
  allowedStudentsImportLoading = false;
  coordinatorsImportLoading = false;

  constructor() {
    const token = CookieService.readCookie(Cookies.AUTH);
    this.config = {
      headers: {
        'Authorization': token,
      }
    }
  }

  ngOnInit(): void {
    this.onAllowedStudentsRefresh();
    this.onRefreshCoordinators();
    this.onStudentsRefresh();
  }

  onAllowedStudentsRefresh() {
    this.allowedStudentsLoading = true;

    axios.get(RestEndpoints.ALLOWED_STUDENT, this.config)
      .then(res => {
        this.allowedStudentsList = res.data.map((item: AllowedStudent) => {
          return {...item, loading: false};
        });
      }).catch(err => {
        this.notificationMessage = err.response.data;
      }).finally(() => {
        this.allowedStudentsLoading = false;
        this.onAllowedStudentsFilterChange(this.baseInfoSearchString);
      });
  }

  onAllowedStudentsDelete(item: AllowedStudent) {
    item.loading = true;

    axios.delete(`${RestEndpoints.ALLOWED_STUDENT}/${item.id}`, this.config)
      .then(res => {

      }).catch(err => {
        this.notificationMessage = err.response.data;
      }).finally(() => {
        item.loading = false;
        this.onAllowedStudentsRefresh();
      });
  }

  onAllowedStudentsFilterChange(filterValue: string) {
    filterValue = filterValue.toLowerCase();

    this.filteredAllowedStudentsList = this.allowedStudentsList.filter(item => {
      return item.fullName.toLowerCase().includes(filterValue) ||
        item.identifier.toLowerCase().includes(filterValue);
    });
  }

  onAllowedStudentsImport(event: Event, form: HTMLFormElement) {
    event.preventDefault();

    const formData = new FormData(form);

    this.allowedStudentsImportLoading = true;
    axios.post(RestEndpoints.ALLOWED_STUDENT, formData, this.config)
      .then(res => {
        this.notificationMessage = `Numărul de studenți adăugați cu succes: ${res.data}`;
      }).catch(err => {
        this.notificationMessage = err.response.data;
      }).finally(() => {
        this.allowedStudentsImportLoading = false;
        this.onAllowedStudentsRefresh();
      });

  }

  onRefreshCoordinators() {
    this.coordinatorsImportLoading = true;

    axios.get(RestEndpoints.COORDINATORS, this.config)
      .then(res => {
        this.coordinatorsList = res.data.map((item: Coordinator) => {
          return {...item, loading: false};
        });
      }).catch(err => {
        this.notificationMessage = err.response.data;
      }).finally(() => {
        this.coordinatorsImportLoading = false;
      });
  }

  onCoordinatorsImport(event: Event, form: HTMLFormElement) {
    event.preventDefault();

    const formData = new FormData(form);

    this.coordinatorsImportLoading = true;
    axios.post(RestEndpoints.IMPORT_COORDINATORS, formData, this.config)
      .then(res => {
        this.notificationMessage = `Numărul de coordonatori adăugați cu succes: ${res.data}`;
      }).catch(err => {
        this.notificationMessage = err.response.data;
      }).finally(() => {
        this.coordinatorsImportLoading = false;
        this.onRefreshCoordinators();
      });
  }

  onStudentsRefresh() {
    this.usersLoading = true;
    axios.get(RestEndpoints.STUDENT, this.config)
      .then(res => {
        this.usersList = res.data;
      }).catch(err => {
        this.notificationMessage = err.response.data;
      }).finally(() => {
        this.usersLoading = false;
        this.onUserSearchChange(this.usersSearchString);
      });
  }

  onUserDelete(item: Student) {
    item.loading = true;

    axios.delete(`${RestEndpoints.STUDENT}/${item.id}`, this.config)
      .then(res => {
        this.onStudentsRefresh();
      }).catch(err => {
        this.notificationMessage = err.response.data;
      }).finally(() => {
        item.loading = false;
      });

  }

  onUserSearchChange(searchString: string) {
    searchString = searchString.toLowerCase();

    this.filteredUserList = this.usersList.filter((item) => {
      return item.email.toLowerCase().includes(searchString) ||
        item.identifier.toLowerCase().includes(searchString) ||
        item.alternativeEmail.toLowerCase().includes(searchString)
    });
  }

  toDateStr(date: string | Date) {
    return new Date(date).toLocaleString('ro-RO');
  }

  onCloseNotification() {
    this.notificationMessage = '';
  }

  onCloseModal() {
    this.modal = false;
    this.coordinatorModal = false;
  }

  onOpenFileStructureModal() {
    this.modal = true;
  }

  onOpenCoordinatorModal() {
    this.coordinatorModal = true;
  }

  onFileInputChange(input: HTMLInputElement) {
    const filename = UtilService.getFilenameFromInput(input);

    if (filename) {
      this.filename = filename;
    }
  }

  onFileInputChangeFormCoordinator(input: HTMLInputElement) {
    const filename = UtilService.getFilenameFromInput(input);

    if (filename) {
      this.filenameCoordinatorFile = filename;
    }
  }

}
