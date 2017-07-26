'use strict';

const fs = require('fs');
const path = require('path');

module.exports = class BenchFileCreator {
    constructor() {
        this.file = fs.createWriteStream(
            path.join(__dirname, `${Date.now()}-bench.md`)
        );

        this._init();
    }

    _write(str) {
        this.file.write(str, 'utf8')
    }

    writeTableElement(element) {
        this._write(`${this.onNewLine ? '' : '|'} ${element}`)

        this.onNewLine = false;
    }

    newLine() {
        this._write(`\n| `);
        this.onNewLine = true;
    }

    _writeTableRow(elements) {
        this._write(`${elements.join(' | ')}\n`);
    }

    writeTableHeader(headers) {
        let headerLine = headers.reduce(
            (acc, header) => `${acc} ${header} |`, '');

        headerLine += '\n';

        headers.forEach(() => {
            headerLine += '--- |';
        })

        this._write(headerLine);

        this.newLine();
    }

    writeTitle(title) {
        this._write(`## ${title}\n\n`);
    }

    _init() {
        this._write('# Benchmarks\n' +
            `_generated at ${new Date().toUTCString()}_\n\n`);
    }

    addInformations(nbSamples) {
        this._write(`**Node version** : ${process.version}  \n` +
            `**Minimum sample size** : ${nbSamples}  \n`);
    }

    end() {
        this.file.end();
    }
}