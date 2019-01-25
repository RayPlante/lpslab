import { Component, OnInit, Input } from '@angular/core';

/**
 * a component rendering an object property composed of a name and a value
 */
@Component({
    selector: 'jv-prop',
    template: `
      <div class="jv-prop">
        <div [class.withtip]="tip">
          <span *ngIf="link; else jvp_nolink"><a [href]="link">{{name}}</a></span>
          <ng-template #jvp_nolink><span>{{name}}</span></ng-template>
          <span *ngIf="tip" class="tiptext">{{tip}}</span>
        </div>:&nbsp;
      </div>
`,
    styles: [`
.jv-prop {
  font-family: monospace;
  min-width: 9em;
  text-align: left;
}

.withtip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted blue;
}

.withtip .tiptext {
  visibility: hidden;
  max-width: 20em;
  min-width: 15em;
  background-color: #ddddee;
  color: black;
  text-align: left;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 120%;
  left: 4em;
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
}
