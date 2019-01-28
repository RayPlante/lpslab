import { Component, Input } from '@angular/core';

/**
 * a component rendering an object property composed of a name and a value
 */
@Component({
    selector: 'jv-prim-prop',
    template: `
      <div class="jv-prop" [style.margin-left]="indent">
        <jv-prop-name [name]="name" [tip]="tip" 
                      [link]="link" [width]="namewd"></jv-prop-name>
        <div class="jv-prop-value" [style.margin-left]="namewd">
          <jv-pval [value]="value"></jv-pval>
        </div>
      </div>
`,
    styles: [`
.jv-prop {
  font-family: monospace;
  text-align: left;
}

.jv-prop-value {
  margin: 1ch;
}

`]
})
export class JVPrimitivePropertyComponent {
    @Input() name   : string = null;
    @Input() link   : string = null;
    @Input() tip    : string = null;
    @Input() value  : string|number|boolean|null = null;
    @Input() namewd : string = null;
    indent : string = "0ch";
    private _indlen = 0;
    @Input() set indlen(len : number) {
        this._indlen = len;
        this.indent = JSON.stringify(len) + "ch";
    }
    get indlen() : number { return this._indlen; }
}
