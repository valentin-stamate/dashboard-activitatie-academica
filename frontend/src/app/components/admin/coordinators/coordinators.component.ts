import { Component, OnInit } from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {AllowedStudent, Coordinator, FileModel, Student} from "../../../models/models";
import {Cookies, CookieService} from "../../../service/cookie.service";
import {RestEndpoints} from "../../../models/rest.endpoints";
import {UtilService} from "../../../service/util.service";

@Component({
  selector: 'app-coordinators',
  templateUrl: './coordinators.component.html',
  styleUrls: ['./coordinators.component.scss']
})
export class CoordinatorsComponent implements OnInit {
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

  currentSelected: Coordinator = {} as any;
  files: FileModel[] = [];

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

  onSelectCoordinator(coordinator: Coordinator) {
    this.currentSelected = coordinator;

    axios.get(`${RestEndpoints.COORDINATOR_FILES}/${coordinator.id}`, this.config)
      .then(res => {
        this.files = res.data;
      }).catch(err => {

      }).finally(() => {

      })

  }

  onDownloadFile(coordinator: Coordinator, file: FileModel) {
    axios.get(`${RestEndpoints.DOWNLOAD_COORDINATOR_FILE}/${coordinator.id}/${file.id}`, {...this.config, responseType: 'blob'})
      .then(res => {
        UtilService.downloadBuffer(res.data, file.name);
      }).catch(err => {

    }).finally(() => {

    })
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

  onAllowedStudentsFilterChange(filterValue: string) {
    filterValue = filterValue.toLowerCase();

    this.filteredAllowedStudentsList = this.allowedStudentsList.filter(item => {
      return item.fullName.toLowerCase().includes(filterValue) ||
        item.identifier.toLowerCase().includes(filterValue);
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
