import { Component, Input } from '@angular/core';

/**
 * a component rendering an object property composed of a name and a value
 */
@Component({
    selector: 'jv-object-prop',
    template: `
      <div class="jv-prop">
        <jv-prop-name [name]="name" [tip]="tip" 
                      [link]="link" [width]="namewd"></jv-prop-name>
        <div class="jv-prop-value"><jv-oval [value]="value"></jv-oval></div>
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
export class JVObjectPropertyComponent {
    @Input() name   : string = null;
    @Input() link   : string = null;
    @Input() tip    : string = null;
    @Input() value  : any[] = null;
    @Input() namewd : string = null;
}
