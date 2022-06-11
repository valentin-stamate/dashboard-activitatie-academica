import {environment} from "../../environments/environment";

const host = environment.serverHost;

/* Took from the backend */
export class RestEndpoints {
  /** Visitor */
  static LOGIN_STUDENT = `${host}/api/login-student`;
  static LOGIN_STUDENT_CODE = `${host}/api/login-student-code`;
  static LOGIN_COORDINATOR = `${host}/api/login-coordinator`;
  static LOGIN_ADMIN = `${host}/api/login-admin`;
  static LOGIN_ADMIN_CODE = `${host}/api/login-admin-code`;
  static SIGNUP_STUDENT = `${host}/api/signup-student`;

  /** User */
  static FORMS = `${host}/api/forms`;
  static CHECK = `${host}/api/check`;
  static INFORMATION = `${host}/api/information`;
  static SCIENTIFIC_ARTICLE_ISI = `${host}/api/sc-article-isi`;
  static ISI_PROCEEDINGS = `${host}/api/isi-proceedings`;
  static SCIENTIFIC_ARTICLE_BDI = `${host}/api/sc-article-bdi`;
  static SCIENTIFIC_BOOK = `${host}/api/sc-book`;
  static TRANSLATION = `${host}/api/translation`;
  static SCIENTIFIC_COMMUNICATION = `${host}/api/sc-communication`;
  static PATENT = `${host}/api/patent`;
  static RESEARCH_CONTRACT = `${host}/api/research-contract`;
  static CITATION = `${host}/api/citation`;
  static AWARD_AND_NOMINATION = `${host}/api/award-nomination`;
  static ACADEMY_MEMBER = `${host}/api/academy-member`;
  static EDITORIAL_MEMBER = `${host}/api/editorial-member`;
  static ORGANIZED_EVENT = `${host}/api/organized-event`;
  static WITHOUT_ACTIVITY = `${host}/api/without-activity`;
  static DIDACTIC_ACTIVITY = `${host}/api/didactic-activity`;

  /** Admin */
  static STUDENT = `${host}/api/student`;
  static ALLOWED_STUDENT = `${host}/api/allowed-student`;
  static SEMESTER_ACTIVITY = `${host}/api/semester-activity`;
  static VERBAL_PROCESS = `${host}/api/verbal-process`;
  static REPORT_NOTIFICATION = `${host}/api/thesis-notification`;
  static EXPORT_FORMS = `${host}/api/export-forms`;
  static FAZ = `${host}/api/faz`;

  static COORDINATORS = `${host}/api/coordinators`;
  static IMPORT_COORDINATORS = `${host}/api/import-coordinators`;
  static COORDINATOR_FILES = `${host}/api/admin/coordinator-files`;
  static DOWNLOAD_COORDINATOR_FILE = `${host}/api/admin/download-coordinator-file`;

  /** Coordinator */
  static COORDINATOR_STUDENTS = `${host}/api/coordinator/students`;
  static COORDINATOR_STUDENT_FORMS = `${host}/api/coordinator/student-forms`;
  static COORDINATOR_SCIENTIFIC_ACTIVITY = `${host}/api/coordinator/scientific-activity`;
  static COORDINATOR_REFERENTIAL_ACTIVITY = `${host}/api/coordinator/referential-activity`;

  static COORDINATOR_FILE = `${host}/api/coordinator/file`;
  static COORDINATOR_DOWNLOAD_FILE = `${host}/api/coordinator/download-file`;
}
