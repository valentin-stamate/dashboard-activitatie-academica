'use strict';

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

export default async function convertToPdf(buffer) {
    let pdfBuf = await libre.convertAsync(buffer, '.pdf', undefined);
    return pdfBuf;
}