import { Component, Input } from '@angular/core';

/**
 * a component rendering an object property composed of a name and a value
 */
@Component({
    selector: 'jv-array-prop',
    template: `
      <div class="jv-prop">
        <jv-prop-name [name]="name" [tip]="tip" 
                      [link]="link" [width]="namewd"></jv-prop-name>
        <div class="jv-prop-value"><jv-aval [vals]="value"></jv-aval></div>
      </div>
`,
    styles: [`
.jv-prop {
  font-family: monospace;
  text-align: left;
}

.jv-prop-value {
  margin: 1ch;
  margin-left: 0ch;
}

`]
})
export class JVArrayPropertyComponent {
    @Input() name   : string = null;
    @Input() link   : string = null;
    @Input() tip    : string = null;
    @Input() value  : any[] = null;
    @Input() namewd : string = null;
}
