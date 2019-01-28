import { Component, Input } from '@angular/core';

/**
 * a component rendering an object property composed of a name and a value
 */
@Component({
    selector: 'jv-prop-name',
    template: `
      <div class="jv-prop-name" [style.width]="width">
        <span [class.withtip]="tip">
          <span *ngIf="link; else jvp_nolink"><a [href]="link">{{name}}</a></span>
          <ng-template #jvp_nolink><span>{{name}}</span></ng-template>
          <span *ngIf="tip" class="tiptext">{{tip}}</span>
        </span>:&nbsp;
      </div>
`,
    styles: [`
.jv-prop-name {
  min-width: 10ch;
  float: left;
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
export class JVPropertyNameComponent {
    @Input() name  : string = null;
    @Input() link  : string = null;
    @Input() tip   : string = null;
    @Input() width : string = null;
}
