export class EmailTemplates {
  static FROM = 'Adriana Bejinariu <adriana.bejinariu@info.uaic.ro>';
  static SIGNATURE = '--' +
    '<small style="color: #888888"><i>\n' +
    'Bejinariu Adriana - Secretar Școala Doctorală de Informatică\n' +
    'Universitatea „Alexandru Ioan Cuza" din Iași\n' +
    'Telefon: 0232 201102 int. 2329\n' +
    '</i></small>';

  static SEMESTER_ACTIVITY_SUBJECT = 'Școala Doctorală de Informatica - orar sem. 1 an 2022';
  static SEMESTER_ACTIVITY = 'Bună ziua,\n' +
    '\n' +
    'Pentru activitățile din cadrul Școlii Doctorale de Informatică este nevoie să alocați la orar intervale pentru următoarele ore:\n' +
    '\n' +
    '{{activity}}\n' +
    '\n' +
    'Persoană de contact orar semestrul 1.\nLect. univ. dr. Pistol Ionuţ-Cristian  ipistol@info.uaic.ro pistol.ionutcristian@gmail.com\n' +
    '\n' +
    'Persoană de contact orar semestrul 2.\nConf. univ. dr. Arusoaie Andrei arusoaie.andrei@info.uaic.ro, andrei.arusoaie@gmail.com\n' +
    '\n' +
    'Vă mulțumesc anticipat,' +
    '\n' +
    '--<small style="color: #888888"><i>\n' +
    'Bejinariu Adriana - Secretar Școala Doctorală de Informatică\n' +
    'Universitatea „Alexandru Ioan Cuza" din Iași\n' +
    'Telefon: 0232 201102 int. 2329\n' +
    '</i></small>';

  static VERBAL_PROCESS_SUBJECT = 'Școala Doctorală de Informatică - PV raport';
  static VERBAL_PROCESS_TEMPLATE = 'Bună ziua,\n' +
    '\n' +
    'Vă trimit atașat Procesul-Verbal pentru susținerea raportului nr. {{report}} al drd. {{studentName}}\n' +
    'Acest document va fi adus la secretariat (C201-stânga) în 2 exemplare după ce va fi semnat de membrii comisiei de îndrumare. Vă mulțumesc!\n' +
    '\n' +
    'O zi bună,\n' +
    `${EmailTemplates.SIGNATURE}`;

  static REPORT_NOTIFICATION_SUBJECT = 'Școala Doctorală de Informatică - informare susținere raport';
  static REPORT_NOTIFICATION = 'Bună ziua,\n' +
    'Raportul cu titlul "{{reportTitle}}" este programat la data de {{date}}. Vă invităm să vă consultați cu coordonatorul științific în termen util.\n' +
    '\n' +
    'Cererea de susținere sau amânare a raportului va fi depusă la Secretariat (C201-stânga) cu o lună înainte de data programată a susținerii referatului, în 2 exemplare.\n' +
    'Formularele sunt disponibile pe site-ul Scolii Doctorale, <a href="https://www.info.uaic.ro/regulamente-formulare-scoala-doctorala/" target="_blank">regulamente formulare școala doctorală</a> , secțiunea Formulare.\n' +
    '\n' +
    'Membri comisiei de îndrumare sunt:\n' +
    'Conducător ştiinţific: {{coordinator}}\n' +
    '{{commission}}\n' +
    ' \n' +
    'O zi bună,\n' +
    `${EmailTemplates.SIGNATURE}`;

  static FAZ_FOOTER = 'În semestrul I, anul universitar 2021-2022 datorită virusului COVID-19, activitatea didactică s-a desfășurat în sistem online conform orarului stabilit.';
}
