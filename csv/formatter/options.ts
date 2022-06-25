import { Row, RowArray } from '../../types';

interface QuoteColumnMap {
  [s: string]: boolean;
}

type QuoteColumns = boolean | boolean[] | QuoteColumnMap;

export interface FormatterOptionsArgs {
    objectMode?: boolean;
    delimiter?: string;
    rowDelimiter?: string;
    quote?: string | boolean;
    escape?: string;
    quoteColumns?: QuoteColumns;
    quoteHeaders?: QuoteColumns;
    headers?: null | boolean | string[];
    writeHeaders?: boolean;
    includeEndRowDelimiter?: boolean;
    writeBOM?: boolean;
    alwaysWriteHeaders?: boolean;
}

export class FormatterOptions {
    public readonly objectMode: boolean = true;

    public readonly delimiter: string = ',';

    public readonly rowDelimiter: string = '\n';

    public readonly quote: string = '"';

    public readonly escape: string = this.quote;

    public readonly quoteColumns: QuoteColumns = false;

    public readonly quoteHeaders: QuoteColumns = this.quoteColumns;

    public headers: null | RowArray<string> = null;

    public readonly includeEndRowDelimiter: boolean = false;

    public shouldWriteHeaders: boolean;

    public readonly writeBOM: boolean = false;

    public readonly escapedQuote: string;

    public readonly BOM: string = '\ufeff';

    public readonly alwaysWriteHeaders: boolean = false;

    public constructor(opts: FormatterOptionsArgs = {}) {
        Object.assign(this, opts || {});

        if (typeof opts?.quoteHeaders === 'undefined') {
            this.quoteHeaders = this.quoteColumns;
        }
        if (opts?.quote === true) {
            this.quote = '"';
        } else if (opts?.quote === false) {
            this.quote = '';
        }
        if (typeof opts?.escape !== 'string') {
            this.escape = this.quote;
        }
        this.shouldWriteHeaders = !!this.headers && (opts.writeHeaders ?? true);
        this.headers = Array.isArray(this.headers) ? this.headers : null;
        this.escapedQuote = `${this.escape}${this.quote}`;
    }
}