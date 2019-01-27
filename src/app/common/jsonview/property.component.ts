import { Component, Input } from '@angular/core';

/**
 * a component rendering an object property composed of a name and a value
 */
@Component({
    selector: 'jv-prop',
    template: `
      <div class="jv-prop">
        <div class="jv-prop-box">
          <div class="jv-prop-name">
            <span [class.withtip]="tip">
              <span *ngIf="link; else jvp_nolink"><a [href]="link">{{name}}</a></span>
              <ng-template #jvp_nolink><span>{{name}}</span></ng-template>
              <span *ngIf="tip" class="tiptext">{{tip}}</span>
            </span>:
          </div>
          <div class="jv-prop-value"><jv-pval [value]="value"></jv-pval></div>
        </div>
      </div>
`,
    styles: [`
.jv-prop {
  font-family: monospace;
  text-align: left;
}

.jv-prop-box {
}

.jv-prop-name {
  min-width: 10ch;
  float: left;
}

.jv-prop-value {
  margin: 1ch;
}

.withtip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted blue;
}

.withtip .tiptext {
  visibility: hidden;
  width: 30ch;
  /* min-width: 15ch; */
  background-color: #ddddee;
  color: black;
  text-align: left;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 120%;
  left: 10ch;
  font-size: smaller;
  font-family: Arial;
  padding:  0.5em 1em 0.5em 1em;
  line-height: 90%;
  margin-left: -4em;
}

.withtip:hover .tiptext {
  visibility: visible;
}

.withtip .tiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 4.5em;
  margin-left: -4em;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #ddddee transparent;
}
`]
})
export class JVPropertyComponent {
    @Input() name : string = null;
    @Input() link : string = null;
    @Input() tip  : string = null;
    @Input() value : string|number|boolean|null;
    @Input() namest : {} = {
        "min-width": "10ch"
    }

    private _nwd = 0;
    public set namewd(w : number) {
        this._nwd = w;
        if (this._nwd > 0)
            this.namest['width'] = this._nwd + 'ch';
        else
            delete this.namest['width'];
    }
    public get namewd() { return this._nwd; }

    
}
